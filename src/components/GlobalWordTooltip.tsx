import { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { lookupWordWithContext, type DictionaryHit } from '../utils/dictionary';
import { speakEnglish } from '../utils/storage';

interface GlobalWordTooltipProps {
  enabled: boolean;
}

interface TooltipState {
  hit: DictionaryHit;
  rect: { left: number; top: number; width: number; height: number; bottom: number };
}

interface WordToken {
  word: string;
  start: number;
  end: number;
}

const WORD_REGEX = /[A-Za-z][A-Za-z’'-]*[A-Za-z]|[A-Za-z]+/g;
const POLISH_DIACRITICS = /[ąęćłńóśźżĄĘĆŁŃÓŚŹŻ]/;

const POLISH_ASCII_STOPWORDS = new Set([
  'kolos', 'tryb', 'wynik', 'wpisz', 'ukryj', 'tabela', 'zadania', 'fiszki',
  'lista', 'wszystkie', 'gramatyka', 'konstrukcje', 'czasownik', 'rzeczownik',
  'przymiotnik', 'znaczenie', 'zasada', 'brak', 'lub', 'oraz', 'jak', 'dla',
  'pod', 'nad', 'bez', 'nie', 'tak', 'czy', 'gdy', 'aby', 'ale', 'tylko',
  'jest', 'samo', 'tego', 'jego', 'przed', 'przez', 'przy', 'albo', 'jako',
  'jedna', 'jedno', 'kilka', 'nowe', 'dobrze', 'trudne', 'znam', 'min', 'godz',
  'dni', 'str', 'zad', 'pkt', 'os', 'lp', 'lmn', 'np', 'itp', 'itd', 'tzw',
  'czasy', 'zdania', 'zdan', 'slowo', 'slowa', 'slowek', 'karta', 'karty',
  'pracy', 'opcja', 'opcje', 'wiersz', 'kolumna', 'zakres', 'typ', 'typy',
  'start', 'backup', 'mock', 'agh', 'unit', 'units', 'srs',
]);

const ONLINE_CACHE = new Map<string, string>();

async function fetchFallbackTranslation(word: string, signal: AbortSignal): Promise<string | null> {
  const key = word.toLowerCase();
  if (ONLINE_CACHE.has(key)) return ONLINE_CACHE.get(key)!;

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pl&dt=t&q=${encodeURIComponent(
      key
    )}`;
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = (await res.json()) as unknown;
    if (
      Array.isArray(data) &&
      Array.isArray(data[0]) &&
      Array.isArray(data[0][0]) &&
      typeof data[0][0][0] === 'string'
    ) {
      const translated = data[0][0][0].trim().toLowerCase();
      if (translated && translated !== key) {
        ONLINE_CACHE.set(key, translated);
        return translated;
      }
    }
  } catch {
    // Ignore abort or offline error
  }
  return null;
}

function getCaretNodeAndOffset(x: number, y: number): { node: Text; offset: number } | null {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };

  if (typeof doc.caretRangeFromPoint === 'function') {
    const range = doc.caretRangeFromPoint(x, y);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE) {
      return { node: range.startContainer as Text, offset: range.startOffset };
    }
  }

  if (typeof doc.caretPositionFromPoint === 'function') {
    const pos = doc.caretPositionFromPoint(x, y);
    if (pos && pos.offsetNode && pos.offsetNode.nodeType === Node.TEXT_NODE) {
      return { node: pos.offsetNode as Text, offset: pos.offset };
    }
  }

  return null;
}

export function GlobalWordTooltip({ enabled }: GlobalWordTooltipProps) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const tooltipElRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const fetchTimerRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabled) {
      setTooltip(null);
      return;
    }

    const clearHideTimer = () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const clearFetchTimer = () => {
      if (fetchTimerRef.current !== null) {
        window.clearTimeout(fetchTimerRef.current);
        fetchTimerRef.current = null;
      }
      if (abortRef.current) {
        abortRef.current.abort();
        abortRef.current = null;
      }
    };

    const scheduleHide = () => {
      clearFetchTimer();
      clearHideTimer();
      hideTimerRef.current = window.setTimeout(() => {
        setTooltip(null);
      }, 120);
    };

    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Keep tooltip visible when hovering inside the tooltip itself
      if (tooltipElRef.current && tooltipElRef.current.contains(target)) {
        clearHideTimer();
        return;
      }

      // Skip inputs, textareas, and top header navigation
      if (target.closest('input, textarea, header, [data-no-translate="true"]')) {
        scheduleHide();
        return;
      }

      const caret = getCaretNodeAndOffset(e.clientX, e.clientY);
      if (!caret) {
        scheduleHide();
        return;
      }

      const text = caret.node.textContent ?? '';
      if (!text.trim()) {
        scheduleHide();
        return;
      }

      // Tokenize all words in this text node
      const tokens: WordToken[] = [];
      let match: RegExpExecArray | null;
      WORD_REGEX.lastIndex = 0;
      while ((match = WORD_REGEX.exec(text)) !== null) {
        tokens.push({
          word: match[0],
          start: match.index,
          end: match.index + match[0].length,
        });
      }

      if (tokens.length === 0) {
        scheduleHide();
        return;
      }

      const tokenIdx = tokens.findIndex(
        (t) => caret.offset >= t.start && caret.offset <= t.end
      );
      if (tokenIdx === -1) {
        scheduleHide();
        return;
      }

      const currentToken = tokens[tokenIdx];

      // Verify mouse (e.clientX, e.clientY) is physically inside the bounding box of currentToken
      const wordRange = document.createRange();
      wordRange.setStart(caret.node, currentToken.start);
      wordRange.setEnd(caret.node, currentToken.end);
      const rect = wordRange.getBoundingClientRect();

      const pad = 4;
      if (
        rect.width === 0 ||
        e.clientX < rect.left - pad ||
        e.clientX > rect.right + pad ||
        e.clientY < rect.top - pad ||
        e.clientY > rect.bottom + pad
      ) {
        scheduleHide();
        return;
      }

      const prevWord = tokenIdx > 0 ? tokens[tokenIdx - 1].word : null;
      const nextWord = tokenIdx + 1 < tokens.length ? tokens[tokenIdx + 1].word : null;
      const nextNextWord = tokenIdx + 2 < tokens.length ? tokens[tokenIdx + 2].word : null;

      // 1. Instant offline lookup (0ms)
      const hit = lookupWordWithContext(
        prevWord,
        currentToken.word,
        nextWord,
        nextNextWord
      );

      const rectObj = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
      };

      if (hit) {
        clearFetchTimer();
        clearHideTimer();
        setTooltip({ hit, rect: rectObj });
        return;
      }

      // 2. Fallback for any other English word (if text node doesn't look like Polish prose)
      const lowerWord = currentToken.word.toLowerCase();
      if (
        lowerWord.length >= 3 &&
        !POLISH_DIACRITICS.test(text) &&
        !POLISH_ASCII_STOPWORDS.has(lowerWord)
      ) {
        if (ONLINE_CACHE.has(lowerWord)) {
          clearFetchTimer();
          clearHideTimer();
          setTooltip({
            hit: {
              matchedText: currentToken.word,
              en: lowerWord,
              pl: ONLINE_CACHE.get(lowerWord)!,
            },
            rect: rectObj,
          });
          return;
        }

        clearFetchTimer();
        clearHideTimer();
        fetchTimerRef.current = window.setTimeout(async () => {
          const ctrl = new AbortController();
          abortRef.current = ctrl;
          const translated = await fetchFallbackTranslation(lowerWord, ctrl.signal);
          if (translated && !ctrl.signal.aborted) {
            setTooltip({
              hit: {
                matchedText: currentToken.word,
                en: lowerWord,
                pl: translated,
              },
              rect: rectObj,
            });
          }
        }, 160);
        return;
      }

      scheduleHide();
    };

    const onScroll = () => {
      clearFetchTimer();
      setTooltip(null);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    return () => {
      clearFetchTimer();
      clearHideTimer();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [enabled]);

  if (!enabled || !tooltip) return null;

  const { hit, rect } = tooltip;
  const placeBelow = rect.top < 85;
  const centerX = Math.min(
    window.innerWidth - 150,
    Math.max(150, rect.left + rect.width / 2)
  );

  return (
    <>
      {/* Subtle underline highlight under the hovered word */}
      <div
        className="pointer-events-none fixed z-40 rounded bg-[#0D6B48]/15 border-b-2 border-[#0D6B48]"
        style={{
          left: rect.left - 2,
          top: rect.top - 1,
          width: rect.width + 4,
          height: rect.height + 2,
        }}
      />

      {/* Floating translation card */}
      <div
        ref={tooltipElRef}
        data-word-tooltip="true"
        className="fixed z-50 w-max max-w-xs -translate-x-1/2 rounded-xl border border-[#27272A] bg-[#18181B] px-3.5 py-2.5 text-white shadow-xl transition-opacity"
        style={{
          left: centerX,
          top: placeBelow ? rect.bottom + 8 : rect.top - 8,
          transform: placeBelow ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-bold text-[#A1A1AA]">
            {hit.en}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              speakEnglish(hit.en);
            }}
            className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white hover:bg-white/20 cursor-pointer"
            title="Odsłuchaj wymowę"
          >
            <Volume2 className="h-3 w-3" />
          </button>
        </div>
        <p className="mt-1 text-sm font-extrabold text-[#34D399] leading-snug">
          {hit.pl}
        </p>
        {hit.note && (
          <p className="mt-1 border-t border-white/10 pt-1 text-[11px] text-amber-300 leading-tight">
            {hit.note}
          </p>
        )}
      </div>
    </>
  );
}

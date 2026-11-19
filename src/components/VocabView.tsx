import { useEffect, useMemo, useState } from 'react';
import { Check, Layers, List, RotateCw, Search, Sparkles, Volume2 } from 'lucide-react';
import type { SRSRecord, UnitTag, VocabCategory } from '../data/types';
import { ALL_FLASHCARDS } from '../data/vocabAll';
import { speakEnglish } from '../utils/storage';

interface VocabViewProps {
  srs: Record<string, SRSRecord>;
  onRate: (cardId: string, rating: 'again' | 'hard' | 'good') => void;
  initialCategory?: 'All' | VocabCategory;
  initialUnit?: 'All' | UnitTag;
}

const UNIT_FILTERS: ('All' | UnitTag)[] = [
  'All',
  'Unit 1',
  'Unit 2',
  'Unit 3',
  'Unit 4',
  'Unit 5',
  'AGH Teksty',
];

const CATEGORIES: ('All' | VocabCategory)[] = [
  'All',
  'Trudne z tekstów',
  'Collocations',
  'Word Building',
  'PEST & Strategy',
  'Logistics & Business',
  'Problem-Solving',
];

export function VocabView({
  srs,
  onRate,
  initialCategory = 'All',
  initialUnit = 'All',
}: VocabViewProps) {
  const [mode, setMode] = useState<'flashcards' | 'list'>('flashcards');
  const [unitFilter, setUnitFilter] = useState<'All' | UnitTag>(initialUnit);
  const [category, setCategory] = useState<'All' | VocabCategory>(initialCategory);
  const [direction, setDirection] = useState<'en-pl' | 'pl-en'>('en-pl');
  const [search, setSearch] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setCategory(initialCategory);
    setUnitFilter(initialUnit);
    setCurrentIndex(0);
    setFlipped(false);
  }, [initialCategory, initialUnit]);

  const filteredCards = useMemo(() => {
    return ALL_FLASHCARDS.filter((c) => {
      if (unitFilter !== 'All' && c.unit !== unitFilter) return false;
      if (category !== 'All' && c.category !== category) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          c.en.toLowerCase().includes(q) ||
          c.pl.toLowerCase().includes(q) ||
          c.example.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [unitFilter, category, search]);

  const safeIndex = filteredCards.length > 0 ? currentIndex % filteredCards.length : 0;
  const activeCard = filteredCards[safeIndex];

  const handleRate = (rating: 'again' | 'hard' | 'good') => {
    if (!activeCard) return;
    onRate(activeCard.id, rating);
    setFlipped(false);
    setCurrentIndex((i) => (i + 1) % Math.max(1, filteredCards.length));
  };

  useEffect(() => {
    if (mode !== 'flashcards') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setFlipped((f) => !f);
      } else if (flipped && e.key === '1') {
        handleRate('again');
      } else if (flipped && e.key === '2') {
        handleRate('hard');
      } else if (flipped && e.key === '3') {
        handleRate('good');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const levelBadge = (cardId: string) => {
    const lvl = srs[cardId]?.level ?? 0;
    if (lvl === 0) return { label: 'Nowe', cls: 'bg-[#F4F3EE] text-[#71717A]' };
    if (lvl === 1) return { label: 'W trakcie', cls: 'bg-amber-50 text-amber-700' };
    if (lvl === 2) return { label: 'Dobrze', cls: 'bg-[#ECF7F2] text-[#0D6B48]' };
    return { label: 'Opanowane', cls: 'bg-[#0D6B48] text-white' };
  };

  return (
    <div className="space-y-5">
      {/* Top Controls */}
      <div className="space-y-3 rounded-2xl border border-[#E6E4DD] bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Unit Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] mr-1">
              Zakres:
            </span>
            {UNIT_FILTERS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setUnitFilter(u);
                  setCurrentIndex(0);
                  setFlipped(false);
                }}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  unitFilter === u
                    ? 'bg-[#18181B] text-white'
                    : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9]'
                }`}
              >
                {u === 'All' ? 'Wszystkie (1–5 + AGH)' : u}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setDirection((d) => (d === 'en-pl' ? 'pl-en' : 'en-pl'));
                setFlipped(false);
              }}
              className="rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] px-3 py-1.5 font-mono text-xs font-semibold text-[#18181B] hover:bg-[#F0EFE9] cursor-pointer"
            >
              {direction === 'en-pl' ? 'EN → PL' : 'PL → EN'}
            </button>

            <div className="inline-flex rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] p-0.5">
              <button
                type="button"
                onClick={() => setMode('flashcards')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                  mode === 'flashcards' ? 'bg-white text-[#18181B] shadow-2xs' : 'text-[#5C5C66]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Fiszki
              </button>
              <button
                type="button"
                onClick={() => setMode('list')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                  mode === 'list' ? 'bg-white text-[#18181B] shadow-2xs' : 'text-[#5C5C66]'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                Lista ({filteredCards.length})
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5 border-t border-[#F0EFE9] pt-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] mr-1">
            Typ:
          </span>
          {CATEGORIES.map((cat) => {
            const isTricky = cat === 'Trudne z tekstów';
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  setCurrentIndex(0);
                  setFlipped(false);
                }}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  active
                    ? isTricky
                      ? 'bg-[#C2571A] text-white'
                      : 'bg-[#0D6B48] text-white'
                    : isTricky
                    ? 'bg-[#FDF2EB] text-[#C2571A] border border-[#C2571A]/30 hover:bg-[#FCE5D7]'
                    : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9]'
                }`}
              >
                {isTricky && <Sparkles className="h-3 w-3" />}
                {cat === 'All' ? 'Wszystkie typy' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty state if filter combination has 0 cards */}
      {filteredCards.length === 0 && (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-10 text-center space-y-2">
          <p className="text-sm font-bold text-[#18181B]">Brak fiszek dla tej kombinacji filtrów.</p>
          <button
            type="button"
            onClick={() => {
              setUnitFilter('All');
              setCategory('All');
              setSearch('');
            }}
            className="text-xs font-semibold text-[#0D6B48] hover:underline cursor-pointer"
          >
            Wyczyść filtry
          </button>
        </div>
      )}

      {/* Flashcard Mode */}
      {mode === 'flashcards' && activeCard && (
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="flex items-center justify-between text-xs text-[#71717A] px-1">
            <span>
              Fiszka <strong className="text-[#18181B]">{safeIndex + 1}</strong> z {filteredCards.length}
            </span>
            <span>Skróty: Spacja = obróć · 1 / 2 / 3 = oceń</span>
          </div>

          <div
            onClick={() => setFlipped((f) => !f)}
            className="min-h-[300px] cursor-pointer rounded-2xl border border-[#E6E4DD] bg-white p-7 shadow-xs transition-all hover:border-[#0D6B48]/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="rounded-md bg-[#F4F3EE] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#5C5C66]">
                  {activeCard.unit}{activeCard.subUnit ? ` · ${activeCard.subUnit}` : ''}
                </span>
                {activeCard.category === 'Trudne z tekstów' && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#FDF2EB] px-2 py-0.5 text-[11px] font-semibold text-[#C2571A]">
                    <Sparkles className="h-3 w-3" />
                    Z tekstu
                  </span>
                )}
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                    levelBadge(activeCard.id).cls
                  }`}
                >
                  {levelBadge(activeCard.id).label}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  speakEnglish(activeCard.en);
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-[#E6E4DD] px-2.5 py-1 text-xs font-medium text-[#5C5C66] hover:bg-[#F4F3EE] hover:text-[#0D6B48] cursor-pointer"
              >
                <Volume2 className="h-3.5 w-3.5" />
                Wymowa
              </button>
            </div>

            <div className="my-6 text-center space-y-3">
              {!flipped ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#71717A]">
                    {direction === 'en-pl' ? 'ENGLISH' : 'POLSKI'}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                    {direction === 'en-pl' ? activeCard.en : activeCard.pl}
                  </h3>
                  {direction === 'en-pl' && activeCard.definition && (
                    <p className="mx-auto max-w-lg text-sm text-[#5C5C66] italic">
                      „{activeCard.definition}”
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#0D6B48]">
                    {direction === 'en-pl' ? 'ZNACZENIE' : 'ENGLISH'}
                  </p>
                  <h3 className="text-2xl font-extrabold text-[#0D6B48]">
                    {direction === 'en-pl' ? activeCard.pl : activeCard.en}
                  </h3>
                  <div className="mx-auto max-w-lg rounded-xl bg-[#F8F7F4] p-3.5 text-left border border-[#E6E4DD]">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-1">
                      Przykład w zdaniu
                    </p>
                    <p className="text-sm text-[#18181B]">„{activeCard.example}”</p>
                    {activeCard.tip && (
                      <p className="mt-2 text-xs font-medium text-[#C2571A]">
                        Tip: {activeCard.tip}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-center text-xs text-[#71717A]">
              <span className="inline-flex items-center gap-1">
                <RotateCw className="h-3.5 w-3.5" />
                Kliknij kartę lub naciśnij Spację, aby {flipped ? 'ukryć' : 'pokazać odpowiedź'}
              </span>
            </div>
          </div>

          {flipped ? (
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleRate('again')}
                className="rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-700 hover:bg-red-100 cursor-pointer"
              >
                1 · Nie znam
                <span className="block text-[11px] font-normal opacity-80">Powtórz za 5 min</span>
              </button>
              <button
                type="button"
                onClick={() => handleRate('hard')}
                className="rounded-xl border border-amber-200 bg-amber-50 py-3 text-sm font-bold text-amber-800 hover:bg-amber-100 cursor-pointer"
              >
                2 · Trudne
                <span className="block text-[11px] font-normal opacity-80">Za 12 godz.</span>
              </button>
              <button
                type="button"
                onClick={() => handleRate('good')}
                className="rounded-xl border border-[#0D6B48]/30 bg-[#ECF7F2] py-3 text-sm font-bold text-[#0D6B48] hover:bg-[#DCF0E6] cursor-pointer"
              >
                3 · Znam!
                <span className="block text-[11px] font-normal opacity-80">Za 1–7 dni</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="w-full rounded-xl bg-[#0D6B48] py-3 text-sm font-bold text-white hover:bg-[#0A5539] cursor-pointer"
            >
              Pokaż odpowiedź
            </button>
          )}
        </div>
      )}

      {/* Searchable List Mode */}
      {mode === 'list' && filteredCards.length > 0 && (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Szukaj słówka, kolokacji lub polskiego znaczenia..."
              className="w-full rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] py-2.5 pl-9 pr-4 text-sm outline-none focus:border-[#0D6B48] focus:bg-white"
            />
          </div>

          <div className="divide-y divide-[#F0EFE9]">
            {filteredCards.map((c) => {
              const b = levelBadge(c.id);
              return (
                <div key={c.id} className="flex flex-col justify-between gap-2 py-3 sm:flex-row sm:items-center">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => speakEnglish(c.en)}
                        className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                        title="Wymowa"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <span className="font-bold text-[#18181B]">{c.en}</span>
                      <span className="text-sm text-[#0D6B48]">— {c.pl}</span>
                    </div>
                    <p className="pl-6 text-xs text-[#5C5C66]">„{c.example}”</p>
                    {c.tip && <p className="pl-6 text-[11px] font-medium text-[#C2571A]">Tip: {c.tip}</p>}
                  </div>
                  <div className="flex items-center gap-1.5 pl-6 sm:pl-0 shrink-0">
                    {c.category === 'Trudne z tekstów' && (
                      <span className="rounded bg-[#FDF2EB] px-2 py-0.5 text-[10px] font-semibold text-[#C2571A]">
                        Z tekstu
                      </span>
                    )}
                    <span className="rounded bg-[#F4F3EE] px-2 py-0.5 font-mono text-[11px] text-[#5C5C66]">
                      {c.unit}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold ${b.cls}`}>
                      {b.label === 'Opanowane' && <Check className="h-3 w-3" />}
                      {b.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  Flame,
  RotateCcw,
  Shuffle,
  Sparkles,
  Table2,
  Volume2,
} from 'lucide-react';
import {
  NOUN_TO_ADJECTIVE_TABLE,
  NOUN_TO_ADJ_EXERCISES,
  NOUN_TO_ADJ_RULES,
  PEST_CHEATSHEET,
  UNIT4_REVIEW_COLLOCATIONS,
  UNIT4_REVIEW_REPORTING,
  UNIT4_REVIEW_WORD_BUILDING,
  UNIT4_WORD_BUILDING,
  WORKSHEET_ENDINGS_CHEATSHEET,
} from '../data/unit4';
import { OTHER_UNITS_REVIEWS } from '../data/unitsReview';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { CUSTOM_LIST_FLASHCARDS } from '../data/customList';
import type { NounToAdjRow, SRSRecord } from '../data/types';
import { normalizeAnswer, speakEnglish } from '../utils/storage';
import { ExerciseList } from './ExerciseList';
import { GrammarTopicCard } from './GrammarTopicCard';
import { VocabView } from './VocabView';

interface KolosUnit4ViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
  srs: Record<string, SRSRecord>;
  onRateCard: (cardId: string, rating: 'again' | 'hard' | 'good') => void;
  initialUnit?: 1 | 2 | 3 | 4 | 5;
}

type KolosSection =
  | 'flashcards'
  | 'noun-to-adj'
  | 'word-building'
  | 'kolos-constructions'
  | 'u4-business';

type ConstructionTopicId =
  | 'all-tenses-mix'
  | 'conditionals-kolos'
  | 'wish-should-have-kolos'
  | 'rather-prefer-so-neither'
  | 'time-clauses-agh'
  | 'all-mix';

type NtaSubView = 'table' | 'worksheet-5' | 'rules';

function adjMatches(userInput: string, row: NounToAdjRow): boolean {
  const norm = normalizeAnswer(userInput);
  if (!norm) return false;
  const rawCandidates = [
    ...row.adjective.split('/'),
    ...(row.negativeOrOther ? row.negativeOrOther.replace(/\(.*?\)/g, '').split('/') : []),
  ];
  const accepted = rawCandidates.map((s) => normalizeAnswer(s)).filter(Boolean);
  if (accepted.includes('colourful')) accepted.push('colorful');
  if (accepted.includes('recognizable')) accepted.push('recognisable');
  return accepted.includes(norm);
}

export function KolosUnit4View({
  onScoreSave,
  srs,
  onRateCard,
  initialUnit = 4,
}: KolosUnit4ViewProps) {
  const [activeUnit, setActiveUnit] = useState<1 | 2 | 3 | 4 | 5>(initialUnit);
  const [section, setSection] = useState<KolosSection>('noun-to-adj');

  // Word building U4 states
  const [quizMode, setQuizMode] = useState(false);
  const [revealedRows, setRevealedRows] = useState<Record<string, boolean>>({});

  // Noun -> Adjective table states
  const [ntaSubView, setNtaSubView] = useState<NtaSubView>('table');
  const [suffixFilter, setSuffixFilter] = useState<'All' | NounToAdjRow['suffixGroup']>('All');
  const [ntaHideAdj, setNtaHideAdj] = useState(false);
  const [ntaRevealed, setNtaRevealed] = useState<Record<string, boolean>>({});
  const [ntaWriteMode, setNtaWriteMode] = useState(false);
  const [ntaInputs, setNtaInputs] = useState<Record<string, string>>({});
  const [ntaChecked, setNtaChecked] = useState(false);

  // Constructions tab state
  const [activeConstruction, setActiveConstruction] = useState<ConstructionTopicId>('all-tenses-mix');
  const [mixSeed, setMixSeed] = useState(1);

  useEffect(() => {
    setActiveUnit(initialUnit);
  }, [initialUnit]);

  const modalTopic = GRAMMAR_TOPICS.find((t) => t.id === 'modal-verbs-u4')!;
  const comparisonTopic = GRAMMAR_TOPICS.find((t) => t.id === 'comparison-u4')!;

  const constructionTopicIds: Exclude<ConstructionTopicId, 'all-mix'>[] = [
    'all-tenses-mix',
    'conditionals-kolos',
    'wish-should-have-kolos',
    'rather-prefer-so-neither',
    'time-clauses-agh',
  ];

  const constructionTopics = useMemo(
    () =>
      constructionTopicIds
        .map((id) => GRAMMAR_TOPICS.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => Boolean(t)),
    []
  );

  const selectedConstructionTopic = useMemo(
    () => constructionTopics.find((t) => t.id === activeConstruction) ?? constructionTopics[0],
    [activeConstruction, constructionTopics]
  );

  const mixedConstructionQuestions = useMemo(() => {
    const all = constructionTopics.flatMap((t) => t.exercises);
    const copy = [...all];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(((Math.sin(mixSeed * 83 + i * 29) + 1) / 2) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 15);
  }, [constructionTopics, mixSeed]);

  const filteredNounToAdj = useMemo(() => {
    if (suffixFilter === 'All') return NOUN_TO_ADJECTIVE_TABLE;
    return NOUN_TO_ADJECTIVE_TABLE.filter((r) => r.suffixGroup === suffixFilter);
  }, [suffixFilter]);

  const ntaScore = useMemo(() => {
    let correct = 0;
    for (const r of filteredNounToAdj) {
      if (adjMatches(ntaInputs[r.id] ?? '', r)) correct++;
    }
    return { correct, total: filteredNounToAdj.length };
  }, [filteredNounToAdj, ntaInputs]);

  const unitTabs: { num: 1 | 2 | 3 | 4 | 5; label: string; isKolos?: boolean }[] = [
    { num: 1, label: 'Unit 1: Organisation' },
    { num: 2, label: 'Unit 2: Brands' },
    { num: 3, label: 'Unit 3: Job Hunting' },
    { num: 4, label: 'Unit 4: Strategy (KOLOS)', isKolos: true },
    { num: 5, label: 'Unit 5: Logistics' },
  ];

  const u4Tabs: { id: KolosSection; label: string; tag: string }[] = [
    { id: 'flashcards', label: `Fiszki z listy (${CUSTOM_LIST_FLASHCARDS.length})`, tag: 'SRS' },
    { id: 'noun-to-adj', label: `Rzeczownik → Przymiotnik (${NOUN_TO_ADJECTIVE_TABLE.length})`, tag: 'TABELA' },
    { id: 'kolos-constructions', label: 'Gramatyka na Kolosa', tag: 'TEST' },
    { id: 'word-building', label: 'Word Building (str. 39 & 107)', tag: '4.1' },
    { id: 'u4-business', label: 'Kolokacje, PEST, Modale & Linking', tag: '4.1–4.5' },
  ];

  const suffixGroups: ('All' | NounToAdjRow['suffixGroup'])[] = [
    'All',
    '-ous / -ious',
    '-ful / -less',
    '-y',
    '-al / -ic',
    '-able / -ible',
    '-ive',
    '-ant / -ent',
    '-ing / -ed / -ly',
  ];

  const otherBundle = activeUnit !== 4 ? OTHER_UNITS_REVIEWS[activeUnit] : null;

  return (
    <div className="space-y-6">
      {/* Unit Switcher */}
      <div className="flex flex-wrap gap-2 rounded-2xl border border-[#E6E4DD] bg-white p-3">
        {unitTabs.map((u) => {
          const active = activeUnit === u.num;
          return (
            <button
              key={u.num}
              type="button"
              onClick={() => setActiveUnit(u.num)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                active
                  ? u.isKolos
                    ? 'bg-[#C2571A] text-white shadow-xs'
                    : 'bg-[#0D6B48] text-white shadow-xs'
                  : u.isKolos
                  ? 'bg-[#FDF2EB] text-[#C2571A] border border-[#C2571A]/30 hover:bg-[#FCE5D7]'
                  : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9] hover:text-[#18181B]'
              }`}
            >
              {u.isKolos && <Flame className="h-3.5 w-3.5" />}
              {u.label}
            </button>
          );
        })}
      </div>

      {/* ================= UNIT 1, 2, 3, 5 REVIEWS ================= */}
      {otherBundle && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#0D6B48]/25 bg-[#ECF7F2]/60 p-5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0D6B48]">
              Business Partner B1 · Review Unit {otherBundle.unitNumber}
            </span>
            <h2 className="mt-1 text-xl font-extrabold text-[#18181B]">{otherBundle.title}</h2>
            <p className="mt-0.5 text-sm text-[#5C5C66]">{otherBundle.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
            <h3 className="text-base font-bold text-[#18181B] mb-3">
              Kluczowe kolokacje i zwroty — Unit {otherBundle.unitNumber}
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              {otherBundle.keyVocabSummary.map(([en, pl]) => (
                <div
                  key={en}
                  className="flex flex-col justify-between rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-3"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[#18181B]">{en}</span>
                    <button
                      type="button"
                      onClick={() => speakEnglish(en)}
                      className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                      title="Odsłuchaj"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="mt-1 text-xs text-[#5C5C66]">{pl}</span>
                </div>
              ))}
            </div>
          </div>

          {otherBundle.sections.map((sec) => (
            <div key={sec.id} className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
              <ExerciseList
                key={sec.id}
                title={sec.title}
                subtitle={sec.subtitle}
                questions={sec.questions}
                onComplete={(c, t) => onScoreSave(sec.id, c, t)}
              />
            </div>
          ))}
        </div>
      )}

      {/* ================= UNIT 4 + KONSTRUKCJE (KOLOS PRIORITY) ================= */}
      {activeUnit === 4 && (
        <>
          <div className="rounded-2xl border border-[#C2571A]/25 bg-gradient-to-br from-[#FDF2EB] via-white to-[#ECF7F2]/50 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C2571A]">
                  <Flame className="h-3.5 w-3.5" />
                  PEŁNY ZAKRES KOLOKWIUM · DZIAŁ 4 + KONSTRUKCJE ZE SCREENA
                </div>
                <h2 className="mt-1 text-xl font-extrabold text-[#18181B]">
                  Unit 4 (Business Strategy) + Rzeczownik → Przymiotnik + Konstrukcje
                </h2>
                <p className="mt-0.5 text-sm text-[#5C5C66]">
                  1) Tabela <strong className="text-[#18181B]">Rzeczownik → Przymiotnik</strong> (z Twojej listy słówek),
                  2) <strong className="text-[#18181B]">Czasy, Conditionale, I wish, I should / should have, Until / As soon as / If</strong>,
                  3) <strong className="text-[#18181B]">Word Building, Kolokacje, PEST, Modale i Due to / Result in</strong> oraz
                  4) <strong className="text-[#18181B]">157 fiszek z listy</strong>.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {u4Tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSection(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    section === t.id
                      ? 'bg-[#C2571A] text-white shadow-xs'
                      : 'bg-white text-[#18181B] border border-[#E6E4DD] hover:border-[#C2571A]/40'
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                      section === t.id ? 'bg-white/20 text-white' : 'bg-[#F4F3EE] text-[#5C5C66]'
                    }`}
                  >
                    {t.tag}
                  </span>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ================= TAB 1: RZECZOWNIK -> PRZYMIOTNIK ================= */}
          {section === 'noun-to-adj' && (
            <div className="space-y-6">
              {/* Sub-switcher inside Noun -> Adjective so the main table is right at the top */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E4DD] bg-white p-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'table' as NtaSubView, label: `1. Tabela: Rzeczownik → Przymiotnik (${NOUN_TO_ADJECTIVE_TABLE.length})` },
                    { id: 'worksheet-5' as NtaSubView, label: '2. Karta Pracy (str. 5/15 — Wszystkie Końcówki)' },
                    { id: 'rules' as NtaSubView, label: '3. Zasady pisowni (7 grup)' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setNtaSubView(item.id)}
                      className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                        ntaSubView === item.id
                          ? 'bg-[#0D6B48] text-white shadow-2xs'
                          : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9] hover:text-[#18181B]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUB-VIEW 2: Complete Worksheet 5/15 Endings Table */}
              {ntaSubView === 'worksheet-5' && (
                <div className="rounded-2xl border border-[#C2571A]/30 bg-white p-5 space-y-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C2571A] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      <Table2 className="h-3 w-3" />
                      Twoja Karta Pracy (str. 5/15) — poprawiona i uzupełniona
                    </span>
                    <h3 className="mt-1.5 text-base font-extrabold text-[#18181B]">
                      NOUN ENDINGS (10) · ADJECTIVAL ENDINGS (13) · VERB ENDINGS (4)
                    </h3>
                    <p className="text-xs text-[#5C5C66]">
                      Uwaga na poprawki z Twojej odręcznej karty: <strong className="text-[#C2571A]">helpful</strong> (jedno „l”!), <strong className="text-[#C2571A]">impressive</strong> (dwa „s”!), <strong className="text-[#C2571A]">delicious</strong> (przez „c”!) oraz <strong className="text-[#C2571A]">logical</strong> (bo „logic” to rzeczownik!).
                    </p>
                  </div>

                  {WORKSHEET_ENDINGS_CHEATSHEET.map((group) => (
                    <div key={group.category} className="space-y-2.5">
                      <h4 className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0D6B48] border-b border-[#E6E4DD] pb-1">
                        {group.category}
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {group.items.map((item) => (
                          <div
                            key={item.ending}
                            className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-3 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded bg-[#18181B] px-2 py-0.5 font-mono text-xs font-bold text-white">
                                {item.ending}
                              </span>
                              <span className="text-[11px] font-medium italic text-[#5C5C66]">
                                {item.meaning}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {item.examples.map((ex) => (
                                <span
                                  key={ex}
                                  className="rounded border border-[#E6E4DD] bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-[#0D6B48]"
                                >
                                  {ex}
                                </span>
                              ))}
                            </div>
                            {item.trap && (
                              <p className="mt-1 inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                                <AlertTriangle className="h-3 w-3 shrink-0" />
                                {item.trap}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SUB-VIEW 3: Grammar Rules of Adjective Formation */}
              {ntaSubView === 'rules' && (
                <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D6B48] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                      <Sparkles className="h-3 w-3" />
                      Zasady Gramatyczne i Pisownia
                    </span>
                    <h3 className="mt-1.5 text-base font-extrabold text-[#18181B]">
                      Jak tworzymy przymiotniki od rzeczowników (i czasowników)? — 7 grup końcówek z listy
                    </h3>
                    <p className="text-xs text-[#5C5C66]">
                      Wszystkie przykłady poniżej pochodzą bezpośrednio z Twojej listy słówek (np. mountainous areas, spacious rooms, cloudless skies, luxurious, overpriced, uncomfortable, lively, economic recession, profitable, risky).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {NOUN_TO_ADJ_RULES.map((r) => (
                      <div
                        key={r.suffix}
                        className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-md bg-[#0D6B48] px-2 py-0.5 font-mono text-xs font-bold text-white">
                            {r.suffix}
                          </span>
                          <span className="text-[11px] font-semibold text-[#5C5C66]">{r.meaning}</span>
                        </div>
                        <p className="text-xs text-[#18181B] leading-relaxed">{r.spelling}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {r.examples.map((ex) => (
                            <span
                              key={ex}
                              className="rounded-md border border-[#E6E4DD] bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-[#0D6B48]"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-VIEW 1 (DEFAULT): Main Noun -> Adjective Table (with Hide & Quiz Write Mode) */}
              {ntaSubView === 'table' && (
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-[#18181B]">
                      Tabela zmian: Rzeczownik / Czasownik → Przymiotnik ({filteredNounToAdj.length} par z listy i Unit 4)
                    </h3>
                    <p className="text-xs text-[#5C5C66]">
                      Możesz filtrować po końcówkach, ukryć przymiotniki do szybkiej powtórki albo włączyć tryb wpisywania (jak na kartkówce!).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNtaWriteMode(false);
                        setNtaHideAdj((v) => !v);
                        setNtaRevealed({});
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        ntaHideAdj && !ntaWriteMode
                          ? 'border-[#0D6B48] bg-[#ECF7F2] text-[#0D6B48]'
                          : 'border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B] hover:bg-[#F0EFE9]'
                      }`}
                    >
                      {ntaHideAdj ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      {ntaHideAdj ? 'Kliknij wiersz, by odkryć' : 'Ukryj przymiotniki'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setNtaWriteMode((v) => !v);
                        setNtaHideAdj(false);
                        setNtaInputs({});
                        setNtaChecked(false);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        ntaWriteMode
                          ? 'bg-[#C2571A] text-white'
                          : 'border border-[#C2571A]/35 bg-[#FDF2EB] text-[#C2571A] hover:bg-[#FCE5D7]'
                      }`}
                    >
                      <Table2 className="h-3.5 w-3.5" />
                      {ntaWriteMode ? 'Wyłącz tryb wpisywania' : 'Sprawdź się: Wpisz przymiotniki w tabeli'}
                    </button>
                  </div>
                </div>

                {/* Filter pills by suffix */}
                <div className="flex flex-wrap gap-1.5 border-t border-[#F0EFE9] pt-3">
                  {suffixGroups.map((sg) => (
                    <button
                      key={sg}
                      type="button"
                      onClick={() => {
                        setSuffixFilter(sg);
                        setNtaChecked(false);
                      }}
                      className={`rounded-lg px-2.5 py-1 font-mono text-xs font-semibold transition-colors cursor-pointer ${
                        suffixFilter === sg
                          ? 'bg-[#18181B] text-white'
                          : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9]'
                      }`}
                    >
                      {sg === 'All' ? `Wszystkie (${NOUN_TO_ADJECTIVE_TABLE.length})` : sg}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#E6E4DD] text-xs uppercase tracking-wider text-[#71717A]">
                        <th className="py-2.5 pr-3 font-semibold">Rzeczownik / Baza (Noun)</th>
                        <th className="py-2.5 px-3 font-semibold">Przymiotnik (Adjective)</th>
                        <th className="py-2.5 px-3 font-semibold">Końcówka</th>
                        <th className="py-2.5 px-3 font-semibold">Kolokacja z listy na kolosa</th>
                        <th className="py-2.5 pl-3 font-semibold">Zasada / Pułapka</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EFE9]">
                      {filteredNounToAdj.map((row) => {
                        const isHidden = ntaHideAdj && !ntaRevealed[row.id];
                        const userVal = ntaInputs[row.id] ?? '';
                        const isOk = adjMatches(userVal, row);

                        return (
                          <tr
                            key={row.id}
                            onClick={() =>
                              ntaHideAdj &&
                              setNtaRevealed((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                            }
                            className={ntaHideAdj ? 'cursor-pointer hover:bg-[#F8F7F4]' : ''}
                          >
                            <td className="py-3 pr-3">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakEnglish(`${row.base}, ${row.adjective}, ${row.collocation}`);
                                  }}
                                  className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                                  title="Odsłuchaj wymowę"
                                >
                                  <Volume2 className="h-3.5 w-3.5" />
                                </button>
                                <span className="font-mono text-[13px] font-bold text-[#18181B]">
                                  {row.base}
                                </span>
                              </div>
                              <span className="pl-5 text-[11px] text-[#71717A]">{row.basePl}</span>
                            </td>

                            <td className="py-3 px-3 font-mono text-[13px]">
                              {ntaWriteMode ? (
                                <div>
                                  <input
                                    type="text"
                                    value={userVal}
                                    onChange={(e) =>
                                      setNtaInputs((prev) => ({ ...prev, [row.id]: e.target.value }))
                                    }
                                    placeholder="Wpisz przymiotnik..."
                                    className={`w-full min-w-[140px] rounded-lg border px-2.5 py-1.5 font-mono text-xs outline-none ${
                                      ntaChecked
                                        ? isOk
                                          ? 'border-[#0D6B48] bg-[#ECF7F2]/60 font-bold text-[#0D6B48]'
                                          : 'border-red-400 bg-red-50/60 text-red-700'
                                        : 'border-[#D8D5CC] bg-white focus:border-[#0D6B48]'
                                    }`}
                                  />
                                  {ntaChecked && !isOk && (
                                    <p className="mt-1 font-mono text-[11px] font-bold text-[#0D6B48]">
                                      ✓ {row.adjective}
                                      {row.negativeOrOther ? ` (${row.negativeOrOther})` : ''}
                                    </p>
                                  )}
                                </div>
                              ) : isHidden ? (
                                <span className="rounded bg-[#E6E4DD] px-2.5 py-0.5 text-transparent select-none">
                                  {row.adjective}
                                </span>
                              ) : (
                                <div>
                                  <span className="font-bold text-[#0D6B48]">{row.adjective}</span>
                                  {row.negativeOrOther && (
                                    <span className="block text-[11px] text-[#C2571A]">
                                      {row.negativeOrOther}
                                    </span>
                                  )}
                                </div>
                              )}
                            </td>

                            <td className="py-3 px-3">
                              <span className="rounded-md bg-[#F4F3EE] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#5C5C66]">
                                {row.suffixGroup}
                              </span>
                            </td>

                            <td className="py-3 px-3 text-xs">
                              {ntaWriteMode || isHidden ? (
                                <span className="text-[#5C5C66] italic">{row.collocationPl}</span>
                              ) : (
                                <>
                                  <span className="font-semibold text-[#18181B]">
                                    {row.collocation}
                                  </span>
                                  <span className="block text-[11px] text-[#5C5C66]">
                                    {row.collocationPl}
                                  </span>
                                </>
                              )}
                            </td>

                            <td className="py-3 pl-3 text-xs">
                              {row.rule && (
                                <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 border border-amber-200">
                                  <AlertTriangle className="h-3 w-3 shrink-0" />
                                  {row.rule}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {ntaWriteMode && (
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EFE9] pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNtaChecked(true);
                          onScoreSave('u4-noun-to-adj-table', ntaScore.correct, ntaScore.total);
                        }}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0D6B48] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0A5539] cursor-pointer"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Sprawdź wpisane przymiotniki
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNtaInputs({});
                          setNtaChecked(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6E4DD] bg-white px-3.5 py-2.5 text-sm font-medium text-[#5C5C66] hover:bg-[#F4F3EE] cursor-pointer"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Wyczyść
                      </button>
                    </div>
                    {ntaChecked && (
                      <span className="rounded-full bg-[#ECF7F2] px-3.5 py-1.5 text-sm font-bold text-[#0D6B48]">
                        Wynik: {ntaScore.correct} / {ntaScore.total} (
                        {Math.round((ntaScore.correct / Math.max(1, ntaScore.total)) * 100)}%)
                      </span>
                    )}
                  </div>
                )}
              </div>
              )}

              {/* Gap-fill Exercises for Noun -> Adjective */}
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Ćwiczenie na kolosa: Utwórz przymiotnik od rzeczownika / czasownika (16 zdań z listy)"
                  subtitle="Wpisz przymiotnik utworzony od słowa WIELKIMI LITERAMI. Zwróć uwagę na pisownię (-ous/-ious, -ful/-less, -y, un-, over-)."
                  questions={NOUN_TO_ADJ_EXERCISES}
                  onComplete={(c, t) => onScoreSave('u4-noun-to-adj-drill', c, t)}
                />
              </div>
            </div>
          )}

          {/* ================= TAB 2: KONSTRUKCJE GRAMATYCZNE ZE SCREENA ================= */}
          {section === 'kolos-constructions' && (
            <div className="space-y-6">
              {/* Sub-navigation for the 6 screenshot & worksheet constructions */}
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C2571A] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
                    <BookOpen className="h-3 w-3" />
                    Konstrukcje z wiadomości o kolosie + Karty Pracy (str. 47 i 67)
                  </span>
                  <h3 className="mt-1.5 text-lg font-extrabold text-[#18181B]">
                    Wybierz konstrukcję — każda ma czytelną tabelę „Co widzisz → Co wpisujesz”
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      id: 'all-tenses-mix' as ConstructionTopicId,
                      badge: '1. Czasy',
                      label: 'Tabela 8 Czasów (Słowa-klucze)',
                      desc: 'yesterday vs since/for vs had + V3 vs will have + V3',
                    },
                    {
                      id: 'conditionals-kolos' as ConstructionTopicId,
                      badge: '2. Conditionale',
                      label: 'Tryby Warunkowe 0, I, II, III + Mixed',
                      desc: 'Co po IF, a co w drugim zdaniu + unless / in case',
                    },
                    {
                      id: 'wish-should-have-kolos' as ConstructionTopicId,
                      badge: '3. I wish + I should',
                      label: 'I wish (teraz vs przeszłość) & should have',
                      desc: 'I wish + Past Simple / had V3 · should vs should have V3',
                    },
                    {
                      id: 'rather-prefer-so-neither' as ConstructionTopicId,
                      badge: '4. Karta str. 67',
                      label: 'I’d rather · prefer TO · So / Neither',
                      desc: 'Ta sama osoba vs inna osoba · prefer X to Y · So did I',
                    },
                    {
                      id: 'time-clauses-agh' as ConstructionTopicId,
                      badge: '5. Wtrącenia czasu',
                      label: 'until, before, after, as soon as (possible)',
                      desc: 'Przyszłość (bez will!) vs Przeszłość (had V3) vs -ing',
                    },
                    {
                      id: 'all-mix' as ConstructionTopicId,
                      badge: '6. TEST MIX (15)',
                      label: 'Losowy Test ze Wszystkich Konstrukcji',
                      desc: '15 wymieszanych zdań jak na prawdziwym kolokwium',
                    },
                  ].map((item) => {
                    const active = activeConstruction === item.id;
                    const isMix = item.id === 'all-mix';
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveConstruction(item.id);
                          if (isMix) setMixSeed((s) => s + 1);
                        }}
                        className={`rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                          active
                            ? isMix
                              ? 'border-[#C2571A] bg-[#C2571A] text-white shadow-xs'
                              : 'border-[#0D6B48] bg-[#ECF7F2]/80 text-[#18181B] shadow-xs'
                            : isMix
                            ? 'border-[#C2571A]/35 bg-[#FDF2EB] text-[#18181B] hover:bg-[#FCE5D7]'
                            : 'border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B] hover:bg-[#F0EFE9]'
                        }`}
                      >
                        <span
                          className={`inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                            active && isMix
                              ? 'bg-white/20 text-white'
                              : isMix
                              ? 'bg-[#C2571A] text-white'
                              : active
                              ? 'bg-[#0D6B48] text-white'
                              : 'bg-white text-[#5C5C66]'
                          }`}
                        >
                          {item.badge}
                        </span>
                        <p className="mt-1.5 text-sm font-extrabold">{item.label}</p>
                        <p
                          className={`mt-0.5 text-xs ${
                            active && isMix ? 'text-white/85' : 'text-[#5C5C66]'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeConstruction !== 'all-mix' && selectedConstructionTopic && (
                <>
                  <GrammarTopicCard topic={selectedConstructionTopic} />

                  {/* Exercises for selected construction */}
                  <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
                    <ExerciseList
                      key={selectedConstructionTopic.id}
                      title={`Ćwiczenia (${selectedConstructionTopic.exercises.length} zdań): ${selectedConstructionTopic.title}`}
                      subtitle="Wpisz poprawną formę lub wybierz odpowiedź. Naciśnij Enter, aby sprawdzić pojedyncze zdanie."
                      questions={selectedConstructionTopic.exercises}
                      onComplete={(c, t) =>
                        onScoreSave(`kolos-${selectedConstructionTopic.id}`, c, t)
                      }
                    />
                  </div>
                </>
              )}

              {activeConstruction === 'all-mix' && (
                <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-extrabold text-[#18181B]">
                        Symulator Gramatyczny na Kolosa — 15 losowych zdań ze wszystkich konstrukcji
                      </h3>
                      <p className="text-xs text-[#5C5C66]">
                        Wymieszane zdania: Czasy + Conditionale (0, I, II, III) + I wish / I’d rather + I should / should have + V3 + until / as soon as / unless / if.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMixSeed((s) => s + 1)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#C2571A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#A64813] cursor-pointer"
                    >
                      <Shuffle className="h-3.5 w-3.5" />
                      Wylosuj nowy zestaw (15)
                    </button>
                  </div>

                  <ExerciseList
                    key={`mix-${mixSeed}`}
                    title="Test Mix: Czasy, Conditionale, I wish, I should (have), Time Clauses"
                    subtitle="Sprawdź, czy rozpoznajesz właściwą konstrukcję bez podpowiedzi, z którego działu pochodzi zdanie!"
                    questions={mixedConstructionQuestions}
                    onComplete={(c, t) => onScoreSave('kolos-constructions-mix', c, t)}
                  />
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 3: WORD BUILDING UNIT 4 (VERB / NOUN / ADJ) ================= */}
          {section === 'word-building' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#18181B]">
                      Tabela Word Building z podręcznika (str. 39, zad. 7) — 13 rodzin wyrazów (Verb / Noun / Adjective)
                    </h3>
                    <p className="text-xs text-[#5C5C66]">
                      Zwróć szczególną uwagę na żółte ostrzeżenia (np. innovate → innovative, perform → performance, risk → risky, take over vs takeover).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setQuizMode((v) => !v);
                      setRevealedRows({});
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      quizMode
                        ? 'border-[#0D6B48] bg-[#ECF7F2] text-[#0D6B48]'
                        : 'border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B] hover:bg-[#F0EFE9]'
                    }`}
                  >
                    {quizMode ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {quizMode ? 'Tryb sprawdzania (kliknij wiersz, by odkryć)' : 'Ukryj rzeczowniki i przymiotniki'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#E6E4DD] text-xs uppercase tracking-wider text-[#71717A]">
                        <th className="py-2.5 pr-3 font-semibold">Verb</th>
                        <th className="py-2.5 px-3 font-semibold">Noun</th>
                        <th className="py-2.5 px-3 font-semibold">Adjective</th>
                        <th className="py-2.5 pl-3 font-semibold">Znaczenie & pułapki</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0EFE9]">
                      {UNIT4_WORD_BUILDING.map((row) => {
                        const isHidden = quizMode && !revealedRows[row.id];
                        return (
                          <tr
                            key={row.id}
                            onClick={() =>
                              quizMode && setRevealedRows((prev) => ({ ...prev, [row.id]: !prev[row.id] }))
                            }
                            className={`${quizMode ? 'cursor-pointer hover:bg-[#F8F7F4]' : ''}`}
                          >
                            <td className="py-3 pr-3 font-semibold text-[#18181B]">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    speakEnglish(`${row.verb}, ${row.noun}`);
                                  }}
                                  className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                                  title="Odsłuchaj wymowę"
                                >
                                  <Volume2 className="h-3.5 w-3.5" />
                                </button>
                                {row.verb}
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono text-[13px]">
                              {isHidden ? (
                                <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                                  {row.noun}
                                </span>
                              ) : (
                                <span className="font-medium text-[#0D6B48]">{row.noun}</span>
                              )}
                            </td>
                            <td className="py-3 px-3 font-mono text-[13px]">
                              {isHidden ? (
                                <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                                  {row.adjective}
                                </span>
                              ) : (
                                <span className="text-[#18181B]">{row.adjective}</span>
                              )}
                            </td>
                            <td className="py-3 pl-3 text-xs">
                              <p className="text-[#5C5C66]">{row.pl}</p>
                              {row.trap && (
                                <p className="mt-1 inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 border border-amber-200">
                                  <AlertTriangle className="h-3 w-3 shrink-0" />
                                  {row.trap}
                                </p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Ćwiczenie: Word Building (Review str. 107 + str. 39)"
                  subtitle="Wpisz poprawną formę słowa podanego WIELKIMI LITERAMI."
                  questions={UNIT4_REVIEW_WORD_BUILDING}
                  onComplete={(c, t) => onScoreSave('u4-word-building', c, t)}
                />
              </div>
            </div>
          )}

          {/* ================= TAB 4: KOLOKACJE, PEST, MODALE & REPORTING (4.1 - 4.5) ================= */}
          {section === 'u4-business' && (
            <div className="space-y-6">
              {/* 4.1 Collocations */}
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-2">
                  4.1 Bank kolokacji biznesowych z Unit 4 (zapamiętaj pary!)
                </h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                  {[
                    ['takeover bid', 'oferta przejęcia'],
                    ['product lines', 'linie produktowe'],
                    ['emerging markets', 'rynki wschodzące'],
                    ['major player', 'główny gracz na rynku'],
                    ['profit margin', 'marża zysku'],
                    ['develop a strategy', 'opracować strategię'],
                    ['tackle / solve a problem', 'rozwiązać problem'],
                    ['miss opportunities', 'przegapić szanse'],
                    ['cut costs', 'ciąć koszty'],
                    ['take risks / take a gamble', 'podejmować ryzyko / zaryzykować'],
                    ['make a profit / money', 'osiągać zysk'],
                    ['come up with a plan', 'wymyślić plan'],
                  ].map(([en, pl]) => (
                    <div
                      key={en}
                      className="flex items-center justify-between rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] px-3 py-2"
                    >
                      <span className="font-semibold text-[#18181B]">{en}</span>
                      <span className="text-xs text-[#5C5C66]">{pl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Review 4.1 (str. 107, zad. 1) — Uzupełnij tekst kolokacjami"
                  subtitle="Dostępne słowa: cut, developed, emerging, lines, major, margin, missed, risks, tackle, takeover"
                  questions={UNIT4_REVIEW_COLLOCATIONS}
                  onComplete={(c, t) => onScoreSave('u4-collocations', c, t)}
                />
              </div>

              {/* 4.2 PEST + Modals */}
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  4.2 PEST Analysis — ściągawka z podręcznika (str. 40)
                </h3>
                <p className="text-xs text-[#5C5C66] mb-4">
                  Kolejność działań po zebraniu danych: 1. Prioritise the most relevant factors → 2. Identify opportunities & risks → 3. Come up with a strategy.
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PEST_CHEATSHEET.map((p) => (
                    <div key={p.letter} className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0D6B48] font-mono text-sm font-bold text-white">
                          {p.letter}
                        </span>
                        <span className="font-bold text-[#18181B]">{p.name}</span>
                      </div>
                      <ul className="space-y-1 text-xs text-[#5C5C66] list-disc pl-4">
                        {p.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Review 4.2 — Modal Verbs (must / have to / mustn't / don't have to / should / will have to)"
                  subtitle="Zadania z Review str. 107 i lekcji 4.2 (str. 41)."
                  questions={modalTopic.exercises}
                  onComplete={(c, t) => onScoreSave('u4-modals', c, t)}
                />
              </div>

              {/* 4.5 Reporting Problems, Reasons & Results + Comparison */}
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-3">
                  4.5 Reporting Problems, Reasons & Results + Comparison (fewer vs less)
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-[#0D6B48]/25 bg-[#ECF7F2]/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0D6B48] mb-2">
                      + RZECZOWNIK lub V-ing (Noun Phrase)
                    </p>
                    <ul className="space-y-1.5 text-sm text-[#18181B]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0D6B48] shrink-0" />
                        <span><strong>due to</strong> / <strong>because of</strong> / <strong>as a result of</strong> (przyczyna)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0D6B48] shrink-0" />
                        <span><strong>has led to</strong> / <strong>has resulted in</strong> / <strong>resulting in</strong> (skutek)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#C2571A]/25 bg-[#FDF2EB]/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C2571A] mb-2">
                      + PEŁNE ZDANIE, BEZOKOLICZNIK i PORÓWNANIA
                    </p>
                    <ul className="space-y-1.5 text-sm text-[#18181B]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>because</strong> + zdanie  |  <strong>so</strong> / <strong>Therefore,</strong> + zdanie</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>in order to</strong> + bezokolicznik (cel)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>fewer</strong> + policzalne (stores) vs <strong>less</strong> + niepoliczalne (money)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Ćwiczenie 4.5 — Łączniki przyczyny i skutku (due to, result in, in order to) + Porównania"
                  subtitle="Na podstawie tabeli ze str. 46 i Review str. 107."
                  questions={[...UNIT4_REVIEW_REPORTING, ...comparisonTopic.exercises]}
                  onComplete={(c, t) => onScoreSave('u4-reporting', c, t)}
                />
              </div>
            </div>
          )}

          {/* ================= TAB 5: FISZKI Z LISTY ================= */}
          {section === 'flashcards' && (
            <VocabView srs={srs} onRate={onRateCard} initialUnit="Moja lista" />
          )}
        </>
      )}
    </div>
  );
}

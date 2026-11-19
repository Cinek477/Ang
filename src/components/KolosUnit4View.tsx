import { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, Eye, EyeOff, Flame, Volume2 } from 'lucide-react';
import {
  PEST_CHEATSHEET,
  UNIT4_REVIEW_COLLOCATIONS,
  UNIT4_REVIEW_REPORTING,
  UNIT4_REVIEW_WORD_BUILDING,
  UNIT4_WORD_BUILDING,
} from '../data/unit4';
import { OTHER_UNITS_REVIEWS } from '../data/unitsReview';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { speakEnglish } from '../utils/storage';
import { ExerciseList } from './ExerciseList';

interface KolosUnit4ViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
  initialUnit?: 1 | 2 | 3 | 4 | 5;
}

type KolosSection = 'word-building' | 'collocations' | 'pest-modals' | 'reporting';

export function KolosUnit4View({ onScoreSave, initialUnit = 4 }: KolosUnit4ViewProps) {
  const [activeUnit, setActiveUnit] = useState<1 | 2 | 3 | 4 | 5>(initialUnit);
  const [section, setSection] = useState<KolosSection>('word-building');
  const [quizMode, setQuizMode] = useState(false);
  const [revealedRows, setRevealedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveUnit(initialUnit);
  }, [initialUnit]);

  const modalTopic = GRAMMAR_TOPICS.find((t) => t.id === 'modal-verbs-u4')!;

  const unitTabs: { num: 1 | 2 | 3 | 4 | 5; label: string; isKolos?: boolean }[] = [
    { num: 1, label: 'Unit 1: Organisation' },
    { num: 2, label: 'Unit 2: Brands' },
    { num: 3, label: 'Unit 3: Job Hunting' },
    { num: 4, label: 'Unit 4: Strategy (KOLOS)', isKolos: true },
    { num: 5, label: 'Unit 5: Logistics' },
  ];

  const u4Tabs: { id: KolosSection; label: string; tag: string }[] = [
    { id: 'word-building', label: 'Word Building (str. 39 & 107)', tag: '4.1' },
    { id: 'collocations', label: 'Kolokacje biznesowe', tag: '4.1' },
    { id: 'pest-modals', label: 'PEST + Modal Verbs', tag: '4.2' },
    { id: 'reporting', label: 'Reasons & Results', tag: '4.5' },
  ];

  const otherBundle = activeUnit !== 4 ? OTHER_UNITS_REVIEWS[activeUnit] : null;

  return (
    <div className="space-y-6">
      {/* Unit 1–5 Switcher */}
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

      {/* ================= UNIT 4 (KOLOS PRIORITY) ================= */}
      {activeUnit === 4 && (
        <>
          <div className="rounded-2xl border border-[#C2571A]/25 bg-[#FDF2EB] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C2571A]">
                  <Flame className="h-3.5 w-3.5" />
                  Szybka powtórka na kolokwium · Business Partner B1
                </div>
                <h2 className="mt-1 text-xl font-extrabold text-[#18181B]">Unit 4: Business Strategy</h2>
                <p className="mt-0.5 text-sm text-[#5C5C66]">
                  Przerób po kolei 4 zakładki poniżej — to 100% materiału z Unit 4 i Review (str. 107).
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {u4Tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSection(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                    section === t.id
                      ? 'bg-[#C2571A] text-white shadow-xs'
                      : 'bg-white text-[#18181B] border border-[#E6E4DD] hover:border-[#C2571A]/40'
                  }`}
                >
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[11px] ${
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

          {section === 'word-building' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-[#18181B]">
                      Tabela Word Building (str. 39, zad. 7) — 13 rodzin wyrazów
                    </h3>
                    <p className="text-xs text-[#5C5C66]">
                      Zwróć szczególną uwagę na żółte ostrzeżenia (najczęstsze pomyłki na kolokwiach!).
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

          {section === 'collocations' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-2">
                  Bank kolokacji z Unit 4.1 (zapamiętaj pary!)
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
                    ['take risks', 'podejmować ryzyko'],
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
            </div>
          )}

          {section === 'pest-modals' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-1">
                  4.2 PEST Analysis — ściągawka z podręcznika (str. 40)
                </h3>
                <p className="text-xs text-[#5C5C66] mb-4">
                  Pamiętaj kolejność działań po zebraniu danych: 1. Prioritise the most relevant factors → 2. Identify opportunities & risks → 3. Come up with a strategy.
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
                  title="Review 4.2 — Modal Verbs (must / have to / mustn't / don't have to / should)"
                  subtitle="Zadania z Review str. 107 i lekcji 4.2 (str. 41)."
                  questions={modalTopic.exercises}
                  onComplete={(c, t) => onScoreSave('u4-modals', c, t)}
                />
              </div>
            </div>
          )}

          {section === 'reporting' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <h3 className="text-base font-bold text-[#18181B] mb-3">
                  4.5 Reporting Problems, Reasons & Results — złota reguła składniowa
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
                      + PEŁNE ZDANIE lub BEZOKOLICZNIK
                    </p>
                    <ul className="space-y-1.5 text-sm text-[#18181B]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>because</strong> + zdanie (przyczyna)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>so</strong> / <strong>Therefore,</strong> / <strong>As a result,</strong> + zdanie (skutek)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#C2571A] shrink-0" />
                        <span><strong>in order to</strong> + bezokolicznik (cel)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
                <ExerciseList
                  title="Ćwiczenie 4.5 — Wybierz poprawny łącznik"
                  subtitle="Na podstawie tabeli ze str. 46 i Review str. 107."
                  questions={UNIT4_REVIEW_REPORTING}
                  onComplete={(c, t) => onScoreSave('u4-reporting', c, t)}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

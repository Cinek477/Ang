import { useMemo, useState } from 'react';
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
  ALL_WORD_FAMILIES,
  SUFFIX_CHEATSHEET,
  WORD_FORMATION_DRILLS,
  type WFDrillQuestion,
  type WordFamilyEntry,
} from '../data/wordFormation';
import { normalizeAnswer, speakEnglish } from '../utils/storage';
import { ExerciseList } from './ExerciseList';

interface WordFormationViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
}

type WFSubTab = 'table-test' | 'drill' | 'table' | 'rules';
type DrillFilter = 'All' | WFDrillQuestion['group'];
type CellField = 'verb' | 'noun' | 'adjective';

function cellMatches(input: string, expectedField: string): boolean {
  const norm = normalizeAnswer(input);
  if (!norm) return false;
  const accepted = expectedField
    .split(',')
    .map((s) => normalizeAnswer(s.replace(/\(.*?\)/g, '')))
    .filter(Boolean);
  return accepted.includes(norm);
}

export function WordFormationView({ onScoreSave }: WordFormationViewProps) {
  const [subTab, setSubTab] = useState<WFSubTab>('table-test');
  const [groupFilter, setGroupFilter] = useState<DrillFilter>('Unit 4 · KOLOS');
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [quickTen, setQuickTen] = useState(false);

  // Interactive Fill-in-the-Table Test states
  const [tableTestTag, setTableTestTag] = useState<'Unit 4 · KOLOS' | 'All'>('Unit 4 · KOLOS');
  const [tableTestSeed, setTableTestSeed] = useState(1);
  const [cellInputs, setCellInputs] = useState<Record<string, string>>({});
  const [tableChecked, setTableChecked] = useState(false);

  // Reference Table states
  const [tableFilter, setTableFilter] = useState<'All' | 'Unit 4 · KOLOS' | 'Unit 5' | 'Units 1–3' | 'AGH B2'>('All');
  const [hideAnswers, setHideAnswers] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  // Build 8-row fill-in-the-table test where 1 column is given and remaining valid columns are inputs
  const tableTestRows = useMemo(() => {
    const pool =
      tableTestTag === 'All'
        ? ALL_WORD_FAMILIES
        : ALL_WORD_FAMILIES.filter((r) => r.tag === tableTestTag);

    const copy = [...pool];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(((Math.sin(tableTestSeed * 73 + i * 19) + 1) / 2) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy.slice(0, 8).map((row, idx): { row: WordFamilyEntry; given: CellField } => {
      const available: CellField[] = (['verb', 'noun', 'adjective'] as CellField[]).filter(
        (f) => row[f] && row[f] !== '-'
      );
      const given = available[(idx + tableTestSeed) % available.length] ?? 'verb';
      return { row, given };
    });
  }, [tableTestTag, tableTestSeed]);

  const tableStats = useMemo(() => {
    let total = 0;
    let correct = 0;
    for (const { row, given } of tableTestRows) {
      for (const f of ['verb', 'noun', 'adjective'] as CellField[]) {
        if (f === given || row[f] === '-') continue;
        total++;
        const key = `${row.id}-${f}`;
        if (cellMatches(cellInputs[key] ?? '', row[f])) correct++;
      }
    }
    return { total, correct };
  }, [tableTestRows, cellInputs]);

  const drillQuestions = useMemo(() => {
    const base =
      groupFilter === 'All'
        ? WORD_FORMATION_DRILLS
        : WORD_FORMATION_DRILLS.filter((q) => q.group === groupFilter);

    if (shuffleSeed === 0 && !quickTen) return base;

    const copy = [...base];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(((Math.sin(shuffleSeed * 97 + i * 31) + 1) / 2) * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return quickTen ? copy.slice(0, 10) : copy;
  }, [groupFilter, shuffleSeed, quickTen]);

  const filteredTable = useMemo(() => {
    if (tableFilter === 'All') return ALL_WORD_FAMILIES;
    return ALL_WORD_FAMILIES.filter((r) => r.tag === tableFilter);
  }, [tableFilter]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#0D6B48]/25 bg-gradient-to-br from-[#ECF7F2] via-white to-[#FDF2EB]/50 p-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0D6B48] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <Sparkles className="h-3 w-3" />
            Słowotwórstwo · Word Formation
          </span>
          <h2 className="mt-1.5 text-xl font-extrabold text-[#18181B]">
            Tworzenie czasowników, rzeczowników, przymiotników i przysłówków
          </h2>
          <p className="mt-0.5 text-sm text-[#5C5C66]">
            {ALL_WORD_FAMILIES.length} rodzin wyrazów · interaktywna tabela do wypełnienia (jak na kartkówce), 30 zdań z lukami i ściągawka końcówek.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { id: 'table-test' as WFSubTab, label: 'Wypełnij tabelę (jak na kolosie)', icon: Table2 },
            { id: 'drill' as WFSubTab, label: 'Zdania z lukami (30)', icon: Sparkles },
            { id: 'table' as WFSubTab, label: `Pełna tabela (${ALL_WORD_FAMILIES.length} rodzin)`, icon: BookOpen },
            { id: 'rules' as WFSubTab, label: 'Ściągawka końcówek', icon: AlertTriangle },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSubTab(t.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  subTab === t.id
                    ? 'bg-[#18181B] text-white shadow-xs'
                    : 'border border-[#E6E4DD] bg-white text-[#5C5C66] hover:text-[#18181B]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB 0: INTERACTIVE FILL-IN-THE-TABLE TEST */}
      {subTab === 'table-test' && (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-[#18181B]">
                Kartkówka z tabeli: wpisz brakujące formy (Verb / Noun / Adjective)
              </h3>
              <p className="text-xs text-[#5C5C66]">
                Jedna forma w wierszu jest podana — wpisz pozostałe (wystarczy jedna poprawna forma, jeśli jest kilka).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] p-0.5">
                {(['Unit 4 · KOLOS', 'All'] as const).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setTableTestTag(tag);
                      setCellInputs({});
                      setTableChecked(false);
                    }}
                    className={`rounded-md px-2.5 py-1 text-xs font-bold cursor-pointer ${
                      tableTestTag === tag ? 'bg-white text-[#18181B] shadow-2xs' : 'text-[#5C5C66]'
                    }`}
                  >
                    {tag === 'All' ? 'Wszystkie (45)' : 'Unit 4 · KOLOS'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setTableTestSeed((s) => s + 1);
                  setCellInputs({});
                  setTableChecked(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#C2571A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#A64813] cursor-pointer"
              >
                <Shuffle className="h-3.5 w-3.5" />
                Wylosuj nową tabelę (8 wierszy)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6E4DD] text-xs uppercase tracking-wider text-[#71717A]">
                  <th className="py-2.5 pr-3 font-semibold">Verb (czasownik)</th>
                  <th className="py-2.5 px-3 font-semibold">Noun (rzeczownik)</th>
                  <th className="py-2.5 px-3 font-semibold">Adjective (przymiotnik)</th>
                  <th className="py-2.5 pl-3 font-semibold">Znaczenie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EFE9]">
                {tableTestRows.map(({ row, given }) => (
                  <tr key={row.id}>
                    {(['verb', 'noun', 'adjective'] as CellField[]).map((field) => {
                      const val = row[field];
                      if (val === '-') {
                        return (
                          <td key={field} className="py-3 px-2 font-mono text-xs text-[#A1A1AA]">
                            —
                          </td>
                        );
                      }
                      if (field === given) {
                        return (
                          <td key={field} className="py-3 px-2 font-mono text-[13px] font-bold text-[#18181B]">
                            <span className="rounded-md bg-[#F4F3EE] px-2.5 py-1">{val}</span>
                          </td>
                        );
                      }
                      const key = `${row.id}-${field}`;
                      const userVal = cellInputs[key] ?? '';
                      const ok = cellMatches(userVal, val);

                      return (
                        <td key={field} className="py-2.5 px-2">
                          <input
                            type="text"
                            value={userVal}
                            onChange={(e) =>
                              setCellInputs((prev) => ({ ...prev, [key]: e.target.value }))
                            }
                            placeholder={`Wpisz ${field}...`}
                            className={`w-full min-w-[130px] rounded-lg border px-2.5 py-1.5 font-mono text-xs outline-none ${
                              tableChecked
                                ? ok
                                  ? 'border-[#0D6B48] bg-[#ECF7F2]/60 text-[#0D6B48] font-semibold'
                                  : 'border-red-400 bg-red-50/60 text-red-700'
                                : 'border-[#D8D5CC] bg-white focus:border-[#0D6B48]'
                            }`}
                          />
                          {tableChecked && !ok && (
                            <p className="mt-1 font-mono text-[11px] font-semibold text-[#0D6B48]">
                              ✓ {val}
                            </p>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-3 pl-3 text-xs text-[#5C5C66]">{row.pl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setTableChecked(true);
                  onScoreSave('wf-table-test', tableStats.correct, tableStats.total);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0D6B48] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0A5539] cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                Sprawdź tabelę
              </button>
              <button
                type="button"
                onClick={() => {
                  setCellInputs({});
                  setTableChecked(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6E4DD] bg-white px-3.5 py-2.5 text-sm font-medium text-[#5C5C66] hover:bg-[#F4F3EE] cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Wyczyść
              </button>
            </div>
            {tableChecked && (
              <span className="rounded-full bg-[#ECF7F2] px-3.5 py-1.5 text-sm font-bold text-[#0D6B48]">
                Wynik: {tableStats.correct} / {tableStats.total} (
                {Math.round((tableStats.correct / Math.max(1, tableStats.total)) * 100)}%)
              </span>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 1: DRILL */}
      {subTab === 'drill' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E4DD] bg-white p-4">
            <div className="flex flex-wrap gap-1.5">
              {(['Unit 4 · KOLOS', 'Unit 5', 'AGH B2', 'All'] as DrillFilter[]).map((g) => {
                const active = groupFilter === g && !quickTen;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGroupFilter(g);
                      setQuickTen(false);
                      setShuffleSeed(0);
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? g === 'Unit 4 · KOLOS'
                          ? 'bg-[#C2571A] text-white'
                          : 'bg-[#0D6B48] text-white'
                        : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9]'
                    }`}
                  >
                    {g === 'Unit 4 · KOLOS' && <Flame className="h-3 w-3" />}
                    {g === 'All' ? `Wszystkie (${WORD_FORMATION_DRILLS.length})` : g}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setGroupFilter('All');
                setQuickTen(true);
                setShuffleSeed((s) => s + 1);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#C2571A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#A64813] transition-colors cursor-pointer"
            >
              <Shuffle className="h-3.5 w-3.5" />
              Wylosuj szybki test (10 zdań)
            </button>
          </div>

          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
            <ExerciseList
              key={`${groupFilter}-${quickTen}-${shuffleSeed}`}
              title={
                quickTen
                  ? 'Szybki losowy test słowotwórstwa (10 zdań ze wszystkich działów)'
                  : `Słowotwórstwo: ${groupFilter === 'All' ? 'Wszystkie działy' : groupFilter}`
              }
              subtitle="Utwórz odpowiednią część mowy od wyrazu podanego WIELKIMI LITERAMI. Naciśnij Enter, żeby od razu sprawdzić pojedyncze zdanie."
              questions={drillQuestions}
              onComplete={(c, t) => onScoreSave(`wf-${groupFilter}`, c, t)}
            />
          </div>
        </div>
      )}

      {/* SUBTAB 2: WORD FAMILIES TABLE */}
      {subTab === 'table' && (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Unit 4 · KOLOS', 'Unit 5', 'Units 1–3', 'AGH B2'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTableFilter(t)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    tableFilter === t
                      ? 'bg-[#0D6B48] text-white'
                      : 'bg-[#F8F7F4] text-[#5C5C66] hover:bg-[#F0EFE9]'
                  }`}
                >
                  {t === 'All' ? `Wszystkie (${ALL_WORD_FAMILIES.length})` : t}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setHideAnswers((v) => !v);
                setRevealed({});
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold cursor-pointer ${
                hideAnswers
                  ? 'border-[#0D6B48] bg-[#ECF7F2] text-[#0D6B48]'
                  : 'border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B]'
              }`}
            >
              {hideAnswers ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {hideAnswers ? 'Tryb nauki (kliknij wiersz, aby odkryć)' : 'Ukryj formy pochodne'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6E4DD] text-xs uppercase tracking-wider text-[#71717A]">
                  <th className="py-2.5 pr-3 font-semibold">Rdzeń</th>
                  <th className="py-2.5 px-3 font-semibold">Verb</th>
                  <th className="py-2.5 px-3 font-semibold">Noun</th>
                  <th className="py-2.5 px-3 font-semibold">Adjective</th>
                  <th className="py-2.5 px-3 font-semibold">Adverb</th>
                  <th className="py-2.5 pl-3 font-semibold">Znaczenie & pułapki</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EFE9]">
                {filteredTable.map((row) => {
                  const hidden = hideAnswers && !revealed[row.id];
                  return (
                    <tr
                      key={row.id}
                      onClick={() =>
                        hideAnswers && setRevealed((p) => ({ ...p, [row.id]: !p[row.id] }))
                      }
                      className={hideAnswers ? 'cursor-pointer hover:bg-[#F8F7F4]' : ''}
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakEnglish(`${row.verb !== '-' ? row.verb : ''}, ${row.noun}`);
                            }}
                            className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                            title="Wymowa"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#C2571A]">{row.root}</span>
                        </div>
                        <span className="mt-0.5 inline-block text-[10px] text-[#71717A]">{row.tag}</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[13px] text-[#18181B]">
                        {hidden ? (
                          <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                            {row.verb}
                          </span>
                        ) : (
                          row.verb
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-[13px] font-medium text-[#0D6B48]">
                        {hidden ? (
                          <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                            {row.noun}
                          </span>
                        ) : (
                          row.noun
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-[13px] text-[#18181B]">
                        {hidden ? (
                          <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                            {row.adjective}
                          </span>
                        ) : (
                          row.adjective
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono text-[13px] text-[#5C5C66]">
                        {hidden && row.adverb ? (
                          <span className="rounded bg-[#E6E4DD] px-2 py-0.5 text-transparent select-none">
                            {row.adverb}
                          </span>
                        ) : (
                          row.adverb ?? '—'
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
      )}

      {/* SUBTAB 3: SUFFIXES & PREFIXES CHEATSHEET */}
      {subTab === 'rules' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {SUFFIX_CHEATSHEET.map((block) => (
            <div key={block.pos} className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#0D6B48]" />
                <h3 className="text-base font-extrabold text-[#18181B]">{block.pos}</h3>
              </div>
              <p className="rounded-xl bg-[#F8F7F4] p-3 text-xs leading-relaxed text-[#5C5C66] border border-[#E6E4DD]">
                <strong className="text-[#18181B]">Kiedy wpisać?</strong> {block.when}
              </p>
              <ul className="space-y-1.5 text-sm text-[#18181B] list-disc pl-5">
                {block.suffixes.map((s) => (
                  <li key={s} className="leading-relaxed">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

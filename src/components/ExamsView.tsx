import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, FileText, Play, RotateCcw, XCircle } from 'lucide-react';
import { AGH_EXAMS } from '../data/exams';
import { isAnswerCorrect } from '../utils/storage';
import { ExerciseList } from './ExerciseList';

interface ExamsViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
}

type ExamSection = 'reading1' | 'reading2' | 'language' | 'grammar';

export function ExamsView({ onScoreSave }: ExamsViewProps) {
  const [examId, setExamId] = useState(AGH_EXAMS[0].id);
  const [section, setSection] = useState<ExamSection>('reading1');
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);

  // Reading 1 states
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean | undefined>>({});
  const [synAnswers, setSynAnswers] = useState<Record<string, string>>({});
  const [r1Checked, setR1Checked] = useState(false);

  // Reading 2 states
  const [gapAnswers, setGapAnswers] = useState<Record<number, string>>({});
  const [r2Checked, setR2Checked] = useState(false);

  const exam = AGH_EXAMS.find((e) => e.id === examId) ?? AGH_EXAMS[0];

  useEffect(() => {
    if (!timerActive) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerActive]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const switchExam = (id: string) => {
    setExamId(id);
    setTfAnswers({});
    setSynAnswers({});
    setR1Checked(false);
    setGapAnswers({});
    setR2Checked(false);
  };

  return (
    <div className="space-y-5">
      {/* Exam Selector & Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E4DD] bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {AGH_EXAMS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => switchExam(e.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors cursor-pointer ${
                e.id === exam.id
                  ? 'bg-[#0D6B48] text-white'
                  : 'border border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B] hover:bg-[#F0EFE9]'
              }`}
            >
              <FileText className="h-4 w-4" />
              {e.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] px-3 py-1.5 font-mono text-sm font-semibold text-[#18181B]">
            <Clock className="h-4 w-4 text-[#C2571A]" />
            {formatTime(secondsLeft)}
          </div>
          <button
            type="button"
            onClick={() => setTimerActive((v) => !v)}
            className="inline-flex items-center gap-1 rounded-xl border border-[#E6E4DD] bg-white px-3 py-1.5 text-xs font-semibold text-[#18181B] hover:bg-[#F4F3EE] cursor-pointer"
          >
            <Play className="h-3.5 w-3.5" />
            {timerActive ? 'Pauza' : 'Start'}
          </button>
          <button
            type="button"
            onClick={() => {
              setTimerActive(false);
              setSecondsLeft(45 * 60);
            }}
            className="rounded-xl border border-[#E6E4DD] bg-white p-1.5 text-[#71717A] hover:bg-[#F4F3EE] cursor-pointer"
            title="Reset timera"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'reading1' as ExamSection, label: 'Reading I (T/F + Synonimy)' },
          { id: 'reading2' as ExamSection, label: 'Reading II (Dobieranie zdań)' },
          { id: 'language' as ExamSection, label: 'Language Elements (MC + Word Form + Cloze)' },
          { id: 'grammar' as ExamSection, label: `Grammar (${exam.grammar.length} pytań)` },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSection(t.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
              section === t.id
                ? 'bg-[#18181B] text-white'
                : 'border border-[#E6E4DD] bg-white text-[#5C5C66] hover:text-[#18181B]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Reading 1 */}
      {section === 'reading1' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-4">
            <h3 className="text-base font-extrabold text-[#18181B]">{exam.reading1.title}</h3>
            {exam.reading1.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-[#27272A]">
                <span className="mr-1.5 rounded bg-[#F4F3EE] px-1.5 py-0.5 font-mono text-[11px] font-bold text-[#71717A]">
                  P{idx + 1}
                </span>
                {p}
              </p>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#18181B]">Task 1: True or False?</h4>
              {exam.reading1.trueFalse.map((q, i) => {
                const picked = tfAnswers[q.id];
                const correct = picked === q.answer;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border p-3 text-sm space-y-2 ${
                      r1Checked
                        ? correct
                          ? 'border-[#0D6B48]/40 bg-[#ECF7F2]/40'
                          : 'border-red-300 bg-red-50/40'
                        : 'border-[#E6E4DD]'
                    }`}
                  >
                    <p className="text-[#18181B]">
                      <span className="font-mono text-xs text-[#71717A] mr-1.5">{i + 1}.</span>
                      {q.statement}
                    </p>
                    <div className="flex gap-2">
                      {[true, false].map((val) => (
                        <button
                          key={String(val)}
                          type="button"
                          onClick={() => setTfAnswers((prev) => ({ ...prev, [q.id]: val }))}
                          className={`rounded-lg border px-3 py-1 text-xs font-bold cursor-pointer ${
                            picked === val
                              ? 'border-[#0D6B48] bg-[#0D6B48] text-white'
                              : 'border-[#E6E4DD] bg-[#F8F7F4] text-[#5C5C66]'
                          }`}
                        >
                          {val ? 'TRUE' : 'FALSE'}
                        </button>
                      ))}
                    </div>
                    {r1Checked && <p className="text-xs text-[#5C5C66]">{q.explanation}</p>}
                  </div>
                );
              })}

              <h4 className="pt-2 text-sm font-bold text-[#18181B]">Task 2: Find synonyms in the text</h4>
              {exam.reading1.synonyms.map((s) => {
                const val = synAnswers[s.id] ?? '';
                const ok = isAnswerCorrect(val, s.answers);
                return (
                  <div key={s.id} className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#5C5C66]">{s.clue}</label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => setSynAnswers((prev) => ({ ...prev, [s.id]: e.target.value }))}
                      placeholder="Słowo z tekstu..."
                      className={`w-full rounded-lg border px-3 py-1.5 text-sm outline-none ${
                        r1Checked
                          ? ok
                            ? 'border-[#0D6B48] bg-[#ECF7F2]/40'
                            : 'border-red-400 bg-red-50/40'
                          : 'border-[#D8D5CC] focus:border-[#0D6B48]'
                      }`}
                    />
                    {r1Checked && (
                      <p className="text-xs text-[#5C5C66]">
                        {!ok && (
                          <strong className="text-[#0D6B48] mr-1">Klucz: {s.answers[0]} ·</strong>
                        )}
                        {s.explanation}
                      </p>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setR1Checked(true);
                  const tfOk = exam.reading1.trueFalse.filter((q) => tfAnswers[q.id] === q.answer).length;
                  const synOk = exam.reading1.synonyms.filter((s) =>
                    isAnswerCorrect(synAnswers[s.id] ?? '', s.answers)
                  ).length;
                  onScoreSave(
                    `${exam.id}-r1`,
                    tfOk + synOk,
                    exam.reading1.trueFalse.length + exam.reading1.synonyms.length
                  );
                }}
                className="w-full rounded-xl bg-[#0D6B48] py-2.5 text-sm font-bold text-white hover:bg-[#0A5539] cursor-pointer"
              >
                Sprawdź Reading Part I
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading 2 */}
      {section === 'reading2' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-4">
            <h3 className="text-base font-extrabold text-[#18181B]">{exam.reading2.title}</h3>
            {exam.reading2.paragraphs.map((p, idx) => (
              <p key={idx} className="text-sm leading-relaxed text-[#27272A]">
                {p}
              </p>
            ))}

            <div className="pt-2 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Wybierz literę (A–F) dla każdej luki
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
                {Object.keys(exam.reading2.answers).map((numStr) => {
                  const num = Number(numStr);
                  const picked = gapAnswers[num] ?? '';
                  const correctLetter = exam.reading2.answers[num].letter;
                  const ok = picked === correctLetter;
                  return (
                    <div
                      key={num}
                      className={`rounded-xl border p-2.5 ${
                        r2Checked
                          ? ok
                            ? 'border-[#0D6B48] bg-[#ECF7F2]/50'
                            : 'border-red-300 bg-red-50/50'
                          : 'border-[#E6E4DD] bg-[#F8F7F4]'
                      }`}
                    >
                      <label className="block font-mono text-xs font-bold text-[#71717A] mb-1">
                        Gap ({num})
                      </label>
                      <select
                        value={picked}
                        onChange={(e) =>
                          setGapAnswers((prev) => ({ ...prev, [num]: e.target.value }))
                        }
                        className="w-full rounded-lg border border-[#D8D5CC] bg-white px-2 py-1 text-sm font-bold outline-none focus:border-[#0D6B48]"
                      >
                        <option value="">—</option>
                        {exam.reading2.sentences.map((s) => (
                          <option key={s.letter} value={s.letter}>
                            {s.letter}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  setR2Checked(true);
                  const keys = Object.keys(exam.reading2.answers).map(Number);
                  const ok = keys.filter((k) => gapAnswers[k] === exam.reading2.answers[k].letter).length;
                  onScoreSave(`${exam.id}-r2`, ok, keys.length);
                }}
                className="rounded-xl bg-[#0D6B48] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0A5539] cursor-pointer"
              >
                Sprawdź Reading Part II
              </button>

              {r2Checked && (
                <div className="space-y-2 pt-2">
                  {Object.entries(exam.reading2.answers).map(([num, info]) => {
                    const ok = gapAnswers[Number(num)] === info.letter;
                    return (
                      <div key={num} className="flex items-start gap-2 text-xs">
                        {ok ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D6B48]" />
                        ) : (
                          <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                        )}
                        <p className="text-[#5C5C66]">
                          <strong className="text-[#18181B]">({num}) → {info.letter}:</strong> {info.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3 h-fit">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Zdania do dopasowania (jedna litera jest zbędna!)
            </h4>
            {exam.reading2.sentences.map((s) => (
              <div key={s.letter} className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-3 text-sm">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#18181B] font-mono text-xs font-bold text-white">
                  {s.letter}
                </span>
                <span className="text-[#18181B]">{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Language Elements */}
      {section === 'language' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
            <ExerciseList
              key={`${exam.id}-mc`}
              title="Part 1: Multiple Choice"
              subtitle="Wybierz poprawną odpowiedź pasującą do luki."
              questions={exam.multipleChoice}
              onComplete={(c, t) => onScoreSave(`${exam.id}-mc`, c, t)}
            />
          </div>

          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
            <ExerciseList
              key={`${exam.id}-wf`}
              title="Part 2: Word Formation"
              subtitle="Utwórz właściwą część mowy od podanego wyrazu."
              questions={exam.wordFormation}
              onComplete={(c, t) => onScoreSave(`${exam.id}-wf`, c, t)}
            />
          </div>

          {exam.openCloze && (
            <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-4">
              <div className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4 text-sm leading-relaxed text-[#18181B]">
                {exam.openCloze.text}
              </div>
              <ExerciseList
                key={`${exam.id}-oc`}
                title="Part 3: Open Cloze (1 word per gap)"
                questions={exam.openCloze.gaps}
                onComplete={(c, t) => onScoreSave(`${exam.id}-oc`, c, t)}
              />
            </div>
          )}
        </div>
      )}

      {/* Grammar */}
      {section === 'grammar' && (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
          <ExerciseList
            key={`${exam.id}-gram`}
            title={`Grammar (${exam.title})`}
            subtitle="Wpisz poprawną formę czasownika lub 1–2 brakujące słowa."
            questions={exam.grammar}
            onComplete={(c, t) => onScoreSave(`${exam.id}-gram`, c, t)}
          />
        </div>
      )}
    </div>
  );
}

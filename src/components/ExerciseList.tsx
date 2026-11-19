import { useState } from 'react';
import { CheckCircle2, Eye, RotateCcw, XCircle } from 'lucide-react';
import type { GapQuestion } from '../data/types';
import { isAnswerCorrect } from '../utils/storage';

interface ExerciseListProps {
  title?: string;
  subtitle?: string;
  questions: GapQuestion[];
  onComplete?: (correct: number, total: number) => void;
}

export function ExerciseList({ title, subtitle, questions, onComplete }: ExerciseListProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const correctCount = questions.filter((q) => isAnswerCorrect(answers[q.id] ?? '', q.answers)).length;

  const handleCheck = () => {
    setChecked(true);
    onComplete?.(correctCount, questions.length);
  };

  const handleReset = () => {
    setAnswers({});
    setChecked(false);
    setRevealed({});
  };

  return (
    <div className="space-y-4">
      {(title || subtitle) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            {title && <h3 className="text-base font-bold text-[#18181B]">{title}</h3>}
            {subtitle && <p className="text-sm text-[#5C5C66]">{subtitle}</p>}
          </div>
          {checked && (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ECF7F2] px-3 py-1 text-sm font-semibold text-[#0D6B48]">
              Wynik: {correctCount} / {questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
            </div>
          )}
        </div>
      )}

      <div className="space-y-3">
        {questions.map((q, idx) => {
          const val = answers[q.id] ?? '';
          const correct = isAnswerCorrect(val, q.answers);
          const showResult = checked || revealed[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-xl border p-4 transition-colors ${
                showResult
                  ? correct
                    ? 'border-[#0D6B48]/40 bg-[#ECF7F2]/40'
                    : 'border-red-300 bg-red-50/40'
                  : 'border-[#E6E4DD] bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2.5">
                  <div className="flex flex-wrap items-baseline gap-2 text-[15px] leading-relaxed text-[#18181B]">
                    <span className="font-mono text-xs font-semibold text-[#71717A]">{idx + 1}.</span>
                    <span>{q.prompt}</span>
                    {q.hint && (
                      <span className="rounded bg-[#F4F3EE] px-2 py-0.5 font-mono text-xs font-semibold text-[#C2571A]">
                        {q.hint}
                      </span>
                    )}
                  </div>

                  {q.options ? (
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => {
                        const selected = val === opt;
                        const optIsRight = isAnswerCorrect(opt, q.answers);
                        let btnStyle = 'border-[#E6E4DD] bg-[#F8F7F4] text-[#18181B] hover:border-[#0D6B48]/50';
                        if (showResult) {
                          if (optIsRight) {
                            btnStyle = 'border-[#0D6B48] bg-[#0D6B48] text-white';
                          } else if (selected && !optIsRight) {
                            btnStyle = 'border-red-500 bg-red-600 text-white';
                          }
                        } else if (selected) {
                          btnStyle = 'border-[#0D6B48] bg-[#ECF7F2] text-[#0D6B48] font-semibold';
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setAnswers((prev) => ({ ...prev, [q.id]: opt }));
                            }}
                            className={`rounded-lg border px-3 py-1.5 text-sm transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setRevealed((prev) => ({ ...prev, [q.id]: true }));
                          }
                        }}
                        placeholder="Wpisz odpowiedź..."
                        className="w-full max-w-xs rounded-lg border border-[#D8D5CC] bg-white px-3 py-1.5 text-sm text-[#18181B] outline-none focus:border-[#0D6B48] focus:ring-2 focus:ring-[#0D6B48]/15"
                      />
                      {!showResult && (
                        <button
                          type="button"
                          onClick={() => setRevealed((prev) => ({ ...prev, [q.id]: true }))}
                          className="inline-flex items-center gap-1 rounded-lg border border-[#E6E4DD] px-2.5 py-1.5 text-xs font-medium text-[#5C5C66] hover:bg-[#F4F3EE] cursor-pointer"
                          title="Sprawdź to zdanie"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Sprawdź
                        </button>
                      )}
                    </div>
                  )}

                  {showResult && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg bg-white/80 p-2.5 text-xs leading-relaxed border border-[#E6E4DD]/80">
                      {correct ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6B48]" />
                      ) : (
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                      )}
                      <div>
                        {!correct && (
                          <p className="font-semibold text-[#18181B] mb-0.5">
                            Poprawna odpowiedź:{' '}
                            <span className="font-mono text-[#0D6B48]">{q.answers[0]}</span>
                          </p>
                        )}
                        <p className="text-[#5C5C66]">{q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleCheck}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0D6B48] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0A5539] transition-colors cursor-pointer"
        >
          <CheckCircle2 className="h-4 w-4" />
          Sprawdź wszystkie ({questions.length})
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E6E4DD] bg-white px-4 py-2.5 text-sm font-medium text-[#5C5C66] hover:bg-[#F4F3EE] transition-colors cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          Wyczyść
        </button>
      </div>
    </div>
  );
}

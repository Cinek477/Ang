import { useState } from 'react';
import { AlertCircle, BookOpen, Flame } from 'lucide-react';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { ExerciseList } from './ExerciseList';

interface GrammarViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
}

export function GrammarView({ onScoreSave }: GrammarViewProps) {
  const [selectedId, setSelectedId] = useState(GRAMMAR_TOPICS[0].id);
  const topic = GRAMMAR_TOPICS.find((t) => t.id === selectedId) ?? GRAMMAR_TOPICS[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Sidebar Topic List */}
      <div className="lg:col-span-4 space-y-2.5">
        <p className="px-1 text-xs font-bold uppercase tracking-wider text-[#71717A]">
          Działy gramatyczne
        </p>
        {GRAMMAR_TOPICS.map((t) => {
          const active = t.id === topic.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                active
                  ? 'border-[#0D6B48] bg-[#ECF7F2]/60 shadow-2xs'
                  : 'border-[#E6E4DD] bg-white hover:border-[#0D6B48]/35'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${
                    t.isKolosPriority
                      ? 'bg-[#C2571A] text-white'
                      : 'bg-[#F4F3EE] text-[#5C5C66]'
                  }`}
                >
                  {t.isKolosPriority && <Flame className="h-3 w-3" />}
                  {t.unitTag}
                </span>
                <span className="text-xs text-[#71717A]">{t.exercises.length} zadań</span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-[#18181B]">{t.title}</h3>
              <p className="mt-0.5 text-xs text-[#5C5C66] line-clamp-2">{t.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="lg:col-span-8 space-y-6">
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-5">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F3EE] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#5C5C66]">
              <BookOpen className="h-3.5 w-3.5 text-[#0D6B48]" />
              {topic.unitTag}
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-[#18181B]">{topic.title}</h2>
            <p className="text-sm text-[#5C5C66]">{topic.subtitle}</p>
          </div>

          <div className="space-y-4">
            {topic.rules.map((r) => (
              <div key={r.title} className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="font-bold text-[#18181B] text-sm">{r.title}</h4>
                  <code className="rounded-md bg-white border border-[#E6E4DD] px-2.5 py-1 text-xs font-semibold text-[#0D6B48]">
                    {r.formula}
                  </code>
                </div>
                <p className="text-sm leading-relaxed text-[#5C5C66]">{r.usage}</p>
                <ul className="space-y-1 text-sm text-[#18181B] pl-4 list-disc">
                  {r.examples.map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
                {r.watchOut && (
                  <div className="flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
                    <span>
                      <strong>Uwaga na egzaminie:</strong> {r.watchOut}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
          <ExerciseList
            key={topic.id}
            title={`Ćwiczenia praktyczne: ${topic.title}`}
            subtitle="Sprawdź się — po sprawdzeniu zobaczysz wyjaśnienie każdej reguły."
            questions={topic.exercises}
            onComplete={(c, t) => onScoreSave(`grammar-${topic.id}`, c, t)}
          />
        </div>
      </div>
    </div>
  );
}

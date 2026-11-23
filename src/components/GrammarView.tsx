import { useState } from 'react';
import { Flame } from 'lucide-react';
import { GRAMMAR_TOPICS } from '../data/grammar';
import { ExerciseList } from './ExerciseList';
import { GrammarTopicCard } from './GrammarTopicCard';

interface GrammarViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
}

export function GrammarView({ onScoreSave }: GrammarViewProps) {
  const [selectedId, setSelectedId] = useState(GRAMMAR_TOPICS[0].id);
  const topic = GRAMMAR_TOPICS.find((t) => t.id === selectedId) ?? GRAMMAR_TOPICS[0];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Sidebar Topic List */}
      <div className="lg:col-span-4 space-y-2">
        <p className="px-1 text-xs font-bold uppercase tracking-wider text-[#71717A]">
          Wybierz dział gramatyczny
        </p>
        {GRAMMAR_TOPICS.map((t) => {
          const active = t.id === topic.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`w-full rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                active
                  ? 'border-[#0D6B48] bg-[#ECF7F2]/70 shadow-2xs'
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
                <span className="text-xs font-medium text-[#71717A]">
                  {t.exercises.length} zadań
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-extrabold text-[#18181B]">{t.title}</h3>
              <p className="mt-0.5 text-xs text-[#5C5C66] line-clamp-1">{t.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Main Content: Visual Table Card + Exercises */}
      <div className="lg:col-span-8 space-y-6">
        <GrammarTopicCard topic={topic} />

        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
          <ExerciseList
            key={topic.id}
            title={`Ćwiczenia praktyczne (${topic.exercises.length} zdań): ${topic.title}`}
            subtitle="Wpisz odpowiedź i naciśnij Enter (albo kliknij Sprawdź), żeby zobaczyć wyjaśnienie."
            questions={topic.exercises}
            onComplete={(c, t) => onScoreSave(`grammar-${topic.id}`, c, t)}
          />
        </div>
      </div>
    </div>
  );
}

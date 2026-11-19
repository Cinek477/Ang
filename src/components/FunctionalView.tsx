import { useState } from 'react';
import { Flame, MessageSquare, Search, Volume2 } from 'lucide-react';
import { FUNCTIONAL_CATEGORIES, FUNCTIONAL_DRILL } from '../data/functional';
import { speakEnglish } from '../utils/storage';
import { ExerciseList } from './ExerciseList';

interface FunctionalViewProps {
  onScoreSave: (setId: string, correct: number, total: number) => void;
}

export function FunctionalView({ onScoreSave }: FunctionalViewProps) {
  const [search, setSearch] = useState('');
  const [showDrill, setShowDrill] = useState(false);

  const filtered = FUNCTIONAL_CATEGORIES.map((cat) => ({
    ...cat,
    subgroups: cat.subgroups
      .map((sg) => ({
        ...sg,
        phrases: sg.phrases.filter((p) => {
          if (!search.trim()) return true;
          const q = search.toLowerCase();
          return p.en.toLowerCase().includes(q) || p.pl.toLowerCase().includes(q);
        }),
      }))
      .filter((sg) => sg.phrases.length > 0),
  })).filter((cat) => cat.subgroups.length > 0);

  return (
    <div className="space-y-6">
      {/* Header + Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E4DD] bg-white p-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj konstrukcji (np. would you mind, due to, sense, apologise)..."
            className="w-full rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#0D6B48] focus:bg-white"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowDrill((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors cursor-pointer ${
            showDrill
              ? 'bg-[#C2571A] text-white'
              : 'bg-[#0D6B48] text-white hover:bg-[#0A5539]'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          {showDrill ? 'Wróć do banku zwrotów' : 'Quiz z dialogów (Review 4.3 & 4.4)'}
        </button>
      </div>

      {showDrill ? (
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6">
          <ExerciseList
            title="Quiz: Functional Language — Review 4.3 & 4.4 (str. 107)"
            subtitle="Uzupełnij luki w dialogach z podręcznika (offering help & problem-solving meetings)."
            questions={FUNCTIONAL_DRILL}
            onComplete={(c, t) => onScoreSave('u4-functional-drill', c, t)}
          />
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((cat) => (
            <section key={cat.id} className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${
                      cat.isKolosPriority ? 'bg-[#C2571A] text-white' : 'bg-[#F4F3EE] text-[#5C5C66]'
                    }`}
                  >
                    {cat.isKolosPriority && <Flame className="h-3 w-3" />}
                    {cat.unitTag}
                  </span>
                  <h3 className="mt-1.5 text-lg font-extrabold text-[#18181B]">{cat.title}</h3>
                  <p className="text-xs text-[#5C5C66]">{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cat.subgroups.map((sg) => (
                  <div key={sg.label} className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4 space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D6B48]">
                      {sg.label}
                    </h4>
                    <div className="space-y-2">
                      {sg.phrases.map((p) => (
                        <div
                          key={p.en}
                          className="rounded-lg bg-white p-2.5 border border-[#E6E4DD]/80 space-y-1"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-[#18181B]">{p.en}</p>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {p.register && (
                                <span
                                  className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                                    p.register === 'formal'
                                      ? 'bg-blue-50 text-blue-700'
                                      : p.register === 'informal'
                                      ? 'bg-amber-50 text-amber-800'
                                      : 'bg-[#F4F3EE] text-[#71717A]'
                                  }`}
                                >
                                  {p.register}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => speakEnglish(p.en)}
                                className="text-[#71717A] hover:text-[#0D6B48] cursor-pointer"
                                title="Odsłuchaj"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-[#5C5C66]">{p.pl}</p>
                          {p.note && (
                            <p className="text-[11px] font-medium text-[#C2571A]">→ {p.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

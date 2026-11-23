import { AlertTriangle, CheckCircle2, Sparkles, Volume2, XCircle } from 'lucide-react';
import type { GrammarTopic } from '../data/types';
import { speakEnglish } from '../utils/storage';

interface GrammarTopicCardProps {
  topic: GrammarTopic;
}

export function GrammarTopicCard({ topic }: GrammarTopicCardProps) {
  const headers = topic.tableHeaders ?? [
    'Kiedy używamy / Co widzisz w zdaniu?',
    'Wzór (co wpisujesz w lukę)',
    'Przykład',
  ];

  return (
    <div className="space-y-5">
      {/* 1. Header + 3-Second Algorithm Box */}
      <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 sm:p-6 space-y-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C2571A] px-3 py-0.5 font-mono text-[11px] font-bold text-white">
            {topic.unitTag}
          </span>
          <h2 className="mt-2 text-xl font-extrabold text-[#18181B]">{topic.title}</h2>
          <p className="mt-0.5 text-sm text-[#5C5C66]">{topic.subtitle}</p>
        </div>

        {topic.quickSteps && topic.quickSteps.length > 0 && (
          <div className="rounded-xl border border-[#0D6B48]/25 bg-[#ECF7F2]/60 p-4">
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0D6B48] mb-2.5">
              <Sparkles className="h-3.5 w-3.5" />
              Jak rozpoznać na kolosie (krok po kroku):
            </div>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
              {topic.quickSteps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-2.5 rounded-lg border border-[#0D6B48]/15 bg-white p-3 text-xs leading-relaxed text-[#18181B]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0D6B48] font-mono text-[11px] font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Main Visual Table */}
        {topic.tableRows && topic.tableRows.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-[#E6E4DD]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6E4DD] bg-[#F8F7F4] text-[11px] font-extrabold uppercase tracking-wider text-[#5C5C66]">
                  <th className="py-3 px-4 w-[32%]">{headers[0]}</th>
                  <th className="py-3 px-4 w-[30%]">{headers[1]}</th>
                  <th className="py-3 px-4 w-[38%]">{headers[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E4DD] bg-white">
                {topic.tableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F7F4]/60 transition-colors">
                    <td className="py-3.5 px-4 align-top">
                      <p className="font-extrabold text-[#18181B] text-sm">{row.situation}</p>
                      {row.keywords && row.keywords.length > 0 && (
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {row.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="rounded-md border border-[#E6E4DD] bg-[#F8F7F4] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#C2571A]"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="inline-block rounded-lg border border-[#0D6B48]/30 bg-[#ECF7F2] px-3 py-1.5 font-mono text-xs sm:text-[13px] font-extrabold text-[#0D6B48]">
                        {row.formula}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 align-top">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-[#18181B] text-sm leading-snug">
                          {row.exampleEn}
                        </p>
                        <button
                          type="button"
                          onClick={() => speakEnglish(row.exampleEn)}
                          className="text-[#71717A] hover:text-[#0D6B48] shrink-0 mt-0.5 cursor-pointer"
                          title="Odsłuchaj"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-[#5C5C66] italic">{row.examplePl}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Visual Wrong vs Right Traps */}
        {topic.trapPairs && topic.trapPairs.length > 0 && (
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C2571A]">
              <AlertTriangle className="h-3.5 w-3.5" />
              Najczęstsze pułapki na kolosie (Błąd vs Poprawnie):
            </div>
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
              {topic.trapPairs.map((tp, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-3.5 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-red-700 bg-red-50 border border-red-200 rounded-lg px-2.5 py-1.5">
                    <XCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span className="line-through font-semibold">{tp.wrong}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0D6B48] bg-[#ECF7F2] border border-[#0D6B48]/30 rounded-lg px-2.5 py-1.5">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0D6B48]" />
                    <span className="font-extrabold">{tp.right}</span>
                  </div>
                  <p className="text-[11px] font-medium text-[#5C5C66] pl-1">{tp.why}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Optional additional rule cards (only if topic has extra sub-tables/notes) */}
        {(!topic.tableRows || topic.tableRows.length === 0) && topic.rules.length > 0 && (
          <div className="space-y-3">
            {topic.rules.map((r) => (
              <div
                key={r.title}
                className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4 space-y-2"
              >
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

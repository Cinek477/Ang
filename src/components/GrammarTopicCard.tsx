import type { GrammarTopic } from '../data/types';

interface GrammarTopicCardProps {
  topic: GrammarTopic;
}

export function GrammarTopicCard({ topic }: GrammarTopicCardProps) {
  return (
    <div className="rounded-2xl border border-[#E6E4DD] bg-white p-6 space-y-6">
      {/* Simple, clean title */}
      <div className="border-b border-[#E6E4DD] pb-4">
        <h2 className="text-xl font-extrabold text-[#18181B]">{topic.title}</h2>
        <p className="mt-1 text-sm text-[#5C5C66]">{topic.subtitle}</p>
      </div>

      {/* Clean, spacious tables */}
      {topic.simpleTables &&
        topic.simpleTables.map((tbl, tIdx) => (
          <div key={tIdx} className="space-y-2.5">
            {tbl.title && (
              <h3 className="text-base font-extrabold text-[#18181B]">{tbl.title}</h3>
            )}
            <div className="overflow-x-auto rounded-xl border border-[#D8D5CC]">
              <table className="w-full border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-[#D8D5CC] bg-[#F4F3EE] text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                    {tbl.headers.map((h, i) => (
                      <th
                        key={i}
                        className="py-3.5 px-4 border-r last:border-r-0 border-[#E6E4DD]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E4DD] bg-white">
                  {tbl.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F8F7F4]">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3.5 px-4 align-top leading-relaxed border-r last:border-r-0 border-[#F0EFE9] ${
                            cIdx === 0
                              ? 'font-extrabold text-[#18181B] bg-[#FAF9F6]'
                              : 'text-[#18181B]'
                          }`}
                        >
                          {cell.split('\n').map((line, lIdx) => (
                            <div
                              key={lIdx}
                              className={
                                lIdx > 0
                                  ? 'mt-1 text-xs font-normal text-[#5C5C66]'
                                  : cIdx === 2 || (row.length === 3 && cIdx === 1)
                                  ? 'font-bold text-[#0D6B48]'
                                  : ''
                              }
                            >
                              {line}
                            </div>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {/* Short, plain-Polish key notes */}
      {topic.keyBullets && topic.keyBullets.length > 0 && (
        <div className="rounded-xl border border-[#E6E4DD] bg-[#F8F7F4] p-4 space-y-2">
          <p className="text-xs font-extrabold uppercase tracking-wider text-[#C2571A]">
            Najważniejsze zasady do zapamiętania:
          </p>
          <ul className="space-y-1.5 text-sm text-[#18181B] list-disc pl-5">
            {topic.keyBullets.map((b, i) => (
              <li key={i} className="leading-relaxed font-medium">
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { CheckSquare, Eye, EyeOff, Flame, Plus, Square, Trash2 } from 'lucide-react';
import { WRITING_TASKS } from '../data/writing';
import { loadDrafts, saveDraft } from '../utils/storage';

export function WritingView() {
  const [selectedId, setSelectedId] = useState(WRITING_TASKS[0].id);
  const [drafts, setDrafts] = useState<Record<string, string>>(() => loadDrafts());
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showModel, setShowModel] = useState(false);

  const task = WRITING_TASKS.find((t) => t.id === selectedId) ?? WRITING_TASKS[0];
  const text = drafts[task.id] ?? '';

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordStatus =
    wordCount === 0
      ? { label: `Cel: ${task.minWords}–${task.maxWords} słów`, cls: 'bg-[#F4F3EE] text-[#5C5C66]' }
      : wordCount < task.minWords
      ? {
          label: `${wordCount} słów (za krótko o ${task.minWords - wordCount})`,
          cls: 'bg-amber-50 text-amber-800 border border-amber-200',
        }
      : wordCount > task.maxWords
      ? {
          label: `${wordCount} słów (za długo o ${wordCount - task.maxWords})`,
          cls: 'bg-red-50 text-red-700 border border-red-200',
        }
      : {
          label: `${wordCount} słów · Idealny limit!`,
          cls: 'bg-[#ECF7F2] text-[#0D6B48] border border-[#0D6B48]/30',
        };

  useEffect(() => {
    setShowModel(false);
  }, [selectedId]);

  const updateText = (next: string) => {
    setDrafts((prev) => ({ ...prev, [task.id]: next }));
    saveDraft(task.id, next);
  };

  const insertPhrase = (phrase: string) => {
    const spacer = text.length > 0 && !text.endsWith('\n') && !text.endsWith(' ') ? ' ' : '';
    updateText(text + spacer + phrase);
  };

  return (
    <div className="space-y-5">
      {/* Task Selector */}
      <div className="flex flex-wrap gap-2">
        {WRITING_TASKS.map((t) => {
          const active = t.id === task.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedId(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                active
                  ? 'border-[#0D6B48] bg-[#0D6B48] text-white shadow-xs'
                  : 'border-[#E6E4DD] bg-white text-[#18181B] hover:border-[#0D6B48]/40'
              }`}
            >
              {t.isKolosPriority && (
                <Flame className={`h-3.5 w-3.5 ${active ? 'text-amber-300' : 'text-[#C2571A]'}`} />
              )}
              <span className="font-mono text-[11px] opacity-80">{t.tag}</span>
              <span>{t.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Prompt + Editor */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-md bg-[#F4F3EE] px-2 py-0.5 font-mono text-xs font-semibold text-[#5C5C66]">
                {task.tag}
              </span>
              <span className={`rounded-full px-3 py-1 font-mono text-xs font-semibold ${wordStatus.cls}`}>
                {wordStatus.label}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-[#18181B]">{task.title}</h2>
            <p className="text-sm leading-relaxed text-[#5C5C66]">{task.prompt}</p>
            <ul className="space-y-1 text-xs text-[#18181B] bg-[#F8F7F4] rounded-xl p-3 border border-[#E6E4DD] list-disc pl-6">
              {task.bulletPoints.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="writing-editor" className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                Twoja praca (zapisuje się automatycznie)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowModel((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E4DD] px-3 py-1.5 text-xs font-semibold text-[#0D6B48] hover:bg-[#ECF7F2] cursor-pointer"
                >
                  {showModel ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {showModel ? 'Ukryj wzór' : 'Pokaż wzorcową pracę'}
                </button>
                {text.length > 0 && (
                  <button
                    type="button"
                    onClick={() => updateText('')}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#E6E4DD] px-2.5 py-1.5 text-xs text-[#71717A] hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    title="Wyczyść tekst"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              id="writing-editor"
              value={text}
              onChange={(e) => updateText(e.target.value)}
              rows={12}
              placeholder="Zacznij pisać tutaj... Możesz klikać gotowe zwroty po prawej stronie, żeby wstawić je w tekst."
              className="w-full rounded-xl border border-[#D8D5CC] bg-[#FDFDFB] p-4 text-[15px] leading-relaxed text-[#18181B] outline-none focus:border-[#0D6B48] focus:ring-2 focus:ring-[#0D6B48]/15"
            />
          </div>

          {showModel && (
            <div className="rounded-2xl border border-[#0D6B48]/30 bg-[#ECF7F2]/40 p-5 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#0D6B48]">Wzorcowe rozwiązanie (Model Answer)</h4>
                <span className="font-mono text-xs text-[#0D6B48]">
                  {task.modelAnswer.trim().split(/\s+/).length} słów
                </span>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[#18181B]">
                {task.modelAnswer}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Checklist + Clickable Phrase Bank */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Checklista egzaminacyjna
            </h3>
            <div className="space-y-2">
              {task.checklist.map((item, i) => {
                const key = `${task.id}-${i}`;
                const done = !!checkedItems[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="flex w-full items-start gap-2 text-left text-xs leading-relaxed cursor-pointer"
                  >
                    {done ? (
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#0D6B48]" />
                    ) : (
                      <Square className="mt-0.5 h-4 w-4 shrink-0 text-[#A1A1AA]" />
                    )}
                    <span className={done ? 'line-through text-[#71717A]' : 'text-[#18181B]'}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Bank zwrotów (kliknij, aby wstawić)
            </h3>
            <div className="space-y-3">
              {task.usefulPhrases.map((grp) => (
                <div key={grp.group} className="space-y-1.5">
                  <p className="text-[11px] font-bold text-[#0D6B48]">{grp.group}</p>
                  <div className="flex flex-col gap-1.5">
                    {grp.items.map((phrase) => (
                      <button
                        key={phrase}
                        type="button"
                        onClick={() => insertPhrase(phrase)}
                        className="group flex items-start gap-1.5 rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] px-2.5 py-2 text-left text-xs text-[#18181B] hover:border-[#0D6B48]/40 hover:bg-[#ECF7F2]/50 cursor-pointer"
                      >
                        <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0D6B48]" />
                        <span>{phrase}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

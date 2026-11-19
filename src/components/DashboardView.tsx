import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Flame,
  Layers,
  MessageSquare,
  PenTool,
  Sparkles,
} from 'lucide-react';
import type { NavTab, SRSRecord, VocabCategory } from '../data/types';
import { ALL_FLASHCARDS } from '../data/vocabAll';
import type { ScoreMap } from '../utils/storage';

interface DashboardViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenUnit: (unitNum: 1 | 2 | 3 | 4 | 5) => void;
  onOpenVocabCategory: (cat: VocabCategory) => void;
  srs: Record<string, SRSRecord>;
  scores: ScoreMap;
}

const BOOK_UNITS = [
  { num: 1, title: 'Organisation', status: 'ready', desc: 'Roles, future forms, emails' },
  { num: 2, title: 'Brands', status: 'ready', desc: 'Marketing, connectors, -ing/inf' },
  { num: 3, title: 'Job Hunting', status: 'ready', desc: 'Interviews, indirect Qs, CV' },
  { num: 4, title: 'Business Strategy', status: 'kolos', desc: 'KOLOS · PEST, Modals, Word building' },
  { num: 5, title: 'Logistics', status: 'ready', desc: 'Passive voice, negotiating, complaint' },
  { num: 6, title: 'Entrepreneurs', status: 'pdf', desc: 'Reported speech, pitching, summarising' },
  { num: 7, title: 'Working Abroad', status: 'pdf', desc: 'Past tenses, conditionals, reports' },
  { num: 8, title: 'Leadership', status: 'pdf', desc: 'Relative clauses, feedback, meetings' },
];

export function DashboardView({
  onNavigate,
  onOpenUnit,
  onOpenVocabCategory,
  srs,
  scores,
}: DashboardViewProps) {
  const totalCards = ALL_FLASHCARDS.length;
  const trickyCount = ALL_FLASHCARDS.filter((c) => c.category === 'Trudne z tekstów').length;
  const masteredCards = Object.values(srs).filter((r) => r.level >= 2).length;
  const dueCards = ALL_FLASHCARDS.filter((c) => {
    const rec = srs[c.id];
    return !rec || rec.nextReview <= Date.now();
  }).length;

  const scoreEntries = Object.values(scores);
  const avgScore =
    scoreEntries.length > 0
      ? Math.round(
          (scoreEntries.reduce((acc, s) => acc + s.correct / Math.max(1, s.total), 0) /
            scoreEntries.length) *
            100
        )
      : null;

  return (
    <div className="space-y-6">
      {/* Priority Banner: Unit 4 Kolos + Trudne z tekstów */}
      <section className="relative overflow-hidden rounded-2xl border border-[#C2571A]/25 bg-gradient-to-br from-[#FDF2EB] via-white to-[#ECF7F2]/60 p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C2571A] px-3 py-1 text-xs font-bold tracking-wide text-white">
              <Flame className="h-3.5 w-3.5" />
              ZAKRES: UNITS 1–5 · PRIORYTET: KOLOS UNIT 4
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#18181B]">
              Business Partner B1 (Units 1–5) + AGH B2
            </h2>
            <p className="text-sm leading-relaxed text-[#5C5C66]">
              Masz tu pełne powtórki z <span className="font-semibold text-[#18181B]">Units 1–5</span>,
              wszystkie działy gramatyki (w tym <span className="font-semibold text-[#18181B]">Modal Verbs, Comparison, Passive, Indirect Questions</span>)
              oraz specjalny zestaw <span className="font-semibold text-[#C2571A]">{trickyCount} trudnych / nietypowych słówek z tekstów</span> (FT + arkusze AGH).
            </p>
          </div>
          <div className="flex shrink-0 flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => onOpenUnit(4)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2571A] px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#A64813] transition-colors cursor-pointer"
            >
              Kolos: Unit 4
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onOpenVocabCategory('Trudne z tekstów')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#C2571A]/35 bg-white px-4 py-3 text-sm font-bold text-[#C2571A] hover:bg-[#FDF2EB] transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              Trudne z tekstów ({trickyCount})
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Fiszki do powtórki</span>
            <Layers className="h-4 w-4 text-[#0D6B48]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#18181B]">{dueCards}</span>
            <span className="text-xs text-[#5C5C66]">z {totalCards} słówek (Units 1–5 + AGH)</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('vocab')}
            className="mt-3 text-xs font-semibold text-[#0D6B48] hover:underline cursor-pointer"
          >
            Uruchom sesję SRS →
          </button>
        </div>

        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Opanowane słownictwo</span>
            <CheckCircle2 className="h-4 w-4 text-[#0D6B48]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#18181B]">{masteredCards}</span>
            <span className="text-xs text-[#5C5C66]">({Math.round((masteredCards / totalCards) * 100)}%)</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#F4F3EE]">
            <div
              className="h-full rounded-full bg-[#0D6B48] transition-all"
              style={{ width: `${Math.round((masteredCards / totalCards) * 100)}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">Średnia z ćwiczeń</span>
            <Sparkles className="h-4 w-4 text-[#C2571A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#18181B]">
              {avgScore !== null ? `${avgScore}%` : '—'}
            </span>
            <span className="text-xs text-[#5C5C66]">
              {scoreEntries.length > 0 ? `${scoreEntries.length} ukończonych zestawów` : 'Rozwiąż pierwszy zestaw'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('exams')}
            className="mt-3 text-xs font-semibold text-[#0D6B48] hover:underline cursor-pointer"
          >
            Przejdź do Mock Egzaminów AGH →
          </button>
        </div>
      </section>

      {/* Course Roadmap (Business Partner B1) — clickable Units 1-5 */}
      <section className="rounded-2xl border border-[#E6E4DD] bg-white p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#18181B]">Mapa kursu — Business Partner B1 (kliknij Unit 1–5)</h3>
            <p className="text-xs text-[#5C5C66]">
              Units 1–5 mają pełne powtórki, gramatykę, konstrukcje i słownictwo z tekstów.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {BOOK_UNITS.map((u) => {
            const clickable = u.num <= 5;
            return (
              <div
                key={u.num}
                onClick={() => clickable && onOpenUnit(u.num as 1 | 2 | 3 | 4 | 5)}
                className={`rounded-xl border p-3.5 transition-all ${
                  u.status === 'kolos'
                    ? 'border-[#C2571A] bg-[#FDF2EB]/70 cursor-pointer hover:shadow-xs'
                    : u.status === 'ready'
                    ? 'border-[#0D6B48]/35 bg-[#ECF7F2]/40 cursor-pointer hover:border-[#0D6B48] hover:shadow-xs'
                    : 'border-[#E6E4DD] bg-[#F8F7F4]/60 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#71717A]">UNIT {u.num}</span>
                  {u.status === 'kolos' ? (
                    <span className="rounded-full bg-[#C2571A] px-2 py-0.5 text-[10px] font-bold text-white">
                      KOLOS
                    </span>
                  ) : u.status === 'ready' ? (
                    <span className="rounded-full bg-[#0D6B48] px-2 py-0.5 text-[10px] font-bold text-white">
                      GOTOWY
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-[#71717A]">PDF gotowy</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-bold text-[#18181B]">{u.title}</p>
                <p className="mt-0.5 text-xs text-[#5C5C66]">{u.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Access Modules */}
      <section>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#71717A]">
          Wszystkie moduły nauki
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              tab: 'vocab' as NavTab,
              icon: Layers,
              title: 'Słownictwo & Trudne z tekstów',
              desc: 'Fiszki SRS z podziałem na Units 1–5 oraz nietypowe słówka z artykułów FT i arkuszy AGH.',
              badge: `${totalCards} fiszek`,
            },
            {
              tab: 'wordformation' as NavTab,
              icon: Sparkles,
              title: 'Słowotwórstwo (Word Formation)',
              desc: '30 zdań egzaminacyjnych, losowy test 10 pytań, tabela 30 rodzin wyrazów i ściągawka końcówek.',
              badge: '30 zadań + losowanie',
            },
            {
              tab: 'grammar' as NavTab,
              icon: BookOpen,
              title: 'Gramatyka (Units 1–5 + AGH)',
              desc: 'Future, -ing/inf, Indirect Qs, Modals, Comparison, Passive, Despite/Although, Conditionals.',
              badge: '7 działów + testy',
            },
            {
              tab: 'functional' as NavTab,
              icon: MessageSquare,
              title: 'Konstrukcje & Zwroty (1–5)',
              desc: 'Prezentacje, active listening, offering help, spotkania, negocjacje, reklamacje i maile.',
              badge: '6 kategorii + quiz',
            },
            {
              tab: 'writing' as NavTab,
              icon: PenTool,
              title: 'Writing Studio (180–200 słów)',
              desc: 'Raport 4.5, PEST 4.2, Reklamacja 5.5, dyplomatyczny mail do HR i Letter of Apology.',
              badge: '5 zadań + wzory',
            },
            {
              tab: 'exams' as NavTab,
              icon: FileText,
              title: 'Mock Egzaminy AGH',
              desc: 'Oba Twoje arkusze AGH w pełni interaktywne: Reading, Word Formation, Cloze i Grammar.',
              badge: '2 pełne arkusze',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                type="button"
                onClick={() => onNavigate(item.tab)}
                className="group flex flex-col justify-between rounded-2xl border border-[#E6E4DD] bg-white p-5 text-left transition-all hover:border-[#0D6B48]/40 hover:shadow-sm cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F3EE] text-[#0D6B48] group-hover:bg-[#ECF7F2]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-[#F4F3EE] px-2.5 py-1 text-xs font-semibold text-[#5C5C66]">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="mt-4 text-base font-bold text-[#18181B] group-hover:text-[#0D6B48]">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5C5C66]">{item.desc}</p>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0D6B48]">
                  Otwórz moduł <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

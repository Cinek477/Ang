import { useRef, useState } from 'react';
import {
  BookOpen,
  Download,
  FileText,
  Flame,
  GraduationCap,
  LayoutDashboard,
  Layers,
  MessageSquare,
  PenTool,
  Sparkles,
  Upload,
} from 'lucide-react';
import type { NavTab, VocabCategory } from './data/types';
import {
  exportProgressJSON,
  importProgressJSON,
  loadScores,
  loadSRS,
  rateCard,
  saveScore,
} from './utils/storage';
import { DashboardView } from './components/DashboardView';
import { KolosUnit4View } from './components/KolosUnit4View';
import { VocabView } from './components/VocabView';
import { WordFormationView } from './components/WordFormationView';
import { GrammarView } from './components/GrammarView';
import { FunctionalView } from './components/FunctionalView';
import { WritingView } from './components/WritingView';
import { ExamsView } from './components/ExamsView';

const NAV_ITEMS: { id: NavTab; label: string; icon: typeof LayoutDashboard; highlight?: boolean }[] = [
  { id: 'dashboard', label: 'Start', icon: LayoutDashboard },
  { id: 'kolos', label: 'Units 1–5 (Kolos U4)', icon: Flame, highlight: true },
  { id: 'vocab', label: 'Fiszki SRS', icon: Layers },
  { id: 'wordformation', label: 'Słowotwórstwo', icon: Sparkles },
  { id: 'grammar', label: 'Gramatyka', icon: BookOpen },
  { id: 'functional', label: 'Konstrukcje', icon: MessageSquare },
  { id: 'writing', label: 'Writing', icon: PenTool },
  { id: 'exams', label: 'Mock AGH', icon: FileText },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [vocabInitialCat, setVocabInitialCat] = useState<'All' | VocabCategory>('All');
  const [srs, setSrs] = useState(() => loadSRS());
  const [scores, setScores] = useState(() => loadScores());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRateCard = (cardId: string, rating: 'again' | 'hard' | 'good') => {
    setSrs((prev) => rateCard(prev, cardId, rating));
  };

  const handleSaveScore = (setId: string, correct: number, total: number) => {
    setScores(saveScore(setId, correct, total));
  };

  const handleOpenUnit = (unitNum: 1 | 2 | 3 | 4 | 5) => {
    setSelectedUnit(unitNum);
    setActiveTab('kolos');
  };

  const handleOpenVocabCategory = (cat: VocabCategory) => {
    setVocabInitialCat(cat);
    setActiveTab('vocab');
  };

  const handleExport = () => {
    const blob = new Blob([exportProgressJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agh-english-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && importProgressJSON(reader.result)) {
        setSrs(loadSRS());
        setScores(loadScores());
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#18181B]">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#E6E4DD] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0D6B48] text-white shadow-2xs">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-sm font-extrabold tracking-tight text-[#18181B]">
                AGH English B2
              </span>
              <span className="block text-[11px] font-medium text-[#71717A]">
                Business Partner B1 (Units 1–5) · Informatyka
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'vocab') setVocabInitialCat('All');
                    setActiveTab(item.id);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? item.highlight
                        ? 'bg-[#C2571A] text-white shadow-2xs'
                        : 'bg-[#0D6B48] text-white shadow-2xs'
                      : item.highlight
                      ? 'bg-[#FDF2EB] text-[#C2571A] hover:bg-[#FCE5D7]'
                      : 'text-[#5C5C66] hover:bg-[#F4F3EE] hover:text-[#18181B]'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Backup Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] px-2.5 py-1.5 text-xs font-medium text-[#5C5C66] hover:bg-[#F0EFE9] cursor-pointer"
              title="Eksportuj postęp (JSON)"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Backup</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 rounded-lg border border-[#E6E4DD] bg-[#F8F7F4] px-2.5 py-1.5 text-xs font-medium text-[#5C5C66] hover:bg-[#F0EFE9] cursor-pointer"
              title="Importuj postęp (JSON)"
            >
              <Upload className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>

        {/* Mobile / Tablet Navigation */}
        <div className="flex lg:hidden gap-1.5 overflow-x-auto border-t border-[#F0EFE9] px-4 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'vocab') setVocabInitialCat('All');
                  setActiveTab(item.id);
                }}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  active
                    ? item.highlight
                      ? 'bg-[#C2571A] text-white'
                      : 'bg-[#0D6B48] text-white'
                    : item.highlight
                    ? 'bg-[#FDF2EB] text-[#C2571A]'
                    : 'bg-[#F8F7F4] text-[#5C5C66]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={setActiveTab}
            onOpenUnit={handleOpenUnit}
            onOpenVocabCategory={handleOpenVocabCategory}
            srs={srs}
            scores={scores}
          />
        )}
        {activeTab === 'kolos' && (
          <KolosUnit4View onScoreSave={handleSaveScore} initialUnit={selectedUnit} />
        )}
        {activeTab === 'vocab' && (
          <VocabView
            srs={srs}
            onRate={handleRateCard}
            initialCategory={vocabInitialCat}
          />
        )}
        {activeTab === 'wordformation' && <WordFormationView onScoreSave={handleSaveScore} />}
        {activeTab === 'grammar' && <GrammarView onScoreSave={handleSaveScore} />}
        {activeTab === 'functional' && <FunctionalView onScoreSave={handleSaveScore} />}
        {activeTab === 'writing' && <WritingView />}
        {activeTab === 'exams' && <ExamsView onScoreSave={handleSaveScore} />}
      </main>
    </div>
  );
}

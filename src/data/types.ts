export type NavTab =
  | 'dashboard'
  | 'kolos'
  | 'vocab'
  | 'wordformation'
  | 'grammar'
  | 'functional'
  | 'writing'
  | 'exams';

export type UnitTag = 'Moja lista' | 'Unit 1' | 'Unit 2' | 'Unit 3' | 'Unit 4' | 'Unit 5' | 'AGH Teksty';

export type VocabCategory =
  | 'Moja lista'
  | 'Trudne z tekstów'
  | 'Collocations'
  | 'Word Building'
  | 'PEST & Strategy'
  | 'Logistics & Business'
  | 'Problem-Solving';

export interface Flashcard {
  id: string;
  unit: UnitTag;
  subUnit?: string;
  category: VocabCategory;
  en: string;
  pl: string;
  definition?: string;
  example: string;
  tip?: string;
}

export interface SRSRecord {
  cardId: string;
  level: 0 | 1 | 2 | 3; // 0 = new/again, 1 = hard, 2 = good, 3 = mastered
  nextReview: number; // timestamp ms
  reviews: number;
}

export interface WordFamilyRow {
  id: string;
  verb: string;
  noun: string;
  adjective: string;
  pl: string;
  trap?: string;
}

export interface NounToAdjRow {
  id: string;
  base: string;
  basePl: string;
  adjective: string;
  negativeOrOther?: string;
  suffixGroup:
    | '-ous / -ious'
    | '-ful / -less'
    | '-y'
    | '-al / -ic'
    | '-able / -ible'
    | '-ive'
    | '-ant / -ent'
    | '-ing / -ed / -ly';
  collocation: string;
  collocationPl: string;
  rule?: string;
}

export interface GapQuestion {
  id: string;
  prompt: string;
  hint?: string;
  answers: string[];
  explanation: string;
  options?: string[];
}

export interface GrammarRule {
  title: string;
  formula: string;
  usage: string;
  examples: string[];
  watchOut?: string;
}

export interface GrammarTopic {
  id: string;
  unitTag: string;
  isKolosPriority?: boolean;
  title: string;
  subtitle: string;
  rules: GrammarRule[];
  exercises: GapQuestion[];
}

export interface PhraseItem {
  en: string;
  pl: string;
  register?: 'formal' | 'neutral' | 'informal';
  note?: string;
}

export interface PhraseCategory {
  id: string;
  unitTag: string;
  isKolosPriority?: boolean;
  title: string;
  description: string;
  subgroups: {
    label: string;
    phrases: PhraseItem[];
  }[];
}

export interface WritingTask {
  id: string;
  tag: string;
  isKolosPriority?: boolean;
  title: string;
  minWords: number;
  maxWords: number;
  prompt: string;
  bulletPoints: string[];
  checklist: string[];
  usefulPhrases: { group: string; items: string[] }[];
  modelAnswer: string;
}

export interface ExamData {
  id: string;
  title: string;
  subtitle: string;
  reading1: {
    title: string;
    paragraphs: string[];
    trueFalse: { id: string; statement: string; answer: boolean; explanation: string }[];
    synonyms: { id: string; clue: string; answers: string[]; explanation: string }[];
  };
  reading2: {
    title: string;
    paragraphs: string[];
    sentences: { letter: string; text: string }[];
    answers: Record<number, { letter: string; explanation: string }>;
  };
  multipleChoice: GapQuestion[];
  wordFormation: GapQuestion[];
  openCloze?: {
    intro: string;
    text: string;
    gaps: GapQuestion[];
  };
  grammar: GapQuestion[];
}

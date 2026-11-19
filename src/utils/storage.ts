import type { SRSRecord } from '../data/types';

const STORAGE_KEYS = {
  SRS: 'agh_eng_srs_v1',
  SCORES: 'agh_eng_scores_v1',
  DRAFTS: 'agh_eng_drafts_v1',
};

export interface ScoreMap {
  [exerciseSetId: string]: {
    correct: number;
    total: number;
    updatedAt: number;
  };
}

export function loadSRS(): Record<string, SRSRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SRS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSRS(data: Record<string, SRSRecord>) {
  try {
    localStorage.setItem(STORAGE_KEYS.SRS, JSON.stringify(data));
  } catch {
    // ignore storage quota errors
  }
}

export function rateCard(
  records: Record<string, SRSRecord>,
  cardId: string,
  rating: 'again' | 'hard' | 'good'
): Record<string, SRSRecord> {
  const prev = records[cardId] ?? { cardId, level: 0, nextReview: 0, reviews: 0 };
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  let nextLevel: 0 | 1 | 2 | 3 = prev.level;
  let intervalMs = 10 * 60 * 1000;

  if (rating === 'again') {
    nextLevel = 0;
    intervalMs = 5 * 60 * 1000; // 5 min
  } else if (rating === 'hard') {
    nextLevel = prev.level >= 2 ? 2 : 1;
    intervalMs = 12 * 60 * 60 * 1000; // 12h
  } else {
    nextLevel = Math.min(3, prev.level + 1) as 0 | 1 | 2 | 3;
    intervalMs = nextLevel === 1 ? DAY : nextLevel === 2 ? 3 * DAY : 7 * DAY;
  }

  const updated: Record<string, SRSRecord> = {
    ...records,
    [cardId]: {
      cardId,
      level: nextLevel,
      nextReview: now + intervalMs,
      reviews: prev.reviews + 1,
    },
  };
  saveSRS(updated);
  return updated;
}

export function loadScores(): ScoreMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCORES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveScore(setId: string, correct: number, total: number): ScoreMap {
  const current = loadScores();
  const updated: ScoreMap = {
    ...current,
    [setId]: { correct, total, updatedAt: Date.now() },
  };
  try {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function loadDrafts(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveDraft(taskId: string, text: string) {
  const current = loadDrafts();
  current[taskId] = text;
  try {
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(current));
  } catch {
    // ignore
  }
}

export function exportProgressJSON(): string {
  return JSON.stringify(
    {
      srs: loadSRS(),
      scores: loadScores(),
      drafts: loadDrafts(),
      exportedAt: new Date().toISOString(),
    },
    null,
    2
  );
}

export function importProgressJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed.srs) localStorage.setItem(STORAGE_KEYS.SRS, JSON.stringify(parsed.srs));
    if (parsed.scores) localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(parsed.scores));
    if (parsed.drafts) localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(parsed.drafts));
    return true;
  } catch {
    return false;
  }
}

export function speakEnglish(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/\(from:.*?\)/g, '').replace(/\[|\]/g, '');
  const utter = new SpeechSynthesisUtterance(clean);
  utter.lang = 'en-GB';
  utter.rate = 0.95;
  window.speechSynthesis.speak(utter);
}

export function normalizeAnswer(val: string): string {
  return val
    .trim()
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ');
}

export function isAnswerCorrect(userInput: string, accepted: string[]): boolean {
  const norm = normalizeAnswer(userInput);
  if (!norm) return false;
  return accepted.some((a) => normalizeAnswer(a) === norm);
}

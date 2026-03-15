/**
 * data.js - JSON 로딩, 정규화, 검색 인덱스
 *
 * 물류관리사 5과목 35파트 데이터 로딩
 */

const DATA_BASE = './물관_데이터/';

// 과목별 폴더명과 파트 수
const SUBJECT_FILES = [
  { id: 's1', folder: '1. 물류관리론',   parts: 8 },
  { id: 's2', folder: '2. 화물운송론',   parts: 8 },
  { id: 's3', folder: '3. 국제물류론',   parts: 4 },
  { id: 's4', folder: '4. 보관하역론',   parts: 8 },
  { id: 's5', folder: '5. 물류관련법규', parts: 7 },
];

// 챕터(파트) 메타 정의 — 35파트
const CHAPTER_META = {
  // 1과목: 물류관리론
  's1-p01': { label: 'PART 01', fullLabel: 'PART 01 물류관리총론', subject: 's1', color: '#3B82F6' },
  's1-p02': { label: 'PART 02', fullLabel: 'PART 02 물류경영', subject: 's1', color: '#3B82F6' },
  's1-p03': { label: 'PART 03', fullLabel: 'PART 03 물류표준화와 물류공동화', subject: 's1', color: '#3B82F6' },
  's1-p04': { label: 'PART 04', fullLabel: 'PART 04 물류정보화(정보시스템)', subject: 's1', color: '#3B82F6' },
  's1-p05': { label: 'PART 05', fullLabel: 'PART 05 물류비 회계', subject: 's1', color: '#3B82F6' },
  's1-p06': { label: 'PART 06', fullLabel: 'PART 06 공급사슬관리(SCM)', subject: 's1', color: '#3B82F6' },
  's1-p07': { label: 'PART 07', fullLabel: 'PART 07 친환경 녹색물류와 물류포장', subject: 's1', color: '#3B82F6' },
  's1-p08': { label: 'PART 08', fullLabel: 'PART 08 물류아웃소싱과 물류보안', subject: 's1', color: '#3B82F6' },
  // 2과목: 화물운송론
  's2-p01': { label: 'PART 01', fullLabel: 'PART 01 화물운송의 기초', subject: 's2', color: '#8B5CF6' },
  's2-p02': { label: 'PART 02', fullLabel: 'PART 02 공로운송', subject: 's2', color: '#8B5CF6' },
  's2-p03': { label: 'PART 03', fullLabel: 'PART 03 철도운송', subject: 's2', color: '#8B5CF6' },
  's2-p04': { label: 'PART 04', fullLabel: 'PART 04 해상운송', subject: 's2', color: '#8B5CF6' },
  's2-p05': { label: 'PART 05', fullLabel: 'PART 05 항공운송', subject: 's2', color: '#8B5CF6' },
  's2-p06': { label: 'PART 06', fullLabel: 'PART 06 국제복합운송', subject: 's2', color: '#8B5CF6' },
  's2-p07': { label: 'PART 07', fullLabel: 'PART 07 유닛로드시스템(ULS)', subject: 's2', color: '#8B5CF6' },
  's2-p08': { label: 'PART 08', fullLabel: 'PART 08 수·배송시스템의 합리화', subject: 's2', color: '#8B5CF6' },
  // 3과목: 국제물류론
  's3-p01': { label: 'PART 01', fullLabel: 'PART 01 국제물류 총론', subject: 's3', color: '#06B6D4' },
  's3-p02': { label: 'PART 02', fullLabel: 'PART 02 국제해상운송', subject: 's3', color: '#06B6D4' },
  's3-p03': { label: 'PART 03', fullLabel: 'PART 03 국제항공운송', subject: 's3', color: '#06B6D4' },
  's3-p04': { label: 'PART 04', fullLabel: 'PART 04 국제복합운송 및 국제물류보안', subject: 's3', color: '#06B6D4' },
  // 4과목: 보관하역론
  's4-p01': { label: 'PART 01', fullLabel: 'PART 01 보관 및 창고의 기초개념', subject: 's4', color: '#10B981' },
  's4-p02': { label: 'PART 02', fullLabel: 'PART 02 물류시설과 창고관리시스템', subject: 's4', color: '#10B981' },
  's4-p03': { label: 'PART 03', fullLabel: 'PART 03 보관설비와 하역장비', subject: 's4', color: '#10B981' },
  's4-p04': { label: 'PART 04', fullLabel: 'PART 04 재고관리시스템', subject: 's4', color: '#10B981' },
  's4-p05': { label: 'PART 05', fullLabel: 'PART 05 하역의 이해', subject: 's4', color: '#10B981' },
  's4-p06': { label: 'PART 06', fullLabel: 'PART 06 하역운반장비', subject: 's4', color: '#10B981' },
  's4-p07': { label: 'PART 07', fullLabel: 'PART 07 유닛로드시스템과 포장', subject: 's4', color: '#10B981' },
  's4-p08': { label: 'PART 08', fullLabel: 'PART 08 운송수단별 하역방식', subject: 's4', color: '#10B981' },
  // 5과목: 물류관련법규
  's5-p01': { label: 'PART 01', fullLabel: 'PART 01 물류정책기본법', subject: 's5', color: '#F59E0B' },
  's5-p02': { label: 'PART 02', fullLabel: 'PART 02 물류시설의 개발 및 운영에 관한 법률', subject: 's5', color: '#F59E0B' },
  's5-p03': { label: 'PART 03', fullLabel: 'PART 03 화물자동차 운수사업법', subject: 's5', color: '#F59E0B' },
  's5-p04': { label: 'PART 04', fullLabel: 'PART 04 철도사업법', subject: 's5', color: '#F59E0B' },
  's5-p05': { label: 'PART 05', fullLabel: 'PART 05 항만운송사업법', subject: 's5', color: '#F59E0B' },
  's5-p06': { label: 'PART 06', fullLabel: 'PART 06 유통산업발전법', subject: 's5', color: '#F59E0B' },
  's5-p07': { label: 'PART 07', fullLabel: 'PART 07 농수산물 유통 및 가격안정에 관한 법률', subject: 's5', color: '#F59E0B' },
};

const SUBJECT_META = {
  's1': { label: '1과목', fullLabel: '물류관리론',   color: '#3B82F6', chapters: ['s1-p01','s1-p02','s1-p03','s1-p04','s1-p05','s1-p06','s1-p07','s1-p08'], maxScore: 100, passScore: 40 },
  's2': { label: '2과목', fullLabel: '화물운송론',   color: '#8B5CF6', chapters: ['s2-p01','s2-p02','s2-p03','s2-p04','s2-p05','s2-p06','s2-p07','s2-p08'], maxScore: 100, passScore: 40 },
  's3': { label: '3과목', fullLabel: '국제물류론',   color: '#06B6D4', chapters: ['s3-p01','s3-p02','s3-p03','s3-p04'], maxScore: 100, passScore: 40 },
  's4': { label: '4과목', fullLabel: '보관하역론',   color: '#10B981', chapters: ['s4-p01','s4-p02','s4-p03','s4-p04','s4-p05','s4-p06','s4-p07','s4-p08'], maxScore: 100, passScore: 40 },
  's5': { label: '5과목', fullLabel: '물류관련법규', color: '#F59E0B', chapters: ['s5-p01','s5-p02','s5-p03','s5-p04','s5-p05','s5-p06','s5-p07'], maxScore: 100, passScore: 40 },
};

// 전역 데이터 저장소
export const store = {
  subjects:     SUBJECT_META,
  chapters:     {},   // chapterId → {id, ...meta, sectionIds[]}
  sections:     {},   // sectionId → section
  quizzes:      {},   // quizId → quiz
  allSectionIds: [],
  allQuizIds:    [],
  searchTexts:   [],        // [{type, id, text, title}] — 직접 매칭용
  sectionsBySubject: {},    // subjectId → [sectionId]
  sectionsByChapter: {},    // chapterId → [sectionId]
  quizzesBySubject: {},     // subjectId → [quizId]
  quizzesByChapter: {},     // chapterId → [quizId]
  loaded: false,
};

/* ===================================================
   메인 로더
   =================================================== */
export async function loadAll() {
  const fetches = [];
  const fileMap = []; // {subjectId, chapterId, type}

  for (const subj of SUBJECT_FILES) {
    for (let p = 1; p <= subj.parts; p++) {
      const pp = String(p).padStart(2, '0');
      const chapterId = `${subj.id}-p${pp}`;

      fetches.push(fetchJSON(`${subj.folder}/part${pp}_concepts.json`));
      fileMap.push({ subjectId: subj.id, chapterId, type: 'concepts' });

      fetches.push(fetchJSON(`${subj.folder}/part${pp}_quizzes.json`));
      fileMap.push({ subjectId: subj.id, chapterId, type: 'quizzes' });
    }
  }

  const results = await Promise.all(fetches);

  results.forEach((data, i) => {
    const { subjectId, chapterId, type } = fileMap[i];
    if (type === 'concepts') {
      normalizeChapterConcepts(data, chapterId, subjectId);
    } else {
      normalizeQuizzes(data, () => chapterId);
    }
  });

  // 챕터 스토어 구성
  Object.keys(CHAPTER_META).forEach(chId => {
    store.chapters[chId] = { id: chId, ...CHAPTER_META[chId], sectionIds: [] };
  });
  store.allSectionIds.forEach(sid => {
    const sec = store.sections[sid];
    if (sec && store.chapters[sec.chapterId]) {
      store.chapters[sec.chapterId].sectionIds.push(sid);
    }
  });

  buildSearchIndex();
  store.loaded = true;
}

/* ===================================================
   개념 정규화 (단일 객체 — 모든 파트 동일 형태)
   =================================================== */
function normalizeChapterConcepts(obj, chapterId, subjectId) {
  if (!obj || !obj.sections) return;
  obj.sections.forEach(sec => {
    const normalized = normalizeSection(sec, chapterId, subjectId);
    store.sections[normalized.id] = normalized;
    store.allSectionIds.push(normalized.id);
  });
}

function normalizeSection(raw, chapterId, subjectId) {
  return {
    id:              raw.id ? `${chapterId}-${raw.id}` : `${chapterId}-${Math.random().toString(36).slice(2,7)}`,
    chapterId,
    subjectId,
    title:           raw.title || '',
    content:         raw.content || '',
    keyPoints:       Array.isArray(raw.keyPoints) ? raw.keyPoints : [],
    tips:            Array.isArray(raw.tips) ? raw.tips : [],
    tables:          Array.isArray(raw.tables) ? raw.tables : [],
    formulaExamples: Array.isArray(raw.formulaExamples) ? raw.formulaExamples : [],
  };
}

/* ===================================================
   퀴즈 정규화
   =================================================== */
function normalizeQuizzes(obj, getChapterId) {
  const quizzes = obj?.quizzes || [];
  quizzes.forEach(q => {
    const chapterId = getChapterId(q);
    const normalized = normalizeQuiz(q, chapterId);
    store.quizzes[normalized.id] = normalized;
    store.allQuizIds.push(normalized.id);
  });
}

function normalizeQuiz(raw, chapterId) {
  const subjectId = chapterId.split('-')[0];
  return {
    id:             raw.id || `Q-${Math.random().toString(36).slice(2,9)}`,
    chapterId,
    subjectId,
    type:           raw.type || 'concept',       // 'concept' | 'exam'
    format:         raw.format || 'multiple_choice', // 'multiple_choice' | 'ox'
    difficulty:     raw.difficulty || 1,
    topic:          raw.topic || '',
    question:       raw.question || '',
    options:        Array.isArray(raw.options) ? raw.options : [],
    answer:         raw.answer || '',
    explanation:    raw.explanation || '',
    relatedConcept: raw.relatedConcept || '',
    examTip:        raw.examTip || '',
  };
}

/* ===================================================
   검색 인덱스 빌드
   =================================================== */
function buildSearchIndex() {
  // 개념 → 검색용 텍스트 저장 (직접 매칭 방식)
  store.allSectionIds.forEach(sid => {
    const sec = store.sections[sid];
    store.searchTexts.push({
      type: 'section',
      id: sid,
      text: [sec.title, sec.content, ...sec.keyPoints, ...sec.tips.map(t => t.text)].join(' ').toLowerCase(),
      title: sec.title,
    });
  });

  // 퀴즈 → 검색용 텍스트 저장
  store.allQuizIds.forEach(qid => {
    const q = store.quizzes[qid];
    store.searchTexts.push({
      type: 'quiz',
      id: qid,
      text: [q.topic, q.question, q.explanation, q.examTip, q.relatedConcept].join(' ').toLowerCase(),
      title: q.question,
    });
  });

  // 역인덱스: 과목별/챕터별 섹션·퀴즈 ID 매핑
  store.allSectionIds.forEach(id => {
    const s = store.sections[id];
    if (!s) return;
    if (!store.sectionsBySubject[s.subjectId]) store.sectionsBySubject[s.subjectId] = [];
    if (!store.sectionsByChapter[s.chapterId]) store.sectionsByChapter[s.chapterId] = [];
    store.sectionsBySubject[s.subjectId].push(id);
    store.sectionsByChapter[s.chapterId].push(id);
  });
  store.allQuizIds.forEach(id => {
    const q = store.quizzes[id];
    if (!q) return;
    if (!store.quizzesBySubject[q.subjectId]) store.quizzesBySubject[q.subjectId] = [];
    if (!store.quizzesByChapter[q.chapterId]) store.quizzesByChapter[q.chapterId] = [];
    store.quizzesBySubject[q.subjectId].push(id);
    store.quizzesByChapter[q.chapterId].push(id);
  });
}

/* ===================================================
   검색 실행
   =================================================== */
export function search(query, limit = 20) {
  if (!query || query.trim().length < 1) return { sections: [], quizzes: [] };

  const q = query.toLowerCase().trim();
  const sections = [];
  const quizzes = [];

  for (const entry of store.searchTexts) {
    if (!entry.text.includes(q)) continue;
    // 제목 매칭에 가중치
    const score = entry.title.toLowerCase().includes(q) ? 3 : 1;
    const item = entry.type === 'section' ? store.sections[entry.id] : store.quizzes[entry.id];
    if (!item) continue;
    const arr = entry.type === 'section' ? sections : quizzes;
    arr.push({ item, score });
  }

  return {
    sections: sections.sort((a, b) => b.score - a.score).slice(0, limit).map(e => e.item),
    quizzes:  quizzes.sort((a, b) => b.score - a.score).slice(0, limit).map(e => e.item),
  };
}

/* ===================================================
   필터링 헬퍼
   =================================================== */
export function getQuizzes({ subjectId, chapterId, difficulty, type, shuffle, count }) {
  let list = store.allQuizIds.map(id => store.quizzes[id]);

  if (subjectId)  list = list.filter(q => q.subjectId === subjectId);
  if (chapterId)  list = list.filter(q => q.chapterId === chapterId);
  if (difficulty?.length) list = list.filter(q => difficulty.includes(q.difficulty));
  if (type && type !== 'all') list = list.filter(q => q.type === type);
  if (shuffle) list = shuffleArray(list);
  if (count && count < list.length) list = list.slice(0, count);

  return list;
}

export function getSectionsByChapter(chapterId) {
  return (store.chapters[chapterId]?.sectionIds || []).map(id => store.sections[id]).filter(Boolean);
}

export function getChapterColor(chapterId) {
  return CHAPTER_META[chapterId]?.color || '#3B82F6';
}

/* ===================================================
   유틸
   =================================================== */
async function fetchJSON(filename) {
  const res = await fetch(encodeURI(DATA_BASE + filename));
  if (!res.ok) throw new Error(`Failed to load ${filename}`);
  return res.json();
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

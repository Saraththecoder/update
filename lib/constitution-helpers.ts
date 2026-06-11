import parts from '../src/data/constitution/parts.json'
import articles from '../src/data/constitution/articles.json'
import cases from '../src/data/constitution/cases.json'
import schedules from '../src/data/constitution/schedules.json'
import upscQuestions from '../src/data/constitution/upsc_questions.json'

export type FilterTag = 'all' | 'high-priority' | 'fundamental-rights' | 'emergency' | 'centre-state' | 'recently-amended';

export interface TreeNode {
  part_id?: string;
  part_number?: string;
  part_title?: string;
  article_range?: string;
  children?: TreeNode[];
  
  article_id?: string;
  article_number?: string;
  article_title?: string;
  is_deleted?: boolean;
  upsc_importance?: string;
}

export interface Article {
  article_id: string;
  article_number: string;
  article_title: string;
  part_id: string;
  part_title: string;
  upsc_importance: string;
  summary: string;
  is_deleted: boolean;
  amended: boolean;
  amendment_note: string;
  tags: string[];
  related_articles: string[];
  plain_language: string;
  original_text: string;
  chapter: string;
}

export interface Schedule {
  schedule_id: string;
  schedule_number: string;
  schedule_title: string;
  articles_linked: string[];
  part_linked: string;
  broad_content: string;
  upsc_importance: string;
  upsc_angle: string;
  key_traps: string[];
  static_tags: string[];
  current_linkage: string;
  memory_trigger: string;
  linked_articles: string[];
  plain_language: string;
  full_text: string;
}

export function buildTreeData(): TreeNode[] {
  return parts.map(part => {
    const partArticles = articles.filter(art => art.part_id === part.part_id);
    return {
      part_id: part.part_id,
      part_number: part.part_number,
      part_title: part.part_title,
      article_range: part.article_range,
      children: partArticles.map(art => ({
        article_id: art.article_id,
        article_number: art.article_number,
        article_title: art.article_title,
        is_deleted: art.is_deleted,
        upsc_importance: art.upsc_importance
      }))
    };
  });
}

export function filterArticlesByTag(tag: FilterTag) {
  if (tag === 'all') return articles;
  return articles.filter(art => {
    if (tag === 'high-priority') {
      return art.upsc_importance === 'HIGH' || art.tags?.includes('high-priority');
    }
    if (tag === 'fundamental-rights') {
      return art.tags?.includes('fundamental-rights') || art.part_id === 'part_3';
    }
    if (tag === 'emergency') {
      return art.tags?.includes('emergency') || art.tags?.includes('emergency-provisions') || art.part_id === 'part_18';
    }
    if (tag === 'centre-state') {
      return art.tags?.includes('centre-state') || art.tags?.includes('centre-state-relations') || art.part_id === 'part_11';
    }
    if (tag === 'recently-amended') {
      return art.amended === true || art.tags?.includes('recently-amended');
    }
    return art.tags?.includes(tag);
  });
}

export function searchConstitution(query: string) {
  if (!query.trim()) return [];
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(art => {
    const numMatch = String(art.article_number).toLowerCase().includes(lowercaseQuery);
    const titleMatch = art.article_title?.toLowerCase().includes(lowercaseQuery);
    const summaryMatch = art.summary?.toLowerCase().includes(lowercaseQuery);
    const plainMatch = art.plain_language?.toLowerCase().includes(lowercaseQuery);
    return numMatch || titleMatch || summaryMatch || plainMatch;
  });
}

export function getSavedArticles(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('constitution_saved');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveArticle(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = getSavedArticles();
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem('constitution_saved', JSON.stringify(saved));
      window.dispatchEvent(new Event('storage'));
    }
  } catch (e) {}
}

export function removeArticle(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = getSavedArticles();
    const next = saved.filter(savedId => savedId !== id);
    localStorage.setItem('constitution_saved', JSON.stringify(next));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {}
}

export function isArticleSaved(id: string): boolean {
  const saved = getSavedArticles();
  return saved.includes(id);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(art => art.article_id === id) as Article | undefined;
}

export function getCasesByArticle(articleId: string) {
  return cases.filter(c => c.articles_interpreted && c.articles_interpreted.includes(articleId));
}

export function getQuestionsByArticle(articleId: string) {
  return upscQuestions.filter(q => q.articles_linked && q.articles_linked.includes(articleId));
}

export function getSchedulesByArticle(articleId: string) {
  return schedules.filter(s => s.articles_linked && s.articles_linked.includes(articleId)) as Schedule[];
}

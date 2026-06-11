export interface Course {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  features: string[];
  originalPrice: number;
  trialPrice: number;
  trialDurationDays: number;
  badge?: string;
}

export interface ResourceTopic {
  id: string;
  title: string;
  category: "Prelims" | "Mains" | "Mental Support" | "Syllabus";
  summary: string;
  content: string;
  fileSize?: string;
  survivalTip?: string;
  readingTime: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  yearsOfStruggle: number; // Empathy point: showing they lived the struggle
  specialization: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  batch: string;
  rank?: string;
  isRanker: boolean;
  status: string; // e.g. "Now serving in Bihar Cadre" or "Fought through 4 Prelims"
}

export interface SurvivalTrait {
  id: string;
  title: string;
  biologyFact: string;
  aspirantLesson: string;
  iconName: string; // maps to Lucide icons
  tagline: string;
}

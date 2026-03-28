export type SupportedLang = 'fr' | 'en' | 'nl';

export interface BlogPost {
  slug: string;
  titleKey: string;
  descKey: string;
  date: Date;
  readingTime: number;
}

export type TeaserStatus = 'new' | 'unread';

export interface ArticleTeaserPost extends BlogPost {
  status: TeaserStatus;
}

export interface ArticleHero {
  tagKey: string;
  titleKey: string;
  introKey: string;
  readingTimeKey: string;
  publishedKey: string;
}

export interface ArticleSection {
  titleKey: string;
  paragraphKeys: string[];
}

export interface ArticleCta {
  titleKey: string;
  descKey: string;
}

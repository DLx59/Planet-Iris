import { BlogPost } from '../../models/article.model';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'photo-iris-cataracte',
    titleKey: 'article-cataracte.hero-title',
    descKey: 'blog-page.posts.photo-iris-cataracte.desc',
    date: new Date('2026-03-28'),
    readingTime: 3,
  },
  {
    slug: 'iris-yeux-marrons',
    titleKey: 'article-marrons.hero-title',
    descKey: 'blog-page.posts.iris-yeux-marrons.desc',
    date: new Date('2026-02-12'),
    readingTime: 4,
  }
];

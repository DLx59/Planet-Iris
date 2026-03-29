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
    slug: 'photo-iris-animaux',
    titleKey: 'article-animaux.hero-title',
    descKey: 'blog-page.posts.photo-iris-animaux.desc',
    date: new Date('2026-03-25'),
    readingTime: 4,
  },
  {
    slug: 'familles-meme-couleur-yeux',
    titleKey: 'article-famille-couleur.hero-title',
    descKey: 'blog-page.posts.familles-meme-couleur-yeux.desc',
    date: new Date('2026-03-12'),
    readingTime: 4,
  },
  {
    slug: 'photo-iris-hainaut',
    titleKey: 'article-hainaut.hero-title',
    descKey: 'blog-page.posts.photo-iris-hainaut.desc',
    date: new Date('2026-03-07'),
    readingTime: 4,
  },
  {
    slug: 'iris-yeux-marrons',
    titleKey: 'article-marrons.hero-title',
    descKey: 'blog-page.posts.iris-yeux-marrons.desc',
    date: new Date('2026-02-12'),
    readingTime: 4,
  },
];

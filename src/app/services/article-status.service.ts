import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BLOG_POSTS} from '../pages/blog/blog.posts';

export type ArticleStatus = 'new' | 'unread' | 'read';

const STORAGE_KEY = 'planet-iris-read-articles';

@Injectable({providedIn: 'root'})
export class ArticleStatusService {
  private platformId = inject(PLATFORM_ID);
  private readSlugs = signal<Set<string>>(this.loadFromStorage());

  markAsRead(slug: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const current = this.readSlugs();
    if (current.has(slug)) return;
    const updated = new Set(current);
    updated.add(slug);
    this.readSlugs.set(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...updated]));
    } catch {
    }
  }

  getStatus(slug: string): ArticleStatus {
    if (this.readSlugs().has(slug)) return 'read';
    const newest = [...BLOG_POSTS].sort((a, b) => b.date.getTime() - a.date.getTime())[0];
    return slug === newest?.slug ? 'new' : 'unread';
  }

  private loadFromStorage(): Set<string> {
    if (!isPlatformBrowser(this.platformId)) return new Set();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set<string>(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  }
}

/**
 * Relations entre articles du blog.
 * Chaque clé est un slug, la valeur est la liste des slugs liés.
 * Les relations doivent être déclarées dans les deux sens.
 */
export const BLOG_RELATIONS: Readonly<Record<string, ReadonlyArray<string>>> = {
  'photo-iris-cataracte': ['iris-yeux-marrons'],
  'iris-yeux-marrons':    ['photo-iris-cataracte'],
};

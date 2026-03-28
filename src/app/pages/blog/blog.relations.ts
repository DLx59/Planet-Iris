/**
 * Relations entre articles du blog.
 * Chaque clé est un slug, la valeur est la liste des slugs liés.
 * Les relations doivent être déclarées dans les deux sens.
 */
export const BLOG_RELATIONS: Readonly<Record<string, ReadonlyArray<string>>> = {
  'photo-iris-animaux':        ['familles-meme-couleur-yeux', 'photo-iris-cataracte'],
  'familles-meme-couleur-yeux': ['iris-yeux-marrons', 'photo-iris-animaux'],
  'photo-iris-cataracte':      ['iris-yeux-marrons', 'photo-iris-animaux'],
  'iris-yeux-marrons':         ['photo-iris-cataracte', 'familles-meme-couleur-yeux'],
};

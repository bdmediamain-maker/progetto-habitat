export type ProjectCategory =
  | 'Residential'
  | 'Hospitality'
  | 'Contract'
  | 'Bioarchitecture';

export interface Project {
  id:       string;
  title:    string;
  category: ProjectCategory;
  location: string;
  year:     number;
  /** Replace each picsum seed with the real image path once assets arrive. */
  image:    string;
  featured: boolean;
}

/**
 * Six sample projects covering all four filter categories.
 * Image URLs use picsum.photos with fixed seeds for reproducibility.
 * Swap `image` paths to '/images/projects/{id}.jpg' once the client delivers assets.
 */
export const projects: Project[] = [
  {
    id:       'casa-bellini',
    title:    'Casa Bellini',
    category: 'Residential',
    location: 'Verona, IT',
    year:     2024,
    image:    'https://picsum.photos/seed/casabellini/600/800',
    featured: true,
  },
  {
    id:       'hotel-scaligero',
    title:    'Hotel Scaligero',
    category: 'Hospitality',
    location: 'Verona, IT',
    year:     2024,
    image:    'https://picsum.photos/seed/scaligero/600/800',
    featured: true,
  },
  {
    id:       'villa-montecchio',
    title:    'Villa Montecchio',
    category: 'Residential',
    location: 'Vicenza, IT',
    year:     2023,
    image:    'https://picsum.photos/seed/montecchio/600/800',
    featured: false,
  },
  {
    id:       'uffici-pragma',
    title:    'Uffici Pragma',
    category: 'Contract',
    location: 'Milan, IT',
    year:     2023,
    image:    'https://picsum.photos/seed/pragma/600/800',
    featured: false,
  },
  {
    id:       'casa-verde',
    title:    'Casa Verde',
    category: 'Bioarchitecture',
    location: 'Bologna, IT',
    year:     2024,
    image:    'https://picsum.photos/seed/casaverde/600/800',
    featured: true,
  },
  {
    id:       'rifugio-alpino',
    title:    'Rifugio Alpino',
    category: 'Hospitality',
    location: 'Trento, IT',
    year:     2022,
    image:    'https://picsum.photos/seed/rifugio/600/800',
    featured: false,
  },
];

export const ALL_FILTER = 'All' as const;
export type FilterValue = typeof ALL_FILTER | ProjectCategory;

export const FILTERS: FilterValue[] = [
  ALL_FILTER,
  'Residential',
  'Hospitality',
  'Contract',
  'Bioarchitecture',
];

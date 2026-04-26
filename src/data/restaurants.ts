export interface Restaurant {
  slug: string;
  name: { en: string; ja: string };
  address: { en: string; ja: string };
  coords?: [number, number]; // [lat, lng] — approximate until verified on-site
}

export const restaurants: Restaurant[] = [
  {
    slug: 'sushi-tatsu',
    name: {
      en: 'Sushi Tatsu',
      ja: '寿し辰',
    },
    address: {
      en: '24-4 Takko, Sannohe District, Aomori 039-0201, Japan',
      ja: '〒039-0201 青森県三戸郡田子町田子24-4',
    },
    coords: [40.34009082583211, 141.15081953731448],
  },
];

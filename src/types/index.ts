export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'ban-tho-treo' | 'ban-tho-dung' | 'combo-phong-tho' | 'phu-kien';
  categoryName: string;
  dimensions: string; // e.g. "48 x 81 cm"
  lobanInfo: {
    widthCung: string;
    widthMeaning: string;
    depthCung: string;
    depthMeaning: string;
    heightCung?: string;
    heightMeaning?: string;
  };
  woodType: string;
  price: number;
  originalPrice: number;
  warrantyYears: number;
  features: string[];
  description: string;
  imageUrl: string;
  images?: string[];
  badge?: string;
  rating: number;
  reviewCount: number;
}

export interface LobanCung {
  id: number;
  name: string;
  isGood: boolean;
  meaning: string;
  subCung: { name: string; isGood: boolean; detail: string }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  author: string;
  category: string;
  readingTime: string;
  coverImage: string;
  tags: string[];
}

export interface Package {
  _id: string;
  slug: 'free' | 'pro' | 'premium';
  name: {
    en: string;
    ar: string;
  };
  baseAnnualPrice: number;
  specialAnnualPrice?: number;
  baseMonthlyPrice: number;
  specialMonthlyPrice?: number;
  features: {
    en: string;
    ar: string;
  }[];
  isActive: boolean;
  bestDeal: boolean;
  sortOrder: number;
}

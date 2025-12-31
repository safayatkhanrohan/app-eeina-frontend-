export type CategoryType = 'diet' | 'cuisine' | 'meal_type' | 'dish';
export type Category = {
  name: {
    en: string;
    ar: string;
  };
  slug: {
    ar: string;
    en: string;
  };
  type: CategoryType;
  isFeatured: boolean;
  image: {
    url: string;
  };
};

export type Ingrdient = {
  name: {
    en: string;
    ar: string;
  };
  slug: {
    en: string;
    ar: string;
  };
  image: {
    url: string;
  };
};

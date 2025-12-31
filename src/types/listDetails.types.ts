type LocalizedString = { en: string; ar: string };

export interface RawListItem {
  unit: LocalizedString;
  item: {
    _id: string;
    name: LocalizedString;
    slug: LocalizedString;
    category: LocalizedString;
    image: { url: string; key: string };
  };
  itemType: 'Ingredient';
  quantity: number;
  recipe?: { _id: string };
  fruit?: { _id: string };
  status: 'pending' | 'purchased';
}

export interface FormattedListItem {
  item: string;
  itemType: 'Ingredient';
  quantity?: number;
  unit?: LocalizedString;
  recipe?: string;
  fruit?: string;
  status?: 'pending' | 'purchased';
}

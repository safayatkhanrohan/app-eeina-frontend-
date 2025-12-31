export type UnitSystem = 'original' | 'imperial' | 'metric';

export const arabicToEnglishUnit: Record<string, string> = {
  جرام: 'g',
  كيلو: 'kg',
  مللي: 'ml',
  لتر: 'l',
  كوب: 'cup',
  'ملعقة صغيرة': 'tsp',
  'ملعقة كبيرة': 'tbsp',
  أونصة: 'oz',
  باوند: 'lb',
  قطعة: 'piece',
  شريحة: 'slice',
  عنصر: 'item',
};

export const conversionMap: Record<
  string,
  { imperial?: { unit: string; factor: number }; metric?: { unit: string; factor: number } }
> = {
  g: { imperial: { unit: 'oz', factor: 0.035274 } },
  kg: { imperial: { unit: 'lb', factor: 2.20462 } },
  oz: { metric: { unit: 'g', factor: 28.3495 } },
  lb: { metric: { unit: 'kg', factor: 0.453592 } },

  ml: { imperial: { unit: 'cup', factor: 0.00422675 } },
  l: { imperial: { unit: 'cup', factor: 4.22675 } },
  cup: { metric: { unit: 'ml', factor: 236.588 } },
  tsp: { imperial: { unit: 'tsp', factor: 1 }, metric: { unit: 'ml', factor: 4.92892 } },
  tbsp: { imperial: { unit: 'tbsp', factor: 1 }, metric: { unit: 'ml', factor: 14.7868 } },

  piece: {},
  slice: {},
  item: {},
};

export const unitLabels: Record<string, Record<string, string>> = {
  en: {
    g: 'g',
    kg: 'kg',
    ml: 'ml',
    l: 'l',
    cup: 'cup',
    tsp: 'tsp',
    tbsp: 'tbsp',
    oz: 'oz',
    lb: 'lb',
    piece: 'piece',
    slice: 'slice',
    item: 'item',
  },
  ar: {
    g: 'جرام',
    kg: 'كيلو',
    ml: 'مللي',
    l: 'لتر',
    cup: 'كوب',
    tsp: 'ملعقة صغيرة',
    tbsp: 'ملعقة كبيرة',
    oz: 'أونصة',
    lb: 'باوند',
    piece: 'قطعة',
    slice: 'شريحة',
    item: 'عنصر',
  },
};

export const convertUnit = (
  quantity: number,
  unit: string,
  unitSystem: UnitSystem
): { quantity: number; unit: string } => {
  const englishUnit = arabicToEnglishUnit[unit] || unit;

  if (unitSystem === 'original') return { quantity, unit };

  const mapping = conversionMap[englishUnit.toLowerCase()];
  if (!mapping) return { quantity, unit };

  if (unitSystem === 'imperial' && mapping.imperial) {
    return {
      quantity: +(quantity * mapping.imperial.factor).toFixed(2),
      unit: mapping.imperial.unit,
    };
  }

  if (unitSystem === 'metric' && mapping.metric) {
    let qty = +(quantity * mapping.metric.factor);
    let newUnit = mapping.metric.unit;

    if (newUnit === 'l' && qty < 1) {
      qty = +(qty * 1000).toFixed(2);
      newUnit = 'ml';
    }

    return { quantity: +qty.toFixed(2), unit: newUnit };
  }

  return { quantity, unit };
};

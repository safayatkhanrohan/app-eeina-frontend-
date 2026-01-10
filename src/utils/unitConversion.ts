export const convertUnit = (
    quantity: number,
    unit: string,
    targetSystem: 'metric' | 'imperial',
    ingredientName?: string
): { quantity: number; unit: string } => {
    if (!quantity || !unit) return { quantity, unit };

    const normalizedUnit = unit.toLowerCase().trim();
    const normalizedName = ingredientName?.toLowerCase().trim() || '';

    // --- Constants ---
    const TSP_TO_ML = 4.92892; // US Tsp
    const TBSP_TO_ML = 14.7868; // US Tbsp
    const CUP_TO_ML = 236.588; // US Cup
    const FL_OZ_TO_ML = 29.5735;
    const OZ_TO_G = 28.3495;
    const LB_TO_G = 453.592;

    // --- Helpers ---
    const isLiquid = (name: string) => {
        const liquidKeywords = [
            'water', 'milk', 'oil', 'juice', 'vinegar', 'sauce', 'syrup', 'broth',
            'stock', 'wine', 'beer', 'cider', 'soda', 'beverage', 'drink', 'coffee', 'tea'
        ];
        return liquidKeywords.some(keyword => name.includes(keyword));
    };

    const isPowderOrSpice = (name: string) => {
        const keywords = [
            'salt', 'pepper', 'sugar', 'flour', 'powder', 'spice', 'soda',
            'cinnamon', 'cumin', 'paprika', 'turmeric', 'seasoning', 'herb',
            'garlic powder', 'onion powder'
        ];
        return keywords.some(keyword => name.includes(keyword));
    };

    // Simple Density Map (g/ml or g/cm3) - Approximation
    // Water = 1
    // Flour ~ 0.5-0.6
    // Surgar ~ 0.85
    // Salt ~ 1.2
    const getDensity = (name: string): number => {
        if (name.includes('flour')) return 0.55;
        if (name.includes('sugar')) return 0.85;
        if (name.includes('salt')) return 1.2;
        if (name.includes('butter')) return 0.95;
        if (name.includes('oil')) return 0.92;
        if (name.includes('water') || name.includes('milk')) return 1.0;
        return 1.0; // Default to water density if unknown
    };


    // --- Metric to Imperial Logic ---
    if (targetSystem === 'imperial') {
        // 1. Weight (g/kg) -> Volume (tsp/tbsp/cup) for Powders/Liquids if possible?
        //    Or Weight -> Weight (oz/lb)
        //    Let's prioritize:
        //    - If Liquid and unit is ml/l -> fl oz / cups
        //    - If Powder/Spice and small weight (g) -> tsp/tbsp (using density)
        //    - Else -> oz / lb

        if (['kg', 'kilogram', 'kilograms'].includes(normalizedUnit)) {
            return { quantity: Number((quantity * 2.20462).toFixed(2)), unit: 'lb' };
        }

        if (['g', 'gram', 'grams'].includes(normalizedUnit)) {
            // Smart Conversion for Spices/Powders
            if (isPowderOrSpice(normalizedName)) {
                // check amount, if small convert to tsp/tbsp
                // mass = density * volume  => volume = mass / density
                const density = getDensity(normalizedName); // g/ml
                const volumeMl = quantity / density;

                // If small volume (< 60ml ~ 1/4 cup), try tsp/tbsp
                if (volumeMl < 60) {
                    const bInTsp = volumeMl / TSP_TO_ML;
                    if (bInTsp < 3) return { quantity: Number(bInTsp.toFixed(1)), unit: 'tsp' };

                    const bInTbsp = volumeMl / TBSP_TO_ML;
                    return { quantity: Number(bInTbsp.toFixed(1)), unit: 'tbsp' };
                }

                // If larger volume, try cup
                const bInCups = volumeMl / CUP_TO_ML;
                return { quantity: Number(bInCups.toFixed(2)), unit: 'cup' };
            }

            // Default Weight Conversion
            // 1 g = 0.035 oz
            return { quantity: Number((quantity * 0.035274).toFixed(2)), unit: 'oz' };
        }

        if (['ml', 'milliliter', 'milliliters'].includes(normalizedUnit)) {
            if (quantity >= 236) { // >= 1 cup
                return { quantity: Number((quantity / CUP_TO_ML).toFixed(2)), unit: 'cup' };
            }
            return { quantity: Number((quantity * 0.033814).toFixed(2)), unit: 'fl oz' };
        }

        if (['l', 'liter', 'liters'].includes(normalizedUnit)) {
            // Liter -> Cups (approx 4.2)
            return { quantity: Number((quantity * 33.814).toFixed(2)), unit: 'fl oz' };
        }
    }


    // --- Imperial to Metric Logic ---
    if (targetSystem === 'metric') {
        // lb -> kg
        if (['lb', 'lbs', 'pound', 'pounds'].includes(normalizedUnit)) {
            return { quantity: Number((quantity * 0.453592).toFixed(2)), unit: 'kg' };
        }
        // oz -> g
        if (['oz', 'ounce', 'ounces'].includes(normalizedUnit)) {
            return { quantity: Number((quantity * OZ_TO_G).toFixed(1)), unit: 'g' };
        }
        // fl oz -> ml
        if (['fl oz', 'fluid ounce'].includes(normalizedUnit)) {
            return { quantity: Number((quantity * FL_OZ_TO_ML).toFixed(1)), unit: 'ml' };
        }
        // cup -> ml (or liters if large)
        if (['cup', 'cups'].includes(normalizedUnit)) {
            return { quantity: Number((quantity * CUP_TO_ML).toFixed(0)), unit: 'ml' };
        }
        // tsp -> ml (approx 5g for water-like, but let's stick to ml for metric volume)
        if (['tsp', 'teaspoon'].includes(normalizedUnit)) {
            // If we want to convert to Grams (standard metric for dry goods), we need density
            // But typically tsp is Volume. Metric Volume is ml.
            // Let's check if it's a solid powder, usually they prefer Grams in Metric recipes?
            // User asked to "convert cup and tsp" specifically.
            // Let's output 'ml' for now, or 'g' if we are sure it's dry?
            // Metric standard is usually Weight for dry, Volume for liquid.

            const volMl = quantity * TSP_TO_ML;
            if (isPowderOrSpice(normalizedName)) {
                const density = getDensity(normalizedName);
                const massG = volMl * density;
                return { quantity: Number(massG.toFixed(1)), unit: 'g' };
            }
            return { quantity: Number(volMl.toFixed(1)), unit: 'ml' };
        }
        if (['tbsp', 'tablespoon'].includes(normalizedUnit)) {
            const volMl = quantity * TBSP_TO_ML;
            if (isPowderOrSpice(normalizedName)) {
                const density = getDensity(normalizedName);
                const massG = volMl * density;
                return { quantity: Number(massG.toFixed(1)), unit: 'g' };
            }
            return { quantity: Number(volMl.toFixed(1)), unit: 'ml' };
        }
    }

    return { quantity, unit };
};

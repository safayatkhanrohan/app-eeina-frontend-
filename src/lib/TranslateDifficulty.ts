export const getTranslatedDifficulty = (difficulty:string,t:any) => {
  switch (difficulty) {
    case "beginner": return t.recipe.beginner;
    case "intermediate": return t.recipe.intermediate;
    case "advanced": return t.recipe.advanced;
    default: return difficulty;
  }
};
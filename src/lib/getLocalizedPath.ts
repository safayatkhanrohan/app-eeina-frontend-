
 export const getLocalizedPath = (path: string,language:string) => {
      return language === "ar" ? `/ar${path === "/" ? "" : path}` : path;
   };
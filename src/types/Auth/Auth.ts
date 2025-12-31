export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: { url: string };
  profilePicture?: { url: string };
  coverPhoto?: { url: string };
  followerCount?: number;
  totalRecipe?: number;
  following?: any[];
  likedRecipes?: any[];
  accountStatus?: string;
  fullName?: string;
  createdAt?: string;
  createdBy?: string;
  isEmailVerified?: boolean;
  accountType?: string;
  profileCompletion?: number;
  location?: Location[];
  bio?: string;
  publishedRecipe?: number;
  draftRecipe?: number;
  pendingRecipe?: number;
  rejectedRecipe?: number;
  website?: string;
  instagram?: string;
  savedRecipes?: any[];
}

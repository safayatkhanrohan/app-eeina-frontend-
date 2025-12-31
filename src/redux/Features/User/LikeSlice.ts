import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikesState {
   [recipeId: string]: boolean;
}

const initialState: LikesState = {};

const likesSlice = createSlice({
   name: "likes",
   initialState,
   reducers: {
      toggleLike: (state, action: PayloadAction<{ recipeId: string; liked: boolean }>) => {
         if (!action.payload.recipeId) return;
         state[action.payload.recipeId] = action.payload.liked;
      },
      setLikes: (state, action: PayloadAction<LikesState>) => {
         return { ...state, ...action.payload };
      },
   },
});

export const { toggleLike, setLikes } = likesSlice.actions;
export default likesSlice.reducer;

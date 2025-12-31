import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SaveState {
   [recipeId: string]: boolean;
}
const initialState: SaveState = {};

const SaveSlice = createSlice({
   name: "save",
   initialState,
   reducers: {
      toggleSave: (state, action: PayloadAction<{ recipeId: string; saved: boolean }>) => {
         if (!action.payload.recipeId) return;
         state[action.payload.recipeId] = action.payload.saved;
      },
      setSave: (state, action: PayloadAction<SaveState>) => {
         return { ...state, ...action.payload };
      },
   },
});

export const { toggleSave, setSave } = SaveSlice.actions;
export default SaveSlice.reducer;

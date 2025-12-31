import { createSlice } from '@reduxjs/toolkit';

interface GlobalState {
  isPremiumModalOpen: boolean;
}

const initialState: GlobalState = {
  isPremiumModalOpen: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openPremiumModal: (state) => {
      state.isPremiumModalOpen = true;
    },
    closePremiumModal: (state) => {
      state.isPremiumModalOpen = false;
    },
    togglePremiumModal: (state) => {
      state.isPremiumModalOpen = !state.isPremiumModalOpen;
    },
  },
});

export const { openPremiumModal, closePremiumModal, togglePremiumModal } = globalSlice.actions;
export default globalSlice.reducer;

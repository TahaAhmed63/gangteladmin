import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  raritys: [],
};


const slice = createSlice({
  name: 'rarity',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET rarity
    getraritySuccess(state, action) {
      state.isLoading = false;
      state.raritys = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getRaritys() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('rarity');
      console.log(response,'rarity--->>>>')
      dispatch(slice.actions.getraritySuccess(response?.data?.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


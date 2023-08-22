import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  positions: [],
};


const slice = createSlice({
  name: 'position',
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

    // GET gang
    getPositionSuccess(state, action) {
      state.isLoading = false;
      state.positions = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getPosition() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/admin/gangposition');
      console.log(response,'gang--->>>>')
      dispatch(slice.actions.getPositionSuccess(response?.data?.gang_positions));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


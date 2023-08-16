import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  gangs: [],
};


const slice = createSlice({
  name: 'gang',
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
    getGangSuccess(state, action) {
      state.isLoading = false;
      state.gangs = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getGangs() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/gang');
      console.log(response,'gang--->>>>')
      dispatch(slice.actions.getGangSuccess(response?.data?.gangs));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


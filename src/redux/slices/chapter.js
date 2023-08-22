import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { dispatch } from '../store';

const initialState = {
  isLoading: false,
  error: null,
  chapters: [],
};


const slice = createSlice({
  name: 'chapter',
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

    // GET chapter
    getChapterSuccess(state, action) {
      state.isLoading = false;
      state.chapters = action.payload;
    },

  },
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------

export function getChapters(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`admin/gangchapter?gang_id=${id}`);
      console.log(response,'chapter--->>>>')
      dispatch(slice.actions.getChapterSuccess(response?.data?.gang_chapters));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/Api/MovieApi'
import { APIkey } from '../../common/Api/MovieAPiKey'

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {
    const movieText = "Harry";
    const response = await movieApi.get(`?apiKey=${APIkey}&s=${movieText}&type=movie`)
        .catch((err) => {
            console.log('error', err);

        });
    return response.data

});
export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(`?apiKey=${APIkey}&s=${seriesText}&type=series`)
        .catch((err) => {
            console.log('error', err);

        });
    return response.data

});
export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {
    const response = await movieApi.get(`?apiKey=${APIkey}&i=${id}&Plot=full`)
        .catch((err) => {
            console.log('error', err);

        });
    return response.data

});

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {}
}
const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log('pending')
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log('fetch success');
            return { ...state, movies: payload }
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log('Rejected');

        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log('fetch success');
            return { ...state, shows: payload }
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log('fetch success');
            return { ...state, selectMovieOrShow: payload }
        },
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
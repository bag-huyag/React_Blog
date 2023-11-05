/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '../../Api/Api';

import { updateOneFavorited } from './articleListSlice';

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (slug, { rejectWithValue }) => {
    try {
        const data = await api.getArticle(slug);
        return data;
    } catch (error) {
        return rejectWithValue(`${error}`);
    }
});

export const createArticle = createAsyncThunk(
    'article/createArticle',
    async ({ newArticle, navigate }, { rejectWithValue }) => {
        try {
            const data = await api.createArticle(newArticle);
            navigate(`/articles/${data.article.slug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async ({ newArticle, slug, navigate }, { rejectWithValue }) => {
        try {
            const data = await api.updateArticle(newArticle, slug);
            navigate(`/articles/${data.article.slug}`);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async ({ slug, navigate }, { rejectWithValue }) => {
        try {
            const data = await api.deleteArticle(slug);
            navigate('/');
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const favoriteArticle = createAsyncThunk(
    'article/favoriteArticle',
    async (slug, { rejectWithValue, dispatch }) => {
        try {
            const data = await api.favoriteArticle(slug);
            const { slug: id, favorited, favoritesCount } = data.article;
            dispatch(updateOneFavorited({ id, changes: { favorited, favoritesCount } }));

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const unfavoriteArticle = createAsyncThunk(
    'article/unfavoriteArticle',
    async (slug, { rejectWithValue, dispatch }) => {
        try {
            const data = await api.unfavoriteArticle(slug);
            const { slug: id, favorited, favoritesCount } = data.article;
            dispatch(updateOneFavorited({ id, changes: { favorited, favoritesCount } }));

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    article: {
        slug: '',
        title: '',
        description: '',
        body: '',
        tagList: [''],
        createdAt: '2023-06-18T16:07:31.212Z',
        updatedAt: '2023-06-18T16:07:31.212Z',
        favorited: true,
        favoritesCount: 0,
        author: {
            username: '',
            bio: '',
            image: '',
            following: false,
        },
    },
    status: null,
    error: {},
    isLoading: false,
};

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchArticle.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(fetchArticle.fulfilled, (state, action) => {
            state.article = action.payload.article;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchArticle.rejected, (state, action) => {
            state.error = `${action.payload}`;
            state.status = 'rejected';
        });
        builder.addCase(createArticle.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createArticle.fulfilled, (state, action) => {
            state.article = action.payload.article;
            state.isLoading = false;
        });
        builder.addCase(createArticle.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(updateArticle.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateArticle.fulfilled, (state, action) => {
            state.article = action.payload.article;
            state.isLoading = false;
        });
        builder.addCase(updateArticle.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteArticle.pending, (state) => {
            state.error.delete = false;
            state.isLoading = true;
        });
        builder.addCase(deleteArticle.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(deleteArticle.rejected, (state) => {
            state.error.delete = true;
            state.isLoading = false;
        });
        builder.addCase(favoriteArticle.fulfilled, (state) => {
            state.article.favorited = true;
            state.article.favoritesCount += 1;
        });
        builder.addCase(unfavoriteArticle.fulfilled, (state) => {
            state.article.favorited = false;
            state.article.favoritesCount -= 1;
        });
    },
});

export const selectArticle = (state) => state.article.article;
export const selectStatus = (state) => state.article.status;
export const selectError = (state) => state.article.error;
export const selectIsLoading = (state) => state.article.isLoading;
export default articleSlice.reducer;

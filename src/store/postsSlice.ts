import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { Post } from '../types/post.type'
import {
  getPosts,
  getPostsByUsername,
  getPostById,
  createPost,
  deletePost
} from '../services/apiService'

interface PostsState {
  posts: Post[]
  selectedPost: Post | null
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  posts: [],
  selectedPost: null,
  loading: false,
  error: null
}

// === THUNKS ===

export const fetchAllPosts = createAsyncThunk('posts/fetchAll', async () => {
  return await getPosts()
})

export const fetchPostsByUsername = createAsyncThunk(
  'posts/fetchByUser',
  async (username: string) => {
    return await getPostsByUsername(username)
  }
)

export const fetchPostById = createAsyncThunk(
  'posts/fetchById',
  async (id: string) => {
    return await getPostById(id)
  }
)

export const createNewPost = createAsyncThunk(
  'posts/create',
  async (post: Omit<Post, 'id'>) => {
    return await createPost(post)
  }
)

export const deletePostById = createAsyncThunk(
  'posts/delete',
  async (id: string) => {
    await deletePost(id)
    return id
  }
)

// === SLICE ===

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchAllPosts.rejected, (state) => {
        state.loading = false
        state.error = 'Error al cargar los posts'
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.selectedPost = action.payload
      })

      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })

      .addCase(deletePostById.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p.id !== action.payload)
      })
  }
})

export default postsSlice.reducer

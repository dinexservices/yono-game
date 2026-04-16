import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface Game {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  logoUrl?: string;
  category?: string;
  rating?: number;
  size?: string;
  signupBonus?: number;
  minWithdraw?: number;
  downloadUrl?: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  isNewGame?: boolean;
  isFree?: boolean;
  createdAt?: string;
}

interface GameState {
  games: Game[];
  selectedGame: Game | null;
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  selectedGame: null,
  loading: false,
  error: null,
};

export const fetchAllGames = createAsyncThunk(
  "game/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const allGames: Game[] = [];
      let page = 1;
      while (true) {
        const res = await api.get(`/get-all-game?page=${page}&limit=100`);
        const batch: Game[] = (res.data.data || []).filter(Boolean);
        if (batch.length === 0) break;
        allGames.push(...batch);
        // If server returned fewer items than the limit we've hit the last page
        if (batch.length < 100) break;
        page++;
      }
      return allGames;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch games");
    }
  }
);

export const fetchGameBySlug = createAsyncThunk(
  "game/fetchOne",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/${slug}`);
      return res.data.data as Game;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Game not found");
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    clearSelectedGame(state) {
      state.selectedGame = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGames.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAllGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchAllGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchGameBySlug.pending, (state) => { state.loading = true; })
      .addCase(fetchGameBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedGame } = gameSlice.actions;
export default gameSlice.reducer;
// Keep legacy alias so any other imports don't break
export const fetchGames = fetchAllGames;

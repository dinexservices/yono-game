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

export const fetchGames = createAsyncThunk(
  "game/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/get-all-game");
      return res.data.data as Game[];
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
      .addCase(fetchGames.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
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

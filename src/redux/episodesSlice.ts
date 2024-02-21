import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Episode } from "../../types";
import MyCustomApiService from "./myCustomApiService";
import { updateEpisodeSeasonAndNumber, getRandomImage } from "@/utils/utils";
import config from "@/config";

const EPISODES_API_URL = config.EPISODES_API_URL;

interface EpisodesState {
  episodesMap: Object | null;
  episodesArray: Episode[];
  filterdEpisodes: Episode[];
  episode: Episode | null;
  seasons: string[];
}

const initialState: EpisodesState = {
  episodesMap: null,
  episodesArray: [],
  filterdEpisodes: [],
  episode: null,
  seasons: [],
};

type EpisodesMap = {
  [key: string]: Episode[];
};

export const fetchEpisodesData = createAsyncThunk(
  "episodes/fetchEpisodesData",
  async (url: string) => {
    try {
      const episodes = await MyCustomApiService.getAllEpisodes(url);
      return updateEpisodeSeasonAndNumber(episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }
  }
);

export const fetchFilterdEpisodesData = createAsyncThunk(
  "episodes/fetchFilterdEpisodesData",
  async (ids: string[]) => {
    try {
      const episodes = await MyCustomApiService.fetchData(`${EPISODES_API_URL}${ids}`);
      return updateEpisodeSeasonAndNumber(episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }
  }
);

export const fetchEpisodeInfo = createAsyncThunk(
  "episodes/fetchEpisodeInfo",
  async (id: string) => {
    try {
      return await MyCustomApiService.fetchData(`${EPISODES_API_URL}${id}`);
    } catch (error) {
      console.error("Error fetching episode info:", error);
      throw error;
    }
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setEpisodesArray: (state, action: PayloadAction<Episode[]>) => {
      state.episodesArray = action.payload;
    },
    setEpisodesMap: (state, action: PayloadAction<EpisodesMap>) => {
      state.episodesMap = action.payload;
    },
    setEpisode: (state, action: PayloadAction<Episode>) => {
      state.episode = action.payload;
    },
    setFilterdEpisodes: (state, action: PayloadAction<Episode[]>) => {
      state.filterdEpisodes = action.payload;
    },
    setSeasons: (state, action: PayloadAction<string[]>) => {
      state.seasons = [...state.seasons, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEpisodesData.fulfilled, (state, action) => {
      state.episodesArray = action.payload;
    });
    builder.addCase(fetchFilterdEpisodesData.fulfilled, (state, action) => {
      state.filterdEpisodes = action.payload;
    });
    builder.addCase(fetchEpisodeInfo.fulfilled, (state, action) => {
      state.episode = action.payload;
    });
  },
});

export type { EpisodesMap };
export const episodesActions = episodesSlice.actions;
export default episodesSlice.reducer;

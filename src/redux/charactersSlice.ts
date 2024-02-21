import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "../../types";
import config from "@/config";
import {
  getDate as getFirstSeenDate,
} from "@/utils/utils";
import MyCustomApiService from "./myCustomApiService";

const CHARACTERS_API_URL = config.CHARACTERS_API_URL;

interface CharacterState {
  characters: Character[];
  character: Character | null;
  firstSeenIn: string;
}

const initialState: CharacterState = {
  characters: [],
  character: null,
  firstSeenIn: "",
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async (characterIds: string[]) => {
    try {
      const charactersData = await MyCustomApiService.fetchData(
        `${CHARACTERS_API_URL}${characterIds}`
      );
      return charactersData;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }
);

export const fetchCharacterInfo = createAsyncThunk(
  "characters/fetchCharacterInfo",
  async (characterId: string) => {
    try {
      const character = await MyCustomApiService.fetchData(
        `${CHARACTERS_API_URL}${characterId}`
      );
      const date = getFirstSeenDate(character.created);
      return { character, date };
    } catch (error) {
      console.error("Error fetching character info:", error);
      throw error;
    }
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setAllCharacters: (state, action: PayloadAction<Character[]>) => {
      state.characters = action.payload;
    },
    setCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload;
    },
    setFirstSeenIn: (state, action: PayloadAction<string>) => {
      state.firstSeenIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
     builder.addCase(fetchCharacterInfo.fulfilled, (state, action) => {
       const { character, date } = action.payload;
       state.character = character;
       state.firstSeenIn = date;
     });
  },
  
});

export const characterActions = charactersSlice.actions;
export default charactersSlice.reducer;
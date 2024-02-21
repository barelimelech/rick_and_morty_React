import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EpisodesList from "@/components/EpisodesList";
import { AppDispatch, RootState } from "../redux/store";
import {
  episodesActions,
  EpisodesMap,
  fetchEpisodesData,
} from "../redux/episodesSlice";
import { Episode } from "../../types";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import SeasonSelector from "../components/SeasonSelector";
import titleImage from "../../public/images/rick_and_morty.jpg";
import config from "@/config";

const EPISODES_API_URL = config.EPISODES_API_URL;

const Main = () => {
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  const episodesArray = useSelector(
    (state: RootState) => state.episodes.episodesArray
  );
  const episodesMap = useSelector(
    (state: RootState) => state.episodes.episodesMap
  );
  const filterdEpisodes = useSelector(
    (state: RootState) => state.episodes.filterdEpisodes
  );
  const seasons = useSelector((state: RootState) => state.episodes.seasons);

  useEffect(() => {
    setEpisodesArray();
  }, []);

  useEffect(() => {
    if (seasons?.length !== 0) {
      return;
    }
    const organizedEpisodes = organizeEpisodesBySeason(episodesArray);
    dispatch(episodesActions.setEpisodesMap(organizedEpisodes));
  }, [episodesArray]);

  const setEpisodesArray = async () => {
    setLoading(true);
    try {
      if (episodesArray.length === 0) {
        await dispatch(fetchEpisodesData(EPISODES_API_URL));
      }
    } catch (error) {
      console.error("Error fetching episodes data:", error);
    } finally {
      setLoading(false);
    }
  };

  const organizeEpisodesBySeason = (episodesData: Episode[]) => {
    const episodesMap = new Map<string, Episode[]>();
    const seasonRegex = /S(\d{2})/;
    episodesData.forEach((episode) => {
      const match = episode.episode.match(seasonRegex);
      const season = match ? String(parseInt(match[1], 10)) : "-1";
      if (episodesMap.has(season)) {
        episodesMap.get(season)?.push(episode);
      } else {
        dispatch(episodesActions.setSeasons([season]));
        episodesMap.set(season, [episode]);
      }
    });
    return Object.fromEntries(episodesMap);
  };

  const handleSeasonSelected = (season: string) => {
    if (season === "-1") {
      return;
    }
    if (season === "all") {
      dispatch(episodesActions.setFilterdEpisodes(episodesArray));
      return;
    }
    dispatch(episodesActions.setFilterdEpisodes([]));
    const episodes = (episodesMap as EpisodesMap)?.[season] || [];
    dispatch(episodesActions.setFilterdEpisodes(episodes));
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: theme.spacing(2),
        }}
      >
        <img
          src={titleImage.src}
          alt="Top Image"
          style={{
            width: "40%",
            maxWidth: "100%",
            height: "auto",
          }}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <SeasonSelector
              seasons={seasons}
              onSeasonSelect={handleSeasonSelected}
            />
            <Typography sx={{ marginTop: "10px" }}>
              {filterdEpisodes.length} episodes
            </Typography>
            <Box
              sx={{
                marginTop: theme.spacing(2),
                marginBottom: theme.spacing(2),
                [theme.breakpoints.down("sm")]: {
                  minWidth: "100%",
                },
                [theme.breakpoints.down("md")]: {
                  minWidth: "100%",
                },
                minWidth: "1000px",
              }}
            >
              <EpisodesList episodes={filterdEpisodes} title="Episodes" />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Main;

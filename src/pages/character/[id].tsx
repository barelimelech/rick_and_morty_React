import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { fetchFilterdEpisodesData } from "@/redux/episodesSlice";
import { fetchCharacterInfo } from "@/redux/charactersSlice";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
  Box,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EpisodesList from "@/components/EpisodesList";

const Character = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { id } = router.query;
  const theme = useTheme();

  const character = useSelector(
    (state: RootState) => state.characters.character
  );
  const filterdEpisodes = useSelector(
    (state: RootState) => state.episodes.filterdEpisodes
  );
  const firstSeenIn = useSelector(
    (state: RootState) => state.characters.firstSeenIn
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setCharacterData();
  }, [id]);

  const setCharacterData = async () => {
    if (id) {
      setLoading(true);
      try {
        await dispatch(fetchCharacterInfo(id as string));
      } catch (error) {
        console.error("Error fetching character info:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (character !== null) {
      setAllEpisodes();
    }
  }, [character]);

  const setAllEpisodes = async () => {
    try {
      const episodesIds = character?.episode.map((url) => {
        const parts = url.split("/");
        return parts[parts.length - 1];
      });
      dispatch(fetchFilterdEpisodesData(episodesIds as string[]));
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      marginBottom={theme.spacing(2)}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <IconButton onClick={handleBackClick} style={{ zIndex: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: 900,
              minHeight: 700,
              boxShadow: 3,
              p: theme.spacing(2),
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <CardMedia
                  key={character?.id}
                  component="img"
                  alt={character?.name}
                  sx={{
                    width: "95%",
                    borderRadius: 2,
                  }}
                  image={character?.image}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <CardContent
                  sx={{
                    minHeight: "200px",
                    minWidth: "100px",
                    padding: theme.spacing(1),
                  }}
                >
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ marginBottom: theme.spacing(2) }}
                  >
                    {character?.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Status: {character?.status}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Species: {character?.species}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Last known location: {character?.location?.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    First seen in: {firstSeenIn}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={12}>
                <EpisodesList
                  episodes={filterdEpisodes}
                  title={"Acts on episodes"}
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Character;

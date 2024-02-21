import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useRouter } from "next/router";
import { fetchCharacters } from "@/redux/charactersSlice";
import CharactersList from "@/components/CharactersList";
import { fetchEpisodeInfo } from "@/redux/episodesSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Episode = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const theme = useTheme();

  const episode = useSelector((state: RootState) => state.episodes.episode);
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );

   useEffect(() => {
     setEpisodeData();
   }, [id]);

   const setEpisodeData = async () => {
     if (id) {
       setLoading(true);
       try {
         await dispatch(fetchEpisodeInfo(id as string));
       } catch (error) {
         console.error("Error fetching episode info:", error);
       } finally {
         setLoading(false);
       }
     }
   };

  useEffect(() => {
    if (episode !== null) {
      setLoading(false);
      setAllCharacters();
    }
  }, [episode]);

  const setAllCharacters = async () => {
    try {
      const characterIds = episode?.characters.map((url: string) => {
        const parts = url.split("/");
        return parts[parts.length - 1];
      });
      if (characterIds) {
        dispatch(fetchCharacters(characterIds));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box marginBottom="10px">
          <IconButton
            onClick={handleBackClick}
            style={{
              zIndex: 1,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              width: 800,
              boxShadow: theme.shadows[3],
              p: theme.spacing(2),
              [theme.breakpoints.down("sm")]: {
                width: "100%",
              },
              [theme.breakpoints.down("md")]: {
                width: "100%",
              },
            }}
          >
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
                Episode {episode?.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Air date: {episode?.air_date}
              </Typography>
              <Box display="flex" justifyContent="center">
                <CharactersList characters={characters} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Episode;

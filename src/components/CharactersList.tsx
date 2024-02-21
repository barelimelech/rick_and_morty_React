import React, { useState } from "react";
import {
  Box,
  TextField,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  ListSubheader,
} from "@mui/material";
import { useRouter } from "next/router";
import { Character } from "../../types";

interface CharactersListProps {
  characters: Character[];
}

const CharactersList = ({ characters }: CharactersListProps) => {
  const router = useRouter();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleCardClick = (characterId: number) => {
    router.push(`/character/${characterId}`);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      }}
    >
      <TextField
        label="Search Character"
        variant="outlined"
        margin="normal"
        value={searchQuery}
        onChange={handleSearch}
        style={{ width: "410px", marginLeft: "auto" }}
        sx={{ height: 50 }}
      />
      <List
        sx={{
          height: "700px",
          maxWidth: "510px",
          overflowY: "auto",
          marginTop: theme.spacing(1),
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
        subheader={<ListSubheader>Characters</ListSubheader>}
      >
        {filteredCharacters.map((character) => (
          <ListItem
            key={character.id}
            component="div"
            sx={{
              display: "flex",
              "&:hover": {
                boxShadow: "md",
                borderColor: "neutral.outlinedHoverBorder",
              },
            }}
            onClick={() => handleCardClick(character.id)}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={character.name} src={character.image} />
              </ListItemAvatar>
              <ListItemText primary={character.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CharactersList;

import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface SeasonSelectorProps {
  seasons: string[];
  onSeasonSelect: (selectedSeason: string) => void;
}

const SeasonSelector = ({ seasons, onSeasonSelect }: SeasonSelectorProps) => {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const handleSeasonSelect = (event: SelectChangeEvent<string>) => {
    const season = event.target.value;
    setSelectedSeason(season);
    onSeasonSelect(season);
  };

  useEffect(() => {
    if (seasons?.length > 0 && selectedSeason === null) {
      setSelectedSeason(seasons[0]);
      onSeasonSelect(seasons[0]);
    }
    return () => {
    };
  }, [seasons, selectedSeason, onSeasonSelect]);

  return (
    <FormControl>
      <Select value={selectedSeason || ""} onChange={handleSeasonSelect}>
        {seasons?.map((season) => (
          <MenuItem key={season} value={season}>
            {`Season ${season}`}
          </MenuItem>
        ))}
        <MenuItem key={"all"} value={"all"}>
          {`All Seasons`}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SeasonSelector;

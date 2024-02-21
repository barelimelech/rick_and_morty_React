import { Episode } from "../../types"

const updateEpisodeSeasonAndNumber = (episodes: Episode[]) => {
  const episodesArray = Array.isArray(episodes) ? episodes : [episodes];
  const seasonRegex = /S(\d{2})/;
  const numberRegex = /E(\d{2})/;
  episodesArray.forEach((episode) => {
    const match = episode.episode.match(seasonRegex);
    const numMatch = episode.episode.match(numberRegex);
    const season = match ? String(parseInt(match[1], 10)) : "-1";
    const number = numMatch ? String(parseInt(numMatch[1], 10)) : "-1";
    episode.season = season;
    episode.number = number
  });
  return episodesArray;
};

const getRandomImage = (totalImages: number):  string  => {
  const randomIndex = Math.floor(Math.random() * totalImages) + 1;
  const imagePath = `../images/img${randomIndex}.jpg`;
  return imagePath ;
};

const getDate = (date: string) => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export { updateEpisodeSeasonAndNumber, getRandomImage, getDate };
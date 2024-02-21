import axios from "axios";
import { Episode } from "../../types";

class MyCustomApiService {
  async getAllEpisodes(url: string): Promise<Episode[]> {
    const resultsArray: Episode[] = [];
    await this.fetchAPI(url, resultsArray);
    return resultsArray;
  }

  async fetchData(url: string) {
    try {
      const result = await axios.get(url);
      return result?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async fetchAPI(url: string, resultsArray: Episode[]) {
    while (url !== null) {
      try {
        const result = await this.fetchData(url);
        url = result?.info?.next;
        resultsArray.push(...result.results);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export default new MyCustomApiService();

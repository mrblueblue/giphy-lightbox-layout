import axios from "axios";
import { API_KEY } from "../constants/apikey";

const BASE_URL = "https://api.giphy.com/v1/gifs";

export const defaultParams = {
  category: "trending",
  rating: "G",
  limit: 25,
  offset: 0
};

export const getGIFS = (params = defaultParams) =>
  axios
    .get(
      `${BASE_URL}/${params.category}?api_key=${API_KEY}&limit=${
        params.limit
      }&offset=${params.offset}&rating=${params.rating}`
    )
    .then(({ data }) => {
      return data.data.map(
        ({
          images: {
            fixed_width_still,
            fixed_width,
            original
          }
        }) => {
          return {
            original: original.url,
            preview: fixed_width_still ? fixed_width_still.url : "",
            url: fixed_width.url,
            width: fixed_width_still.width,
            height: fixed_width_still.height,
          };
        }
      );
    });

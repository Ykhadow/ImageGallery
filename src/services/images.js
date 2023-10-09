import axios from "axios";

const URL = import.meta.env.VITE_BASEURL;

/**
 * Fetches all the data that is to be displayed on the images page
 */
export const getImageList = (page = 2, size = 15) => {
  return axios.get(`${URL}/v2/list?&page=${page}&limit=${size}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

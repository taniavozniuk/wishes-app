import axios from "axios";
import type { WishData } from "../../types/WishData";

const BASE_URL = "http://localhost:3001/wishes";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const wishGet = async () => {
  try {
    const response = await apiClient.get("?action=get");
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const wishPost = async (WishData: WishData) => {
  try {
    const response = await apiClient.post("?action=post", WishData);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

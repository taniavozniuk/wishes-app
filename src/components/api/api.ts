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

export const wishPost = async (wish: Omit<WishData, "id">) => {
  try {
    const response = await apiClient.post("?action=post", wish);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const wishDelete = async (id: number) => {
  try {
    const response = await apiClient.delete(`${id}?action=delete`);
    return response.data;
  } catch (err) {
    console.error("Failer to dalete wish", err);
  }
};

export const wishPut = async (id: number, updatedWish: WishData) => {
  try {
    const response = await apiClient.put(`${id}?action=update`, updatedWish);
    return response.data;
  } catch (err) {
    console.error("Failed to update wish:", err);
    throw err;
  }
};

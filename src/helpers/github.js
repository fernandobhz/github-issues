import axios from "axios";
import { GITHUB_API_ENDPOINT } from "../core/config";

const api = axios.create({
  baseURL: GITHUB_API_ENDPOINT,
});

export const search = async name => {
  const { data } = await api.get("/search/repositories", { params: { q: name } });
  return data;
};

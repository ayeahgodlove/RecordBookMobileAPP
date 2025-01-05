import axios from "axios";
import { tokenConfig } from "../models/config.model";

export function setAccessToken(token: string) {
  tokenConfig.token = token;
}

export function setAuthHeader(token: string) {
  axios.defaults.headers.common["Authorization"] = token
    ? "Bearer " + token
    : "";
}

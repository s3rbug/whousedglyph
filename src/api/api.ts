import axios from "axios";
import { isDevelopment } from "../utils/isDevelopment";

export const instance = axios.create({
    baseURL: isDevelopment() ? "http://127.0.0.1:8000/api/" : "https://go-api-glyph.herokuapp.com/",
})
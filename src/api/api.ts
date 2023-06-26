import axios from "axios";
import { isDevelopment } from "../utils/isDevelopment";

export const instance = axios.create({
    baseURL: isDevelopment() ? "http://127.0.0.1:8000/api/" : "https://go-glyph-v2-f53b68856ba5.herokuapp.com/api/",
})
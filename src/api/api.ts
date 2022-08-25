import axios from "axios";

export const instance = axios.create({
    baseURL: "https://go-api-glyph.herokuapp.com/"
})
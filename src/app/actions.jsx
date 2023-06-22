import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "./contants";

export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (param) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", param.sourceLang.value);
    encodedParams.set("target_language", param.targetLang.value);
    encodedParams.set("text", param.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "6531794c49msh38dff0025c8d668p1c1dcdjsncfc3e0e62e8c",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const res = await axios.request(options);
    console.log(res);
    return res.data.data.translatedText;
  }
);

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const res = await axios.request(options);
    const languages = res.data.data.languages;
    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));
    return newLanguages;
  }
);

import { NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

const data = qs.stringify({
  'grant_type': "client_credentials",
  'client_id': process.env.SPOTIFY_CLIENT_ID,
  'client_secret': process.env.SPOTIFY_SECRET_KEY
});

export const GET = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (!response?.data) {
        return NextResponse.json({ error: "Invalid credentials" });
    }
    return NextResponse.json({ access_token: response.data.access_token });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

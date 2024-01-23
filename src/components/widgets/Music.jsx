"use client";
import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Music = () => {
  const spotifyRequest = async () => {
    let accessToken = Cookies.get("spotifyAccessToken");
    if (!accessToken) {
      const response = await axios.get("/api/spotify/get");
      accessToken = response?.data?.access_token;
      Cookies.set("spotifyAccessToken", accessToken, { expires: 3600 / (60 * 60 * 24) }); // Set cookie to expire in 3600 seconds (1 hour)
    }
    return accessToken;
  };

  useEffect(() => {
    spotifyRequest();
  }, [])

  return (
    <div className="flex-grow pl-2 mt-5 ml-4 mr-3 bg-gray-800 border-2 h-[300px] border-white rounded-lg">
      <h1>Test</h1>
    </div>
  );
};

export default Music;

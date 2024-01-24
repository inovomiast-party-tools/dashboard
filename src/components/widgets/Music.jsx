"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaSpotify } from "react-icons/fa";
import Link from "next/link";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const spotifyKeyRequest = async () => {
    let accessToken = Cookies.get("spotifyAccessToken");
    if (!accessToken) {
      setLoading(true); // Start loading
      try {
        const response = await axios.get("/api/spotify/get");
        accessToken = response?.data?.access_token;
        Cookies.set("spotifyAccessToken", accessToken, { expires: 1 / 24 }); // Set cookie to expire in 1 hour
      } catch (error) {
        console.error("Error fetching Spotify access token:", error);
      }
      setLoading(false); // End loading
    }
    return accessToken;
  };

  const spotifyGetPlaylist = async (accessToken, playlistId) => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMusic(response?.data?.tracks?.items);
    } catch (error) {
      console.error("Error fetching Spotify playlist:", error);
    }
    setLoading(false); // End loading
  };

  // const getSpotifyPlayerStatus = async (accessToken) => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.spotify.com/v1/me/player/",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error fetching Spotify player status:", error);
  //   }
  // }

  useEffect(() => {
    const fetchPlaylist = async () => {
      const accessToken = await spotifyKeyRequest();
      if (accessToken) {
        await spotifyGetPlaylist(accessToken, "0A7eQhj1o9OL9xyO6pUycr");
      }
    };

    fetchPlaylist(); // Fetch playlist on component mount
    // Fetch playlist every 10 minutes
    const fetchPlaylistInterval = setInterval(() => {
      fetchPlaylist();
    }, 600000);

    return () => clearInterval(fetchPlaylistInterval);
  }, []);

  return (
    <div className="flex-grow pl-2 mt-5 ml-4 mr-3 bg-gray-800 border-2 h-[295px] border-white rounded-lg resize">
      <div className="flex h-full overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-8 h-8 loading loading-spinner"></div>
            <p className="mt-2">Loading...</p>
          </div>
        ) : music.length > 0 ? (
          <>
            <div className="sticky top-0 z-10 bg-gray-800">
              <div className="flex">
                <h1 className="flex items-center pt-2 ml-2 text-xl font-bold">
                  Spotify <FaSpotify size={20} className="ml-1" />
                </h1>
              </div>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="text-lg font-bold">Canción:</th>
                  <th>Añadido Por:</th>
                </tr>
              </thead>

              <tbody>
                {music.map((track, index) => (
                  <tr key={index} className="pl-5">
                    <td className="text-center hover:cursor-pointer hover:underline hover:text-white"><Link href={track.track.external_urls.spotify}>{track.track.name} {}</Link></td>
                    <td className="text-center">{track.added_by.id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No music found.</p> // Display a message if no tracks are found
        )}
      </div>
    </div>
  );
};

export default Music;

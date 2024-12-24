import React, { useState, useEffect } from "react";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import axios from "axios";

const APP_SERVER_URL = "http://localhost:6081";
const DEFAULT_ROOM_NAME = "mainRoom";

const Livekit = ({ userName }) => {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    try {
      const response = await axios.post(`${APP_SERVER_URL}/token`, {
        participantName: userName,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error("Error fetching token:", error);
      setToken(null);
    }
  };

  useEffect(() => {
    if (!token) {
      getToken();
    }
  }, [token]);

  return (
    <div>
      {!token && <button onClick={getToken}>Get Token</button>}
      {token && <Stage token={token} />}
    </div>
  );
};

const Stage = ({ token }) => {
  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl="wss://testing-1eumc5rs.livekit.cloud"
      data-lk-theme="default"
      style={{ height: "100%" }}
    >
      <MyVideoConference />
      <RoomAudioRenderer />
      <ControlBar />
    </LiveKitRoom>
  );
};

const MyVideoConference = () => {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      <ParticipantTile />
    </GridLayout>
  );
};

export default Livekit;

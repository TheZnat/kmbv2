import "dotenv/config";
import express from "express";
import cors from "cors";
import { AccessToken, Room, RoomServiceClient } from "livekit-server-sdk";

const SERVER_PORT = process.env.SERVER_PORT || 6081;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;
const DEFAULT_ROOM_NAME = process.env.DEFAULT_ROOM_NAME;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/webhook+json" }));

app.post("/token", async (req, res) => {
  const { participantName } = req.body;
  if (!participantName) {
    return res
      .status(400)
      .json({ errorMessage: "participantName is required" });
  }

  const roomService = new RoomServiceClient(
    LIVEKIT_URL,
    LIVEKIT_API_KEY,
    LIVEKIT_API_SECRET
  );
  await ensureRoomExists(roomService, DEFAULT_ROOM_NAME);
  const token = await createToken(DEFAULT_ROOM_NAME, participantName);
  res.json({ token });
  console.log(token);
});

const ensureRoomExists = async (roomService, roomName) => {
  try {
    await roomService
      .createRoom({
        name: roomName,
        emptyTimeout: 3600000, // 1 час в миллисекундах
        maxParticipants: 4,
      })
      .then((room) => {
        console.log("room created", room);
      });
  } catch (error) {
    console.error("Error creating or loading room", error);
    throw error;
  }
};

const createToken = async (roomName, participantName) => {
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity: participantName,
    ttl: "10m",
  });
  at.addGrant({ roomJoin: true, room: roomName });
  return await at.toJwt();
};

app.listen(SERVER_PORT, () => {
  console.log(`Server started on port: ${SERVER_PORT}`);
});

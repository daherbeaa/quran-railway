import express from "express";
import { spawn } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/stream", (req, res) => {
  const url = "https://live.eu-north-1b.cf.dmcdn.net/sec2(XXXX)/dm/3/x84wyku/s/live-480.m3u8"; // غيره كل ما يتجدد

  res.setHeader("Content-Type", "audio/mpeg");

  const ffmpeg = spawn("ffmpeg", [
    "-i", url,
    "-vn",
    "-acodec", "libmp3lame",
    "-f", "mp3",
    "pipe:1"
  ]);

  ffmpeg.stdout.pipe(res);

  ffmpeg.stderr.on("data", (data) => {
    console.error("ffmpeg error:", data.toString());
  });

  ffmpeg.on("close", () => {
    res.end();
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

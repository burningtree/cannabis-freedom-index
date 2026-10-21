// Renders the world-map video (src/pages/video.astro) to an MP4, frame by frame.
//
//   npm run build && npx astro preview --port 4322     (in another terminal)
//   node scripts/render-video.mjs [url] [out.mp4] [--fps 30] [--from 0 --to 60]
//
// Opens the page in the installed Google Chrome (through playwright-core, which downloads no
// browser), calls window.render(t) for each frame and pipes the screenshots to ffmpeg, which must
// be on the PATH. Because every frame is drawn for its exact time, the result is smooth however
// slowly the frames are captured. The default output is cannabis-freedom-1800-2026.mp4 in the
// current folder: H.264, 1080 × 1350, which X, Instagram and others accept.
import { spawn } from "node:child_process";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const opt = (name, fallback) => { const i = args.indexOf(`--${name}`); return i >= 0 ? +args[i + 1] : fallback; };
const plain = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const url = plain[0] ?? "http://localhost:4322/video/";
const out = plain[1] ?? "cannabis-freedom-1800-2026.mp4";
const fps = opt("fps", 30);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate(() => window.ready);
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.DURATION);
const from = opt("from", 0), to = opt("to", duration);
const frames = Math.round((to - from) * fps);

const ffmpeg = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(fps), "-i", "-",
  "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out], { stdio: ["pipe", "inherit", "inherit"] });
const done = new Promise((res, rej) => ffmpeg.on("close", (code) => (code === 0 ? res() : rej(new Error(`ffmpeg exited with ${code}`)))));

const started = Date.now();
for (let i = 0; i < frames; i++) {
  await page.evaluate((t) => window.render(t), from + i / fps);
  const png = await page.screenshot({ type: "png" });
  if (!ffmpeg.stdin.write(png)) await new Promise((res) => ffmpeg.stdin.once("drain", res));
  if (i % (fps * 5) === 0) process.stdout.write(`\r  frame ${i} of ${frames} (${Math.round((Date.now() - started) / 1000)} s)`);
}
ffmpeg.stdin.end();
await done;
await browser.close();
console.log(`\n${frames} frames, ${(frames / fps).toFixed(1)} s of video, written to ${out}`);

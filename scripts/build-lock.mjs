// All Astro builds share generated content and caches, even with different outDirs.
import { mkdirSync, openSync, closeSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function buildLock() {
  return {
    name: "one-build-at-a-time",
    hooks: {
      "astro:config:setup": ({ command, config }) => {
        if (command !== "build") return;
        const dir = path.join(fileURLToPath(config.root), ".cache");
        mkdirSync(dir, { recursive: true });
        const file = path.join(dir, "build.lock");
        const acquire = () => {
          const fd = openSync(file, "wx");
          writeFileSync(fd, String(process.pid));
          closeSync(fd);
        };
        try { acquire(); } catch (error) {
          if (error.code !== "EEXIST") throw error;
          const pid = Number(readFileSync(file, "utf8"));
          let running = true;
          if (pid > 0) {
            try { process.kill(pid, 0); } catch (e) { if (e.code === "ESRCH") running = false; }
          }
          if (running) throw new Error(`Another build holds ${file} (PID ${pid || "starting"}). Wait for it to finish, then retry.`);
          unlinkSync(file);
          acquire();
        }
        process.once("exit", () => {
          try { if (readFileSync(file, "utf8") === String(process.pid)) unlinkSync(file); } catch {}
        });
      },
    },
  };
}

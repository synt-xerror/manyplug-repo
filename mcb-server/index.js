import fs from "fs";
import { CMD_PREFIX, CONFIG } from "../../config.js";
import { createPluginT } from "../../i18n/index.js";

const { MC_GROUP_ID, MC_LOG_FILE } = CONFIG;
const { t } = createPluginT(import.meta.url);

let apiRef = null;
let players = [];

function handleLine(line) {
  if (!line || !apiRef) return;

  const joinMatch = line.match(/Player Spawned: (.+?) xuid:/);
  if (joinMatch) {
    apiRef.sendTo(MC_GROUP_ID, t("messages.playerConnected", { name: joinMatch[1] }));
    players.push(joinMatch[1]);
    return;
  }

  const leaveMatch = line.match(/Player disconnected: (.+?), xuid:/);
  if (leaveMatch) {
    apiRef.sendTo(MC_GROUP_ID, t("messages.playerDisconnected", { name: leaveMatch[1] }));
    players = players.filter(p => p !== leaveMatch[1]);
  }
}

export async function setup(api) {
  apiRef = api;

  if (!fs.existsSync(MC_LOG_FILE)) {
    api.log.error(t("messages.logFileNotFound", { file: MC_LOG_FILE }));
    return;
  }

  fs.watchFile(MC_LOG_FILE, { interval: 1000 }, (curr, prev) => {
    if (curr.size <= prev.size) return;

    const stream = fs.createReadStream(MC_LOG_FILE, {
      start: prev.size, end: curr.size, encoding: "utf8",
    });

    stream.on("data", chunk => {
      chunk.split("\n").forEach(line => handleLine(line.trim()));
    });

    stream.on("error", err => api.log.error(t("messages.streamError", { error: err.message })));
  });

  api.log.info(t("messages.watcherActive", { file: MC_LOG_FILE }));
}

export default async function ({ msg }) {
  const body = (msg.body || "").trim();

  // !players - lista de players online
  if (body.startsWith(CMD_PREFIX + "players")) {
    const list = players.join("\n");
    await msg.reply(`🎮 Players online (${players.length}):\n${list}`);
    return;
  }
}

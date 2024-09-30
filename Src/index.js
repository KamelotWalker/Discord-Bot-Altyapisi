import "dotenv/config";
import fs from "fs";
import DiscordBot from "./client/DiscordBot.js";
import { info, error, success, warn } from "./utils/Console.js";

info("Starting the bot...");

const client = new DiscordBot();

export default client;

client.connect();

process.on("unhandledRejection", console.error);
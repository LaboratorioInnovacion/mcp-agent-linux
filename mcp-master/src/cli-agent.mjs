import OpenAI from "openai";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import dotenv from "dotenv";
dotenv.config();

import { handleDocker } from "./modules/docker.mjs";
import { handleFiles } from "./modules/files.mjs";
import { handleSystem } from "./modules/system.mjs";
import { handleExplain } from "./modules/explain.mjs";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log(chalk.greenBright("🧠 MCP Linux Agent — escribí 'salir' para cerrar.\n"));

async function chat() {
  while (true) {
    const { input } = await inquirer.prompt([
      { name: "input", message: chalk.cyan(">"), prefix: "" },
    ]);
    if (!input) continue;
    if (input.toLowerCase() === "salir") break;

    const spinner = ora("Pensando...").start();

    try {
      const res = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "Sos un agente MCP para Ubuntu Server. Leés archivos, analizás logs, inspeccionás Docker y explicás paso a paso cómo resolver problemas, siempre pidiendo confirmación antes de ejecutar comandos peligrosos." },
          { role: "user", content: input },
        ],
        max_completion_tokens: 800,
      });

      spinner.stop();

      const output = res.choices?.[0]?.message?.content?.trim() || "(sin respuesta)";
      console.log(chalk.yellow("\n🤖 " + output + "\n"));

      const lower = input.toLowerCase();
      if (lower.includes("docker")) await handleDocker(input);
      else if (lower.includes("archivo") || lower.includes("log") || lower.includes("/")) await handleFiles(input);
      else if (lower.includes("sistema") || lower.includes("cpu") || lower.includes("memoria") || lower.includes("uptime")) await handleSystem(input);
      else if (lower.includes("explica") || lower.includes("explicame")) await handleExplain(input);

    } catch (err) {
      spinner.stop();
      console.error(chalk.red("Error:"), err.message || err);
    }
  }
  console.log(chalk.green("Adiós 👋"));
  process.exit(0);
}

chat();

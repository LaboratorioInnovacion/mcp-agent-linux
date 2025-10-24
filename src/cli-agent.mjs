import dotenv from "dotenv";
dotenv.config();

import readline from "readline";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

console.log("🧠 MCP CLI Agent — escribí 'salir' para cerrar.");
rl.prompt();

rl.on("line", async (line) => {
  const texto = line.trim();
  if (!texto) {
    rl.prompt();
    return;
  }
  if (texto.toLowerCase() === "salir") {
    console.log("Adiós 👋");
    process.exit(0);
  }

  try {
    // En este ejemplo simple consultamos al modelo directamente.
    // El modelo puede sugerir usar las "tools" que expone el MCP server.
    const completion = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        { role: "system", content: "Sos un asistente CLI que puede recomendar ejecutar herramientas locales expuestas por el MCP server (leer_archivo, ejecutar_comando). No ejecutes nada sin confirmar." },
        { role: "user", content: texto }
      ],
      max_tokens: 800
    });

    const respuesta = completion.choices[0].message.content.trim();
    console.log("\n🤖 " + respuesta + "\n");
  } catch (err) {
    console.error("Error consultando al modelo:", err.message || err);
  }

  rl.prompt();
});

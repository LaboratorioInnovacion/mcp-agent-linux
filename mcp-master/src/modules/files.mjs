import fs from "fs";
import path from "path";
import chalk from "chalk";

// Solo permitimos lectura desde rutas seguras dentro del host montado (/host)
const HOST_PREFIX = process.env.HOST_PREFIX || "/host";

export async function handleFiles(input) {
  const maybePath = input.match(/(\/[^\s]+)/);
  const ruta = maybePath ? maybePath[0] : null;
  if (!ruta) {
    console.log(chalk.red("❌ Especificá un archivo o carpeta con ruta absoluta (ej: /etc/nginx/nginx.conf)"));
    return;
  }
  const full = ruta.startsWith("/") ? path.join(HOST_PREFIX, ruta) : path.join(HOST_PREFIX, ruta);
  try {
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      const list = fs.readdirSync(full);
      console.log(chalk.green("\n📁 Contenido de " + ruta + ":"));
      list.forEach(f => console.log("  - " + f));
    } else {
      const content = fs.readFileSync(full, "utf8");
      console.log(chalk.gray("\n📄 Contenido de " + ruta + ":\n"));
      console.log(content.slice(0, 2000) + (content.length > 2000 ? "\n... (truncado)\n" : ""));
    }
  } catch (err) {
    console.log(chalk.red("⚠️ No pude leer la ruta: " + err.message));
  }
}

import { execSync } from "child_process";
import chalk from "chalk";

export async function handleDocker(input) {
  try {
    console.log(chalk.blueBright("🔍 Analizando contenedores Docker...\n"));
    const ps = execSync("docker ps -a --format 'table {{.Names}}\t{{.Status}}\t{{.Image}}'", { encoding: "utf8" });
    console.log(ps);
    const inspect = execSync("docker ps -a --format '{{.Names}}'").toString().trim().split(/\n/).filter(Boolean);
    if (inspect.length) {
      console.log(chalk.blueBright("\n🔎 Logs del contenedor (últimas 200 líneas) para el primero: " + inspect[0] + "\n"));
      try {
        const logs = execSync(`docker logs --tail 200 ${inspect[0]}`, { encoding: "utf8" });
        console.log(logs.slice(0, 2000) + (logs.length > 2000 ? "\n... (truncado)\n" : ""));
      } catch (e) {
        console.log(chalk.red("No se pudieron obtener logs: " + e.message));
      }
    } else {
      console.log("No hay contenedores.");
    }
  } catch (err) {
    console.log(chalk.red("⚠️ No se pudo acceder a Docker: " + err.message));
  }
}

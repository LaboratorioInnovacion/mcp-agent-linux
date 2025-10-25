import { execSync } from "child_process";
import si from "systeminformation";
import chalk from "chalk";

export async function handleSystem() {
  try {
    const uptime = execSync("uptime -p", { encoding: "utf8" }).trim();
    const mem = await si.mem();
    const cpu = await si.currentLoad();
    const disk = await si.fsSize();
    console.log(chalk.greenBright("\n🖥️ Estado del sistema:"));
    console.log(chalk.yellow("Uptime: ") + uptime);
    console.log(chalk.cyan("\n📊 Memoria:"));
    console.log(`  Total: ${(mem.total/1024/1024).toFixed(0)} MB`);
    console.log(`  Usada: ${(mem.used/1024/1024).toFixed(0)} MB`);
    console.log(chalk.cyan("\n💽 Disco:"));
    disk.forEach(d => {
      console.log(`  ${d.fs} - ${d.size/1024/1024/1024:.2f} GB - ${d.use}%`);
    });
    console.log(chalk.cyan("\n⚙️ Carga CPU: ")+ cpu.currentload.toFixed(2) + "%");
  } catch (err) {
    console.log(chalk.red("⚠️ No se pudo obtener el estado del sistema: " + err.message));
  }
}

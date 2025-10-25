import chalk from "chalk";

export async function handleExplain(input) {
  console.log(chalk.magenta("🧠 Modo explicativo activo: te explico cómo resolver problemas paso a paso.\n"));
  console.log(chalk.white("Ejemplos: 'explicame cómo liberar memoria', 'explicame cómo limpiar logs viejos', 'explicame por qué docker no arranca'."));
}

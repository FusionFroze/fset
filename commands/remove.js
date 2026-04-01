import chalk from "chalk";
import Conf from "conf";
import { confirm } from "@inquirer/prompts";

const conf = new Conf({ projectName: "fset" });

export default async function remove(env) {
  const environments = conf.get();

  const envNames = Object.keys(environments);

  if (envNames.length === 0) {
    console.log(chalk.cyan("You don't have any environment set up yet."));
    return;
  }

  if (envNames.includes(env)) {
    const isRemovePermissionGiven = await confirm({
      message: `Are you sure you want to delete ${env}`,
    });

    if (isRemovePermissionGiven) {
      conf.delete(env);
      console.log(chalk.green(`Deletion of '${env}' completed.`));
    } else {
      console.log(chalk.cyan(`Deletion of '${env}' aborted. Phew.`));
    }
  } else {
    console.error(chalk.red(`${env} doesn't exist.`));
    process.exit(1);
  }
}

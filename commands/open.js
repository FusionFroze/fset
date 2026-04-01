import Conf from "conf";
import chalk from "chalk";
import { exec } from "node:child_process";

const conf = new Conf({ projectName: "fset" });

export default function open(env) {
  const environments = conf.get();

  const envNames = Object.keys(environments);

  if (envNames.length === 0) {
    console.error(
      chalk.red(
        `\nYou don't have any environment set up yet \n${chalk.white(`Use ${chalk.blue("fset create <env>")} to set up a new environment`)}`,
      ),
    );
    process.exit(1);
  }

  const toBeOpenedEnvironment = environments[env];

  if (toBeOpenedEnvironment) {
    console.log(`Opening ${env}\n`);

    for (const app of toBeOpenedEnvironment) {
      let paths = "";

      app.urls_or_paths.forEach((urlOrPath) => {
        paths += `"${urlOrPath}" `;
      });

      exec(`start "" ${app.app} ${paths}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          console.log(
            chalk.magenta(
              "Tip: " +
                `Check the App path/name for correctness. \nUse ${chalk.white("fset ls -l")} to see the saved path/name`,
            ),
          );
          return;
        }
      });
    }
  } else {
    console.error(
      chalk.red.bold(
        `Environment with name ${env} is not found, check the spelling for any mistake.`,
      ),
    );
    process.exit(1);
  }
}

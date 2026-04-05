import Conf from "conf";
import chalk from "chalk";
import { input, confirm } from "@inquirer/prompts";

const conf = new Conf({ projectName: "fset" });

// The styling(theme) of the input interface need to be refined.
async function createEnv(newEnv) {
  let environments = conf.get();

  const envNames = Object.keys(environments);

  if (envNames.length === 0) {
    environments = {};
  }

  if (envNames.includes(newEnv)) {
    console.error(
      chalk.redBright(
        `${newEnv} already exists.\nUse ${chalk.magenta("fset remove <env-name>")} to delete and set a new one of same name.`,
      ),
    );
    process.exit(1);
  }

  environments.newEnv = [];
  let gettingNewApplication = true;
  let applicatonNumber = 1;

  while (gettingNewApplication) {
    console.log(chalk.blue.bold(`Application ${applicatonNumber}`));

    const appPath = await input({
      message: chalk.greenBright("Enter the path to the app:"),
      required: true,
    });

    if (appPath === "exit") {
      gettingNewApplication = false;
      continue;
    }

    let gettingURLs = true;
    let urlNumber = 1;
    const urls = [];

    console.log(
      chalk.magenta(
        "Enter URL(s) or file path(s) you want the app to open with.\nPress enter with an empty input to exit the input interface.",
      ),
    );

    while (gettingURLs) {
      const url = await input({ message: `URL-${urlNumber}:` });

      if (url.trim()) {
        urls.push(url);
        urlNumber++;
      } else {
        gettingURLs = false;
      }
    }

    const appObj = {
      app: appPath,
      urls_or_paths: urls,
    };
    environments.newEnv.push(appObj);
    applicatonNumber++;

    const addMoreApp = await confirm({ message: "Add another app?" });
    if (!addMoreApp) {
      gettingNewApplication = false;
    }
  }

  conf.set(newEnv, environments.newEnv);

  console.log(chalk.bold(`\n${newEnv} created successfully.`));
}

export default async function create(newEnv) {
  try {
    await createEnv(newEnv);
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.log(chalk.magenta("See you soon 🫡"));
    } else {
      throw error;
    }
  }
}

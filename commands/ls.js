import chalk from "chalk";
import Conf from "conf";
import path from "node:path";

const conf = new Conf({ projectName: "fset" });

export default function ls({ long }) {
  const environments = conf.get();

  const envNames = Object.keys(environments);

  if (envNames.length === 0) {
    console.log(chalk.blueBright("You don't have any environment set up yet."));
    process.exit(1);
  }

  for (const env of envNames) {
    console.log(chalk.green.bold(env));

    const space = environments[env];

    for (const application of space) {
      const appName = extractAppName(application);

      console.log(chalk.magentaBright("  -- " + appName));

      if (long) {
        console.log(
          chalk.bold("    > App Path: ") + chalk.blue(application.app),
        );
        console.log(chalk.bold("    > URls: "));

        const urls = application.urls_or_paths;

        urls.forEach((url, index) => {
          console.log(`        ${index + 1}: ` + chalk.grey(url));
        });
      }
    }
  }
}

export function extractAppName(application) {
  const appPathWithoutExtention = application.app.split(".")[0];
  const appPathSplit = appPathWithoutExtention.split(path.sep);
  const appName = appPathSplit[appPathSplit.length - 1];
  return appName;
}

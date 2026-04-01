#! /usr/bin/env node

import { program } from "commander";
import open from "./commands/open.js";
import create from "./commands/create.js";
import remove from "./commands/remove.js";
import ls from "./commands/ls.js";

program
  .command("open")
  .argument("<env>", "environment to be opened.")
  .description("open your desired environment.")
  .action(open);

program
  .command("create")
  .argument("<env>", "name of the new environment.")
  .description("create a new environment in your machine.")
  .action(create);

program
  .command("remove")
  .argument("<env>", "name of the environment to be deleted.")
  .description("delete an environment from your machine.")
  .action(remove);

program
  .command("ls")
  .option("-l, --long", "display long list of environments")
  .description("list all the environments set up in your machine")
  .action((long) => ls(long));

program.parse();

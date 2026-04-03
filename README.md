# FSET

You use different _applications_ with different _file(s)_ or _tab(s)_ for different _tasks_. Switching between them means closing everything and starting over manually.

**fset** does this for you with a single command.

## Installation

**Prerequisite:** Node.js v18+

**Install globally:**

```shell
    $ npm i -g @fusionfroze/fset
```

**For local development:**

```shell
    $ npm install
```

```shell
    $ npm link
```

## How to use it

### Setting up a new Environment

```shell
    $ fset create demo
```

This will open the input interface

```shell
    $ fset create demo
    Application 1
    ? Enter the path to the app: "C:\Users\Public\Desktop\Google Chrome.lnk"
```

Here you have to enter the path that **exactly** points to the location of the application.
Then you will be asked to enter URL if you need it.

```shell
    $ fset create demo
    Application 1
    ✔ Enter the path to the app: "C:\Users\Public\Desktop\Google Chrome.lnk"
    Enter URL(s) or file path(s) you want the app to open with.
    Press enter with an empty input to exit the input interface.
    ? URL-1: https://clandor.com
```

You can exit the input interface for the current application by pressing **enter** with an **empty input**.

```shell
    $ fset create demo
    Application 1
    ✔ Enter the path to the app: "C:\Users\Public\Desktop\Google Chrome.lnk"
    Enter URL(s) or file path(s) you want the app to open with.
    Press enter with an empty input to exit the input interface.
    ✔ URL-1: https://clandor.com
    ✔ URL-2:
    ? Add another app? (Y/n)
```

Now you will be given a choice, you can either add a new application or can exit the interface by entering **n**.
If you choose **n**, a success message will show that your new environment is set up successfully. Or, alternatively you can continue adding more application requried for the task.

```shell
    $ fset create demo
    Application 1
    ✔ Enter the path to the app: "C:\Users\Public\Desktop\Google Chrome.lnk"
    Enter URL(s) or file path(s) you want the app to open with.
    Press enter with an empty input to exit the input interface.
    ✔ URL-1: https://clandor.com
    ✔ URL-2:
    ✔ Add another app? No

    demo created successfully.
```

### Opening an Environment

```shell
    $ fset open demo
```

This command will open all the applications with set URL(s) or file(s) instantly.

### Removing an Environment

```shell
    $ fset remove demo
```

You will be prompted once to confirm the operation. Once removed the action is irreversible.

### List all the Environments set up in your machine

```shell
    $ fset ls
```

This will list all the Environments with the applications in each of them.
Output -

```shell
    demo
      --Google Chrome
```

To see detailed list, with application path and URL(s) or file(s) for each application, type this command -

```shell
    $ fset ls -l
```

or

```shell
    $ fset ls -long
```

Output -

```shell
    demo
      --Google Chrome
        > App Path: "C:\Users\Public\Desktop\Google Chrome.lnk"
        > URls:
            1: https://clandor.com
```

![code editor](https://github.com/viwnj/online-editor/blob/master/images/editor.png)

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To run locally
This project depends on [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/), please install if you don't already have them.
In the project directory, you should run the following:

### `yarn install`
Installs project dependencies

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Project description
This is a very basic code editor that consumes data from and talks to an external API. At the moment you can only edit, save and delete the available files.

## Key features
 - Use CTRL+S/Command+S (not tested on MAC, might not work) on the code editor to save the file
 - Click on a file to open it on a tab
 - Use the delete button (next to file name on sidebar) to delete a file
 - Open a file through query parameters. E.g: ?file=editor/src/main/Hello.java

## Core dependencies
 - `styled-components`
 - `redux`
 - `axios`
 - `react-ace`
 - `typescript`

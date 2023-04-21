# trydent

## Table of Contents
1. [Getting Started](#getting-started)
1. [Scripts](#scripts)
    - [Client](#client)
    - [Server](#server)


## Getting Started
Before running the application, make sure to navigate to the correct directory for the client or server part of the project. Use the terminal to change to the desired directory:

- For the client: `cd path/to/client` (replace "path/to/client" with the actual path to your client directory)
- For the server: `cd path/to/server` (replace "path/to/server" with the actual path to your server directory)

## Scripts
### Client
To run your application, follow the steps below:

1. Open a terminal window or tab.
2. Install the required packages (if you haven't already): `npm install`.
3. Run the development server: `npm run start`. This will start the Vite development server, and you can access your application in the browser.
4. When you are ready to build the application for production, run `npm run build`. To preview the production build locally, run `npm run serve`.

Below are descriptions of each npm script:

- `npm start`: Starts the development server using Vite.
- `npm run build`: Runs the TypeScript compiler (`tsc`) to type-check the TypeScript files. If type-checking passes without errors, it runs `vite build` to build your application for production. This command generates the final, optimized assets that can be deployed to a web server.
- `npm run serve`: Starts a local server to preview the production build. This is for testing the built assets before deploying. This should not be used as a production server.

### Server
To run your application, follow the steps below:

1. Open two terminal windows or tabs.
2. Install the required packages (if you haven't already): `npm install`.
3. In the first terminal, run `npm run watch` to start the TypeScript compiler in watch mode.
4. In the second terminal, run `npm run dev` to start both server-side and client-side applications concurrently.

Below are descriptions of each npm script:

- `npm run watch`: Runs the TypeScript compiler (`tsc`) in watch mode (`-w`). This will compile the TypeScript files into JavaScript and watch for any changes in the TypeScript files. When a file is changed, it will recompile the affected files automatically.
- `npm run server`: Runs your server using `nodemon`. Automatically restarts your server when it detects changes in your server file. In this case, it is watching the `dist/index.js` file, which is the compiled output from your TypeScript files.
- `npm run dev`: Runs both the server-side and client-side applications at the same time using the `concurrently` package.
- `npm run client`: Runs the client-side application.


# Trydent

Trydent is a visionary open source project that seeks to empower developers with an innovative solution to automate the creation of end-to-end testing. With Trydent, developers can easily generate high-quality Cypress code that is seamlessly integrated into their codebase, enabling them to optimize and streamline their workflow like never before. Harnessing the power of cutting-edge technology, Trydent is the ultimate tool for modern developers seeking to create the most robust and reliable web applications.



## Table of Contents
1. [Getting Started](#getting-started)
1. [User Input Recording and Data Privacy](#user-input-recording-and-data-privacy)
1. [Scripts](#scripts)
    - [Client](#client)
    - [Server](#server)
1. [Contributing](#contributing)
    - [Code Commenting Guidelines](#code-commenting-guidelines)
1. [License](#license)



## Getting Started
Before running the application, make sure to navigate to the correct directory for the client or server part of the project. Use the terminal to change to the desired directory:

- For the client: `cd path/to/client` (replace "path/to/client" with the actual path to your client directory)
- For the server: `cd path/to/server` (replace "path/to/server" with the actual path to your server directory)



## User Input Recording and Data Privacy
Trydent records user inputs during development for the purpose of creating end-to-end tests. The application does not extract or store any personal data from users. However, as a precaution, developers should avoid inputting sensitive information while using Trydent. This ensure that no sensitive data is inadvertently recorded or stored in the generated tests.



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
- `npm test`: Runs Jest tests

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



## Contributing
We welcome contributions from the community. If you are interested in contributing to this project, please read the following guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Ensure that your code adheres to the existing code style and conventions.
3. Write tests for your code and ensure that all tests pass before submitting a pull request.
4. Ensure propper code commenting
5. Submit a pull request to the `dev` branch.

### Code Commenting Guidelines
Please ensure that your code follows JSDoc standards for commenting. This makes it easier for other developers to understand the purpose and functionality of your code. JSDoc is a markup language used to annotate JavaScript source code files. You can find more information about JSDoc and its syntax in the official [JSDoc documentation](https://jsdoc.app/).

When writing comments, please follow these guidelines:

- Use complete sentences and proper grammar.
- Use simple language that is easy to understand.
- Explain what a function, variable, or block of code does and how it is used.
- Use clear and concise language to describe any parameters, return values, or side effects of a function.

Example:
```js
/**
 * Finds the sum of two numbers.
 * 
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number} The sum of the two numbers.
 */
function sum(a, b) {
  return a + b;
}
```
In this example, the JSDoc comment explains what the sum function does, what parameters it expects, and what it returns. Following this format will help other developers understand your code and use it effectively.



## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/) - see the [LICENSE](/LICENSE) file for details.


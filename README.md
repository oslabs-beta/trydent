# Trydent

  ![Banner](/assets/trydent-banner.png)


Trydent is a visionary open source project that seeks to empower developers with an innovative solution to automate the creation of end-to-end testing. With Trydent, developers can easily generate high-quality Cypress code that is seamlessly integrated into their codebase, enabling them to optimize and streamline their workflow like never before. Harnessing the power of cutting-edge technology, Trydent is the ultimate tool for modern developers seeking to create the most robust and reliable web applications.

<div align="center" style="display: flex; justify-content: center; align-items: center; gap: 25px;">
  <a href="https://reactjs.org/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/ab4c3c731a174a63df861f7b118d6c8a6c52040a021a552628db877bd518fe84/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642" data-canonical-src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="ReactJs" style="max-width: 100%">
  </a>
   <a href="https://typescriptlang.org/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/ee71fcc1aa3d059265517741dffc4161922fd744377e7a5f07c43381d0aa9aac/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747970657363726970742d2532333030374143432e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d74797065736372697074266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" style="max-width: 100%">
  </a>
     <a href="https://www.cypress.io/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/a2cc7362377d69d8ad5147e49f7b269cab69f00509828ce2d583b9dde9130499/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d637970726573732d2532334535453545353f7374796c653d666f722d7468652d6261646765266c6f676f3d63797072657373266c6f676f436f6c6f723d303538613565" data-canonical-src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e" alt="Cypress" style="max-width: 100%">
  </a>
       <a href="https://jestjs.io/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/38eb294a1bdc730fae415015ecac4d6c009e39d2a9c8f8631f1d16bf3f918189/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d6a6573742d2532334332313332353f7374796c653d666f722d7468652d6261646765266c6f676f3d6a657374266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" style="max-width: 100%">
  </a>
</div>

## Table of Contents
- [Trydent](#trydent)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [User Input Recording and Data Privacy](#user-input-recording-and-data-privacy)
  - [Scripts](#scripts)
    - [Client](#client)
    - [Server](#server)
  - [Our Team](#our-team)
  - [Contributing](#contributing)
    - [Code Commenting Guidelines](#code-commenting-guidelines)
  - [License](#license)



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
- `npm run build`: Runs `vite build` to build your application for production. This command generates the final, optimized assets that can be deployed to a web server. Also runs the TypeScript compiler (`tsc`) to type-check the TypeScript files and convert to js files in `extensions/bundle` folder
- `npm run build:watch`: Runs `vite build` on watch mode, monitoring for any changes and updating bundling on save.
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


## Our Team
<table><tbody><tr>
  <td align="center" width="150">
    <img src="https://user-images.githubusercontent.com/1347847/180048247-6ae956ab-da6a-44dd-b43b-2ccb71414b5e.png" style="height: 5rem; width: 5rem;" />
    <br/>
    <strong>Alastair Scheuermann</strong>
    <br/>
    <a href="https://github.com/alastairsounds">GitHub</a>
    <br/>
    <a href="https://www.linkedin.com/in/alastairsounds/">LinkedIn</a>
  </td>
  <td align="center" width="150">
    <img src="https://user-images.githubusercontent.com/1347847/180048245-bd80e3ab-fefd-4290-a5b6-6fb11669eafe.png" style="height: 5rem; width: 5rem;" />
    <br/>
    <strong>Eric Dunn</strong>
    <br/>
    <br/>
    <a href="https://github.com/ELDunn">GitHub</a>
    <br/>
    <a href="https://www.linkedin.com/in/ericldunn/">LinkedIn</a>
  </td>
  <td align="center" width="150">
    <img src="https://user-images.githubusercontent.com/1347847/180048242-9201e19e-1f29-4dda-97cd-59c32e06767b.png" style="height: 5rem; width: 5rem;" />
    <br/>
    <strong>Jacob Gillan</strong>
    <br/>
    <br/>
    <a href="https://github.com/JakeGillan/">GitHub</a>
    <br/>
    <a href="https://www.linkedin.com/in/jacob-gillan/">LinkedIn</a>
  </td>
  <td align="center" width="150">
    <img src="https://user-images.githubusercontent.com/1347847/180048249-2384e70d-8a10-4fc9-b12f-bff75a900ab3.png" style="height: 5rem; width: 5rem;" />
    <br/>
    <strong>Nicholas Ly</strong>
    <br/>
    <br/>
    <a href="https://github.com/nicholas-l-ly">GitHub</a>
    <br/>
    <a href="https://www.linkedin.com/in/nicholasly/">LinkedIn</a>
  </td>
  <td align="center" width="150">
    <img src="https://user-images.githubusercontent.com/1347847/180048249-2384e70d-8a10-4fc9-b12f-bff75a900ab3.png" style="height: 5rem; width: 5rem;" />
    <br/>
    <strong>Samuel Lee</strong>
    <br/>
    <br/>
    <a href="https://github.com/leesamuel423">GitHub</a>
    <br/>
    <a href="https://www.linkedin.com/in/leesamuel423/">LinkedIn</a>
  </td>
</tr></tbody></table>



## Contributing
We welcome contributions from the community. If you are interested in contributing to this project, please read the following guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Ensure that your code adheres to the existing code style and conventions.
3. Write tests for your code and ensure that all tests pass before submitting a pull request.
4. Ensure propper code commenting
5. Submit a pull request to the `dev` branch.

### Code Commenting Guidelines
Please ensure that your code follows JSDoc standards for commenting. This makes it easier for other developers to understand the purpose and functionality of your code. JSDoc is a markup language used to annotate JavaScript source code files. You can find more information about JSDoc and its syntax in the official [JSDoc documentation](https://jsdoc.app/).

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


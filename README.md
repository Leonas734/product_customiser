## [LIVE PREVIEW](https://leonas734.github.io/product_customiser/html/product-customiser/index.html)

## Quickstart

1. Check if your computer has npm and NodeJS installed using `node -v` `npm -v`. Installation instructions can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install project packages using the `npm install` in the same directory as the package-lock.json file. 
3. Duplicate .envexample, rename to .env and update all database values accordingly.
4. Run `npm run three` for frontend only or `npm run server` for full stack application.

## Tech used
* [ExpressJS](https://expressjs.com/) - Backend
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Sequelize](https://www.npmjs.com/package/sequelize) - Sits on top of Postgres. Using for [model instances](https://sequelize.org/docs/v6/core-concepts/model-instances/).
* [ThreeJS](https://threejs.org/) - Render 3D objects
* [Nodemon](https://www.npmjs.com/package/nodemon) - Refresh on file save for ExpressJS
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

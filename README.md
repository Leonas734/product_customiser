## Quickstart

1. Check if your computer has npm and NodeJS installed using `node -v` `npm -v`. Installation instructions can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install project packages using the `npm install` in the same directory as the package-lock.json file. 
3. Duplicate .envexample, rename to .env and update all values. Run local postgres server if required.
4. Run `npm run dev` in the same directory as the package.json file.

## Tech used
* [ExpressJS](https://expressjs.com/) - Backend
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Sequelize](https://www.npmjs.com/package/sequelize) - Sits on top of Postgres. Using for [model instances](https://sequelize.org/docs/v6/core-concepts/model-instances/).
* [ThreeJS](https://threejs.org/) - Render 3D objects
* [Nodemon](https://www.npmjs.com/package/nodemon) - Refresh on file save for ExpressJS

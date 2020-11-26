const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const cors = require("cors");
const { migrator } = require('./sequelize');
const moviesRoutes = require('./movies/movies.routes');
const userRoutes = require('./users/users.route');



const app = express();

// Init middleware
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// handle the database migration process here, so we can handle the fatal error
// as part of program startup (and not as part of the first incoming REST call)
migrator
    .then(_res => {
        console.log('Migrations done');
    })
    .catch(err => {
        console.log(`Migration failed with error : ${err}, exiting application.`);
        process.exit(1)
    });

// User routes
app.use("/api/movies", moviesRoutes);
app.use("/api/users", userRoutes);

// App config
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

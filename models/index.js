const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
require("dotenv").config();  


const dbConfig = {
    DATABASE_URL: process.env.DATABASE_URL, 
    TIDB_ENABLE_SSL: process.env.TIDB_ENABLE_SSL === 'true' 
};

const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
    dialect: "mysql",  // TiDB is MySQL compatible, so use mysql dialect
    protocol: "mysql",
    logging: false, // Disable query logging, change to true if debugging
    dialectOptions: {
        ssl: dbConfig.TIDB_ENABLE_SSL ? {
            minVersion: "TLSv1.2",
            ca: dbConfig.TIDB_CA_PATH ? fs.readFileSync(dbConfig.TIDB_CA_PATH) : undefined,
        } : undefined // Only use SSL if enabled
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log("Error:", err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.school = require("./schoolModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false })  
    .then(() => {
        console.log("Database re-sync done");
    })
    .catch((err) => {
        console.log("Error syncing database:", err);
    });

module.exports = db;

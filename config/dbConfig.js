module.exports = {
  DB: "Registration",
  USER: "sa",
  PASSWORD: "Shubh123am",

  HOST: "localhost",
  dialect: "mssql",
  port: 1433,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

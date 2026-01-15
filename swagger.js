const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Contacts API",
    description: "API to manage contacts - CSE341",
  },
  host: "localhost:8080",
  schemes: ["http"],
};

const outputFile = "./swagger.json"; // It will be generated automatically
const endpointsFiles = ["./routes/index.js"]; // Entry point of my routes

// Generate JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);

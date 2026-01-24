const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Contacts API",
    description: "API to manage contacts - CSE341",
  },
  host: "cse341-node-alejandro.onrender.com",
  schemes: ["https"],
  definitions: {
    Contact: {
      firstName: "Isaac",
      lastName: "Brito",
      email: "isaac@example.com",
      favoriteColor: "White",
      birthday: "1990-01-01",
    },
  },
};

const outputFile = "./swagger.json"; // It will be generated automatically
const endpointsFiles = ["./routes/index.js"]; // Entry point of my routes

// Generate JSON file
swaggerAutogen(outputFile, endpointsFiles, doc);

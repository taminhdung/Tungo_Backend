// docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const server= require("../server.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tungo Backend",
      version: "1.0.0",
      description: "Tài liệu API cho ứng dụng Tungo viết bằng Flutter",
    },
    servers: [
      {
        url: "http://localhost:10000",
        description: "Server localhost api",
      },
      {
        url: "http://localhost:9999",
        description: "Server localhost máy",
      },
    ]

  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

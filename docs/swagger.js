// docs/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "https://tungo-backend.onrender.com",
        description: "Render HTTPS server",
      },
      // {
      //   url: "http://localhost:3000",
      //   description: "Local dev server",
      // },
    ]

  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API - Blog Documentation",
      version: "1.0.0",
      description: "API for my Node/Express Blog project",
    },
  },
  apis: ["../routes/autoresRoutes.js"], // Caminho para os docs da API src/routes/
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
export const serveSwagger = swaggerUi.serve;
export const setupSwagger = swaggerUi.setup(swaggerDocs);
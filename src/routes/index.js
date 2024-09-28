//Este arquivo é o ponto de entrada de todas as rotas
import express from "express";
import autores from "./autoresRoutes.js";
import post from "./postsRoutes.js";
import { serveSwagger, setupSwagger } from '../config/swagger.js';


const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Challenge - 2"));
  
  app.use(express.json());
  app.use(autores);
  app.use(post);
  
  // Rota para a documentação do Swagger
  app.use("/api-docs", serveSwagger, setupSwagger); 

  app.use(express.json(),autores,post);
  
};


export default routes;

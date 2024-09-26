//Este arquivo é o ponto de entrada de todas as rotas
import express from "express";
import autores from "./autoresRoutes.js";
import post from "./postsRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));

  app.use(express.json(),autores,post);
};

export default routes;

import express from "express";
import PostController from "../controllers/postController.js";

const routes = express.Router(); //Instancia as rotas
routes.get("/post",PostController.listarPost);//controla a rota e invoca o controler
routes.get("/post/busca",PostController.listarPostPorTitulo);
routes.get("/post/:id", PostController.listarPostPorId);
routes.post("/post", PostController.cadastrarPost);
routes.put("/post/:id", PostController.atualizarPost);
routes.delete("/post/:id", PostController.excluirPost);

export default routes;
import express from "express";
import PostController from "../controllers/postController.js";

const routes = express.Router(); // Instancia as rotas

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Lista todos os posts
 *     description: Retorna uma lista de todos os posts
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do post
 *                   titulo:
 *                     type: string
 *                     description: Título do post
 */
routes.get("/post", PostController.listarPost); // Controla a rota e invoca o controller

/**
 * @swagger
 * /post/busca:
 *   get:
 *     summary: Lista posts por título
 *     description: Retorna posts específicos pelo título
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         description: Título do post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do post
 *                 titulo:
 *                   type: string
 *                   description: Título do post
 */
routes.get("/post/busca", PostController.listarPostPorTitulo);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Obtém um post pelo ID
 *     description: Retorna um post específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do post
 *                 titulo:
 *                   type: string
 *                   description: Título do post
 */
routes.get("/post/:id", PostController.listarPostPorId);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Cadastra um novo post
 *     description: Adiciona um novo post à lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do post
 *     responses:
 *       201:
 *         description: Post cadastrado com sucesso
 */
routes.post("/post", PostController.cadastrarPost);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Atualiza um post pelo ID
 *     description: Atualiza as informações de um post específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título do post
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 */
routes.put("/post/:id", PostController.atualizarPost);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Exclui um post pelo ID
 *     description: Remove um post específico da lista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post excluído com sucesso
 */
routes.delete("/post/:id", PostController.excluirPost);

export default routes;

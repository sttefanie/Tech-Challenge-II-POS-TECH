import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

/**
 * @swagger
 * /autores:
 *   get:
 *     summary: Lista todos os autores
 *     description: Retorna uma lista de todos os autores
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do autor
 *                   nome:
 *                     type: string
 *                     description: Nome do autor
 */
routes.get("/autores", AutorController.listarAutores);

/**
 * @swagger
 * /autores/{id}:
 *   get:
 *     summary: Obtém um autor pelo ID
 *     description: Retorna um autor específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do autor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do autor
 *                 nome:
 *                   type: string
 *                   description: Nome do autor
 */
routes.get("/autores/:id", AutorController.listarAutorPorId);

/**
 * @swagger
 * /autores:
 *   post:
 *     summary: Cadastra um novo autor
 *     description: Adiciona um novo autor à lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do autor
 *     responses:
 *       201:
 *         description: Autor cadastrado com sucesso
 */
routes.post("/autores", AutorController.cadastrarAutor);

/**
 * @swagger
 * /autores/{id}:
 *   put:
 *     summary: Atualiza um autor pelo ID
 *     description: Atualiza as informações de um autor específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do autor
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 */
routes.put("/autores/:id", AutorController.atualizarAutor);

/**
 * @swagger
 * /autores/{id}:
 *   delete:
 *     summary: Exclui um autor pelo ID
 *     description: Remove um autor específico da lista
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do autor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Autor excluído com sucesso
 */
routes.delete("/autores/:id", AutorController.excluirAutor);

export default routes;

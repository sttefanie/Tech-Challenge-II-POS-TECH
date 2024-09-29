import express from "express";
import conectaBanco from "./config/dbconnect.js";
import routes from "./routes/index.js";

const app = express();

async function startServer() {
  try {
    const conexao = await conectaBanco();

    conexao.on("error", (error_problem) => {
      console.error("Erro de conexão!", error_problem);
    });

    conexao.once("open", () => {
      console.log("Conexão com banco feita com sucesso!");
    });

    routes(app); // Configura as rotas da aplicação

  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

startServer();

export default app;

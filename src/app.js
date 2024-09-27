import express from "express";
import conectaBanco from "./config/dbconnect.js";
import routes from "./routes/index.js";

const conexao = await conectaBanco();

conexao.on("error",(error_problem)=>{ //Verifica se tem erro na conexão ao encontrar retorno de on  = "error"
    console.error("Erro de conexão!",error_problem);
})

conexao.once("open",()=>{ //Abre conexão e teste se retorno de once é = "open"
    console.log("Conexão com banco feita com sucesso!");
})

const app = express();

routes(app);

export default app;
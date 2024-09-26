// importação do modelo Post
// para ser chamado pelo controller
//import mongoose from "mongoose";
import post from "../models/Post.js";
import { autores } from "../models/Autor.js";

class PostController {
    static async listarPost(req, res) {
        try {
            // controller chama o model Livro através
            // do método livro.find({})
            const listaPost = await post.find({}).populate("autor").exec();
            res.status(200).json(listaPost);
        } catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição` });
        }
    }

    static async listarPostPorTitulo(req,res){
        const titulo = req.query.titulo;
        try {
            const pesquisaPorTitulo = await post.find({titulo: titulo});//primeira propriedade passada como objeto é o titulo do livro e a segunda é a query
            res.status(200).json(pesquisaPorTitulo);
        } catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na busca por titulo` });
        }
    }

    static async listarPostPorId(req, res) {
        try {
            // controller chama o model Livro através
            // do método livro.find({})
            const id = req.params.id;
            const postEncontrado = await post.findById(id).populate("autor").exec();
            res.status(200).json(postEncontrado);
        } catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na requisição do post` });
        }
    }

    static async cadastrarPost (req, res) {
        const novoPost = req.body;
        const { autor } = req.body;//busca autor no body da requisição
        const autorId = autor._id; //extrai o id do autor
        try {
          const autorEncontrado = await autores.findById(autorId);
          const postCompleto = { ...novoPost, autor: { ...autorEncontrado._doc }};
          const postCriado = await post.create(postCompleto);
          res.status(201).json({ message: "criado com sucesso", post: postCriado });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha ao cadastrar post: ${autor}`});
        }
      }

      static async atualizarPost(req, res) {
        try {
            // controller chama o model Livro através
            // do método livro.findByIdAndUpdate({})
            const id = req.params.id;
            await post.findByIdAndUpdate(id,req.body);
            res.status(200).json({message:"Post atualizado"});
        } catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na atualização do post` });
        }
    }

    static async excluirPost(req, res) {
        try {
            // controller chama o model Post através
            // do método livro.findByIdAndUpdate({})
            const id = req.params.id;
            await post.findByIdAndDelete(id);
            res.status(200).json({message:"Post excluído"});
        } catch (erro) {
            res
            .status(500)
            .json({ message: `${erro.message} - falha na exclusão do post` });
        }
    }
    
 }


 export default PostController;

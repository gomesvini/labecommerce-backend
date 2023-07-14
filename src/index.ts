import  express, {Request, Response}  from 'express';
import cors from 'cors';
import { db } from './knex';
import { products, users } from './database';
import { TProduct, TUser } from './types';
import { Database } from 'sqlite3';

const app = express()

app.use(cors()) //Libera o acesso externo para a aplicação
app.use(express.json()) //Trabalha entrada e saída json automaticamente. Não precisa converter objetos e arrays para json e vice-versa

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({message: "Pong!"})
    } catch (error) {
        console.log(error)

        if(req.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})

app.post("/users", async(req: Request, res: Response) => {
    try {
        const {id, name, email, password} = req.body

        const newUser = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)
        res.status(201).send({
            message: "Cadastro realizado com sucesso.",
            user: newUser
        })          

    } catch (error) {
        console.log(error)

        if(req.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.q as string | undefined

        if(searchTerm === undefined){
            const result = await db("users")
            res.status(200).send(result)
        }else{
            const result = await db("users").where("name", "LIKE", `%${searchTerm}%`)
            res.status(200).send(result)
        }
        
    } catch (error) {
        console.log(error)

        if(req.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})

app.post("/product", async (req: Request, res: Response) => {
    try {
        const {id, name, price, description, imageUrl} = req.body

        const newProducts : TProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }

        await db("products").insert(newProducts)
        res.status(201).send({
            message: "Produto cadastrado com sucesso.",
            product: newProducts
        })
    } catch (error) {
        console.log(error)

        if(req.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})

app.get("/product", async (req: Request, res:Response) => {
    try {
        const searchProductsByName = req.query.q as string | undefined

        if(searchProductsByName === undefined){
            const result = await db("products")
            res.status(200).send(result)
        }else{
            const result = await db("products").where("name", "LIKE", `%${searchProductsByName}%`)
            res.status(200).send(result)
        }
        
    } catch (error) {
        console.log(error)

        if(req.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})
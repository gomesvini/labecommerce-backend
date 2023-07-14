import  express, {Request, Response}  from 'express';
import cors from 'cors';
import { db } from './knex';
import { products, users } from './database';
import { TProduct, TUser } from './types';


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
        const [userIdAlreadyExists]: TUser[] | undefined[] = await db("users").where({id})
        const [userEmailAlreadyExists]: TUser[] | undefined[] = await db("users").where({email})

        if(userIdAlreadyExists){
            res.status(400)
            throw new Error ("'id' já existe")
        }

        if(userEmailAlreadyExists){
            res.status(400)
            throw new Error ("'email' já existe")
        }

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

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [userIdAlreadyExists] : TUser[] | undefined[] = await db("users").where({id: idToDelete})

        if(!userIdAlreadyExists){
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        await db("users").del().where({id: idToDelete})

        res.status(200).send({message: "User apagado com sucesso."})
        
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
        const [productIdAlreadyExists] : TProduct[] | undefined[] = await db("products").where({id})

        if(productIdAlreadyExists){
            res.status(400)
            throw new Error("'id' já existe")
        }

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

app.delete("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const [productIdAlreadyExists] : TUser[] | undefined[] = await db("products").where({id: idToDelete})

        if(!productIdAlreadyExists){
            res.status(404)
            throw new Error("'id' não encontrado.")
        }

        await db("products").del().where({id: idToDelete})

        res.status(200).send({message: "Produto apagado com sucesso."})
        
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

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl

        const [productIdAlreadyExist] : TProduct[] | undefined[] = await db("products").where({id: idToEdit})
        
        if(!productIdAlreadyExist){
            res.status(404)
            throw new Error("'id' não encontrado")
        }

        const  [ product ]: TProduct[] | undefined[] = await db("products").where({ id: idToEdit})

        if(!product) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        const newProduct : TProduct  ={
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            description: newDescription || product.description,
            imageUrl: newImageUrl || product.imageUrl
        }
        
        await db("products").update(newProduct).where({id: idToEdit})

        res.status(200).send({
            message: "Produto atualizado com sucesso.",
            product: newProduct
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
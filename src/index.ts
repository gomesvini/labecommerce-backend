import  express, {Request, Response}  from 'express';
import cors from 'cors';
import { products, users } from './database';

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

console.table(users)
console.table(products)
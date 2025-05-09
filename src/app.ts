import express,{Application,Request,Response} from 'express'
import { connectDatabase } from './database/database'

const app:Application = express()
const PORT:number = 3000


app.get("/",(req:Request,res:Response)=>{
    res.send("This is backend")
})

connectDatabase()

app.listen(PORT, ()=>{
    console.log("Server has started at port ", PORT)
})
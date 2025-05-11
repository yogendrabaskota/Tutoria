import express,{Application,Request,Response} from 'express'
import { connectDatabase } from './database/database'

const app:Application = express()
const PORT:number = 4000



app.use(express.json())
app.use(express.urlencoded({ extended: true }));  





import userRoute from './route/userRoute'
import jobRoute from './route/jobRoute'


app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})

app.use('/user',userRoute)
app.use('/job',jobRoute)


connectDatabase()


app.listen(PORT, ()=>{
    console.log("Server has started at port ", PORT)
})
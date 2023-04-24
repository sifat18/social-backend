import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotEnv from 'dotenv'
import multer from 'multer'; // local file upload
import helmet from 'helmet'; //request body security
import morgan from 'morgan'; // for logging
import path from 'path'; // ' line 9-10 for file path configuration'
import { fileURLToPath } from 'url'

// configurations of packages 
const __fileName=fileURLToPath(import.meta.url) // line 13 -14 only when type modules is used in package json  for getting the file url
const __dirName= path.dirname(__fileName)

dotEnv.config()

const app =express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}))
app.use(morgan('common'))
app.use(cors())
app.use('/assets',express.static(path.join(__dirName,'public/assets')))
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))

// file storage config
const storage= multer.diskStorage({
    destination:(req,file,cb)=>    cb(null, 'public/assets'),
    filename: (req,file,cb)=>cb(null,file.originalname)

})
// 
const upload= multer({storage})
// mongoose setup
const port =process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(port,()=>console.log(`server is connected in ${port}`))
}).catch(err=>console.log(err))
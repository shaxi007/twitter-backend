import express from 'express'
import { authControl } from '../middlewares/authController.js'
import { cont } from '../middlewares/cont.js'
import { postmid } from '../middlewares/postsmid.js'
import {REGISTER} from '../modules/register.js'
import {LOGIN} from '../modules/login.js'
import {POSTS} from '../modules/post.js'
import {postGet} from '../modules/postGet.js'
import {postDelete} from '../modules/postDelete.js'
import {postUp} from '../modules/postUp.js'
import {postIdwith} from '../modules/post_id.js'

let app = express()


app.get('/',(req,res)=>res.send('ok'))

app.post('/register',authControl,(req,res) => {
	REGISTER(req,res)
})
app.post('/login',cont,(req,res)=>{
	LOGIN(req,res)
})
app.post('/posts',postmid,(req,res)=>{
	POSTS(req,res)
})

app.get('/posts',(req,res)=>{
	postGet(req,res)
})

app.get('/posts/:id',(req,res)=>{
	postIdwith(req,res)
})


app.delete('/posts',cont,(req,res)=>{
	postDelete(req,res)
})

app.put('/posts',postmid,(req,res)=>{
	postUp(req,res)
})

app.listen(2000,()=> console.log('http://localhost:2000'))
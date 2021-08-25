import express from 'express'
import { authControl } from '../middlewares/authController.js'
import { cont } from '../middlewares/cont.js'
import { postmid } from '../middlewares/postsmid.js'
import { comPost } from '../middlewares/comPo.js'
import {REGISTER} from '../modules/register.js'
import {LOGIN} from '../modules/login.js'
import {POSTS} from '../modules/post.js'
import {postGet} from '../modules/postGet.js'
import {postDelete} from '../modules/postDelete.js'
import {postUp} from '../modules/postUp.js'
import {postIdwith} from '../modules/post_id.js'
import {commentPost} from '../modules/comPosts.js'
import {commentUp} from '../modules/commentUp.js'
import {comDelete} from '../modules/comDelete.js'
import {comGET} from '../modules/comGET.js'

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

app.post('/comments',comPost,(req,res)=>{
	commentPost(req,res)
})

app.get('/posts',(req,res)=>{
	postGet(req,res)
})

app.get('/comments',(req,res)=>{
	comGET(req,res)
})

app.get('/posts/:id',(req,res)=>{
	postIdwith(req,res)
})


app.delete('/posts',cont,(req,res)=>{
	postDelete(req,res)
})

app.delete('/comments',cont,(req,res)=>{
	comDelete(req,res)
})

app.put('/posts',postmid,(req,res)=>{
	postUp(req,res)
})

app.put('/comments',postmid,(req,res)=>{
	commentUp(req,res)
})

app.listen(2000,()=> console.log('http://localhost:2000'))
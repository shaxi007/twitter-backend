import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function postGet(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let posts = fs.readFileSync(path.join(process.cwd(),'database','posts.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		res.send(posts)
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	postGet
}
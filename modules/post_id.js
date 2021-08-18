import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function postIdwith(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let posts = fs.readFileSync(path.join(process.cwd(),'database','posts.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		res.send(posts.find(post=>post.postId==req.params.id))
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	postIdwith
}
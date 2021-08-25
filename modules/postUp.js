import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function postUp(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {postId,title,body} = req.body
		let {userId} = token
		let posts = fs.readFileSync(path.join(process.cwd(),'database','posts.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		let post  = posts.find(el=>el.userId==userId&&el.postId==postId)
		if(title) post.title = title
		if(body) post.body = body

		fs.writeFileSync(path.join(process.cwd(),'database','posts.json'),JSON.stringify(posts, null,4))
		res.send('updated')
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	postUp
}
import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function POSTS(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let posts = fs.readFileSync(path.join(process.cwd(),'database','posts.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		let {title,body} = req.body
		let postId = posts.length ? posts[posts.length-1].postId +1 :1
		let newPost = {
			title,
			postId,
			body,
			post_time: new Date(),
			userId
		}
		posts.push(newPost)
		fs.writeFileSync(path.join(process.cwd(),'database','posts.json'),JSON.stringify(posts, null,4))
		res.send(newPost)
	} catch(e) {
		res.send(e)
	}	
		
}

export {
	POSTS
}
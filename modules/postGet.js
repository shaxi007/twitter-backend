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
		let comments = fs.readFileSync(path.join(process.cwd(),'database','comment.json'), 'utf8')
		let users = fs.readFileSync(path.join(process.cwd(),'database','users.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		comments = comments ? JSON.parse(comments) : []
		users = users ? JSON.parse(users) : []
		users.forEach(el=> delete el.password)
		posts.forEach(  el => {
			el.user = users.find(user => user.userId == el.userId)
			el.comment = comments.find(comment => comment.postId == el.postId)
		} )
		res.json(posts)
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	postGet
}
import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function commentPost(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let comments = fs.readFileSync(path.join(process.cwd(),'database','comment.json'), 'utf8')
		comments = comments ? JSON.parse(comments) : []
		let {comment_body,postId} = req.body
		let commentId = comments.length ? comments[comments.length-1].commentId +1 :1
		let newComment = {
			comment_body,
			postId,
			comment_time: new Date(),
			userId,
			commentId
		}
		comments.push(newComment)
		fs.writeFileSync(path.join(process.cwd(),'database','comment.json'),JSON.stringify(comments, null,4))
		res.send(newComment)
	} catch(e) {
		res.send(e)
	}	
		
}

export {
	commentPost
}
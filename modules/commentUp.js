import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function commentUp(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let { comment_body ,commentId } = req.body
		let { userId } = token
		let comments = fs.readFileSync(path.join(process.cwd(),'database','comment.json'), 'utf8')
		comments = comments ? JSON.parse(comments) : []
		let comment  = comments.find(el=>el.userId==userId&&el.commentId==commentId)
		if(comment_body) comment.comment_body = comment_body

		fs.writeFileSync(path.join(process.cwd(),'database','comment.json'),JSON.stringify(comments, null,4))
		res.send('updated')
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	commentUp
}
import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function comDelete(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let {commentId} = req.body
		let comments = fs.readFileSync(path.join(process.cwd(),'database','comment.json'), 'utf8')
		comments = comments ? JSON.parse(comments) : []
		let comment = comments.find(el => el.commentId==commentId && userId == el.userId)
		if(comment) {
			let deletCom = comments.filter(el=> el.commentId != commentId)
			if(deletCom.length<comments.length){
				fs.writeFileSync(path.join(process.cwd(),'database','comment.json'),JSON.stringify(deletCom, null,4))
				res.send('deleted')
			}else {
				res.send('bunday post topilmadi')
			}
		}else {
			res.send('bunday user mavjud emas')
		}
	} catch(e) {
		res.send(e)
	}	
		
}


export {
	comDelete
}


import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function comGET(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let comments = fs.readFileSync(path.join(process.cwd(),'database','comment.json'), 'utf8')
		comments = comments ? JSON.parse(comments) : []
		if(req.query.userId){
            let com = comments.filter(el => el.userId == req.query.userId)
            res.json(com)
        }else if (req.query.postId) {
            let comP = comments.filter(el => el.postId == req.query.postId)
            res.json(comP)
        }else {
            res.json({message:'not found'})
        }
	} catch(e) {
		res.send(e)
	}		
}

export {
	comGET
}
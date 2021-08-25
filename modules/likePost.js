import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function LIKE(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let likes = fs.readFileSync(path.join(process.cwd(),'database','like.json'), 'utf8')
		likes = likes.length ? JSON.parse(likes) : []
		let { postId,isLike } = req.body
		let post = likes.find(el => el.postId == postId)
		if(!post){
			var newLike = {
				userId,
				postId,
				isLike
			}
			likes.push(newLike)
		}else if(post){
			post.isLike = isLike
		}
		fs.writeFileSync(path.join(process.cwd(),'database','like.json'),JSON.stringify(likes, null,4))
		res.send(newLike)
	} catch(e) {
		res.send(e)
	}	 
		
}

export {
	LIKE
}
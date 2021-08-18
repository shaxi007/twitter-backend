import fs from 'fs'
import path from 'path'
import jsonwebtoken from 'jsonwebtoken'

function postDelete(req,res) {
	try {
		let token = req.headers.token
		if(!token)  throw  'token required'
		token = jsonwebtoken.verify(token,'private')
		let {userId} = token
		let {postId} = req.body
		let posts = fs.readFileSync(path.join(process.cwd(),'database','posts.json'), 'utf8')
		posts = posts ? JSON.parse(posts) : []
		let user = posts.find(el => el.userId==userId)
		if(user) {
			let deletPOst = posts.filter(el=> el.postId != postId)
			if(deletPOst.length<posts.length){
				fs.writeFileSync(path.join(process.cwd(),'database','posts.json'),JSON.stringify(deletPOst, null,4))
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
	postDelete
}


import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

function LOGIN(req,res) {
		let users = fs.readFileSync(path.join(process.cwd(),'database','users.json'), 'utf8')
		users = users ? JSON.parse(users) : []
		let {username,password} = req.body
		let user = users.find(el=>el.username==username&&el.password == password)
		if(user){				
			return res.json( {message:'ok',status:200,token:jsonwebtoken.sign({userId:user.userId},'private')} )
		}else {
			return res.end('ro\'yxatdan o\'ting')
		}
}

export { LOGIN }
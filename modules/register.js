import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

function REGISTER(req,res) {
		let users = fs.readFileSync(path.join(process.cwd(),'database','users.json'), 'utf8')
		users = users ? JSON.parse(users) : []
		let {username,contact,age,password,gender} = req.body
		let userId = users.length ? users[users.length-1].userId +1 :1
		let newUser = {
			userId,	
			username,
			age,
			password,
			gender 
		}
		try {
			if(users.find(el=>el.username==username)) throw 'oldindan bor'
			users.push(newUser)
			fs.writeFileSync(path.join(process.cwd(),'database','users.json'),JSON.stringify(users,null,4))
			res.status(201)
			return res.json( {message:'ok',status:201,token:jsonwebtoken.sign({userId},'private')} )
		} catch(e) {
			return res.send('oldindan bor')
		}
}

export { REGISTER }
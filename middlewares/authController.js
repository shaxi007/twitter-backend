function authControl (req, res, next) {
	let data =''
	req.on('data',chunk=>data+=chunk)
	req.on('end',()=>{
		try {
			if(data) data = JSON.parse(data) 
			else throw 'hech narsa kiritilmadi'
			let {username,password,contact,age,gender}  = data
			if(!username||username.length<3||username>30) throw  'invalid username'
			if(!password||!(/[0-9]/).test(password)||!(/[a-z]/).test(password)||!(/[A-Z]/).test(password)||(''+password).length<8 ) throw 'invalid password'
			if(!age||age<1||age>100) throw 'invalid age'
			if(!gender) throw 'required gender'
			if(!contact || (''+contact).length !=12 || typeof +contact != 'number') throw 'invalid phone number'
			req.body = data
			next()
		} catch(e) {
			res.send(e)
		}
	})
}

export {authControl}
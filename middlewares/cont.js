function cont (req, res, next) {
	let data =''
	req.on('data',chunk=>data+=chunk)
	req.on('end',()=>{
		try {
			if(data) data = JSON.parse(data) 
			else throw 'hech narsa kiritilmadi'
			req.body = data
			next()
		} catch(e) {
			res.send(e)
		}
	})
}

export {cont}
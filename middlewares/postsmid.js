function postmid (req, res, next) {
	let data =''
	req.on('data',chunk=>data+=chunk)
	req.on('end',()=>{
		try {
			if(data) data = JSON.parse(data) 
			else throw 'hech narsa kiritilmadi'
			if(data.title) if(!data.title || data.title.length<1 || data.title.length>30) throw 'xato kiritildi yoki hech narsa kiritilmadi'
			if(data.body) if(!data.body || data.body.length<1 || data.body.length>250) throw 'xato kiritildi yoki hech narsa kiritilmadi'
			req.body = data
			next()
		} catch(e) {
			res.send(e)
		}
	})
}

export {postmid}
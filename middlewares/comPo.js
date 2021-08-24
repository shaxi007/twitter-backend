function comPost (req, res, next) {
	let data =''
	req.on('data',chunk=>data+=chunk)
	req.on('end',()=>{
		try {
			if(data) data = JSON.parse(data) 
			else throw 'hech narsa kiritilmadi'
			if(!data.comment_body || data.comment_body.length<1 || data.comment_body.length>30) throw 'xato kiritildi yoki hech narsa kiritilmadi'
			if(!data.postId) throw 'post id kiritilmadi' 
			req.body = data
			next()
		} catch(e) {
			res.send(e)
		}
	})
}

export {comPost}
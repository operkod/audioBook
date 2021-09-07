const isAuth = req => {
	const token = req.headers?.authorization?.split(' ')[1]
	return !!token
}

module.exports = isAuth

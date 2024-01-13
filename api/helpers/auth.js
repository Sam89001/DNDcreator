const bcrypt = require('bcrypt');

const hashedPassword = (password) => {
    return new Promise((resolve, reject) => {
        //increases bcrypt security
        bcrypt.genSalt(12, (err, salt) => {
          if(err) {
						reject(err)
          }
						bcrypt.hash(password, salt, (err, hash) => {
							if (err) {
								reject(err)
							}
							resolve(hash)
					})
        })
    }) 
}

const comparePassword = (password, hashed) => {
	return bcrypt.compare(password, hashed)
}

module.exports = {hashedPassword, comparePassword}
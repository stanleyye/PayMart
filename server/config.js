module.exports = {  
	database: 'mongodb://localhost/paymart',
	// HIGHLY ADVISBLE TO USE A COMPLEX STRING WITH DIFFERENT CHARACTERS. 
  jwtSecret: 'secret',
  jwtSession: {
      session: false
  }
};
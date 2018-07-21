const io = require('./index.js').io

// const {  } = require('../Events')

module.exports = function(socket){
					
	// console.log('\x1bc'); //clears console
	console.log("Socket Id:" + socket.id);
    
	//User disconnects
	socket.on('disconnect', ()=>{
		console.log('disconnect')
	})

}

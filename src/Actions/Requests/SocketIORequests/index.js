export const connectToRoom=(socket,roomId)=>{
	debugger;
	try{
		socket.emit('room',roomId);
		return socket;
	}catch(err){
		console.log(err);
		return err;
	} 
}

export const sendMessage=(socket,data)=>{
	try{
		debugger;
		socket.emit('roomMessage',data);

	}catch(err){
		console.log(err);
		return err;
	}
}
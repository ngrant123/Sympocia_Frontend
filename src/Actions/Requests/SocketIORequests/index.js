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

export const sendChatRoomMessage=(socket,data)=>{
	try{
		debugger;
		socket.emit('chatRoomMessage',data);

	}catch(err){
		console.log(err);
		return err;
	}
}


export const sendGroupGeneralMessage=(socket,data)=>{
	try{
		socket.emit('groupChatMessage',data);
	}catch(err){
		console.log(err);
		return err;
	}
}

export const sendPrivateGroupMessage=(socket,data)=>{
	try{
		socket.emit('privateMessage',data);
	}catch(err){
		console.log(err);
		return err;
	}
}

export const sendNewAddition=(socket,data)=>{
	try{
		debugger;
		socket.emit('newGroupCallAttendee',{stream:data.user.videoUrl});
	}catch(err){
		console.log(err);
		return err;
	}
}

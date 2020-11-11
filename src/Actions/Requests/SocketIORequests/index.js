export const connectToRoom=(socket,roomId)=>{
	
	try{
		socket.emit('room',roomId);
		return socket;
	}catch(err){
		return err;
	} 
}

export const sendMessage=(socket,data)=>{
	try{
		
		socket.emit('roomMessage',data);

	}catch(err){
		return err;
	}
}

export const sendChatRoomMessage=(socket,data)=>{
	try{
		
		socket.emit('chatRoomMessage',data);

	}catch(err){
		return err;
	}
}


export const sendGroupGeneralMessage=(socket,data)=>{
	try{
		socket.emit('groupChatMessage',data);
	}catch(err){
		return err;
	}
}

export const sendPrivateGroupMessage=(socket,data)=>{
	try{
		socket.emit('privateMessage',data);
	}catch(err){
		return err;
	}
}

export const sendNewAddition=(socket,data)=>{
	try{
		
		socket.emit('newGroupCallAttendee',{stream:data.user.videoUrl});
	}catch(err){
		return err;
	}
}

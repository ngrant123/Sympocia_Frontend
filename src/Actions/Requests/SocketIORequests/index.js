import io from 'socket.io-client';
var socket = io();

export const connectToRoom=(roomId)=>{
	try{
		socket.on('connect',()=>{
			socket.emit('room',roomId);
		})

	}catch(err){
		console.log(err);
		return err;
	}

}

export const receieveMessage=()=>{
	try{
		socket.on('message',(data)=>{
			console.log(data);
		})
	}catch(err){
		console.log(err);
		return err;
	}
}
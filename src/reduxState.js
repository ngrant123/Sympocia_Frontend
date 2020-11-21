const loadState=()=>{

	try{
		//Used to remove local state 
		//localStorage.removeItem('state');
		
	 	const serializedState = localStorage.getItem('state');
	    if (serializedState === null) {
	      return undefined;
	    }
	    return JSON.parse(serializedState);

	}catch(err){
	}
}

const saveState=(state)=>{

	try{
		const serializedState = JSON.stringify(state);
	    localStorage.setItem('state', serializedState);
	}catch(err){
	}
}

module.exports={
	loadState,
	saveState
}
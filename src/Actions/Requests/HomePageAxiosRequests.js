import axios from "axios";


module.exports={



	//Tester
	getTesterData(){

		axios.get("localhost:8080/").then(response=>{
			
			console.log(response.data);			


			}
		)

	}


};
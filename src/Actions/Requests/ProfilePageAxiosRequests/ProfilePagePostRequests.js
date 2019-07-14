import axios from "axios";
import BASE_URL from "../Constants.js";


const baseurl=BASE_URL.BASE_URL;

export function addEmployeeData(userId,employeeData){
	//

	axios.put(`${baseurl}/addEmployee`,{

		params:{
			userid:userId,
			employeedata:employeeData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}


export function addNewsData(userId,newsData){

	axios.put(`${baseurl}/addNews`,{

		params:{
			userid:userId,
			newsdata:newsData
		}
	}).then(res=>{

		console.log(res.data);


	}).catch(err=>{

		console.log(err.message);

	})
}

export function addPostData(userId,postData){

	axios.post(`${baseurl}/addPost`,{

		params:{
			userid:userId,
			postdata:postData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{


		console.log(err.message);
	})
}

export function updateEmployee(userId,updatedEmployeeData){

	axios.put(`${baseurl}/updateEmployee`,{
		params:{
			userid:userId,
			updatedemployeedata:updatedEmployeeData
		}
	}).then(res=>{

		console.log(res.data);

	}).catch(err=>{
		console.log(err.message);
	})
}















import axios from "axios";
import BASE_URL from "../Constants.js";


const baseurl=BASE_URL.BASE_URL;

export function addEmployeeData(userId,employeeData){
	/*
		userId:number
		employeeData:object
	*/

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

	/*
		userId:number
		newsdata:object
	*/

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

	/*
		userId:number
		postdata:object
	*/

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

	/*
		userId:number
		updateemployeedata:object
	*/

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















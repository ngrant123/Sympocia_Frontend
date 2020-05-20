import axios from "axios";

export async function createCompanyProfile (companyObject){

	const CreateUrl='http://localhost:4000/api/company/alter';
	try{


	const{ companyName,
		companyLocation,
		companyIndustry,
		paymentPlan,
		stripeToken 
	} = companyObject;

	console.log("Company Posts");

	const {data}=await axios.post(`${CreateUrl}/createCompanyProfile`,{
			companyName:companyName,
			location:companyLocation,
			industry:companyIndustry,
			paymentPlan:paymentPlan,
			stripeToken:stripeToken
		});/*.
		then(companyProfile=>{
			console.log(companyProfile);
			const data=companyProfile.data.data;
			return data;
		}).catch(err=>{

			const confirmationObject={confirmation:'Failure',data:err.message};
			return confirmationObject;
		})
		*/
	return data.data;
	}catch(err){
		console.log(err.message);
	}
};


export async function addEmployeeToCompanyDB(companyId,employeeInformation){

	const CreateUrl='http://localhost:4000/api/company/alter';
	try{
		debugger;
		const {
			  employeeBio,
			  employeeImg,
			  employeeTitle,
			  id,
			  employeeName,
			  employeeLocation,
			  employeeEmail,
			  employeeShortDescription
			}=employeeInformation;

		const employee=await axios.post(`${CreateUrl}/addEmployee`,{
				employeeInformation:{
					bio:employeeBio,
					imgUrl:employeeImg,
					title:employeeTitle,
					name:employeeName,
					location:employeeLocation,
					email:employeeEmail,
					shortbio:employeeShortDescription
				},
				id:companyId
		})

		console.log(employee);
		return employee;


	}catch(err){
		console.log(err);

	}
}


export async function addNewsToDB(newsObject,companyId){

	const CreateUrl='http://localhost:4000/api/company/alter';

	try{
		const {	newsDate,
				news }=newsObject

		const newsConfirmation=await axios.post(`${CreateUrl}/addNews`,{
			id:companyId,
			news:{
				date:newsDate,
				newsDescription:news
			}
		})

		return newsConfirmation;

	}catch(err){

		console.log(err.message);
	}
}


export function sendCoverPhotoToDB(companyId,coverPhotoData){

	console.log("Testing cover photo api");
	const CreateUrl='http://localhost:4000/api/company/alter';
	try{

		axios.post(`${CreateUrl}/addCoverPhoto`,{
			companyId:companyId,
			imageData:coverPhotoData
		}).then(confirmation=>{

			return confirmation;

		}).catch(err=>{
			console.log(err);
		})

	}catch(err){
		console.log(err);
	}
}

export function sendCompanyIconToDB(companyId,imgData){
	console.log("Testing Company icon function");
	const CreateUrl='http://localhost:4000/api/company/alter';

	try{
		axios.post(`${CreateUrl}/addCompanyProfilePicture`,{
			companyId:companyId,
			imgData:imgData
		}).then(confirmation=>{
			return confirmation;
		}).catch(err=>{
			console.log(err);
		})



	}catch(err){
		console.log(err);
	}

}



export const createCompanyChampion=async(companyId,championData)=>{
	try{
		const CreateUrl='http://localhost:4000/api/company/alter';
		const championCreationResponse=await axios.post(`${CreateUrl}/createChampion`,{
			_id:companyId,
			championData:championData
		});

		const {data}=championCreationResponse.data;
		const championResponse=data.data;
		return championResponse;

	}catch(err){
		console.log(err);
		return err;
	}

}







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

	const {data}=await axios.post(`${CreateUrl}/createCompanyProfile`,{
			companyName:companyName,
			location:companyLocation,
			industry:companyIndustry,
			paymentPlan:paymentPlan,
			stripeToken:stripeToken
		});/*.
		then(companyProfile=>{
			const data=companyProfile.data.data;
			return data;
		}).catch(err=>{

			const confirmationObject={confirmation:'Failure',data:err.message};
			return confirmationObject;
		})
		*/
	return data.data;
	}catch(err){
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
		return employee;


	}catch(err){

	}
}


export async function addNewsToDB(newsObject,companyId){

	const CreateUrl='http://localhost:4000/api/company/alter';

	try{
		const {	date,newsDescription}=newsObject

		const newsConfirmation=await axios.post(`${CreateUrl}/addNews`,{
			id:companyId,
			news:{
				date:date,
				newsDescription:newsDescription
			}
		})

		return newsConfirmation;

	}catch(err){
	}
}


export function sendCoverPhotoToDB(companyId,coverPhotoData){

	const CreateUrl='http://localhost:4000/api/company/alter';
	try{

		axios.post(`${CreateUrl}/addCoverPhoto`,{
			companyId:companyId,
			imageData:coverPhotoData
		}).then(confirmation=>{

			return confirmation;

		}).catch(err=>{
		})

	}catch(err){
	}
}

export function sendCompanyIconToDB(companyId,imgData){
	const CreateUrl='http://localhost:4000/api/company/alter';

	try{
		axios.post(`${CreateUrl}/addCompanyProfilePicture`,{
			companyId:companyId,
			imgData:imgData
		}).then(confirmation=>{
			return confirmation;
		}).catch(err=>{
		})



	}catch(err){
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
		return err;
	}

}


export const addRecruit=async(personalProfile,targetedProfile)=>{
	try{
		
		const CreateUrl='http://localhost:4000/api/company/alter';
		const recruitResponse=await axios.post(`${CreateUrl}/addRecruit`,{
			personalProfileId:personalProfile,
			targetProfile:targetedProfile
		});
		const {data}=recruitResponse;
		const recruitData=data.data;
		return recruitData;
		
	}catch(err){
		return err;
	}

}







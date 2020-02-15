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
import axios from "axios";

export function createCompanyProfile(companyObject){

	const CreateUrl='http://localhost:4000/api/profile/alter';

	const{ companyName,
		companyLocation,
		companyIndustry,
		stripeToken } =companyObject;


		axios.post(`${CreateUrl}/createCompanyProfile`,{
			companyName,
			companyLocation,
			companyIndustry,
			stripeToken
		}).
		then(companyProfile=>{
			return companyProfile;

		}).catch(err=>{

			const confirmationObject={confirmation:'Failure',data:err.message};
			return confirmationObject;
		})
}
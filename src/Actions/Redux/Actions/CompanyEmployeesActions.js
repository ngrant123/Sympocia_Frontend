const updateEmployeeName=(employeeInformation)=>{

	const { employeeId, employeeName }=employeeInformation;

	return{
		type:'UPDATE_EMPLOYEE_NAME',
		payload:{
			employeeId:employeeId,
			changeEmployeeInfo:employeeName
		}
	}
}

const updateEmployeeShortDescription=(employeeInformation)=>{


	const {employeeId, shortDescription}=employeeInformation;

	return{
		type:'UPDATE_EMPLOYYE_SHORT_DESCRIPTION',
		payload:{
			employeeId:employeeId,
			changeEmployeeInfo:shortDescription
		}
	}
}

const updateEmployeeEmail=(employeeInformation)=>{


	const {employeeId, employeeEmail}=employeeInformation;

	return{
		type:'UPDATE_EMPLOYYE_EMAIL',
		payload:{
			employeeId:employeeId,
			changeEmployeeInfo:employeeEmail
		}
	}
}
const updateEmployeeTitle=(employeeInformation)=>{


	const { employeeId, employeeTitle }=employeeInformation;

	return{
		type:'UPDATE_EMPLOYYE_TITLE',
		payload:{
			employeeId:employeeId,
			changeEmployeeInfo:employeeTitle
		}
	}
}
const updateEmployeeBio=(employeeInformation)=>{


	const {employeeId, employeeBio}=employeeInformation;

	return{
		type:'UPDATE_EMPLOYYE_BIO',
		payload:{
			employeeId:employeeId,
			changeEmployeeInfo:employeeBio
		}
	}
}



module.exports={
	updateEmployeeName,
	updateEmployeeShortDescription,

}


export function updateEmployeeName = (employeeId,employeeName)=>{

	return{
		type:'UPDATE_EMPLOYEE_NAME',
		payload:{
			employeeId:employeeId,
			employeeName:employeeName
		}
	}
}
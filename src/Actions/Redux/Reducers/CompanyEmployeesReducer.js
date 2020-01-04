/*
Structure for the redux state for the


*/
const initialState =[
		{
			employeeName:'',
			employeeShortDescription:'',
			employeeEmail:'',
			employeeLocation:'',
			employeeTitle:'',
			employeeBio:'',
			employeeId:0
		}
	]


const EmployeesReducer=(state = initialState, action)=>{

		
		const { type, payload }=action;

		switch(type){

			case 'UPDATE_EMPLOYEE_NAME':

				return (state.map(employee=>{
					if(employee.employeeId==payload.employeeId){
						return {
									...employee,
									employeeName:payload.changeEmployeeInfo
								}
					}
					else
						return employee;
					})
				);				
				break;


			case 'UPDATE_EMPLOYYE_SHORT_DESCRIPTION':

				return(state.map(employee=>{

					if(employee.employeeId==payload.employeeId)
						return {
								...employee, 
								employeeShortDescription:payload.changeEmployeeInfo
								}
					else
						return employee
				}));

				break;

			case 'UPDATE_EMPLOYEE_EMAIL':

				return(state.map(employee=>{

					if(employee.employeeId==payload.employeeId)
						return {
								...employee, 
								employeeEmail:payload.changeEmployeeInfo
								}
					else
						return employee
				}));

				break;


			case 'UPDATE_EMPLOYEE_TITLE':

				return(state.map(employee=>{

					if(employee.employeeId==payload.employeeId)
						return {
								...employee, 
								employeeTitle:payload.changeEmployeeInfo
								}
					else
						return employee
					})
				);

				break;

			case 'UPDATE_EMPLOYEE_BIO':
				return(state.map(employee=>{

						if(employee.employeeId==payload.employeeId)
							return {
									...employee, 
									employeeBio:payload.changeEmployeeInfo
									}
						else
							return employee
						})
					);

				break;


			default:
				return state;
				break;




		}
		
}


export default EmployeesReducer;
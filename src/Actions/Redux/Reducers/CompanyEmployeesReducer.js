/*
Structure for the redux state for the


*/
const initialState =[

	companyEmployee:[ 
		companyName:"",
		employeeId:[]
	],
	employees:{
		0:{
			employeeName:"",
			employeeShortDescription:"",
			employeeEmail:"",
			employeeLocation:"",
			employeeTitle:"",
			employeeBio:""
		}
	}
]


export function EmployeesReducer(state = initialState, action){

	const { type, payload }= action;
	const { employeeeId , employeeData } = payload;

		switch(type){

			case 'UPDATE_EMPLOYEE_NAME':
				return {...state,
						employees:{
							...state.employees,
							employeeId:{
								...state.employees.employeeId,
								employeeName:employeeData.name
								}
							}
						}
				break;

			case 'ADD_EMPLOYEE':
				let employeeObject=employeeData;

				let newstate={companyEmployee:[
							...state.companyEmployee,
							employeeId.push(employeeId)
						],
						employees:{
							...state,
							[employeeId]:employeeObject
						}
					}
				break;


			case 'UPDATE_EMPLOYEE_SHORT_DESCRIPTION':
				return{...state,
					employees:{
						...state,
						employeeShortDescription:employeedata.employeeShortDescription
					}
				};
				break;

			case 'UPDATE_EMPLOYEE_EMAIL':
				return{...state,
					employees:{
						...state,
						employeeShortDescription:employeedata.employeeEmail
					}
				};
				break;

			case 'UPDATE_EMPLOYEE_LOCATION':
				return{};
				break;

			case 'UPDATE_EMPLOYEE_TITLE':
				return{};
				break;

			case 'UPDATE_EMPLOYEE_BIO':
				return{};
				break;

			default:
				return state;
				break;

		}
}
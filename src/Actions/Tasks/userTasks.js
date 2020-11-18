
	//import { getUserLocation } from "../MapPageAxiosRequests/MapPageGetRequests.js";

	export function searchforfirstName(firstName,data){
		var investorcontainer=[];
		var investorname;
		var investorobject;
		var fullname;
		var firstname;

		for(var i=0;i<data.length;i++){
			investorobject=data[i];
			investorname=investorobject.name;
			fullname=investorname.split(" ");
			firstname=fullname[0];

			if(firstname==firstName)
				investorcontainer.push(investorobject);
		}

		return investorcontainer;
	}

	export function searchforLastName(firstnamecontainer,lastName){

		var investorcontainer=[];
		var investorobject;
		var investorname;
		var fullname;
		var lastname;

		for(var i=0;i<firstnamecontainer.length;i++){

			investorobject=firstnamecontainer[i];
			investorname=investorobject.name;
			fullname=investorname.split(" ");
			if(fullname.length>1){
				lastname=fullname[1];

				if(lastname=lastName)
					investorcontainer.push(investorobject);

			}
		}
		return investorcontainer;

	}

	export function greetingdependingonTime(employeename){
		var currenttime=new Date();
		var getHour=currenttime.getHours();
		var employeeName=employeename; 

		if(getHour>=1&&getHour<12)
			return "Hope you're having a good morning "+employeeName;
		else if(getHour>=12 && getHour<6)
			return "Hope you're having a good evening "+employeeName;
		else
			return "Hope you're having a good night "+employeeName;
	}

	export function credientialMapSearch(searchByIndustry, searchByArea, searchByName){

		if(searchByName!=null){

		}
		else{
			if(searchByIndustry!=null && searchByArea!=null){


			}
			else if(searchByIndustry!=null && searchByArea==null){


			}
			else if(searchByIndustry==null && searchByArea!=null){


			}
		}
	}

	export function UserLocation(userId){
		//decrypt userId
		let userId2=decrypt(userId);
		//getUserLocation()




	}

	function decrypt(userId){

	}

/*

	Should be implemented later in developement after mvp is set up 
	//To do list

	1.) Verify user input
	2.) verify email
	3.)Verify number of characters in a bio or something


*/


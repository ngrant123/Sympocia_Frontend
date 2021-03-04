import React,{useState,useEffect} from "react";
import {firstTimePostInteractedStatus} from  "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import PostOnboarding from "../../OnBoarding/PostOnboarding.js";

const FirstTimePostOnboardingStatusTrigger=({userId})=>{
	const [displayOnboarding,changeDisplayOnboarding]=useState(false);


	useEffect(()=>{
		const fetchOnboardingIndicator=async()=>{
			debugger;
			const {confirmation,data}=await firstTimePostInteractedStatus(userId);
			if(confirmation=="Success"){
				const {message}=data;
				console.log(message);
				if(message==true){
					changeDisplayOnboarding(true);
				}
			}
		}
		fetchOnboardingIndicator();
	},[])

	const closeModal=()=>{
		changeDisplayOnboarding(false);
	}

	return(
		<React.Fragment>
			{displayOnboarding==false?null:
				<PostOnboarding
					closeModal={closeModal}
				/>
			}
		</React.Fragment>
	)
}

export default FirstTimePostOnboardingStatusTrigger;
import React,{useMemo,memo} from "react";
import styled from "styled-components";

import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";

const PersonalPostsIndexContainer=(props)=>{
	const {
		displayCreationPortal,
		uiStatus
	}=props;
	const posts=useMemo(()=>{
		return <PersonalPostsIndex
					{...props}
				/>
	},[
		displayCreationPortal,
		uiStatus
	]);	

	return(
		<>{posts}</>
	)
}

export default PersonalPostsIndexContainer;
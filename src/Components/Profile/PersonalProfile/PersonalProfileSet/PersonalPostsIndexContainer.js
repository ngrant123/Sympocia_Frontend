import React,{useMemo,memo} from "react";
import styled from "styled-components";

import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";

const PersonalPostsIndexContainer=(props)=>{
	const {
		displayCreationPortal
	}=props;
	const posts=useMemo(()=>{
		return <PersonalPostsIndex
					{...props}
				/>
	},[displayCreationPortal]);	

	return(
		<>{posts}</>
	)
}

export default PersonalPostsIndexContainer;
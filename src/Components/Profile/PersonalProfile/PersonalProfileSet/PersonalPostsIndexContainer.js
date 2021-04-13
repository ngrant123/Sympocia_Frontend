import React,{useMemo,memo} from "react";
import styled from "styled-components";

import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";

const PersonalPostsIndexContainer=(props)=>{
	return(
		<PersonalPostsIndex
			{...props}
		/>
	)
}

export default PersonalPostsIndexContainer;
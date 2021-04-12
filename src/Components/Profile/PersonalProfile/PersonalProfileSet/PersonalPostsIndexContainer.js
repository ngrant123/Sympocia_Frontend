import React,{useMemo,memo} from "react";
import styled from "styled-components";

import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";

const PersonalPostsIndexContainer=(props)=>{
	const posts=useMemo(()=>{
		return <PersonalPostsIndex
					{...props}
				/>
	},[props.displayCreationPortal,props.uiStatus])

	return(
		<React.Fragment>
			{posts}
		</React.Fragment>
	)
}

export default memo(PersonalPostsIndexContainer);
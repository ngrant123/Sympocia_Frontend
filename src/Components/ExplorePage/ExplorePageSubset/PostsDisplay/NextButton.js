import React from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';
import Typed from "react-typed";

const NextButtonCSS={
	display:"flex",
	cursor:"pointer",
	flexDirection:"row",
	alignItems:"center",
	color:"#303030",
	justifyContent:"center"
}
const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const NextButton=(props)=>{
	const {
		endOfPostsDBIndicator,
		isLoadingReloadedPosts,
		triggerReloadingPostsHandle,
		postType
	}=props;
	return(
		<div style={{width:"100%"}}>
			{endOfPostsDBIndicator==false && ( 
				<React.Fragment>
					<hr style={PostsHorizontalLineCSS}/>
					{isLoadingReloadedPosts==true?
						<Typed 
		                    strings={['Loading...']} 
		                    typeSpeed={60}
		                    backSpeed={30} 
	            		/>:
	            		<div style={NextButtonCSS}>
							<p id="nextButton" 
								onClick={()=>triggerReloadingPostsHandle(postType)} style={{fontSize:"18px"}}>
								<b>Next</b>
							</p>
	            			<ArrowForwardIosIcon
	            				style={{fontSize:24,marginTop:"-1%"}}
	            			/>
	            		</div>
					}
				</React.Fragment>
			)}
		</div>
	)
}

export default NextButton;
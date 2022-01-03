import React,{useContext} from "react";
import styled from "styled-components";
import {PostContext} from "./PostsContext.js";
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';
import Typed from "react-typed";

const Container=styled.div`
	width:100%;

	@media screen and (max-width:650px){
		#nextButton{
			margin-left:0% !important;
		}
	}
`;

const NextButton=({postsLength})=>{
	const PostContextValues=useContext(PostContext);

	return(
		<Container>
			{postsLength>0 &&(
				<hr/>
			)}
			<div id="nextButton" style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",marginLeft:"-10%"}}>
				{ PostContextValues.endOfPostsDBIndicator==false
					&& PostContextValues.isSearchFilterActivated==false 
				 	&& PostContextValues.isFilteredPostsActivated==false  && (
					<React.Fragment>
						{PostContextValues.isLoadingReloadedPosts==true?
							 <Typed 
			                    strings={['Loading...']} 
			                    typeSpeed={60}
			                    backSpeed={30} 
		            		  />:
		            		<div style={{display:"flex",cursor:"pointer",flexDirection:"row",alignItems:"center",color:"#303030"}}>
								<p id="nextButton" 
									onClick={()=>PostContextValues.fetchNextPosts()} style={{fontSize:"18px"}}>
									<b>Next</b>
								</p>
		            			<ArrowForwardIosIcon
		            				style={{fontSize:24,marginTop:"-15%"}}
		            			/>
		            		</div>
						}
					</React.Fragment>
				)}
			</div>
		</Container>
	)
}

export default NextButton;
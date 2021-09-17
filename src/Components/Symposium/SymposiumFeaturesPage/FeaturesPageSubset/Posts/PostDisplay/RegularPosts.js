import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Container=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		margin-top:5%;
	}
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"110%",
	height:"1px"
}

const TextPostCSS={
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	marginRight:"8%",
	marginBottom:"5%",
	alignItems:"center"
}

const RegularPosts=({posts,triggerDisplaySelectedBeaconPost})=>{
	console.log(posts);
	return(
		<Container>
			{posts.map((data,index)=>
				<React.Fragment>
					<div style={TextPostCSS}
						onClick={()=>triggerDisplaySelectedBeaconPost(data,index)}>
						<div style={{display:"flex",flexDirection:"column"}}>
							<img src={data.post.owner.profilePicture==null?
										NoProfilePicture:
										data.post.owner.profilePicture
									} 
								style={{height:"40px",width:"45px",borderRadius:"50%"}}
							/>
							{data.acceptedAnswerStatus==true &&(
								<CheckCircleIcon
									id="checkMarkIcon"
									style={{color:"#43D351",fontSize:"36"}}
								/>
							)}
						</div>
						<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
							<p>
								<b>{data.post.owner.firstName}</b>
							</p>
							<p style={{maxHeight:"60px",overflow:"hidden"}}>
								{data.post.post}
							</p>
						</div>
					</div>
					<hr style={HorizontalLineCSS}/>
				</React.Fragment>
			)}
		</Container>
	)
}

export default RegularPosts;
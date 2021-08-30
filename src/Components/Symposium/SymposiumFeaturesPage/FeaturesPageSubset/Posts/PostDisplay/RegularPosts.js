import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		margin-top:5%;
	}
`;


const RegularPosts=({posts})=>{
	return(
		<Container>
			{posts.map(data=>
				<div style={{display:"flex",flexDirection:"row",marginRight:"8%",marginBottom:"5%"}}>
					<img src={NoProfilePicture}
						style={{height:"40px",width:"46px",borderRadius:"50%"}}
					/>
					<div style={{display:"flex",flexDirection:"column",marginLeft:"10%"}}>
						<p>
							<b>Nathan</b>
						</p>
						<p style={{maxHeight:"60px",overflow:"hidden"}}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							 tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
							 quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
							  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
							  sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</div>
			)}
		</Container>
	)
}

export default RegularPosts;
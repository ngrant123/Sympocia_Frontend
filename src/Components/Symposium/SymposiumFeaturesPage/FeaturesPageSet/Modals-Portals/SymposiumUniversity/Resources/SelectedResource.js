import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div``;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"20%"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const SelectedResource=({closeModal,highlightedSpecialist})=>{
	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>

			<div style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<img src={highlightedSpecialist.profilePicture==null?NoProfilePicture:highlightedSpecialist.profilePicture}
						style={{width:"70px",height:"70px",borderRadius:"50%"}}
					/>
					<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"50%"}}>
						<p>
							<b>{highlightedSpecialist.firstName}</b>
						</p>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				<p style={{maxHeight:"40px",overflow:"hidden"}}>
					{highlightedSpecialist.resourcePost}
				</p>
			</div>
		</Container>
	)
}

export default SelectedResource;
import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`

`;

const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;

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


const SpecialistsView=({specialists,triggerCreationModal,displayHighLightedSpecialist})=>{

	return(
		<Container>
			<p style={{fontSize:"25px"}}>
				<b>Specialists</b>
			</p>
			<hr/>
			<div style={{...ButtonCSS,marginTop:"2%",marginBottom:"5%"}} onClick={()=>triggerCreationModal()}>
				Create
			</div>
			{specialists.length==0?
				<p>No specialists</p>:
				<React.Fragment>
					{specialists.map((data,index)=>
						<React.Fragment>
							<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}
								onClick={()=>displayHighLightedSpecialist({...data,ranking:index+1})}>
								<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
									style={{width:"50px",height:"50px",borderRadius:"50%"}}
								/>
								<div style={{display:"flex",flexDirection:"column",marginLeft:"2%"}}>
									<div style={{display:"flex",flexDirection:"row"}}>
										<p>
											<b>{data.firstName}</b>
										</p>
									</div>
									<p style={{maxHeight:"40px",overflow:"hidden"}}>
										{data.introduction}
									</p>
								</div>
							</div>
							<hr/>
						</React.Fragment>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default SpecialistsView;
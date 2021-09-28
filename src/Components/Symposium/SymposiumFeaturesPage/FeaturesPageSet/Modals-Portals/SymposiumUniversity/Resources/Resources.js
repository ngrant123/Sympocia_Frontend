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


const Resources=({resources,displayCreateResource,displayHighLightedResource})=>{
	return(
		<Container>
			<p style={{fontSize:"25px"}}>
				<b>Photography Resources</b>
			</p>
			<hr/>
			<div style={{...ButtonCSS,marginTop:"2%",marginBottom:"5%"}} onClick={()=>displayCreateResource()}>
				Create
			</div>
			{resources.length==0?
				<p>No resources</p>:
				<React.Fragment>
					{resources.map(data=>
						<React.Fragment>
							<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}
								onClick={()=>displayHighLightedResource(data)}>
								<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
									style={{width:"50px",height:"50px",borderRadius:"50%"}}
								/>
								<div style={{display:"flex",flexDirection:"column",marginLeft:"2%"}}>
									<div style={{display:"flex",flexDirection:"row"}}>
										<p>
											<b>{data.firstName}</b>
										</p>
										{/*
											<p style={{marginLeft:"2%",color:"#B38AFF"}}>Rank:{index+1}</p>
										*/}
									</div>
									<p style={{maxHeight:"40px",overflow:"hidden"}}>
										{data.resourcePost}
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

export default Resources;
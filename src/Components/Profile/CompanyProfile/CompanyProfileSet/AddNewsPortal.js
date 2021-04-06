import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CloseIcon from '@material-ui/icons/Close';
import {addNewsToDB} from "../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPagePostRequests.js";



const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:15;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:35%;
	height:60%;
	background-color:red;
	top:0px;
	z-index:16;
	border-radius:5px;
	background-color:white;
	left:30%;
	top:5%;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	width:80%;
`;

const InputContainerDescription=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:10px;
	width:80%;
	height:30%;
`;

const ExploreButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%"
}


const AddNewsPortal=(props)=>{
	const handleAddNews=(companyId,addNewsToContext)=>{
		var datevalue=document.getElementById("DateCaptionValue").value;
		var notificationvalue=document.getElementById("NotificationValue").value;

		const newsObject={
			date:datevalue,
			newsDescription:notificationvalue
		}
		addNewsToDB(newsObject,companyId);
		addNewsToContext(newsObject);

		document.getElementById("NotificationValue").value="";
		document.getElementById("DateCaptionValue").value="";
		props.closeModal();
	}
	
	return createPortal(
			<React.Fragment>
				<ShadowContainer
					onClick={()=>props.closeModal()}
				/>
				<Container>
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",width:"100%"}}>
							<ul>
								<li style={{fontSize:"20px",listStyle:"none",display:"inline-block",marginRight:"55%"}}>
									<b>Add Information</b>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<CloseIcon
										onClick={()=>props.closeModal()}
									/>
								</li>
							</ul>
						</li>
						<hr/>
						<ul style={{padding:"15px"}}>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<InputContainer id="DateCaptionValue" placeholder="Please list the data of this news"/>
							</li>

							<li style={{listStyle:"none"}}>
								<InputContainerDescription id="NotificationValue" placeholder="Whats the big news?"/>
							</li>

						</ul>
						
						<li style={{listStyle:"none"}}>
							<ul stlye={{padding:"0px"}}>
								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<li style={ExploreButton} onClick={()=>handleAddNews(props.companyInformation.state.userProfile._id,props.companyInformation.updateNews)}>
										Add news
									</li>
								</a>

								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<li style={ExploreButton} onClick={()=>props.closeModal()}>
										Close
									</li>
								</a>
							</ul>
						</li>
					</ul>
				</Container>
			</React.Fragment>
		,document.getElementById("companyProfileContainer"));
}

export default AddNewsPortal;
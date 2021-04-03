import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {promotePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:35;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	padding:20px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}
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
  marginRight:"2%",
  marginBottom:"2%",
  cursor:"pointer"
}


const PromotePortal=({closePromotePortal,nodes,postType,postId,targetDom})=>{
	const [displayConfirmationPage,changeDisplayConfirmationPage]=useState(false);
	const [nodeSelected,changeNodeSelected]=useState();
	const [node,changeCurrentNodes]=useState([]);
	const [isProcessingSubmit,changeIsProcessingSubmit]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		
		let currentNodes=[...nodes];
		currentNodes.splice(0,1);
		changeCurrentNodes(currentNodes)
	},[])

	const confirmSelectedNode=(data)=>{
		changeNodeSelected(data);
		changeDisplayConfirmationPage(true);
	}

	const promotePostHandle=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsProcessingSubmit(true);
		const promotion={
			nodeId:nodeSelected._id,
			postId,
			postType,
			userId:personalInformation.id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		const {confirmation,data}=await promotePost(promotion);
		if(confirmation=="Success"){
			alert('Post has been promoted');
			closePromotePortal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						promotePostHandle,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error promoting this post. Please try again');
			}
		}
		changeIsProcessingSubmit(false);
	}

	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closePromotePortal()}
			/>
			<Container>
				{displayConfirmationPage==false?
					<>
						<p style={{fontSize:"20px"}}>
							<b>Promote Post</b>
						</p>

						<p>Please selected the level that you want your post to be promoted to </p>
						<hr/>
						<ul style={{padding:"0px"}}>
							{node.map(data=>
								<li style={{listStyle:"none",marginBottom:"5%"}}>
									<ul style={{padding:"0px"}}>
										<p style={{fontSize:"15px"}}>
											<b> {data.name} </b>
										 </p>
										<p> {data.description} </p>
										<a href="javascription:void(0)" style={{textDecoration:"none"}}>
											<li onClick={()=>confirmSelectedNode(data)} style={ButtonCSS}>
												Add
											</li>
										</a>
									</ul>
								</li>
							)}
						</ul>
					</>:
					<ul style={{padding:"0px"}}>
						<p> Are you sure you want to place this post in {nodeSelected.name} ? </p>
						<hr/>
						{isProcessingSubmit==true?
							<p>Please wait...</p>:
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<a style={{textDecoration:"none"}}>
										<li onClick={()=>promotePostHandle({isAccessTokenUpdated:false})} style={ButtonCSS}>
											Yes
										</li>
									</a>

									<a style={{textDecoration:"none"}}>
										<li onClick={()=>changeDisplayConfirmationPage(false)} style={ButtonCSS}>
											No
										</li>
									</a>
								</ul>
							</li>
						}
					</ul>
				}
			</Container>
		</>
		,document.getElementById(targetDom)
	)
}

export default PromotePortal;
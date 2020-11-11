import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {promotePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:25;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:25;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	padding:20px;
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
  marginBottom:"2%"
}


const PromotePortal=({closePromotePortal,nodes,postType,postId,targetDom})=>{
	const [displayConfirmationPage,changeDisplayConfirmationPage]=useState(false);
	const [nodeSelected,changeNodeSelected]=useState();

	console.log(nodes);

	const confirmSelectedNode=(data)=>{
		changeNodeSelected(data);
		changeDisplayConfirmationPage(true);
	}

	const promotePostHandle=async()=>{
		const promotion={
			nodeId:nodeSelected._id,
			postId,
			postType
		}

		const {confirmation,data}=await promotePost(promotion);
		if(confirmation=="Success"){
			alert('Post has been promoted');
			closePromotePortal();
		}else{
			alert('Unfortunately there has been an error promoting this post. Please try again');
		}
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
							{nodes.map(data=>
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
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<a href="javascription:void(0)" style={{textDecoration:"none"}}>
									<li onClick={()=>promotePostHandle()} style={ButtonCSS}>
										Yes
									</li>
								</a>

								<a href="javascription:void(0)" style={{textDecoration:"none"}}>
									<li onClick={()=>changeDisplayConfirmationPage(false)} style={ButtonCSS}>
										No
									</li>
								</a>
							</ul>
						</li>
					</ul>
				}
			</Container>
		</>
		,document.getElementById(targetDom)
	)
}

export default PromotePortal;
import React,{Component} from "react";
import styled from "styled-components";


const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;


const SmallVideo=styled.div`

	position:relative;
	height:65%;
	width:100%;
	background-color:red;
	border-radius:5px;
`;

const SmallVideoContainer=()=>{

	return(

		<SmallVideoComponent>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
			
												<SmallVideo/>
											</li>

											<li style={{listStyle:"none",fontSize:"15px"}}>
												<b> Title of small video  Title of small video  </b>
											</li>

											<li style={{listStyle:"none"}}>
												Nathan Grant
											</li>

											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
														127k views
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														6 days ago
													</li>
												</ul>
											</li>

											<li style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
												Industry Button
											</li>
										</ul>

		</SmallVideoComponent>

	)
}

export default SmallVideoContainer;
import React,{useState} from "react";
import styled from "styled-components";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";


const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	padding-right:120px;
`;

const NextButton=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
`;

const ImageCSS={
	width:"80%",
	height:"30%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
}

const PromoteSomeone=({actionType,recruitsInformationProp})=>{
	const [recruitsInformation,changeRecruitsInformation]=useState(recruitsInformationProp);
	const [displayPromoteSomeoneScreen,changeDisplayPromotionScreen]=useState(false);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);

	const removeSelectedPerson=(data)=>{
		debugger;
		const selectedId=data._id;
		var newArray=[];
		for(var i=0;i<selectedRecruits.length;i++){
			const {_id}=selectedRecruits[i];
			if(_id==selectedId)
				continue
			else
				newArray.push(selectedRecruits[i]);
		}

		changeSelectedRecruits([...newArray]);

	}

	const pushSelectedPersonToArray=(data)=>{
		selectedRecruits.push(data);
		const newSelectedRecruitsArray=selectedRecruits;
		changeSelectedRecruits([...newSelectedRecruitsArray]);
		console.log(selectedRecruits);
	} 


	return(
		<>
			displayPromoteSomeoneScreen==false?
				 <ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",marginTop:"5%",marginLeft:"10%"}}>
							<InputContainer placeholder="Search for some here"/>
						</li>

						<hr/>
						{selectedRecruits.map(data=>
										<li style={{listStyle:"none",display:"inline-block",width:"20%",marginBottom:"5%"}}>
											<ul style={{padding:"0px",width:"150%"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													{data.firstName}
												</li>
												<li onClick={()=>removeSelectedPerson(data)} style={{listStyle:"none",display:"inline-block",width:"20%"}}>
														<HighlightOffIcon
															onClick={()=>removeSelectedPerson(data)}
														/>
												</li>
											</ul>
										</li>
							)}
						<li style={{listStyle:"none",height:"45%",overflowY:"auto",marginBottom:"1%"}}>
							<ul style={{padding:"0px"}}>
								{recruitsInformation.length==0?
									<p> Broke ass </p>:
									<>
										{recruitsInformation.map(data=>
											<li style={{listStyle:"none",display:"inline-block",width:"25%",marginRight:"3%",borderRadius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
												<ul style={{padding:"10px"}}>
													<li style={{listStyle:"none"}}>
														{data.profilePicture==null?
															<img src={NoProfilePicture} style={ImageCSS}/>:
															<img src={data.profilePicture} style={ImageCSS}/>
														}
													</li>
													<li style={{listStyle:"none"}}>
														{data.firstName}
													</li>
													 <a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<li onClick={()=>pushSelectedPersonToArray(data)} style={{listStyle:"none",color:"#5298F8",borderRadius:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",padding:"10px",textAlign:"center"}}>
																{actionType}
															</li>
													</a>

												</ul>
											</li>
										)}
									</>
								}
							</ul>
						</li>
						<NextButton>
							Next
						</NextButton>
					</ul>:null
				{/*
					Screen that allows person to pick which node level to place a person
				*/}
		</>

	)
}

export default PromoteSomeone;
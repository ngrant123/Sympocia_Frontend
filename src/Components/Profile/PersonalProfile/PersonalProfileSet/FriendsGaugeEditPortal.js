import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {getProfileForHomePage} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js"
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:12;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
`;
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


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const NextButton=styled.div`
	position:relative;
	text-align:center;
	color:white;
	padding:10px;
	background-color:#C8B0F4;
	border-radius:5px;
`;

const SubmitButton=styled.div`
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

const NewNodeImageCSS={
	width:"50%",
	height:"25%",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	boxShadow:"15px #b9d6ff"
}

const FriendsGaugeEditPortal=(props)=>{
	const [recruitsInformation,changeRecruitsInformation]=useState([]);
	const [selectedRecruits,changeSelectedRecruits]=useState([]);

	const [displayAddNodeScreen,changeDisplayAddScreen]=useState(false);
	const [displayPromoteSomeoneScreen,changeDisplayPromotionScreen]=useState(false);

	useEffect(()=>{
		const getRecruitData=async()=>{
				const recruitsData=await getProfileForHomePage(props.userInformation);
				console.log(recruitsData.recruits);
				changeRecruitsInformation(recruitsData.recruits);
		};
		getRecruitData();
	},[]);

	const pushSelectedPersonToArray=(data)=>{
		selectedRecruits.push(data);
		const newSelectedRecruitsArray=selectedRecruits;
		changeSelectedRecruits([...newSelectedRecruitsArray]);
		console.log(selectedRecruits);
	} 

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

	const handleNextOrSubmitButton=(actionType)=>{
		if(actionType=="Add"){
			changeDisplayAddScreen(true);
		}else if(actionType=="Remove"){
			//changeDisplayRemoveScreen(true);
		}else{

		}
	}

	const addNodeToProfile=()=>{

	}

	const addNodeModal=()=>{
		debugger;
		if(displayAddNodeScreen==true){
			return <ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",marginTop:"5%",marginLeft:"10%"}}>
							<InputContainer placeholder="Search for some here"/>
						</li>

						<hr/>
						<p style={{color:"#A4A4A4"}}> List the people who you want to add to your new level (optional) </p>
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
														{props.actionType}
													</li>
											</a>

										</ul>
									</li>
								)}
							</ul>
						</li>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<NextButton onClick={()=>changeDisplayAddScreen(true)}>
								Next
							</NextButton>
						</a>
					</ul>
		}else{
			//Specific add node modal
			return <ul style={{padding:"20px"}}>
						<p style={{color:"#A4A4A4"}}> Give us more details about what you want to call this level </p>
						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<InputContainer placeholder="What do you want to call this level?"/>

						</li>

						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<InputContainer style={{height:"40%"}}placeholder="Enter a description (optional)"/>
						</li>

						<SubmitButton onClick={()=>addNodeToProfile()}>
							Submit
						</SubmitButton>

					</ul>
		}	
	}

	const removeNodeModal=()=>{
		return <ul style={{padding:"10px"}}>


				</ul>
	}
//
	const promoteSomoneModal=()=>{
		if(displayPromoteSomeoneScreen==false){
			return <ul style={{padding:"10px"}}>
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
														{props.actionType}
													</li>
											</a>

										</ul>
									</li>
								)}
							</ul>
						</li>
						<NextButton onClick={()=>handleNextOrSubmitButton(props.actionType)}>
							Next
						</NextButton>
					</ul>
		}else{
			//Screen that allows person to pick which node level to place a person
		}
	}

	const constructFriendsGaugeEditPortal=(actionType)=>{
		if(actionType=="Add"){
			return addNodeModal();
		}else if(actionType=="Promote"){
			return removeNodeModal();
		}else{
			return promoteSomoneModal();
		}
	}

	console.log(props);
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={props.hideModal}
			/>
			<Container>
				{constructFriendsGaugeEditPortal(props.actionType)}
			</Container>

		</React.Fragment>
	,document.getElementById("personalContainer"));
};

export default FriendsGaugeEditPortal;
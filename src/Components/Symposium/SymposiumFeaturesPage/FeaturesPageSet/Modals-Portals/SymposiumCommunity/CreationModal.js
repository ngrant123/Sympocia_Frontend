import React,{useState} from "react";
import styled from "styled-components";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Container=styled.div`
	width:100%;
	height:100%;
	padding:20px;
`;

const InputContainer=styled.textarea`
	resize:none;
	padding:5px;
	height:120px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
	width:100%;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const CreationCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	borderColor:"#D8D8D8",
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"white",
	color:"#000000",
	marginTop:"5%"
}


const SelectedPostTypeCSS={
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	marginLeft:"5%",
	cursor:"pointer"
}

const CreationButtonCSS={
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
	width:"30%",
	marginTop:"5%"
}
const SymposiumCommunityCreation=({closeModal,updateStandings})=>{
	const [selectedPostType,changeSelectedPostType]=useState();

	const createSymposiumCommunityQuestion=()=>{
		const question=document.getElementById("symposiumQuestion").value;
		if(question!="" && selectedPostType!=null){
			const userSubmittedQuestion={
				question,
				postType:selectedPostType,
				votes:0
			}
			updateStandings(userSubmittedQuestion);
		}else{
			alert("Please enter a question and a post-type");
		}
		closeModal();
	}

	return (
		<Container>
			<p style={{fontSize:"18px"}}>
				<b>Symposium Community Question</b>
			</p>
			<hr style={HorizontalLineCSS}/>
			<InputContainer
				id="symposiumQuestion"
				placeholder="Create symposium community question"
			/>
			<div style={{display:"flex",flexDirection:"row"}}>
				<div class="dropdown" id="beaconCreation">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={CreationCSS}>
						
						Question Type
						<ArrowDropDownIcon/>
					</button>

					<ul class="dropdown-menu" 	
						style={{padding:"20px",height:"170px",width:"90%",overflow:"auto"}}>
						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>changeSelectedPostType("Images")}>
							Images
						</li>
						<hr/>

						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>changeSelectedPostType("Images")}>
							Videos
						</li>
						<hr/>

						<li style={{listStyle:"none",cursor:"pointer"}}
							onClick={()=>changeSelectedPostType("Images")}>
							Regular
						</li>
						<hr/>
					</ul>
			  	</div>
			  	{selectedPostType!=null &&(
			  		<div style={SelectedPostTypeCSS} onClick={()=>changeSelectedPostType(null)}>
			  			<p>{selectedPostType}</p>
			  			<HighlightOffIcon
			  				style={{fontSize:"20px",marginTop:"-10%"}}
			  			/>
			  		</div>
			  	)}
			</div>
			<div style={CreationButtonCSS} onClick={()=>createSymposiumCommunityQuestion()}>
				Create
			</div>
		</Container>
	)
}



export default SymposiumCommunityCreation;








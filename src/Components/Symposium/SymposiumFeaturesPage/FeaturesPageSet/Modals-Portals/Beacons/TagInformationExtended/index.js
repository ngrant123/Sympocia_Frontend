import React,{useEffect,useState,useContext} from "react";
import styled from "styled-components";
import {getOwnerTags} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SelectedTagDisplay from "./ViewSelectedTag.js";
import CreationTagModal from "../TagsCreationModal.js";
import DeleteTagModal from "./DeleteTag.js";
import {FeaturesContext} from "../../../FeaturesPageContext.js";


const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const TagOptionsCSS={
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
	marginRight:"2%",
	marginBottom:"5%"
}

const TagInformationExtendedDisplay=({closeModal,symposiumId,ownerId})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const [tags,changeTags]=useState([]);
	const [loading,changeLoadingStatus]=useState(false);
	const [displayTagAdditionalInformation,changeDisplayTagAdditionalInformation]=useState(false);
	const [currentSelectedTag,changeCurrentSelectedTag]=useState();
	const [modalDispalyType,changeModalDisplayType]=useState("Initial");

	useEffect(()=>{
		const fetchData=async()=>{
			changeLoadingStatus(true);
			const {confirmation,data}=await getOwnerTags(ownerId,symposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeTags([...message]);
			}else{
				alert('Unfortunately there has been an error retrieving your tags. Please try again');
			}
			changeLoadingStatus(false);
		}
		fetchData();
	},[]);

	const triggerDisplayTagAdditionalInformation=(tagId)=>{
		changeDisplayTagAdditionalInformation(true)
		changeCurrentSelectedTag(tagId)
	}

	const hideAdditionalInformation=()=>{
		changeDisplayTagAdditionalInformation(false)
		changeCurrentSelectedTag(null)
	}


	const tagsConstruction=(selectedTag)=>{
		const displaySelectedTagAdditionalInformation=displayTagAdditionalInformation==true &&
						(currentSelectedTag!=null && currentSelectedTag._id==selectedTag._id);

		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center",marginBottom:"5%"}}>
				<div style={{display:"flex",flexDirection:"row",maxWidth:"80%"}}>
					{displaySelectedTagAdditionalInformation==true?
						<React.Fragment>
							<div style={TagOptionsCSS} onClick={()=>changeModalDisplayType("ViewTag")}>
								View
							</div>
							{selectedTag.postCountUsingTag==0 &&(
								<div style={TagOptionsCSS} onClick={()=>changeModalDisplayType("Edit")}>
									Edit
								</div>
							)}

							<div style={TagOptionsCSS} onClick={()=>changeModalDisplayType("Delete")}>
								Delete
							</div>
						</React.Fragment>:
						<p>{selectedTag.name}</p>
					}
				</div>
				<div style={DropDownCSS}>
					{displaySelectedTagAdditionalInformation==true?
						<ArrowForwardIosIcon onClick={()=>hideAdditionalInformation()}
							style={{fontSize:"15"}}
						/>:
						<ArrowBackIosIcon onClick={()=>triggerDisplayTagAdditionalInformation(selectedTag)}
							style={{fontSize:"15"}}
						/>
					}
				</div>
			</div>
		)
	}

	const displayInitialScreen=()=>{
		changeModalDisplayType("Initial");
		if(modalDispalyType=="Edit"){
			changeCurrentSelectedTag(null)
		}
	}

	const editTag=(editedTag)=>{
		for(var i=0;i<tags.length;i++){
			if(tags[i]._id==editedTag._id){
				tags[i]=editedTag;
				break;
			}
		}
		changeTags([...tags]);
		featuresPageConsumer.editTag(editedTag);
	}

	const deleteTag=(idTag)=>{
		for(var i=0;i<tags.length;i++){
			if(tags[i]._id==idTag){
				tags.splice(i,1);
				break;
			}
		}
		changeTags([...tags]);
		featuresPageConsumer.deleteTag(idTag);
	}

	const modalDecider=()=>{
		switch(modalDispalyType){
			case "Initial":{
				return <>{initialDisplay()}</>
			}

			case "ViewTag":{
				return <SelectedTagDisplay
							selectedTag={currentSelectedTag}
							displayInitialScreen={displayInitialScreen}
						/>
			}

			case "Edit":{
				return <CreationTagModal
							editedTagInformation={currentSelectedTag}
							closeModal={displayInitialScreen}
							symposiumId={symposiumId}
							ownerId={ownerId}
							updateTag={editTag}
						/>
			}

			case "Delete":{
				return <DeleteTagModal
							closeModal={displayInitialScreen}
							symposiumId={symposiumId}
							ownerId={ownerId}
							tagId={currentSelectedTag._id}
							deleteTag={deleteTag}
						/>
			}
		}
	}

	const initialDisplay=()=>{
		return (
			<React.Fragment>
				<p style={{fontSize:"20px"}}>
					<b>My Tags</b>
				</p>
				<hr/>
				<p>
					You can only edit tags that have not been used yet. If your tag has been
					used your only option is to delete it.
				</p>
				<hr/>

				<div style={{marginTop:"5%"}}>
					{loading==true?
						<p>Loading</p>:
						<React.Fragment>
							{tags.length==0?
								<p>No tags</p>:
								<React.Fragment>
									{tags.map(data=>
										<>{tagsConstruction(data)}</>
									)}
								</React.Fragment>
							}
						</React.Fragment>
					}
				</div>
			</React.Fragment>
		)
	}

	return(
		<Container>
			{modalDecider()}
		</Container>
	)
}


export default TagInformationExtendedDisplay;
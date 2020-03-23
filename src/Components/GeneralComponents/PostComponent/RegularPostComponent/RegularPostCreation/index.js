import React,{useState,Component} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatItalicOutlinedIcon from '@material-ui/icons/FormatItalicOutlined';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import FormatQuoteRoundedIcon from '@material-ui/icons/FormatQuoteRounded';
import FunctionsRoundedIcon from '@material-ui/icons/FunctionsRounded';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import {createRegularPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

import SendIcon from '@material-ui/icons/Send';
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

const Container = styled.div`
	position:relative;
	width:100%;
	height:100%;
	background-color:white;

`;

const TextArea=styled.div`
	position:relative;
	width:100%;
	background-color:#fefdff;
	resize:none;
	outline:none;
	border-radius:5px;
	border-style:none;
	box-shadow:1px 1px 5px #9395a0;
	font-size:15px;
	padding:40px;
	overflow:hidden;
	z-index:1;
	display:flex-wrap;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:70px;
	height:17%;
	background-color:blue;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:3px;

`;

const CameraModal=styled.div`

	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

const PhotoButton=styled.div`
	position:absolute;
	z-index:3;
	width:5%;
	top:55%;
	left:45%;
	height:10%;
	border-radius:50%;
	background-color:red;

`;

const Photo=styled.div`
	position:absolute;
	top:20%
	width:100%;
	height:100%;
	z-index:3;
	visibility:hidden;
`;

 const RegularPostCreation=(props)=>{
	const [displayCameraModal,changeDisplayCameraModal]=useState(false);
	const [postContents,changePostContents]=useState("");

	const  [firstTimeClickIndicator,changeClickIndicator]=useState(true);
	const [displayBold,changeBold]=useState(false);
	const [displayItalics,changeItalics]=useState(false);
	const [displayCodingBlock,changeCodingBlockDisplay]=useState(false);
	const [codingBlockCounter,changeCodingBlockCounter]=useState(1);

	const [displayBulletList,changeBulletListDisplay]=useState(false);
	const[firstTimeClickBulletList,changeFirstTimeClickBullet]=useState(false);
	const [bulletListContent,changeBulletListContent]=useState({content:"",index:0,maxIndex:0,ulElement:{}});
	const[bulletListParentNode,changeBulletListParentNode]=useState();


	const [displayNumberedList,chnageNumberedBulletList]=useState(false);
	const[firstTimeClickNumberList,changeFirstTimeClickNumber]=useState(false);
	const [numberListContent,changeNumberListContent]=useState("");


	const {personalInformation}=useSelector(state=>state);
	console.log(props);

	const displayCamera=()=>{
		if(displayCameraModal==true){
				var video=document.getElementById("video");

				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia({ video: true })
					    .then(function (stream) {
					      video.srcObject = stream;
					     
					    })
				    .catch(function (error) {
				      console.log("Something went wrong!");
				    });
				}	
			}
		}

	const displayCameraModalIndicator=()=>{
			if(displayCameraModal==true){
				displayCamera();
				document.getElementById("cameraModal").style.visibility="visible";
			}
			else{
				return <React.Fragment></React.Fragment>;
			}
		}
//
	const stopRecording=()=>{

		var video=document.getElementById("video");
		var stream=video.srcObject;
		video.srcObject=null;
	}
	const photo=()=>{
		document.getElementById("cameraModal").style.visibility="hidden";

		var canvas = document.getElementById('canvas');
		 const video=document.getElementById("video");
        canvas.width  = video.offsetWidth;
        canvas.height = video.offsetHeight;

        var tempcontext = canvas.getContext("2d");
         var tempScale = (canvas.height/canvas.width);

        tempcontext.drawImage(
            video,
            0, 0,
            video.offsetWidth, video.offsetHeight
        );

        stopRecording();
        changeDisplayCameraModal(false);
        var canvasDataUrl=canvas.toDataURL();
        const canvasImage='<img src="' + canvasDataUrl + '">';
	}

	const insertPhotoIntoText=()=>{ 

	}

	const addItalics=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var italicTextHolder=document.createElement("I");
		var textContainer;

		if(props.key=="Enter"){
			textContainer=document.createElement("br");
		}else if(props.key==" "){
			textContainer=document.createTextNode(' ');
		}
		else{
			textContainer=document.createTextNode(""+props.key);
		}

		italicTextHolder.appendChild(textContainer);
		textArea.appendChild(italicTextHolder);
		setCursorLocation(textArea,textArea.innerText.length);

	}

	const addBold=(props)=>{

		var textArea=document.getElementById("textAreaContainer");
        var boldTextHolder= document.createElement("strong");
        var textContainer;
		if(props.key=="Enter"){
			textContainer=document.createElement("br");
		}else if(props.key==" "){
			textContainer=document.createTextNode(' ');
		}
		else{
			textContainer=document.createTextNode(""+props.key);
		}

        boldTextHolder.appendChild(textContainer);
        textArea.appendChild(boldTextHolder);
        setCursorLocation(textArea,textArea.innerText.length);

	}

	const setCursorLocation=(textArea,length)=>{
		/*

			if(textArea.setSelectionRange){
				textArea.focus();
				textArea.setSelectionRange(length,length);
			}else{
				var range = window.getSelection();
			    range.moveEnd('character', length);
			    range.moveStart('character', length);
			    range.select();
			}
		*/

		var range = document.createRange();
	    var sel = window.getSelection();

	    /*
	    var lengthOfTextArea;
	    var counter=0;
	    while(textArea.childNodes[counter]!=null){
	    	var length=textArea.childNodes.length;
	    	lengthOfTextArea+=length;
	    	counter++;
	    }

	    var newCounter=counter--;
	    */

	    range.setStart(textArea.lastChild,1);
	    range.collapse(true);
	    sel.removeAllRanges();
	    sel.addRange(range);
	    textArea.focus();

	}

	const addCodingBlock=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var codeBlockContainer=document.createElement("span");


					if(props.key=="Enter"){
						var newLineContainer=document.createElement("br");
						var newLine=document.createTextNode(' ');
						newLineContainer.appendChild(newLine);
						textArea.appendChild(newLineContainer);
						return;

					}else{

						if(codingBlockCounter==1 || codingBlockCounter==30){


									if(codingBlockCounter==1){
										var currentCodingCounter=codingBlockCounter+1;
										changeCodingBlockCounter(currentCodingCounter);
									}else if(codingBlockCounter==30){

										changeCodingBlockCounter(2);
									}

									var newLineContainer=document.createElement("br");
									var newLine=document.createTextNode(' ');
									newLineContainer.appendChild(newLine);
									textArea.appendChild(newLineContainer);
									return;
							}
							
							else{
								var currentCodingCounter=codingBlockCounter+1;
								changeCodingBlockCounter(currentCodingCounter);

							}
					}

					var code=document.createTextNode(""+props.key);
					codeBlockContainer.style.backgroundColor="#E3CEF6";
					codeBlockContainer.style.color="white";
					
					codeBlockContainer.style.paddingTop="5px";
					codeBlockContainer.style.paddingLeft="5px";
					codeBlockContainer.style.paddingBottom="5px";

					codeBlockContainer.appendChild(code);
					textArea.appendChild(codeBlockContainer);

		 setCursorLocation(textArea,textArea.innerText.length);

	}

/*
	Problem now is that the cursor blinknin thing is not working and 
	when a user types something it places it on the end no matter the
	location

*/
	const addBulletList=(props)=>{
		var textArea=document.getElementById("textAreaContainer");
		var liItem;
		if(props.key=="Enter" || firstTimeClickBulletList==true){

				var textNode;
				var ulList;
				if(firstTimeClickBulletList==true){
					changeFirstTimeClickBullet(false);
				    textNode=document.createTextNode(""+props.key);
				    ulList=document.createElement('ul');
				    changeBulletListContent({...bulletListContent,content:props.key,index:0,ulElement:ulList});
				}
				else{

					textNode=document.createTextNode("");
					var nextMax=bulletListContent.maxIndex;
					nextMax+=1;
					changeBulletListContent({...bulletListContent,content:"",index:nextMax,maxIndex:nextMax});
					ulList=bulletListContent.ulElement;
				}
				
				liItem=document.createElement('li');
				liItem.appendChild(textNode);
				liItem.addEventListener("click",function(){
					console.log("Test");
					const currentIndex=getBulletLiIndex(this);
					changeBulletListContent({...bulletListContent,content:liItem.innerText,index:currentIndex});
				})

				ulList.appendChild(liItem);
				console.log("LI item parent node");
				console.log(liItem.parentNode);
				textArea.append(ulList);
				changeBulletListParentNode(liItem.parentNode);

		}else{
			var liElement=bulletListContent.ulElement.childNodes[bulletListContent.index];
			if(props.key==" "){
				changeBulletListContent({...bulletListContent,content:bulletListContent.content+"&#160;"});
				liElement.innerHTML="<li>"+bulletListContent.content+"&#160; </li>";
			}else{
				changeBulletListContent({...bulletListContent,content:bulletListContent.content+props.key});
				liElement.innerHTML="<li>"+bulletListContent.content+props.key+"</li>";
			}

			liElement.addEventListener("click",function(){		
					const currentIndex=getBulletLiIndex(this);
					changeBulletListContent({...bulletListContent,content:liElement.innerText,index:currentIndex});
				})
			}

		setCursorLocation(textArea,textArea.innerText.length);
	}

	const getBulletLiIndex=(element)=>{

		var child=element.parentNode.childNodes;
		//changeBulletListParentNode(element.parentNode);

		console.log("LI item parent node");
		console.log(element.parentNode);
		var currentIndex;

		for(var i=0;i<child.length;i++){
			if(child[i]==element){
				return i;
			}
		}
		return null;
	}

	const updatedBulletListContent=(props)=>{
		console.log("Test bullet list");
		console.log(props);

	}

	const addNumberedList=(props)=>{

		var textArea=document.getElementById("textAreaContainer");

		if(props.key=="Enter" || firstTimeClickNumberList==false){

				
				var textNode;
				if(firstTimeClickNumberList==true){
					changeFirstTimeClickNumber(false);
				    textNode=document.createTextNode(""+props.key);
				}
				else{
					textNode=document.createTextNode("");
					 changeNumberListContent(numberListContent);
				}
				
				var ulList=document.createElement("OL");
				var liItem=document.createElement("LI");
				liItem.appendChild(textNode);
				ulList.appendChild(liItem);
				textArea.append(ulList);

		}else{
			var liElement=textArea.lastChild;
			changeNumberListContent(numberListContent+props.key);
			liElement.innerHTML="<li>"+numberListContent+props.key+"</li>";
		}

		setCursorLocation(textArea,textArea.innerText.length);

	}


	const regardLetters=(props)=>{
			props.preventDefault();
			if(displayBold==true && displayItalics==true){
				addBold(props);
				addItalics(props);
			}
			else if(displayItalics==true && displayBold==false){
				addItalics(props);

			}
			else if(displayItalics==false&& displayBold==true){
				addBold(props);
			}else if(displayCodingBlock==true){
				addCodingBlock(props);
			}else if(displayBulletList==true){
				addBulletList(props);
			}else if(displayNumberedList==true){
				addNumberedList(props);
			}
			else{
				changeFirstTimeClickBullet(false);
				changePostContents(postContents+props.key);
				removeFontVariations(props);
			}
	}
//Contains a bug where for some reason it creates a newline after the user presses enter fix later
	const removeFontVariations=(props)=>{
		var textArea=document.getElementById("textAreaContainer");

        if(props.key!="Enter"){
        	var TextHolder= document.createElement("span");
			var textContainer=document.createTextNode(""+props.key);
			TextHolder.appendChild(textContainer);
	        textArea.appendChild(TextHolder);
	    }else{
	     	var newLineHolder=document.createElement("P");
			newLineHolder.innerHTML=" &#160;"
			textArea.appendChild(newLineHolder);

		}

        setCursorLocation(textArea,textArea.innerText.length);
	}

	const sendRegularPost=()=>{
		console.log("Teste");

		const content=document.getElementById("textAreaContainer").innerHTML;
		const {id}=personalInformation;
		createRegularPost("12345678",content);
		
	}
	const enableCodingBlock=()=>{
		changeCodingBlockDisplay(!displayCodingBlock);
		changeItalics(false);
		changeBold(false);
	}

	const enableBulletList=()=>{

		changeBulletListDisplay(!displayBulletList);
		changeFirstTimeClickBullet(!firstTimeClickBulletList);
		chnageNumberedBulletList(false);
		changeItalics(false);
		changeBold(false);
		changeCodingBlockDisplay(false);
	}

	const enableNumberedLst=()=>{
		changeBulletListDisplay(false);
		chnageNumberedBulletList(!displayNumberedList);
		changeItalics(false);
		changeBold(false);
		changeCodingBlockDisplay(false);

	}

	const emptyTextArea=()=>{
		if(firstTimeClickIndicator==true){
			document.getElementById("textAreaContainer").innerHTML="";
			changeClickIndicator(false);
		}	
	}


	return(
		<Container>
			{displayCameraModalIndicator()}

			<CameraModal id="cameraModal">
							<PhotoButton id="photoButton" onClick={()=>photo()}/>
							<video id="video" height="70%" width="100%" autoplay="true">
								
							</video>
			</CameraModal>

			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginLeft:"2%",marginTop:"1%",marginBottom:"1%"}}>
							<ProfilePicture>
							
							</ProfilePicture> 
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",top:"0%"}}>
							<ul style={{padding:"5px",position:"relative",top:"-30px",borderRadius:"5px",boxShadow:"1px 1px 5px 	#9395a0"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<ImageOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>changeDisplayCameraModal(true)}
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatBoldOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>changeBold(!displayBold)}
									/>
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatItalicOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>changeItalics(!displayItalics)}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<CodeOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>enableCodingBlock()}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatListBulletedOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>enableBulletList()}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatListNumberedOutlinedIcon
										style={{fontSize:30}}
										onClick={()=>enableNumberedLst()}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FormatQuoteRoundedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<FunctionsRoundedIcon
										style={{fontSize:30}}
									/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<EmojiEmotionsOutlinedIcon
										style={{fontSize:30}}
										/>
								</li>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<GifIcon	
										style={{fontSize:30}}
									/>
								</li>
							</ul>

						</li>

						<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-50px",marginRight:"1%"}}>
							<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Industries
									   	<span class="caret"></span>
									</button>
									<ul class="dropdown-menu" style={{height:"350px",overflowY:"auto"}}>
										{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
											<li>
												<a href="#">{data.industry}</a>
											</li>
										)}
										
									</ul>
			  				 </div>

						</li>

						<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-50px"}}>
							<div class="dropdown">

									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"#5298F8",
																															backgroundColor:"white"}}>
										Post Option
									   	<span class="caret"></span>
									</button>

									<ul class="dropdown-menu">
										<li onClick={()=>props.displayProps("ImagePosts")}><a>Image</a></li>
										<li onClick={()=>props.displayProps("VideoPosts")}><a>Video</a></li>
										<li onClick={()=>props.displayProps("RegularPost")}><a>Post</a></li>
										<li onClick={()=>props.displayProps("RegularPost")}><a href={"/blog"}>Blog</a></li>
									</ul>
			  				 </div>

						</li>



					</ul>

				</li>

				<li style={{listStyle:"none",marginBottom:"1%"}}>
					<TextArea id="textarea">
						<p style={{float:"left",width:"85%",overflowY:"auto",outline:"none"}} onClick={()=>emptyTextArea()} contentEditable="true" id="textAreaContainer"  onKeyPress={e=>regardLetters(e)}>
							Testing
						</p>
					</TextArea>
				</li>

				<li style={{listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",padding:"10px",textAlign:"center",fontSize:"15px",borderRadius:"5px",marginLeft:"80%"}}>
					
					<ul onClick={()=>sendRegularPost()} style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
							<SendIcon
								style={{fontSize:20,color:"white"}}

							/>
						</li>

						<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
							Send
						</li>
					</ul>

				</li>
			</ul>
			<canvas id="canvas"  style={{width:"240",height:"297",border:"1px solid #d3d3d3"}}>

			</canvas>

		</Container>

	)
}

export default RegularPostCreation;


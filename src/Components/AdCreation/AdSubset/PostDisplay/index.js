import React,{useState,useEffect} from "react";
import styled from "styled-components";
import testImage from "../../../../designs/background/AiyanahFullInterview.png";
import {Link} from "react-router-dom";

const Container=styled.div`
	width:100%;

	@media screen and (max-width:650px){
		#postMappingDiv{
			justify-content:center !important;
		}
	}
`;
const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const CircleCSS={
	width:"20px",
	height:"20px",
	borderRadius:"50%"
}


const ActiveCircleCSS={
	...CircleCSS,
	backgroundColor:"#3AF510"
}

const NonActiveCircleCSS={
	...CircleCSS,
	backgroundColor:"#575757"
}

const StoppedCircleCSS={
	...CircleCSS,
	backgroundColor:"#E90505"
}


const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	borderRadius:"5px",
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginRight:"2%",
	backgroundColor:"white",
	color:"#3898ec",
	width:"100%"
}

const PostCSS={
	cursor:"pointer",
	marginRight:"5%",
	marginBottom:"5%"
}
const PostDisplay=(props)=>{
	const {
		postDisplay,
		posts,
		postClickTrigger,
		creationRequest,
		isAdCreationParent,
		userId,
		currentAdStatus
	}=props;
	console.log(props);

	const [postsComponent,changePostsComponent]=useState();

	useEffect(()=>{
		debugger;
		changePostsComponent(postMapping());
	},[postDisplay,posts]);

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const adStatus=()=>{
		const status=()=>{
			switch(currentAdStatus){
				case "Active":{
					return <>
								<div style={ActiveCircleCSS}/>
								<p style={{marginLeft:"5%",color:"#3AF510"}}>Active</p>
							</>
				}

				case "Paused":{
					return <>
								<div style={NonActiveCircleCSS}/>
								<p style={{marginLeft:"5%",color:"#575757"}}>Paused</p>
							</>
				}
				case "Terminated":{
					return <>
								<div style={StoppedCircleCSS}/>
								<p style={{marginLeft:"5%",color:"#575757"}}>Terminated</p>
							</>
				}
			}
		}
		return(
			<React.Fragment>
				{isAdCreationParent==false &&(
					<div style={{display:"flex",flexDirection:"row"}}>
						{status()}
					</div>
				)}
			</React.Fragment>
		)
	}


	const postMapping=()=>{
		return(
			<div id="postMappingDiv" style={{display:"flex",flexDirection:"row",flexWrap:"wrap",width:"100%"}}>
				{posts.length==0?
					<div style={{display:"flex",flexDirection:"column"}}>
						<p>No ads</p>
						{isAdCreationParent==true?
							<Link to={{pathname:`/profile/${userId}`}}>
								<div style={ButtonCSS} onClick={()=>creationRequest()}>
									Create Post
								</div>
							</Link>:
							<div style={ButtonCSS} onClick={()=>creationRequest()}>
								Create Ad
							</div>
						}
					</div>:
					<React.Fragment>
						{posts.map(data=>
							<>
								{postDisplayDecider(data)}
							</>
						)}
					</React.Fragment>
				}
			</div>
		)
	}

	const images=(postData)=>{
		return(
			<div style={{display:"flex",flexDirection:"column",...PostCSS}}
				onClick={()=>postClickTrigger(postData)}>
				<img src={postData.imgUrl} style={{width:"180px",height:"180px",borderRadius:"5px"}}/>
				<hr style={HorizontalLineCSS}/>
				{adStatus()}
			</div>
		)
	}

	const videos=(data)=>{
		console.log(data);
		return(
			<React.Fragment>
				<div style={{position:"relative",flexDirection:"column",...PostCSS}}
					onClick={()=>postClickTrigger(data)}>
					<video key={uuid()} autoPlay loop autoBuffer muted playsInline 
						width="100%" height="70%" style={{borderRadius:"5px",backgroundColor:"#151515"}}>
						<source src={data.videoUrl} type="video/mp4"/>
					</video>
					<p style={{fontSize:"18px"}}>
						<b>{data.title}</b>
					</p>
				</div>
				<hr style={HorizontalLineCSS}/>
			</React.Fragment>
		)
	}

	const blogs=(data)=>{
		console.log(data);
		return(
			<div style={{display:"flex",flexDirection:"column",...PostCSS}}
				onClick={()=>postClickTrigger(data)}>
				<img src={data.blogImageUrl} style={{width:"180px",height:"170px",borderRadius:"5px"}}/>
				<p style={{fontSize:"18px"}}>
					<b>{data.title}</b>
				</p>
				<hr style={HorizontalLineCSS}/>
				<div style={{display:"flex",flexDirection:"row"}}>
					{data.activeStatus==true?
						<>
							<div style={ActiveCircleCSS}/>
							<p style={{marginLeft:"5%",color:"#3AF510"}}>Active</p>
						</>:
						<>
							<div style={NonActiveCircleCSS}/>
							<p style={{marginLeft:"5%",color:"#575757"}}>Terminated</p>
						</>
					}
				</div>
			</div>
		)
	}


	const texts=(data)=>{
		console.log(data);
		return(
			<React.Fragment>
				<div style={{position:"relative",width:"100%",...PostCSS}}
					onClick={()=>postClickTrigger(data)}>
					{data.isAudioPost==true?
						<audio key={uuid()} style={{width:"250px"}} controls>
									<source src={data.post} type="audio/ogg"/>
									<source src={data.post} type="audio/mp4"/>
									Your browser does not support the audio element.
						</audio>:
						<React.Fragment>
							<p id="post" style={{color:"#A4A4A4"}}>{data.post}</p>
						</React.Fragment>
					}
				</div>
				<hr style={HorizontalLineCSS}/>
			</React.Fragment>
		)
	}

	const postDisplayDecider=(data)=>{
		switch(postDisplay){
			case "Images":{
				return <>{images(data)}</>
			}

			case "Videos":{
				return <>{videos(data)}</>
			}

			case "Blogs":{
				return <>{blogs(data)}</>
			}

			case "Text":{
				return <>{texts(data)}</>
			}
		}
	}

	return(
		<Container>
			{postsComponent}
		</Container>
	)
}

export default PostDisplay;
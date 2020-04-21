import React,{Component} from "react";
import styled from "styled-components";
import CreationPostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import PostContainer from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/index";
import ImagePosts from "../../../PersonalProfile/PersonalProfileSubset/PersonalPosts/ImagePosts/ImagePostContainer.js";


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:55%;
	background-color:black;
	border-radius:50%;
`;

const CommentTextArea=styled.textarea`
	position:relative;
	resize:none;
	border-style:none;
	text-align:center;
	padding-top:10px;
	width:180%;
`;

const PostOptionCSS={
	listStyle:"none",
	display:"inline-block",
	fontSize:"17px",
	padding:"10px",
	marginLeft:"10%",
	color:"#bebebf"
}
class CompanyPosts extends Component{

	constructor(props){
		super(props);
		this.state={
			displayImages:true,
			displayVideos:false,
			displayBlogs:false,
			displayRegularPost:false
		}
	}

	componentDidMount(){
		const image=document.getElementById("images");
		image.style.color="#C8B0F4";
		image.style.borderBottom="solid";
		image.style.borderColor="#C8B0F4";
	}

	displayShadow=()=>{

	}

	disappearShadow=()=>{

	}

		/*
		Could be implemented in a better way
	*/

	handlePostsClick=(kindOfPost)=>{
			this.setState({
				displayImages:false,
				displayVideos:false,
				displayBlogs:false,
				displayRegularPost:false
			})

			const image=document.getElementById("images");
			image.style.color="#bebebf";
			image.style.borderStyle="none";

			const blogs=document.getElementById("blogs");
			blogs.style.color="#bebebf";
			blogs.style.borderStyle="none";


			const videos=document.getElementById("videos");
			videos.style.color="#bebebf";
			videos.style.borderStyle="none";


			const regularPost=document.getElementById("regularPosts");
			regularPost.style.color="#bebebf";
			regularPost.style.borderStyle="none";

		if(kindOfPost=="image"){

			const image=document.getElementById("images");
			image.style.color="#C8B0F4";
			image.style.borderBottom="solid";
			image.style.borderColor="#C8B0F4";

			this.setState({
				displayImages:true
			})

		}else if(kindOfPost=="video"){

			const videos=document.getElementById("videos");
			videos.style.color="#C8B0F4";
			videos.style.borderBottom="solid";
			videos.style.borderColor="#C8B0F4";
			this.setState({
				displayVideos:true
			})

		}else if(kindOfPost=="blog"){

			const blogs=document.getElementById("blogs");
			blogs.style.color="#C8B0F4";
			blogs.style.borderBottom="solid";
			blogs.style.borderColor="#C8B0F4";

			this.setState({
				displayBlogs:true
			})


		}else{


			const regularPost=document.getElementById("regularPosts");
			regularPost.style.color="#C8B0F4";
			regularPost.style.borderBottom="solid";
			regularPost.style.borderColor="#C8B0F4";

			this.setState({
				displayRegularPost:true
			})
		}
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"2%",color:"#C8B0F4",zIndex:"4",marginBottom:"2%"}}>
													<b>Create a post</b>
												</li>

												<li style={{listStyle:"none",display:"inline-block",width:"55%",height:"20%",boxShadow:"1px 1px 5px #848484",borderRadius:"5px"}}>
													<ul style={{padding:"10px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															<ProfilePicture>
															</ProfilePicture>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<CommentTextArea placeholder="Start typing here to create a post"/>
														</li>


													</ul>
					</li>

					<li style={{listStyle:"none",boxShadow:"1px 1px 5px #848484"}}>
						<ul style={{padding:"10px"}}>
							<li id="images" onClick={()=>this.handlePostsClick("image")} style={PostOptionCSS}>
								Images
							</li>

							<li id="videos" onClick={()=>this.handlePostsClick("video")} style={PostOptionCSS}>
								Videos
							</li>

							<li id="regularPosts" onClick={()=>this.handlePostsClick("regularPost")} style={PostOptionCSS}>
								Regular Posts
							</li>

							<li id="blogs" onClick={()=>this.handlePostsClick("blog")} style={PostOptionCSS}>
								Blogs
							</li>
						</ul>
					</li>
					<li style={{listStyle:"none"}}>
						<ImagePosts/>
					</li>
				</ul>

			</React.Fragment>
		)
	}
}

export default CompanyPosts;
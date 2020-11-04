import React, {Component} from "react";
import styled from "styled-components";
import CoverPhoto from "../CompanyProfileSubset/CompanyCoverPhoto/CoverPhoto.js";
import CompanyDetailsNewsPostContainer from "./CompanyDetailsNewsPostContainer.js";
import Posts from "../CompanyProfileSubset/CompanyPosts/PostComp.js";
import Icon from "./CompanyIcon.js";
import img from "../../../../designs/background/tester2.png";
import Industries from "../../../../Constants/constants.js";
import { GeneralNavBar } from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import { connect } from "react-redux";
import { CompanyProvider } from "../CompanyContext.js";
import {
	getCompanyInformation
} from "../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import {CompanyPostDisplayProvider} from "../CompanyProfilePostsDisplayContext.js";
import ImageContainer from "../../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import VideoContainer from "../../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import {SponsorDisplayModal} from "../../PersonalProfile/PersonalProfileSet/Modals-Portals/ChampionModalPortal/ChampionDisplayModal.js";
import EmployeeDisplayModal from "./EmployeeDisplayModal.js";



const ProfileContainer = styled.div`

	position:absolute;
	background-color:#f7f7f7;
	width:100%;
	height:100%;
	top:0%;
	left:0%;
`;


const FirstProfileContainer = styled.div`
	position:absolute;
	width:100%;
	height:100%;

`;

const NavContainer = styled.div`
	position:relative;
	height:7%;
	left:0%;
	width:100%;
	z-index:4;
`;

const CoverPhotoContainer = styled.div`
	position:absolute;
	height:37%;
	top:7%;
	background-color:#242424;
	width:100%;

`;

const Profile = styled.div`
	position:absolute;
	background-color:blue;
	left:3%;
	top:44%;
	height:56%;
	width:93%;
	border-radius:5px;
`;

const CompanyIcon = styled. div`

	position:absolute;
	background-color:#f9f9f9;
	width:15%;
	height:25%;
	top:21%;
	left:41%;
	z-index:2;
	border-radius:50%;
	border-width:5px;
	border-style:solid;
	border-color:#D5D5D5;



`;

const SecondPostContainer = styled.div`
	position:relative;
	height:100%;
	width:100%;



`;

const PostContainer = styled.div`

	position:relative;
	top:3%;
	height:80%;
	left:27%;
	width:51%;
	border-radius:10px;




`;

const SmallProfileContainer = styled.div`

	position:fixed;
	background-color:red;
	width:23%;
	height:50%;
	top:40%;
	left:1%;
	border-radius:5px;
	transition:.8s;

`;

const SmallNewsContainer = styled.div`
	
	position:fixed;
	background-color:red;
	width:18%;
	height:50%;
	top:40%;
	left:80%;
	border-radius:5px;

`;

const SmallProfile = styled.div`
	position:absolute;
	background-color:white;
	width:45%;
	height:45%;
	top:20%;
	left:25%;
	z-index:-4;
	opacity:0;
	border-radius:10px;
	border-style:solid;
	border-color:#C8B0F4;
	border-width:5px;
	overflow:hidden;

`;

const SmallProfileImage = styled.div`
	position:absolute;
	background-color:blue;
	width:50%;
	height:35%;
	left:25%;
	top:10%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;
	border-color:#c3c3c3;


`;

const SmallProfileContainerTitleDescrip = styled.div`
	position:absolute;
	top:0%;
	width:45%;
	left:0%;
	height:100%;
	background-color:	#5298f8;
	transition:.8s;

	&:hover{

		background-color:	#c1d9f8;
	}


`;

const SmallProfileTitle = styled.textarea`
	position:absolute;
	top:55%;
	height:10%;
	width:20%;
	border-radius:5px;
	left:40%;
	resize:none;
	border-style:solid;
	pointer-events:none;
	border-width:1px;
	border-color:#c3c3c3;
	color:#383838;
	font-size:120%;
	text-align:center;

`;


const SmallProfileTitleDescription = styled.div`
	position:absolute;
	top:0%;
	height:100%;
	width:30%;
	border-radius:5px;
	left:5%;
	resize:none;
	border-style:solid;
	border-width:1px;
	border-color:#c3c3c3;
	color:white;
	background-color:#5298F8;
	font-size:140%;
	text-align:center;


`;



const EditButton = styled.div`
	position:absolute;
	width:8%;
	height:8%;
	left:72%;
	top:2%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;


`;

const SaveButton = styled.div`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:25%;
	height:10%;
	top:5%;
	border-radius:0px 5px 5px 0px;
	opacity:0
	transition: all ease 0.8s;
	pointer-events:none;
	text-align:center;
	font-size:150%;
`;

const CancelButton = styled.div`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:25%;
	height:10%;
	top:20%;
	border-radius:0px 5px 5px 0px;
	opacity:0;
	pointer-events:none;
	transition: all ease 3s;
	text-align:center;
	font-size:150%;


`;
const ExitButton = styled.div`
	position:absolute;
	width:8%;
	height:8%;
	left:85%;
	top:2%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;
	text-align:center;
	font-size:140%;
	color:#7e7e7e;

	  &:hover{

      background-color:#6e6e6e;

    color:white;
   border-style:solid;
   border-color: #C8B0F4;

   }


`;

const NewsProfile = styled.div`
	position:absolute;
	background-color:#fbfbfb;
	width:30%;
	height:50%;
	top:20%;
	left:35%;
	z-index:-2;
	opacity:0;
	border-radius:10px;
	border-style:solid;
	border-color:#C8B0F4;
	border-width:5px;
	transition: all ease 0.8s;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;


const NewsContainerTitleDescrip = styled.div`
	position:absolute;
	background-color:#838383;
	top:52%;
	width:100%;
	height:48%;
	border-radius:0px 0px 5px 5px;



`;

const NewsProfileTitle = styled.textarea`
	position:absolute;
	top:55%;
	height:10%;
	width:20%;
	border-radius:5px;
	left:40%;
	resize:none;
	border-style:solid;
	pointer-events:none;
	border-width:1px;
	border-color:#c3c3c3;
	color:#383838;
	font-size:120%;
	text-align:center;

`;


const NewsProfileTitleDescription = styled.div`
	position:absolute;
	background-color:blue;
	top:5%;
	height:30%;
	width:30%;
	border-radius:5px;
	left:5%;
	resize:none;
	color:white;
	font-size:140%;
	text-align:center;
	border-radius:50%;


`;


const NewsProfileBio = styled.textarea`

	position:absolute;
	top:25%;
	width:55%;
	height:50%;
	left:40%;
	border-radius:5px;
	resize:none;
	pointer-events:none;
	border-style:solid;
	border-width:1px;
	color:#383838;
	font-size:120%;
	border-color:#c3c3c3;
	text-align:center;

`;

const NewsProfileBioDescription = styled.div`
	position:absolute;
	top:40%;
	width:25%;
	height:50%;
	left:5%;
	border-radius:5px;
	resize:none;
	pointer-events:none;	
	color:#313131;
	font-size:280%;
	border-color:#c3c3c3;
	text-align:center;
	writing-mode:tb-rl;
	overflow:hidden;
	



`;
const NewsProfileContainerBackground = styled.div`
	position:absolute;
	left:38%
	width:62%;
	height:100%;
	border-style:solid;
	border-width:0px 0px 0px 1px;
	border-color:#ababab;

`;

const StatueContainer = styled.div`
	position:absolute;
	background-image:url(${img}) ;
	width:15%;
	height:25%;
	top:35%;
	left:40%;
	z-index:1;
	background-size:40%;
	background-position:center center;
	background-repeat: no-repeat;

`;

const SmallProfileShortBio = styled.div`
	position:absolute;
	background-color:white;
	width:80%;
	height:20%;
	left:10%;
	top:60%;
	overflow:hidden;
	border-radius:5px;
	color:#5298f8;
	padding:5px;
	font-size:130%;
`;

const SmallProfileIdentityContainer = styled.div`
	position:absolute;
	left:55%;
	width:40%;
	height:75%;
	overflow:scroll;
	top:20%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#5298f8;
	transition:.8s;
	padding:40px 5px 40px 5px;




	&:hover{
		background-color:#a0c4f0;
	}



`;

const SmallProfileNameCaption = styled.div`
	position:absolute;
	width:30%;
	height:10%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:120%;


	&:hover{
		background-color:#d4e4f8;
	}



`;

const SmallProfileNameValue = styled.textarea`
	position:absolute;
	width:50%;
	height:10%;
	left:30%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:115%;
	border-style:1px;
	resize:none;

`;



const SmallProfileTitleCaption = styled.div`
	position:absolute;
	width:30%;
	height:10%;
	top:30%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:120%;


	&:hover{
		background-color:#d4e4f8;
	}

`;


const SmallProfileTitleValue = styled.textarea`
	position:absolute;
	width:50%;
	height:10%;
	left:30%;
	top:30%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;

	border-style:1px;
	resize:none;
	font-size:115%;
`;

const SmallProfileLocationCaption = styled.div`
	position:absolute;
	width:30%;
	height:10%;
	top:50%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:120%;


	
	&:hover{
		background-color:#d4e4f8;
	}




`;

const SmallProfileLocationValue = styled.textarea`
	position:absolute;
	width:50%;
	height:30%;
	left:30%;
	top:50%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:115%;
	resize:none;


`;

const SmallProfileBioCaption = styled.div`
	position:absolute;
	width:30%;
	height:10%;
	top:85%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:120%;


	
	&:hover{
		background-color:#d4e4f8;
	}


`;

const SmallProfileBioValue = styled.textarea`
	position:absolute;
	width:60%;
	height:40%;
	left:30%;
	top:85%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;

	border-style:1px;
	font-size:115%;
	overflow:scroll;
	z-index:4;
`;

const SmallProfileEmailCaption = styled.div`
	position:absolute;
	width:30%;
	height:10%;
	top:130%;
	overflow:hidden;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	font-size:120%;


	
	&:hover{
		background-color:#d4e4f8;
	}

`;

const SmallProfileEmailValue = styled.textarea`
	position:absolute;
	width:60%;
	height:10%;
	left:30%;
	top:130%;
	padding:5px 5px 5px 5px;
	color:#5298f8;
	border-radius:5px;
	border-style:1px;
	font-size:105%;
`;

const PostDivider = styled.div`

	position:absolute;
	background-color:#4d5050;
	height:1%;
	width:40%;
	top:52%;
	left:30%;
	top:100%;
	border-radius:5px;
`;


const ImagePopupContainer=styled.div`
	margin-left:20%;
	margin-top:10%;
	position:relative;
	width:70%;
	height:60%;
	background-color:white;
	padding:20px;
	z-index:9;
	border-radius:5px;
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:10;

`;

const PostPopupContainer=styled.div`
	margin-left:20%;
	margin-top:10%;
`;



class LProfile extends Component{
	constructor(props){

		super(props);
		this.state={
			owner:false,
			coverPhoto:"",
			isOwnProfile:true,
			isLoading:true,
			userProfile:{
				imagePost:[]
			},
			displayShadowBackground:false,
			displayChampionModal:false,
			championModalData:{},
			displayEmployeeModal:false,
			displayNewsModal:false,
			topLevelEmployeeData:{},
			topLevelNewsData:{}
		}
	}

	async componentDidMount(){

		debugger;
		const {id}=this.props.match.params;
		const firstTimeIndicator=this.props.firstTimeIndicator;

		if(firstTimeIndicator==true){
			//Start tutorial mode

		 }else{
				if(id==this.props.companyPersonalId){

					const profile=await getCompanyInformation(this.props.companyPersonalId);
					console.log(profile);
					var containsChampion;
					if(profile.championData!=null){
						containsChampion=profile.championData.name!=""?true:false;
					}else{
						containsChampion=false;
					}
					debugger;
					this.setState({
						isLoading:false,
						userProfile:profile,
						isOwnProfile:true,
						displayChampionModal:containsChampion,
						championModalData:profile.championData
					});

					//window.addEventListener('scroll',this.ScrollFunction);
				}
				else{
					const profile=await getCompanyInformation(id);
					console.log(profile);

					if(profile.championData!=null){
						containsChampion=profile.championData.name!=""?true:false;
					}else{
						containsChampion=false;
					}

					debugger;
					this.setState(prevState=>({
						...prevState,
						isLoading:false,
						userProfile:profile,
						isOwnProfile:false,
						displayChampionModal:containsChampion,
						championModalData:profile.championData
					}));
				}	
			}
		}



	displaytoplevelnewsprofile=(data)=>{
		this.setState({
			displayNewsModal:true,
			topLevelNewsData:data
		})
	}

	displaytoplevelemployeeprofile=(data)=>{
		console.log(data);
		this.setState({
			displayEmployeeModal:true,
			topLevelEmployeeData:data
		})
	}

	ScrollFunction=()=>{

		let profileCompanyDetailsHeigth=document.getElementById("CompanyAndPostInfoContainer").offsetHeight;
		let profileCompanyDetailsTop=document.getElementById("CompanyAndPostInfoContainer").offsetTop;
		let totalProfileHeightAndTop=profileCompanyDetailsHeigth;

		if(window.pageYOffset>totalProfileHeightAndTop){
			this.setState({
				displaySmallProfilesAndNews:true
			})
		}
		else{
			this.setState({
				displaySmallProfilesAndNews:false
			})
		}
	}

	displaySmallCompanyDetail =()=>{

		return this.state.displaySmallProfilesAndNews?
			<SmallProfileContainer id="smallProfileContainer">
			</SmallProfileContainer>
			:<p></p>
		;
	}

	displaySmallCompanyNews =()=>{

		return this.state.displaySmallProfilesAndNews?
			<SmallNewsContainer id="smallNewContainer">
			</SmallNewsContainer>
			:<p></p>
		;
	}

	ImageModal=()=>{
		const newImageObject={
			...this.state.imageModalData,
			firstName:this.state.userProfile.firstName,
			lastName:this.state.userProfile.lastName
		}
		return this.state.displayImagePostModal?
			<ImagePopupContainer>
				<ImageContainer
					imageData={newImageObject}
					profileType="companyProfile"
				/>
			</ImagePopupContainer>:
			<React.Fragment></React.Fragment>
	}

	VideoModal=()=>{
		debugger;
		var newVideoObject={};
		if(this.state.videoModalData!=null){
			newVideoObject={
				...this.state.videoModalData,
				firstName:this.state.userProfile.name
			}
		}
		return this.state.displayVideoPostModal?
			<PostPopupContainer>
				<VideoContainer
					videoData={newVideoObject}
					profileType="companyProfile"
				/>
			</PostPopupContainer>:
			<React.Fragment></React.Fragment>
	}

	closeModal=()=>{
		this.setState({
			displayEmployeeModal:false,
			displayNewsModal:false
		})
	}

	BlogModal=()=>{

	}


	render(){

		return(
			<CompanyProvider value={{
					state:this.state,
					updateEmployees:(employeeInformation)=>{
						const employees=this.state.userProfile.companyEmployees;
						employees.push(employeeInformation);
						this.setState({
							companyEmployees:employees
						})

					},
					updateNews:(newsInformation)=>{
						debugger;
						const news=this.state.userProfile.news;
						news.push(newsInformation);
						this.setState({
			  				userProfile:{
			  					...this.state.userProfile,
			  					news:news
			  				}
						})
					},
					displayChampionModal:(championModalData)=>{
						this.setState({
							displayChampionModal:true,
							championModalData:championModalData
						})
					}
				}}>
					<CompanyPostDisplayProvider
						value={{
							handleImagePostModal:(imagePostData)=>{
								console.log(imagePostData);
								this.setState({
									imageModalData:imagePostData,
									displayImagePostModal:true,
									displayShadowBackground:true
								})
							},
							handleVideoPostModal:(videoPostData)=>{
								this.setState({
									videoModalData:videoPostData,
									displayVideoPostModal:true,
									displayShadowBackground:true
								})
							},
							handleBlogPostModal:(blogPostData)=>{
								this.setState({
									blogModalData:blogPostData,
									displayBlogPostModal:true,
									displayShadowBackground:true
								})
							},
							handleRegularPostModal:(regularPostData)=>{
								this.setState({
									regularModalData:regularPostData,
									displayRegularPostModal:true,
									displayShadowBackground:true
								})
							}
						}}
					>
					{this.state.isLoading==false?
						<React.Fragment>

							<ProfileContainer id="companyProfileContainer">
								<NavContainer>  
									<GeneralNavBar
										pageType="Profile"
									/>
								</NavContainer>


							{this.ImageModal()}
							{this.VideoModal()}
							{this.BlogModal()}

							{this.state.displayEmployeeModal==true?
								<EmployeeDisplayModal 
									data={this.state.topLevelEmployeeData}
									closeModal={this.closeModal}
								/>:null}

							<FirstProfileContainer>
									<CompanyIcon>
										<Icon 
											sendCompanyIconToRedux={this.sendCompanyIconToRedux}
										/>
									</CompanyIcon>
									<StatueContainer/>

									<CoverPhotoContainer> 
										<CoverPhoto 
											coverPhotoData={this.state.userProfile.companyCoverPhoto}
										/> 
									</CoverPhotoContainer>

									<Profile id="CompanyAndPostInfoContainer">
										<CompanyDetailsNewsPostContainer 
											displaytoplevelemployeeprofile={this.displaytoplevelemployeeprofile}
											displaytoplevelnewsprofile={this.displaytoplevelnewsprofile}
											id={this.state.id}
											isOwnProfile={this.state.isOwnProfile}
										 />
									</Profile>

								</FirstProfileContainer>


								<SecondPostContainer>
									<PostContainer>
										<Posts />
									</PostContainer>

									{this.displaySmallCompanyDetail()}
									{this.displaySmallCompanyNews()}

								</SecondPostContainer>

						</ProfileContainer>
						</React.Fragment>:
						<React.Fragment>
						</React.Fragment>
					}

				</CompanyPostDisplayProvider>

				{this.state.displayChampionModal==false?
							<React.Fragment>
							</React.Fragment>:
							<SponsorDisplayModal
								championData={this.state.championModalData}
							/>
				}
				
			</CompanyProvider>

		)
	}
}


const mapStateToProps=(state)=>{
	return{
		companyInformation:state.companyInformation,
		companyEmployees:state.companyEmployeeInformation,
		companyPersonalId:state.companyInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(LProfile);
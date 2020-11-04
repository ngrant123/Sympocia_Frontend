import React,{Component} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Icon, InlineIcon } from '@iconify/react';
import tiktokIcon from '@iconify/icons-simple-icons/tiktok';


const SponsorExtendedModal=styled.div`
	position:fixed;
	width:30%;
	height:35%;
	background-color:white;
	top:0px;
	z-index:25;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
	left:65%;
	top:60%;
`;

const SponsorSimpliedModal=styled.div`
	position:fixed;
	width:30%;
	height:10%;
	background-color:white;
	border-radius:5px;
	box-shadow: 10px 10px 20px 	#9395a0;
`;

const ExtendedProfilePicture=styled.div`
	position:relative;
	width:120%;
	height:35%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const SimpliedProfilePicture=styled.div`
	position:relative;
	width:80px;
	height:80%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

const ExtendedChampionModal=(championData)=>{
	return <ul>
				<li style={{width:"40%",listStyle:"none",display:"inline-block",marginRight:"10%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",marginBottom:"3%",width:"40%"}}>
								<img src={championData.imgUrl} style={{width:"170%",height:"35%",borderRadius:"50%"}}/>
						</li>

						<li style={{listStyle:"none",fontSize:"30px",color:"#5298F8"}}>
							<b>{championData.name}</b>
						</li>

						<li style={{listStyle:"none",marginTop:"10%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									{championData.instagramUrl!=null?
										<a style={{textDecoration:"none"}}href={championData.instagramUrl}>
											<InstagramIcon
												style={{fontSize:20}}
											/>
										</a>
										:<React.Fragment></React.Fragment>
									}
								</li>
								<li style={{listStyle:"none",display:"inline-block",marginLeft:"20%"}}>

								{championData.tikTokUrl!=null?
										<a style={{textDecoration:"none"}}href={championData.instagramUrl}>
											<Icon icon={tiktokIcon} 
												style={{fontSize:20}}
											/>
										</a> 
										:<React.Fragment></React.Fragment>
								 }
								</li>

							</ul>
						</li>
					</ul>
				</li>

				<li style={{height:"40%",overflowY:"auto",position:"relative",top:"-50px",listStyle:"none",display:"inline-block",width:"50%"}}>
					{championData.description}
				</li>
			</ul>
}


class SponsorDisplayModal extends Component{

	constructor(props){
		console.log(props);
		super(props);
		this.state={
			displayExtendedSponsorModal:false
		}
	}


	render(){

		return(
			<React.Fragment>
				{this.state.displayExtendedSponsorModal==true?
					<SponsorExtendedModal>
						<ul style={{padding:"15px"}}>
							<li style={{listStyle:"none",marginBottom:"5%",marginLeft:"85%"}}>
								<KeyboardArrowDownIcon
									style={{borderStyle:"solid",
											borderRadius:"50%",
											color:"#BDBDBD",
											fontSize:30}}
									onClick={()=>this.setState({displayExtendedSponsorModal:false})}
								/>
							</li>

							<li style={{listStyle:"none"}}>
								{ExtendedChampionModal(this.props.championData)}
							</li>
						</ul>
					</SponsorExtendedModal>:
					<SponsorSimpliedModal>
						<ul style={{padding:"10px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"10%",width:"80px"}}>
							
									<img src={this.props.championData.imgUrl} style={{position:"relative",top:"-30px",width:"80px",height:"80%",borderRadius:"50%"}}/>
							</li>

							<li style={{position:"relative",top:"-5px",overflow:"hidden",listStyle:"none",display:"inline-block",width:"50%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",fontSize:"20px"}}>
										<b>{this.props.championData.name}</b> 
									</li>
									<li style={{listStyle:"none",width:"70%",height:"45%",color:"#BDBDBD"}}>
										{this.props.championData.description}
									</li>
								</ul>
							</li>
							
							<li style={{listStyle:"none",display:"inline-block"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<KeyboardArrowUpIcon
										style={{borderStyle:"solid",
												borderRadius:"50%",
												color:"#BDBDBD",
												fontSize:30}}
										onClick={()=>this.setState({displayExtendedSponsorModal:true})}
									/>
								</a>
							</li>
						</ul>
					</SponsorSimpliedModal>
				}

			</React.Fragment>
		)
	}
}

export{
	ExtendedChampionModal,
	SponsorDisplayModal
}

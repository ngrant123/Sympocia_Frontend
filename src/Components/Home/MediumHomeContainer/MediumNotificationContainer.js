import React,{Component} from "react";
import styled from "styled-components";
import SmallHomeNotificationProfile from "../SmallHomeContainer/SmallHomeNotificationProfile.js";



const Container = styled.div`
	position:relative;
	width:100%;
	height:100%;
	background-color:black;
	border-radius:5px;
	overflow:scroll;


`;

const ExtendDivButton = styled.div`
	position:absolute;
	background-color:blue;
	z-index:3;
	width:100%;
	height:15%;
	top:85%;
	border-radius:0px 0px 5px 5px;




`;

const testerdata = [
	{
		name:"Nathan",
		type:"Commented on your post",

	},
	{
		name:"Jabari",
		type:"Commented on your post",

	}

];

class MediumNotificationContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			extenddiv:"false"

		};
	}

	handleExtendDiv=(props)=>{
		var extenddivdecider=this.state.extenddiv;
		var notificationelement=document.getElementById("notificationcontainer");
		var extenddivcontainer=document.getElementById("ExtendDivContainer");

		if(extenddivdecider=="false"){

			this.setState({

				extenddiv:"true"

			}, function(){

				this.handleExpandDiv(notificationelement,extenddivcontainer);

			});

		}
		else{

			this.setState({
				extenddiv:"false"

			},function(){

				var expandeddivheight=this.handleTurnFromPercentagetoNumber(notificationelement.style.height);
				var expandedextenddivcontainer=this.handleTurnFromPercentagetoNumber(extenddivcontainer.style.top);

				
				var id= setInterval(frame,2);
				var originaldivheight=100;

				function frame(){

					if(expandeddivheight==85)
						clearInterval(id); 
					else{

						notificationelement.style.height=expandeddivheight+"%";
						extenddivcontainer.style.height=expandedextenddivcontainer+"%";

						expandedextenddivcontainer=expandedextenddivcontainer-.7;
						expandeddivheight--;

					}
				}
			});
		}
	}

	handleTurnFromPercentagetoNumber(stringnumber){

		var lengthofstring=stringnumber.length;
		var stringnum=stringnumber.substring(0,lengthofstring-1);
		var number=parseInt(stringnum);
		return number;


	}

	handleExpandDiv(notificationelement,extenddivcontainer){

				var id=setInterval(frame,5);
				var notificationelementheight=100;
				var extenddivtop=85;
				var extenddivheight=15;

				function frame(){

					if(notificationelementheight==190)
						clearInterval(id);
					else{
						notificationelement.style.height=notificationelementheight+"%";
						extenddivcontainer.style.top=extenddivtop+"%";
						extenddivcontainer.style.height=extenddivheight+"%";
						extenddivtop=extenddivtop+.1;
						extenddivheight=extenddivheight-.1;
						notificationelementheight++;

					}
				}

	}



	render(){

		return(
			<Container id="notificationcontainer">

			<ul>

				{testerdata.map(data=>
					<li style={{listStyle:"none",marginBottom:"20px"}}>

						<SmallHomeNotificationProfile
							name={data.name}
							type={data.type}
						/>

					</li>

				)}

			</ul>

			<ExtendDivButton id="ExtendDivContainer" onClick={()=>this.handleExtendDiv("Extend")}></ExtendDivButton>

			</Container>


		)
	}


}

export default MediumNotificationContainer;
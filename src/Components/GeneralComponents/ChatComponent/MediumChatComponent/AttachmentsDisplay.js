import React, { Component } from "react";
import styled from "styled-components";
import Attachments from "../SmallChatComponent/Attachments.js";



const AttachmentsTitleContainer = styled.div`
	position:absolute;
	width:20%;
	height:10%;
	position:absolute;
	fontSize:110%;
	color:	#9eaabb;
	left:7%;


`;

const ViewAllAttachmentsContainer = styled.div`

	position:absolute;
	fontSize:105%;
	color:	#67a4f8;
	left:65%;

`;

const Testerdata=[

	{
		testerdata:1
	},
	{
		testerdata:2

	},
	{
		testerdata:3

	},
	{
		testerdata:3

	},
	{
		testerdata:3

	},
	{
		testerdata:3

	}

]


class AttachmentsDisplay extends Component {

	constructor(props){

		super(props);

		this.state={


		}
	}


	render(){

		return(
			
			<React.Fragment>
				<AttachmentsTitleContainer> Attachments</AttachmentsTitleContainer>
				<ViewAllAttachmentsContainer> View all: </ViewAllAttachmentsContainer>


				<ul style={{position:"absolute",top:"50px", height:"90px",width:"100%"}}>

					{Testerdata.map(data=>

						<li style={{listStyle:"none"}}>	
							<Attachments

							/>
							
						</li>

						)
					}
				</ul>

			</React.Fragment>

		)
	}
}

export default AttachmentsDisplay;
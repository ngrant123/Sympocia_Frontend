import React,{Component} from "react";
import styled from "styled-components";
import ProcessImage from 'react-imgpro';

const OriginalImage=styled.div`
	position:relative;
	border-radius:5px;
	background-color:red;
	width:270px;
	height:200px;
	border-radius:5px;
	overflow:hidden;
`;

const DisplayedImageContainer=styled.div`
	position:relative;
	border-radius:5px;
	overflow:hidden;
	border-radius:5px;
	padding:5px;
`;

const DisplayImagesCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"6%",
	marginBottom:"2%"
}
class FilterImageSelection extends Component{
/*
conditional expression in processed image component
*/
	constructor(props){
		super(props);
		this.state={
			imgUrl:this.props.imgUrl,
			filteredImageArrays:[
				{
					type:"sepia",
					value:true,
					key:1
				},
				{
					type:"greyscale",
					value:true,
					key:2
				},
				{
					type:"normalize",
					value:true,
					key:3
				},
				{
					type:"contrast",
					value:0.3,
					key:4
				},
				{
					type:"invert",
					value:true,
					key:5
				},
				{
					type:"blur",
					value:1,
					key:6
				},
				{
					type:"opaque",
					value:true,
					key:7
				},
				{
					type:"dither565",
					value:true,
					key:8

				},{
					type:"brightness",
					value:0.5,
					key:9
				},{
					type:"fade",
					value:0.2,
					key:10
				},{
					type:"opacity",
					value:0.99,
					key:11
				},{
					type:"posterize",
					value:50,
					key:12
				}
			]
		}
	}

	displayFilterdImage=(data)=>{
		const type=data.type;
		const value=data.value;
		const filterObject={type:value};
		return <React.Fragment>
					<li style={{listStyle:"none"}}>
						<DisplayedImageContainer>
							<ProcessImage
								image={this.props.imgUrl}
								resize={{width:70,height:70}}
								quality={100}
								{...filterObject}
							/>
						</DisplayedImageContainer>
					</li>
					<li style={{listStyle:"none"}}>
						{data.type}
					</li>
				</React.Fragment>
	}

	bubbleUpSelectedFilter=(data)=>{
		this.props.displayFilteredImage(data);
	}
	hightlightImageIcon=(selectedDivKey)=>{
		

		for(var i=0;i<this.state.filteredImageArrays.length;i++){
			const key=this.state.filteredImageArrays[i].key;
			const selectedDiv="displayFilteredImageTab"+key;

			if(key==selectedDivKey){
				if(document.getElementById(selectedDiv).style.borderStyle=="solid"){
					this.props.switchBackToSubmitModal();
					break;
				}else{
					document.getElementById(selectedDiv).style.borderStyle="solid";
					document.getElementById(selectedDiv).style.borderColor="#5298F8";
				}
			}else{
				document.getElementById(selectedDiv).style.borderStyle="none";
			}
		}
	}
	render(){
		return(
			<React.Fragment>
				<li style={{listStyle:"none",display:"inline-block",top:"0px"}}>
					<ul style={{position:"absolute",top:"20px", padding:"0px"}}>

						<li style={{listStyle:"none"}}>
							<p style={{fontSize:"20px"}}>
								<b>Filter images</b>
							</p>
							<p>Check out new filters that we have available on our platform for your picture (original displayed below) </p>
						</li>

						<li style={{listStyle:"none"}}>
							<OriginalImage>
									<img src={this.state.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
							</OriginalImage>
						</li>

						<li style={{listStyle:"none",marginTop:"2%"}}>
							<ul style={{padding:"0px"}}>
								{this.state.filteredImageArrays.map(data=>{
										const type=""+data.type+"";
										const value=data.value;
										return <li onClick={()=>this.bubbleUpSelectedFilter(data)}style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"10%"}}>
													<DisplayedImageContainer onClick={()=>this.hightlightImageIcon(data.key)} id={"displayFilteredImageTab"+data.key}>
														<a href="javascript:;">
															<ul style={{padding:"0px"}}> 
																<li style={{listStyle:"none"}}>
																		<ProcessImage
																			image={this.props.imgUrl}
																			resize={{width:70,height:70}}
																			quality={100}
																			{...{[type]:value}}
																		/>
																</li>

																<li style={{listStyle:"none"}}>
																	{data.type}
																</li>
															</ul>
														</a>
													</DisplayedImageContainer>
											   </li>
									}
								)}
							</ul>
						</li>
					</ul>
				</li>
			</React.Fragment>
		)
	}
}

export default FilterImageSelection;



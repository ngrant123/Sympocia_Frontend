import React,{Component} from "react";
import styled from "styled-components";

const SelectedImage=styled.div`
	position:relative;
	border-radius:5px;
	background-color:red;
	width:270px;
	height:200px;
	border-radius:5px;
	overflow:hidden;
`;

class FilterImage extends Component{


	constructor(props){
		super(props);
		this.state={
			imgUrl:this.props.imgUrl
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
							<SelectedImage>
								<img src={this.state.imgUrl} style={{width:"100%",height:"100%"}}/>
							</SelectedImage>
						</li>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>


							</ul>
						</li>
					</ul>
				</li>
			</React.Fragment>
		)
	}
}

export default FilterImage;
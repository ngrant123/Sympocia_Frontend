import React from 'react';
import styled from 'styled-components';

const PageIndictor=styled.div`
	position:relative;
	width:53px;
	height:40px;
	border-radius:50%;
	background-color:red;


`;

const LandingScrollPageIndicator=(props)=>{

	const page=props.page;

	if(page==2){
		return(
			<React.Fragment>

				<ul style={{display:"flex",position:"relative",listStyle:"none"}}>
					<li style={{marginRight:"10px",marginLeft:"-15px"}}><PageIndictor style={{backgroundColor:"blue"}}/></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>	
					<li style={{marginRight:"10px"}}><PageIndictor /></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>

				</ul>

			</React.Fragment>
		)

	}
	else if(page==3){

		return(
		<React.Fragment>

				<ul style={{display:"flex",position:"relative",listStyle:"none"}}>
					<li style={{marginRight:"10px",marginLeft:"-15px"}}><PageIndictor /></li>
					<li style={{marginRight:"10px"}}><PageIndictor style={{backgroundColor:"blue"}}/></li>	
					<li style={{marginRight:"10px"}}><PageIndictor/></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>

				</ul>

			</React.Fragment>


		)

	}
	else if(page==4){

		return (
		<React.Fragment>

				<ul style={{display:"flex",position:"relative",listStyle:"none"}}>
					<li style={{marginRight:"10px",marginLeft:"-15px"}}><PageIndictor /></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>	
					<li style={{marginRight:"10px"}}><PageIndictor style={{backgroundColor:"blue"}}/></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>

				</ul>

			</React.Fragment>

		)

	}
	else{
		return (
		<React.Fragment>

				<ul style={{display:"flex",position:"relative",listStyle:"none"}}>
					<li style={{marginRight:"10px",marginLeft:"-15px"}}><PageIndictor /></li>
					<li style={{marginRight:"10px"}}><PageIndictor /></li>	
					<li style={{marginRight:"10px"}}><PageIndictor /></li>
					<li style={{marginRight:"10px"}}><PageIndictor style={{backgroundColor:"blue"}}/></li>

				</ul>

			</React.Fragment>

		)


	}

}

export default LandingScrollPageIndicator;
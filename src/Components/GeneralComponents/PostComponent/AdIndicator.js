import React from "react";
import styled from "styled-components";

const AdButtonCSS={
	color:"white",
	backgroundColor:"#5298F8",
	borderRadius:"5px",
	display:"flex",
	flexDirection:"column",
	justifyContent:"center",
	padding:"2%",
	alignItems:"center"
}

const AdIndicator=({postData})=>{
	return(
		<React.Fragment>
			{postData.isAdEnabled==true &&(
				<div style={AdButtonCSS}>
					<p>Ad</p>
				</div>
			)}
		</React.Fragment>
	)
}


export default AdIndicator;
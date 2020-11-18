import React from "react";

const ComponentEnds=({days})=>{
	const endDate=(days)=>{
		if(days>1){
			return <p> {days} days</p>;
		}else if(days==1){
			return <p> {days} day</p>;
		}else{
			return <p>Today</p>;
		}
	}
	return(
		<ul>
			<li style={{listStyle:"none",display:"inline-block"}}>
				<p>Competition Ends:</p>
			</li>
			<li style={{listStyle:"none",display:"inline-block",marginLeft:"1%"}}>
				<p>{endDate(days)} </p>
			</li>
		</ul>
	)
}

export default ComponentEnds;
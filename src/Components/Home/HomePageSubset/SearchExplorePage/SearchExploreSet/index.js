import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";

class SearchExploreContainer extends Component{


	constructor(props){
		super(props);
		this.state={
			subCommunitiesDisplay:[],
			selectedIndustry:"",
			selectedSubCommunities:[]
		}
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"0px",backgroundColor:"red",marginLeft:"10%",marginTop:"8%"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							Select Industries:

							<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																				borderColor:"#5298F8",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
										Sort By
										<span class="caret"></span>
									</button>
										<ul class="dropdown-menu">
											{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
												<li><a href="">{data.industry}</a></li>
											)}				
										</ul>
								</div>
							</li>

							<li>
								
							</li>
						</ul> 
					</li>

					<li style={{listStyle:"none"}}>
						Tseitneg 
					</li>
				</ul>
			</React.Fragment>
		)
	}
}

export default SearchExploreContainer;
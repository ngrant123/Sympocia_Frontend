import React,{Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {
            quickSearchIndustry,
            searchForCompanies
      } from "../../../Actions/Requests/MapPageAxiosRequests/MapPageGetRequests.js";
import COMPANY_INDUSTRIES from "../../../Constants/industryConstants.js";

const SearchContainer = styled.div`

      position:absolute;
      width:35%;
      height:60%;
      top:15%;
      left:3%;
      background-color:white;
      z-index:5;
      border-radius:5px;
      overflow:hidden;


`;

const IndustryButtons=styled.div`
      position:relative;
      width:120px;
      border-radius:5px;
      border-style:solid;
      border-width:1px;
      border-color:#5298F8;
      margin-bottom:5px;
      text-align:center;
      overflow-y:hidden;
      padding:5px;
      transition:.8s;

      &:hover{

            color:white;
            background-color:#5298F8;

      }
`;

const IndustryContainer=styled.div`
      position:relative;
      width:80%;
      height:15%;
      overflow-x:auto;
      left:10%;

`;

const MapTextBox=styled.textarea`
      position:relative;
      width:180%;
      height:10%;
      padding:5px;
      color:3F3F3F;
      border-style:solid;
      border-width:1px;
      border-color:#CCCCCC;
      border-radius:5px;
      resize:none;
      left:5%;
      padding-left:10px;
      padding-top:10px;
`;

const AddOptionButton=styled.div`
      position:relative;
      width:120px;
      height:40px;
      background-color:#5298F8;
      color:white;
      padding-top:5px;
      text-align:center;
      padding-top:10px;
      border-radius:5px;

`;

const SubmitButtton=styled.div`
      position:relative;
      height:40px;
      background-color:#5298F8;
      color:white;
      padding-top:5px;
      text-align:center;
      padding-top:10px;
      border-radius:5px;
      margin-top:10px;
      text-align:center;
      font-size:15px;

`;

class SearchComponent extends Component{

	constructor(props){

		super(props);

		this.state={
		    industries:[],
		    addedOption:[]
		}
	}


      displaySelectedOption=()=>{

            if(this.state.addedOption.length==0)
                  return <React.Fragment></React.Fragment>
            else{

                  return <React.Fragment>

                              {this.state.addedOption.map(data=>
                                          <li style={{listStyle:"none",display:"inline-block"}}>
                                                Testing
                                          </li>
                                    )}

                        </React.Fragment>
            }
      }

	render(){

		return (

			<SearchContainer>
				<ul style={{padding:"0px"}}>
      					<li style={{listStyle:"none",fontSize:"40px",color:"#9F68FD",marginLeft:"20%"}}> 
      						<b>Meet new people</b>
      					</li>
      					<li style={{listStyle:"none",fontSize:"17px",marginLeft:"40%",color:"#585858"}}>
      						Industries:
      					</li>
                                    <li style={{listStyle:"none",fontSize:"13px",marginLeft:"25%",color:"#585858",marginBottom:"2%"}}>
                                          Quick search your favorite industries
                                    </li>

                                    <IndustryContainer>
                  					{COMPANY_INDUSTRIES.INDUSTRIES.map(data=>
                  						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
                  							<IndustryButtons>
                                                                  {data.industry}
                                                            </IndustryButtons>
                  						</li>

                  					)}
                                          
                                    </IndustryContainer>

                                    <li style={{listStyle:"none",fontSize:"13px",marginLeft:"35%",color:"#585858",marginTop:"1%"}}>
                                         Search categories:
                                    </li>

      					<li>
      						<ul style={{padding:"0px"}}>
      							<li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
      								<MapTextBox
                                                      placeholder="Search by state (e.x New York)"
                                                      />

      							</li>

      							<li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
      								<AddOptionButton>
                                                            Add
                                                      </AddOptionButton>

      							</li>


      						</ul>
      					</li>

      					<li>
	      					<ul style={{padding:"0px"}}>
                                                <li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
                                                      <MapTextBox
                                                      placeholder="Search by industry (e.x. Fashion)"
                                                      />

                                                </li>

                                                <li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
                                                      <AddOptionButton>
                                                            Add
                                                      </AddOptionButton>

                                                </li>


                                          </ul>

      					</li>

      					<li>

      						<ul style={{padding:"0px"}}>
                                                <li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
                                                      <MapTextBox
                                                      placeholder="Search by name"
                                                      />

                                                </li>

                                                <li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
                                                      <AddOptionButton>
                                                            Add
                                                      </AddOptionButton>

                                                </li>


                                          </ul>

      					</li>
                                    {this.displaySelectedOption()}

                                    <li>
                                          <SubmitButtton>
                                                Submit
                                          </SubmitButtton>

                                    </li>
      				</ul>


			</SearchContainer>
		)
	}
}


export default SearchComponent;
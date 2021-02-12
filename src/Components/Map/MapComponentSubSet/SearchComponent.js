import React,{Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {quickSearchIndustry,searchForCompanies} from "../../../Actions/Requests/MapPageAxiosRequests/MapPageGetRequests.js";
import COMPANY_INDUSTRIES from "../../../Constants/industryConstants.js";
import LOCATIONS from "../../../Constants/locationConstants.js";
import {MapConsumer} from "../MapContext.js";

const SearchContainer = styled.div`

      position:absolute;
      width:35%;
      height:65%;
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

const SearchOptionsContainer=styled.div`
      border-color:#5298F8;
      border-style:solid;
      border-width:1px;
      color:#5298F8;
      background-color:white;
      border-radius:5px;
      padding:10px;
`;

const MapBoxInputCSS={
      position:"relative",
      width:"180%",
      height:"10%",
      padding:"5px",
      color:"3F3F3F",
      borderStyle:"solid",
      borderWidth:"1px",
      borderColor:"#CCCCCC",
      borderRadius:"5px",
      resize:"none",
      left:"5%",
      paddingLeft:"10px",
      paddingTop:"10px"
}


class SearchComponent extends Component{

	constructor(props){

		super(props);

		this.state={
		    industries:[],
		    addedOption:[],
                addedOptionsObject:{},
                locations:[]
		}
	}

      componentDidMount=()=>{

            const locationArray=LOCATIONS.WORLDCITIES;
            const newLocationArray=[];
            const deciderMap=new Map();

            for(var i=0;i<locationArray.length;i++){
                  const location=locationArray[i].admin_name;
                  if(deciderMap.has(location)==false){
                        deciderMap.set(location,1);
                        newLocationArray.push(locationArray[i]);
                  }else
                        continue;
            }

            this.setState({
                  locations:newLocationArray
            })
      }


      displaySelectedOption=()=>{

            if(this.state.addedOption.length==0)
                  return <React.Fragment></React.Fragment>
            else{

                  return <React.Fragment>

                              {this.state.addedOption.map(data=>
                                          <li style={{listStyle:"none",display:"inline-block",marginTop:"2%",marginLeft:"2%"}}>
                                                <SearchOptionsContainer>
                                                      {data}
                                                </SearchOptionsContainer>
                                          </li>
                                    )}

                        </React.Fragment>
            }
      }

      addOption=(props)=>{
            props.displayInformationalModal(false);
            const location=document.getElementById("locationId").value;
            const industry=document.getElementById("industryId").value.trim();
            const name=document.getElementById("nameId").value;
            const newOptionArray=[];
            let newObject={}

            if(location!=""){
                  newOptionArray.push(location);
            }

            if(industry!=""){
                  newOptionArray.push(industry);
            }

            if(name!=""){
                  newOptionArray.push(name);
            }

            this.setState({
                  addedOption:newOptionArray,
                  addedOptionsObject:newObject
            })
      }

      addQuickSearchIndustry=async(data,mapContext)=>{
            mapContext.displayInformationalModal(false);
            let quickSearchData=this.state.industries;
            quickSearchData.push(data.trim());
            const companies=await quickSearchIndustry(this.props._id,this.state.industries);
            mapContext.updateCompaniesLocation(companies);

            this.setState({
                  industries:quickSearchData
            });
      }

      submitData=async(mapContext)=>{
          //  const addedOptions=this.state.addedOptionsObject;
            const location=document.getElementById("locationId").value;
            const industry=document.getElementById("industryId").value.trim();
            const name=document.getElementById("nameId").value;
            const addedOptions={state:location,industry:industry,name:name};
            const companies=await searchForCompanies(this.props._id,addedOptions);
            mapContext.updateCompaniesLocation(companies);
      }

	render(){
		return (
                  <MapConsumer>
                        {mapContext=>{
                              return <SearchContainer>
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
                                                                              <IndustryButtons onClick={()=>this.addQuickSearchIndustry(data.industry,mapContext)}>
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
                                                                        <input id="locationId" list="locationsWorld" name="startupcategories" style={MapBoxInputCSS} placeholder="Search by state (e.x New York)"/>
                                                                              <datalist id="locationsWorld" style={{height:"50px"}}>
                                                                                    {this.state.locations.map(data=>
                                                                                          <option value={data.admin_name}/>
                                                                                    )}
                                                                              </datalist>
                                                                  </li>

                                                                  <li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
                                                                        <AddOptionButton onClick={()=>this.addOption(mapContext)}>
                                                                              Add
                                                                        </AddOptionButton>

                                                                  </li>


                                                            </ul>
                                                      </li>

                                                      <li>
                                                            <ul style={{padding:"0px"}}>
                                                                  <li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
                                   
                                                                         <input id="industryId" list="industriesWorld" name="startupcategories" style={MapBoxInputCSS} placeholder="Search by industry (e.x. Fashion)"/>
                                                                              <datalist id="industriesWorld" style={{height:"50px"}}>
                                                                                    {COMPANY_INDUSTRIES.INDUSTRIES.map(data=>
                                                                                          <option value={data.industry}/>
                                                                                    )}
                                                                              </datalist>

                                                                  </li>

                                                                  <li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
                                                                        <AddOptionButton onClick={()=>this.addOption(mapContext)}>
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
                                                                        id="nameId"
                                                                        />
                                                                  </li>

                                                                  <li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
                                                                        <AddOptionButton onClick={()=>this.addOption(mapContext)}>
                                                                              Add
                                                                        </AddOptionButton>

                                                                  </li>


                                                            </ul>

                                                      </li>
                                                      {this.displaySelectedOption()}

                                                      <li>
                                                            <SubmitButtton onClick={()=>this.submitData(mapContext)}>
                                                                  Submit
                                                            </SubmitButtton>

                                                      </li>
                                                </ul>
                                 </SearchContainer>
                              }
                        }
                  </MapConsumer>
      		)
      	}
      }

const mapStateToProps=(state)=>{
      return{
            companyInformation:state.companyInformation
      }
}

export default (connect)(
            mapStateToProps
      )(SearchComponent);
import React,{useState,useEffect} from "react";
import styled from "styled-components";
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Container=styled.div`
	width:100%;
	border-style:solid;
	border-width:1px;
	border-radius:5px;
	border-color:#ECECEC;
	display:flex;
	flex-direction:row;
	align-items:center;
`;


const InputContainer=styled.textarea`
	width:85%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;

`;

const SearchBar=({featuresType})=>{
	const [searchTextType,changeSearchTextType]=useState();

	useEffect(()=>{
		switch(featuresType){
			case "Beacons":{
				changeSearchTextType("Search Beacons");
				break;
			}
			case "Community":{
				changeSearchTextType("Search Community Questions");
				break;
			}

			case "University":{
				changeSearchTextType("Search Symposium University");
				break;
			}
		}
	},[featuresType]);

	return(
		<Container>
			<InputContainer
				placeholder={searchTextType}
			/>
			<div style={{cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"5%"}}>
				<SearchIcon
					style={{fontSize:"30"}}
				/>
				<ArrowDropDownIcon
					style={{fontSize:"30"}}
				/>
			</div>
		</Container>
	)
}


export default SearchBar;
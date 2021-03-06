import React,{useState,useMemo} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown'
import NavBar from "./NavBar.js";



const GeneralNavBar=(pageProps)=>{

	const NavBarContainer=useMemo(()=>{
		if(pageProps.page=="Home"|| pageProps.page=="Map"){
			return <NavBar
						{...pageProps}
						color="transparent"
					/>
		}else{
			return (
				<NavBar
					{...pageProps}
					color="none"
				/>
			);
		} 
	},[]);

	return (
		<NavBar
			{...pageProps}
			color="transparent"
		/>
	);
}


export{
	GeneralNavBar
}


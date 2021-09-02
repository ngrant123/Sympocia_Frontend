import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import Creation from "../../../../../Symposium/ExtendedSymposium/Modals/Beacons/Creation.js";

const Container=styled.div`
	width:100%;
	height:100%;
`;

const CreateBeaconPortal=(props)=>{
	const {closeCreationModal}=props;
	return (
		<Container>
			<Creation
				{...props}
			/>
		</Container>
	)
};

export default CreateBeaconPortal;


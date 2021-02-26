import React,{useState} from "react";
import styled from "styled-components";
import Particles from 'react-particles-js';
import EmailConfirmationModal from "../EmailSubset/EmailConfirmationModal.js";
import EmailResetModal from "../EmailSubset/EmailResetModal.js";


const Container=styled.div`
	position:absolute;
	background-color:white;
	width:100%;
	height:100%;

	@media screen and (max-width:650px){
		#elementContainerDiv{
			justify-content:flex-start !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	 	#elementContainerDiv{
			justify-content:flex-start !important;
		}
    }
`;
const ParticlesConfiguration={
   particles: {	
        number: {	
            value: 100	
        },	
        size: {	
            value: 3	
        },	
        color: {	
	      value: "#000000"	
	    },	
	    line_linked: {	
     	 color: "#000000"
    	}	
    },	
    interactivity: {	
        events: {	
            onhover: {	
                enable: true,	
                mode: "repulse"	
            }	
        }	
    }	
}

const EmailRestPassword=(props)=>{
	const [displayEmailConfirmationModal,changeDisplayEmailConfirmationModal]=useState(true);
	const [displayResetPasswordModal,changeDisplayResetPasswordModal]=useState(false);
	const [selectedEmail,changeSelectedEmail]=useState()
	const {history}=props;
	const triggerResetModal=(email)=>{
		changeSelectedEmail(email);
		changeDisplayResetPasswordModal(true);
		changeDisplayEmailConfirmationModal(false);
	}

	const triggerEmailConfirmationModal=()=>{
		changeDisplayResetPasswordModal(false);
		changeDisplayEmailConfirmationModal(true);	
	}

	return(
		<Container>	
			<Particles	
			    params={ParticlesConfiguration}	
			/>	
			<div id="elementContainerDiv" style={{display:"flex",justifyContent:"center"}}>
				{displayEmailConfirmationModal==true ?
					<EmailConfirmationModal
						triggerResetModal={triggerResetModal}
					/>:
					<EmailResetModal
						triggerEmailConfirmationModal={triggerEmailConfirmationModal}
						email={selectedEmail}
						history={history}
					/>
				}
			</div>

		</Container>
	)
}



export default EmailRestPassword;
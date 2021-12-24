
export const disableScrolling=(targetDivId)=>{
	const parentContainer=document.getElementById(targetDivId);
	parentContainer.style.overflow="hidden";
}


export const enableScrolling=(targetDivId)=>{
	const parentContainer=document.getElementById(targetDivId);
	parentContainer.style.overflow="auto";
}
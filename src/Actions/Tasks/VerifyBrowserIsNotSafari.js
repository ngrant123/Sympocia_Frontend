const VerifyBrowserIsNotSafari=()=>{
	debugger;
    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple')!=-1;
   return isSafari;
}


export{
	VerifyBrowserIsNotSafari
}
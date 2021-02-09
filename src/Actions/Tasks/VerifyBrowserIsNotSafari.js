const VerifyBrowserIsChrome=()=>{
	debugger;
    var isChrome = navigator.vendor && navigator.vendor.indexOf('Google Inc')!=-1;
    console.log(navigator.vendor);
   return isChrome;
}


export{
	VerifyBrowserIsChrome
}
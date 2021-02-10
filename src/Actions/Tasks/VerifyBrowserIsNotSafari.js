const VerifyBrowserIsChrome=()=>{
	debugger;
   // var isChrome = navigator.vendor && navigator.vendor.indexOf('Google Inc')!=-1;
  //  console.log(navigator.vendor);
    var isChromium = window.chrome;
	var winNav = window.navigator;
	var vendorName = winNav.vendor;
	var isOpera = typeof window.opr !== "undefined";
	var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
	var isIOSChrome = winNav.userAgent.match("CriOS");

	if (isIOSChrome) {
	  return true;
	} else if(
	  isChromium !== null &&
	  typeof isChromium !== "undefined" &&
	  vendorName === "Google Inc." &&
	  isOpera === false &&
	  isIEedge === false
	) {
	  return true;
	} else { 
	   return false;
	}
}


export{
	VerifyBrowserIsChrome
}
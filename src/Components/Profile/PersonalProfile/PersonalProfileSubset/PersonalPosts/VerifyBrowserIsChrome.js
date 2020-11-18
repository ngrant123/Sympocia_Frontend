const testIfUserIsUsingChrome=()=>{

    var isChrome = navigator.vendor && navigator.vendor.indexOf('Apple')==-1 &&
   navigator.userAgent &&
   navigator.userAgent.indexOf('FxiOS')==-1
   console.log(isChrome)
   return isChrome;
}


export{
	testIfUserIsUsingChrome
}
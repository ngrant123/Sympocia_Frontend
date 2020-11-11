
const displayCamera=(divElement)=>{
	debugger;
				var constraints = {

				    audio: false,
				    video: {
				        facingMode: "environment"
				    }
				};

				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia(constraints)
					    .then(function (stream) {
					      divElement.srcObject = stream;
					     
					    })
				    .catch(function (error) {
				    });
				}	
	}

const stopRecording=(divElement)=>{
		var stream=divElement.srcObject;
		divElement.srcObject=null;
}

const photo=(canvas,imageElement,height,width)=>{
		debugger;
        canvas.width  = width;
        canvas.height = height;

        var tempcontext = canvas.getContext("2d");
         var tempScale = (canvas.height/canvas.width);

        tempcontext.drawImage(
            imageElement,
            0, 0,
            width,height
        );

        var canvasDataUrl=canvas.toDataURL();
        const canvasImage='<img src="' + canvasDataUrl + '">';
        return canvasDataUrl;
}

module.exports={
	displayCamera,
	stopRecording,
	photo
}
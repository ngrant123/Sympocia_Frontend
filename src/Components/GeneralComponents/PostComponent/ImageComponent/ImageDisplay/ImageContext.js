import React from "react";

const ImageContext=React.createContext();


const ImageConsumer=ImageContext.Consumer;
const ImageProvider=ImageContext.Provider;


export{
	ImageConsumer,
	ImageProvider
}
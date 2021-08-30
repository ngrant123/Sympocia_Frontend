import React from "react";


const FeaturesContext=React.createContext();
const FeaturesConsumer=FeaturesContext.Consumer;
const FeaturesProvider=FeaturesContext.Provider;

export{
	FeaturesConsumer,
	FeaturesProvider,
	FeaturesContext
}
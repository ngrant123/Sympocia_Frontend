import React from "react";

const FeatureContext=React.createContext();

const FeatureProvider=FeatureContext.Provider;
const FeatureConsumer=FeatureContext.Consumer;

export{
	FeatureProvider,
	FeatureConsumer
}
import React from "react";

const AdContext=React.createContext();
const AdConsumer=AdContext.Consumer;
const AdProvider=AdContext.Provider;


export{
	AdConsumer,
	AdProvider,
	AdContext
}
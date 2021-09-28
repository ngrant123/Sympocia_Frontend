import React from "react";

const MobileUIContext=React.createContext();
const MobileUIProvider=MobileUIContext.Provider;
const MobileUIConsumer=MobileUIContext.Consumer;


export{
	MobileUIContext,
	MobileUIProvider,
	MobileUIConsumer
}
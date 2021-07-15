import React from "react";


const SymposiumContext=React.createContext();


const SymposiumProvider=SymposiumContext.Provider;
const SymposiumConsumer=SymposiumContext.Consumer;


export{
	SymposiumProvider,
	SymposiumConsumer,
	SymposiumContext
}
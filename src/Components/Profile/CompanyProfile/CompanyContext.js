import React from "react";

const CompanyContext=React.createContext();

const CompanyProvider=CompanyContext.Provider;
const CompanyConsumer=CompanyContext.Consumer;


export{
	CompanyProvider,
	CompanyConsumer
}
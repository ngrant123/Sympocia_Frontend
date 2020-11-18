import React from "react";

const InvestorContext=React.createContext();

const InvestorConsumer=InvestorContext.Consumer;
const InvestorProvider=InvestorContext.Provider;


export{
	InvestorProvider,
	InvestorConsumer
}
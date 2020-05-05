import React from "react";

const CompanyPostDisplayContext=React.createContext();

const CompanyPostDisplayProvider=CompanyPostDisplayContext.Provider;
const CompanyPostDisplayConsumer=CompanyPostDisplayContext.Consumer;

export {
	CompanyPostDisplayProvider,
	CompanyPostDisplayConsumer
} 
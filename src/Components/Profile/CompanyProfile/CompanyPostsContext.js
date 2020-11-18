import React from "react";

const CompanyPostsContext=React.createContext();

const CompanyPostConsumer=CompanyPostsContext.Consumer;
const CompanyPostProvider=CompanyPostsContext.Provider;

export{
	CompanyPostsContext,
	CompanyPostConsumer,
	CompanyPostProvider
}
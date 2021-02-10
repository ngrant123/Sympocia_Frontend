import React from "react";

const PostDisplayContext=React.createContext();

const PostDisplayProvider=PostDisplayContext.Provider;
const PostDisplayConsumer=PostDisplayContext.Consumer;

export {
	PostDisplayProvider,
	PostDisplayConsumer,
	PostDisplayContext
} 
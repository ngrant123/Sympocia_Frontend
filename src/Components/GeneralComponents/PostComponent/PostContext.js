import React from "react";

const PostContext=React.createContext();

const PostConsumer=PostContext.Consumer;
const PostProvider=PostContext.Provider;

export{
	PostConsumer,
	PostProvider
}

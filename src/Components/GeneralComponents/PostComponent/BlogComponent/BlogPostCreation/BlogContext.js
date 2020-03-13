import React from "react";

const BlogContext=React.createContext();

const BlogProvider=BlogContext.Provider;
const BlogConsumer=BlogContext.Consumer;


export{

	BlogProvider,
	BlogConsumer
}
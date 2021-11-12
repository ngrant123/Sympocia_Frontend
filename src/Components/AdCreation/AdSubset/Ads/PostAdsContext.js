import React from "react";


const PostAdsContext=React.createContext();
const PostAdsProvider=PostAdsContext.Provider;
const PostAdsConsumer=PostAdsContext.Consumer;


export{
	PostAdsContext,
	PostAdsProvider,
	PostAdsConsumer
}
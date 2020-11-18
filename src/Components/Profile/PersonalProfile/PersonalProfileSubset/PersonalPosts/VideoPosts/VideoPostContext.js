import React from "react";

const VideoPostContext=React.createContext();

const VideoPostProvider=VideoPostContext.Provider;
const VideoPostConsumer=VideoPostContext.Consumer;

export {
	VideoPostProvider,
	VideoPostConsumer,
	VideoPostContext
} 
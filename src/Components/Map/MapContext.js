import React from "react";


const MapContext=React.createContext();
const MapConsumer=MapContext.Consumer;
const MapProvider=MapContext.Provider;

export{
	MapConsumer,
	MapProvider
}

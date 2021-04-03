import React from "react";

const ArenaContext=React.createContext();

const ArenaConsumer=ArenaContext.Consumer;
const ArenaProvider=ArenaContext.Provider;

export{
	ArenaConsumer,
	ArenaProvider
}
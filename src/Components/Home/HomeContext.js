import React from "react";


const HomeContext=React.createContext();


const HomeProvider=HomeContext.Provider;
const HomeConsumer=HomeContext.Consumer;


export default HomeContext;
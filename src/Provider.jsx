import React from 'react'
const socketContext = React.createContext({ socket:null });
const { Provider, Consumer } = socketContext

export { Provider, Consumer };
export default socketContext
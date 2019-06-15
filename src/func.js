export const createSocketEvent = (socket, dispatch) => eventConstant => {
  socket.on(eventConstant, value => {
    dispatch({ type: eventConstant, payload: value });
  });
};

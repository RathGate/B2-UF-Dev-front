export function send_move(socket, start, end) {
    if (!start || !end) {
        return false;
    }
    const message = {
        "type": "MOVE",
        "positions": [start, end]
    }
    socket.send(message.value)
}
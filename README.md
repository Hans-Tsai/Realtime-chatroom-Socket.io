Realtime-chatroom-Socket.io
----
This side project practice is refered to [chatcord app](https://github.com/bradtraversy/chatcord) on GitHub.

### Usage
- $ `npm install`
- $ `npm run dev`
- Open the browser, and checkout the URL
  + [http://localhost:3000](http://localhost:3000)

### The Realtime chatroom app structure
- Landing Page: [./public/index.html](./public/index.html)
- Join Page: [./public/chat.html](./public/chat.html)
- Frontend: [./public/js/main.js](./public/js/main.js)
- Backend: [./server.js](./server.js)

### Development procedure
- Set static folder => [./sever.js](./server.js) `express.static()`
- Run when client connects => [./server.js](./server.js) `io.on()` which is gonna listen for some kind of event(Ex: connection)
- Add `socket.io.js` script tag(frontend library) into [./public/chat.html](./public/chat.html) `<script src="/socket.io/socket.io.js"></script>`. So we can access the I/O method and everything we need in the [./public/js/main.js](./public/js/main.js)
- Broadcast when a user connects => [./server.js](./server.js) `socket.broadcast.emit()`
- Run when client disconnects => [./server.js](./server.js) `socket.on('disconnect')`





### Addition
- When we use `socket.emit()` method in `server.js`, then we can use `socket.on()` method in `main.js`(represent the client) to receive the message sent by the `server.js`.
- Three ways to emit an event to client
  + `socket.emit()` => Emit an event to a single client
  + `socket.broadcast.emit()` => Emit an event to all of the clients except the client that's connecting
  + `io.emit()` => Emit an event to all the clients in general
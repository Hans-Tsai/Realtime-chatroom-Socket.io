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
- Message submit => [./public/js/main.js](./public/js/main.js) `chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg);
});
` to emit message to server
- Listen for chatMessage => [./server.js](./server.js) `socket.on('chatMessage')`
- Output message to DOM(not only on chrome console log). Use innerHTML syntax => [./public/js/main.js](./public/js/main.js) `function outputMessage(message) { .......}`、`outputMessage(message);`
- Scroll down the chatroom sidebar automatically => [./public/js/main.js](./public/js/main.js) `chatMessages.scrollTop = chatMessages.scrollHeight;`
- Clear input => [./public/js/main.js](./public/js/main.js) `e.target.elements.msg.value = ''; e.target.elements.msg.focus();`
- Wrap all strings into `formatMessage()` function => [./utils/messages.js](./utils/messages.js). Besides, use `module.exports` syntax to export this module.
- Get username and room from URL => [./public/js/main.js](./public/js/main.js) `const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});`
- Join chatroom(client) => [./public/js/main.js](./public/js/main.js) `socket.emit('joinRoom', { username, room });`
- Join chatroom(server) => [./server.js](./server.js) `socket.on('joinRoom', ({ username, room }) => { ..... });`
- Add `userJoin(id, username, room)`、`getCurrentUser(id)` users functions in `./utils/` folder => [./utils/users.js](./utils/users.js)
  + Join user to chat
    * ```js
        function userJoin(id, username, room) {
          const user = { id, username, room }

          users.push(user)

          return user
        };
      ```
  + Get current user
    * ```js
        function getCurrentUser(id) {
          return users.find(user => user.id === id)
        };
      ```
- Broadcast to all the users in the specific chatroom => [./server.js](./server.js). Add `to(user.room)`, for example:
  + ```js
      socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
      ```
  + ```js
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    ```
- Add `userLeave(id)`、`getRoomUsers(room)` users functions in `./utils/` folder => [./utils/users.js](./utils/users.js)
  + User leaves chat
    * ```js
        function userLeave(id) {
          const index = users.findIndex(user => user.id === id)

          if(index !== -1) {
            return users.splice(index, 1)[0];
          }
        }
      ```
  + Get room users
    * ```js
        function getRoomUsers(room) {
          return users.filter(user => user.room === room)
        };
      ```



### Addition
- When we use `socket.emit()` method in `server.js`, then we can use `socket.on()` method in `main.js`(represent the client) to receive the message sent by the `server.js`.
- Three ways to emit an event to client
  + `socket.emit()` => Emit an event to a single client
  + `socket.broadcast.emit()` => Emit an event to all of the clients except the client that's connecting
  + `io.emit()` => Emit an event to all the clients in general
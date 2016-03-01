import Test from './module-test';

var msgContainer = document.querySelector('.message-container');

var socket = io();

var input = document.querySelector('.input');
var btn = document.querySelector('.seng-msg');
btn.addEventListener('click', e => {
  var msgEl = document.createElement('p');
  msgEl.innerHTML = input.value;
  msgContainer.appendChild(msgEl);
  socket.emit('msg', {
    msg: input.value
  });
});

socket.on('connect', function() {
  socket.on('msg', function(data) {
    console.log('got msg: ' + data);
    var msgEl = document.createElement('p');
    msgEl.innerHTML = data.msg;
    msgContainer.appendChild(msgEl);
  });
});

// function update(delta) {
//
//   requestAnimationFrame(update);
// }
// requestAnimationFrame(update);
//
// window.addEventListener('DOMContentLoaded', e => {
//
// });

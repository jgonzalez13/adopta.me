import React from 'react';
import SendBird from 'sendbird';

//Import Styles
import './Chat.sass';

const Chat = () => {
  var sb = new SendBird({ appId: '011AEB3D-EB9D-4296-B166-6B27FEAA4596' });
  let userID = window.prompt('Ingresa un ID');
  sb.connect(userID, function(user, error) {
    if (error) {
      return;
    }
  });
  sb.OpenChannel.createChannel(function(openChannel, error) {
    if (error) {
      return;
    }
  });

  sb.OpenChannel.getChannel('http://localhost:3000/chat/15', function(
    openChannel,
    error
  ) {
    if (error) {
      return;
    }

    openChannel.enter(function(response, error) {
      if (error) {
        return;
      }
    });
  });

  openChannel.sendUserMessage('hola', 'data pos que', CUSTOM_TYPE, function(
    message,
    error
  ) {
    if (error) {
      return;
    }
  });

  return <div className="main-chat-container">hola</div>;
};

export default Chat;

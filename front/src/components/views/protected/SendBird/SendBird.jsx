import * as SendBird from 'sendbird';
// import { store } from '../index';
// * Actions
// import {
//   saveDataUserSendbird,
//   saveUsersPublic,
//   saveListChannel,
//   updateMessage,
//   userSendMessage
// } from '../shared/redux/actions/user.action';

class SendBirdProvider {
  constructor() {
    this.sb = new SendBird({ appId: '011AEB3D-EB9D-4296-B166-6B27FEAA4596' });
    this.dataUser = {};
    this.currentChannel = {};
  }

  connect(user) {
    return new Promise((res, rej) => {
      console.log(this.sb);
      this.sb.connect(user, (user, error) => {
        if (error) {
          console.error('Error connect', error);
          rej(false);
        } else {
          this.dataUser = user;
          // store.dispatch(saveDataUserSendbird(user));
          this.getUsersPublic();
          this.showListChannels();
          let response = this.enterChannel();
          console.log(response);
          res(response);
        }
      });
    });
  }

  async enterChannel() {
    return new Promise((res, rej) => {
      const sbIns = SendBird.getInstance();
      sbIns.OpenChannel.getChannel(
        'sendbird_open_channel_59505_d18c02f2a2bce6cd2fdd5a052ad073b5c5e21395',
        (channel, error) => {
          if (error) {
            console.error('Error when you tried to enter to channel', error);
          } else {
            console.log('Entraste', channel);
            res(channel);
            channel.enter((user, error) => {
              if (error) {
                console.error('error', error);
              } else {
                console.log('Register user :', user);
              }
            });
            this.currentChannel = channel;
            this.addHandlerChannel();
            this.loadPreviousMessages();
          }
        }
      );
    });
  }

  newChannelPublic() {
    const sbIns = SendBird.getInstance();
    sbIns.OpenChannel.createChannel(
      'Public',
      null,
      null,
      null,
      null,
      (channel, error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('channal', channel);
        }
      }
    );
  }

  showListChannels() {
    const sbIns = SendBird.getInstance();
    const list = sbIns.OpenChannel.createOpenChannelListQuery();

    list.next((channels, error) => {
      if (error) {
        console.error('List error', error);
      } else {
        // store.dispatch(saveListChannel(channels));
      }
    });
  }

  getUsersPublic() {
    const sbIns = SendBird.getInstance();
    const applicationUserListQuery = sbIns.createApplicationUserListQuery();
    applicationUserListQuery.next(function(users, error) {
      if (error) {
        console.error('List users error', error);
      } else {
        // store.dispatch(saveUsersPublic(users));
        console.log('users', users);
      }
    });
  }

  sendMessage(text) {
    const sbIns = SendBird.getInstance();
    const params = new sbIns.UserMessageParams();

    params.message = text;
    console.log(this.currentChannel);
    this.currentChannel.sendUserMessage(params, (message, error) => {
      if (error) {
        console.error('Error when send message', error);
        return false;
      } else {
        console.log('SE MANDÓ EL MENSAJE');
        return true;
      }
    });
  }

  addHandlerChannel() {
    return new Promise((res, rej) => {
      const sbIns = SendBird.getInstance();
      const ChannelHandler = new sbIns.ChannelHandler();

      ChannelHandler.onMessageReceived = (channel, message) => {
        console.log('Mensaje Recibido');
        res(message);
      };

      sbIns.addChannelHandler('Public', ChannelHandler);
    });
  }

  loadPreviousMessages() {
    return new Promise((res, rej) => {
      const messageListQuery = this.currentChannel.createPreviousMessageListQuery();

      messageListQuery.limit = 200;
      messageListQuery.reverse = true;

      messageListQuery.load((messageList, error) => {
        if (error) {
          console.error('Error when tried to load previous messages', error);
          rej(error);
        } else {
          console.log('Lista de mensajes', messageList);
          const arrayReverse = messageList.reverse();
          res(arrayReverse);
        }
      });
    });
  }
}

export default SendBirdProvider;

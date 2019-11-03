import * as SendBird from 'sendbird';
import { store } from '../index';
// * Actions
import {
  saveDataUserSendbird,
  saveUsersPublic,
  saveListChannel,
  updateMessage,
  userSendMessage
} from '../shared/redux/actions/user.action';

class Sendbird {
  constructor() {
    this.sb = new SendBird({ appId: '97E98951-669A-4DF6-BDEE-E50131689317' });
    this.dataUser = {};
    this.currentChannel = {};
  }

  connect(user) {
    console.log(this.sb);
    this.sb.connect(user, (user, error) => {
      if (error) {
        console.error('Error connect', error);
      } else {
        this.dataUser = user;
        store.dispatch(saveDataUserSendbird(user));
        this.getUsersPublic();
        this.enterChannel();
        this.showListChannels();
      }
    });
  }

  enterChannel() {
    const sbIns = SendBird.getInstance();
    sbIns.OpenChannel.getChannel(
      'sendbird_open_channel_53955_e069e98272e417e87c4f4997cf5ce02220695397',
      (channel, error) => {
        if (error) {
          console.error('Error when you tried to enter to channel', error);
        } else {
          console.log('Entraste', channel);
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
        store.dispatch(saveListChannel(channels));
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
        store.dispatch(saveUsersPublic(users));
        console.log('users', users);
      }
    });
  }

  sendMessage(text) {
    const sbIns = SendBird.getInstance();
    const params = new sbIns.UserMessageParams();

    params.message = text;

    this.currentChannel.sendUserMessage(params, (message, error) => {
      if (error) {
        console.error('Error when send message', error);
      } else {
        store.dispatch(userSendMessage(message));
      }
    });
  }

  addHandlerChannel() {
    const sbIns = SendBird.getInstance();
    const ChannelHandler = new sbIns.ChannelHandler();

    ChannelHandler.onMessageReceived = (channel, message) => {
      store.dispatch(userSendMessage(message));
    };

    sbIns.addChannelHandler('Public', ChannelHandler);
  }

  loadPreviousMessages() {
    const messageListQuery = this.currentChannel.createPreviousMessageListQuery();

    messageListQuery.limit = 10;
    messageListQuery.reverse = true;

    messageListQuery.load((messageList, error) => {
      if (error) {
        console.error('Error when tried to load previous messages', error);
      } else {
        console.log('Lista de mensajes', messageList);
        const arrayReverse = messageList.reverse();
        store.dispatch(updateMessage(arrayReverse));
      }
    });
  }
}

const sb = new Sendbird();

export default sb;

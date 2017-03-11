import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './message-entry.stache!steal-stache';
import encode from 'js-htmlencode';

export const ViewModel = DefineMap.extend({
  /**
   * @property {Object} message A message instance
   */
  message: {
    type: '*'
  },
  /**
   * @property {string} name A user name associated with a message (for display)
   */
  name: {
    get() {
      return encode(this.message.name);
    }
  },
  /**
   * @property {bool} isEditing Whether the message is in edit mode.
   * @returns {boolean}
   */
  isEditing: function () {
    return this.message === this.messagesEditing;
  },
  /**
   * @property {Object} messagesEditing The message in edit mode.
   */
  messagesEditing: {},
  /**
   * @property {string} body The body of the message (for display)
   */
  body: {
    get() {
      const message = this.message.message;
      const simpleImageDetector = /\.(gif|png|jpg|jpeg)$/;
      const isImage = message.match(simpleImageDetector);
      return isImage
        ? `<img src="${message}" />`
        : encode(message)

    }
  }
});

export default Component.extend({
  tag: 'ccsr-message-entry',
  viewModel: ViewModel,
  template
});

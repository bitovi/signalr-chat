import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './chat-input-form.stache!steal-stache';
import Message from 'ccsr/models/message';
import {KEY_ENTER} from 'ccsr/utils/event-constants';

export const ViewModel = DefineMap.extend({
  /**
   * @property {string} messageName The user name associated with a message
   */
  messageName: 'string',
  /**
   * @property {string} messageBody The body of the message
   */
  messageBody: 'string',
  /**
   * @property {bool} showRequireInputs Determines whether ot nor to show required data input message
   */
  showRequireInputs: {
    type: 'boolean',
    value: false
  },
  /**
   * @desc Adds a message to the list
   * @param event
   */
  addMessage(event) {
    event.preventDefault();
    this.showRequireInputs = false;
    if (this.messageBody && this.messageName) {
      new Message({
        name: this.messageName,
        message: this.messageBody
      }).save();
    } else {
      this.showRequireInputs = true;
    }
    this.messageBody = '';
  }
});

export default Component.extend({
  tag: 'ccsr-chat-input-form',
  viewModel: ViewModel,
  template
});

import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './dropdown.stache!steal-stache';

export const ViewModel = DefineMap.extend({
  /**
   * @property {Object} message The message.
   */
  message: {
    type: '*'
  },
  /**
   * @property {Object} messagesEditing The message being edited
   */
  messagesEditing: {},
  /**
   * @desc Deletes a message
   */
  deleteMessage() {
    this.message.destroy();
  },
  /**
   * @desc Puts a message in edit mode.
   */
  editMessage() {
    this.messagesEditing = this.message;
  }
});

export default Component.extend({
  tag: 'ccsr-dropdown',
  viewModel: ViewModel,
  template
});

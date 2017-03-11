import Component from "can-component";
import DefineMap from "can-define/map/";
import template from "./chat-messages.stache!steal-stache";
import Message from "ccsr/models/message";
import "can-define-stream";
import {KEY_ARROW_UP, KEY_ESCAPE} from "ccsr/utils/event-constants";

export const ViewModel = DefineMap.extend({
  /**
   * @property {DefineList} messages A list of messages.
   */
  messages: {
    get(lastSet, resolve) {
      this.messagesPromise.then(function (messages) {
        resolve(messages)
      });
    }
  },
  /**
   * @property {Promise} messagesPromise A promise that can resolve to a list of messages
   */
  messagesPromise: {
    value: function () {
      return Message.getList();
    }
  },
  /**
   * @property {number} messageCount The count of messages.
   */
  messageCount: {
    get() {
      return this.messages
        ? this.messages.length
        : 0;
    }
  },
  /**
   * @property {Message} messagesEditing The message that is being edited.
   */
  messagesEditing: Message,
  /**
   * @property {Stream} messageAdded Used to indicate to listeners when a message has been added.
   */
  messageAdded: {
    stream: function () {
      return this.stream(".messageCount").scan(last => {
        return last + 1;
      }, 0)
    }
  },
  /**
   * @desc Sets the editing message to the last message entered
   */
  editLast() {
    this.messagesEditing = this.messages[this.messages.length - 1];
  },
  /**
   * @desc Sets the editing message to an empty object
   */
  cancelEdit() {
    this.messagesEditing = {};
  }
});

export default Component.extend({
  tag: 'ccsr-chat-messages',
  viewModel: ViewModel,
  template,
  events: {
    /**
     * @desc Scroll message container to the bottom to show most recent message content.
     * @param messages
     */
    '{viewModel} messages': function isMessagesUpdated(messages) {
      const context = this;
      messages.messagesPromise.then(() => {
        const messageContainer = document.querySelector('.messages-container');
        context.viewModel.on("messageAdded", () => {
          messageContainer.scrollTop = messageContainer.scrollHeight
        });
      })
    },
    /**
     * @desc Handle key events: Up arrow edits last message. Escape closes edit mode.
     * @param element
     * @param event
     */
    '{document} keyup': function documentKeyUp(element, event) {
      switch (event.code) {
        case KEY_ARROW_UP:
          this.viewModel.editLast(event);
          break;
        case KEY_ESCAPE:
          this.viewModel.cancelEdit();
          break;
      }
    }
  }
});

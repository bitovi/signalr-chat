import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './chat-messages.stache!steal-stache';
import Message from 'ccsr/models/message';
import 'can-define-stream';
import {KEY_ARROW_UP, KEY_ESCAPE} from 'ccsr/utils/event-constants';

export const ViewModel = DefineMap.extend({
	messages: {
		get(lastSet, resolve) {
			this.messagesPromise.then(function (messages) {
				resolve(messages)
			});
		}
	},
  messagesPromise: {
    value: function () {
      return Message.getList();
    }
  },
	messageCount: {
		get() {
			return this.messages
				? this.messages.length
				: 0;
		}
	},
	messagesEditing: Message,
	messageAdded: {
		stream: function () {
			return this.stream(".messageCount").scan(last => {
				return last + 1;
			}, 0)
		}
	},
	/**
	 * @desc Scrolls the active element to its height (the bottom)
	 * @param activeElement
	 */
	scrollToBottom(activeElement) {
		activeElement.scrollTop = activeElement.scrollHeight;
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
		'{viewModel} messages': function isMessagesUpdated(messages) {
			const that = this;
			messages.messagesPromise.then(() => {
				const messageContainer = document.getElementById('fix-me');
				that.viewModel.on("messageAdded", () => {
					messageContainer.scrollTop = messageContainer.scrollHeight
				});
			})
		},
		'{document} keyup': function documentKeyUp(element, event) {
			switch (event.code) {
				case  KEY_ARROW_UP:
					this.viewModel.editLast(event);
					break;
				case KEY_ESCAPE:
					this.viewModel.cancelEdit();
					break;
			}
		}
	}
});

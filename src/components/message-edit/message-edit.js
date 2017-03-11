import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './message-edit.stache!steal-stache';
import {KEY_ENTER} from 'ccsr/utils/event-constants';

export const ViewModel = DefineMap.extend({
    /**
	 * @property {Object} message The message
     */
	message: {
		type: '*'
	},
    /**
	 * @property {Object} messagesEditing The message in edit mode.
     */
	messagesEditing: {},
	/**
	 * @desc Updates a message on pressing enter
	 * @param element
	 * @param event
	 */
	enterUpdateMessage(element, event){
		if (event.code === KEY_ENTER) {
			this.updateMessage(element);
		}
	},
	/**
	 * @desc Updates a message
	 * @param element
	 */
	updateMessage(element) {
		const message = this.message;
		message.message = element.value;
		message.save();
		this.messagesEditing = {}
	}
});

export default Component.extend({
	tag: 'ccsr-message-edit',
	viewModel: ViewModel,
	template,
	events: {
        /**
		 * @desc Places the focus in the input field of the message in edit mode.
         * @param element
         */
		inserted(element) {
			element.querySelector('input').focus();
		}
	}
});

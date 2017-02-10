import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './message-edit.stache!steal-stache';
import {KEY_ENTER} from 'ccsr/utils/event-constants';

export const ViewModel = DefineMap.extend({
	message: {
		type: '*'
	},
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
		inserted(element) {
			element.querySelector('input').focus();
		}
	}
});

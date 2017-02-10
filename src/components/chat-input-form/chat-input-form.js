import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './chat-input-form.stache!steal-stache';
import Message from 'ccsr/models/message';
import {KEY_ENTER} from 'ccsr/utils/event-constants';

export const ViewModel = DefineMap.extend({
	messageName: {
		type: 'string'
	},
	messageBody: {
		type: 'string'
	},
	showRequireInputs: {
		type: 'boolean',
		value: false
	},
	// TODO: Why do repeated entries of the same value cause the value of the messageBody field to remain ''?
	/**
	 * @desc Adds a message to the list
	 * @param event
	 */
	addMessage(event) {
		event.preventDefault();
		this.showRequireInputs = false;
		if(this.messageBody && this.messageName) {
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

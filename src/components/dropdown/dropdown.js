import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './dropdown.stache!steal-stache';

export const ViewModel = DefineMap.extend({
	message: {
		type: '*'
	},
	messagesEditing: {},
	/**
	 * @desc Deletes a message
	 */
	deleteMessage() {
		this.message.destroy();
	},
	/**
	 * @desc Edits a message
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

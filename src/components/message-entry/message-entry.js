import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './message-entry.stache!steal-stache';
import encode from 'js-htmlencode';

export const ViewModel = DefineMap.extend({
	message: {
		type: '*'
	},
	name: {
		get() {
			return encode(this.message.name);
		}
	},
	isEditing: function () {
		return this.message === this.messagesEditing;
	},
	messagesEditing: {},
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

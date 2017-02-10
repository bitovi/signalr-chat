import Component  from 'can-component';
import DefineMap  from 'can-define/map/';
import template from './inline-alert.stache!steal-stache';
import titleCase from 'title-case';

export const alertLevels = {
	DANGER: 'danger',
	WARNING: 'warning',
	SUCCESS: 'success',
	INFO: 'info',
	PRIMARY: 'primary'
};

export const ViewModel = DefineMap.extend({
	alertLevel: 'string',
	alertMessage: 'string'
});

export default Component.extend({
	tag: 'ccsr-inline-alert',
	viewModel: ViewModel,
	template,
	helpers: {
		/**
		 * @desc converts the priority to title case
		 */
		showAlertLevel() {
			return titleCase(this.alertLevel);
		}
	}
});

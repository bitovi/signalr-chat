import DefineMap from 'can-define/map/'
import template from './index.stache!steal-stache';
import can from 'can-util/namespace';
window.can = can;

const AppViewModel = DefineMap.extend({});

const appVm = new AppViewModel();
const frag = template(appVm);

document.body.appendChild(frag);
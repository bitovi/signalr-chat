import connect  from 'can-connect';
import dataParse  from 'can-connect/data/parse/';
import constructor  from 'can-connect/constructor/';
import constructorStore  from 'can-connect/constructor/store/';
import canMap  from 'can-connect/can/map/';
import dataCallbacks  from 'can-connect/data/callbacks/';
import realTime  from 'can-connect/real-time/';
import constructorCallbacksOnce  from 'can-connect/constructor/callbacks-once/';
import signalR  from 'can-connect-signalr';
import DefineMap  from 'can-define/map/';
import DefineList  from 'can-define/list/';

let Message = DefineMap.extend({
		name: {
			type: "string"
		},
		message: {
			type: "string"
		},
		id: {
			type: "number"
		}
});

Message.List = DefineList.extend({
	'#': Message
});


const behaviors = [
	dataParse,
	constructor,
	constructorStore,
	canMap,
	dataCallbacks,
	realTime,
	constructorCallbacksOnce,
	signalR
];

Message.connection = connect(behaviors, {
	Map: Message,
	List: Message.List,
	signalR: {
		url: 'http://signalrdonejs.azurewebsites.net',
		name: "Message"
	}
});

export default Message;

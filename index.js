var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;
	// super-constructor
	instance_skel.apply(this, arguments);
	self.actions(); // export actions
	return self;
}

instance.prototype.FADER_LEVELS = [];
instance.prototype.VARIABLES = [];
instance.prototype.FADER_TIMERS = [];

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;

	self.status(self.STATE_OK); // status ok!

	self.init_variables();
	self.init_presets();
};

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK); // status ok!
	debug = self.debug;
	log = self.log;

	self.init_variables();
	self.init_presets();
};

//init_variables: establish instance dynamic variables for button display and other purposes
instance.prototype.init_variables = function() {
	var self = this;

	var variables = [];
	
	for (let i = 1; i <= 8; i++) {
		variables.push({ name: 'channel_' + i + '_faderlevel', label: 'Channel ' + i + ' Fader Level'});
	}

	self.setVariableDefinitions(variables);
	self.VARIABLES = variables; //copies variable definitions for local instance use
};

instance.prototype.updateFaderVariable = function (type, ch, level) {
	var self = this;

	let variableName = type + '_' + ch + '_faderlevel';

	let found = false;

	for (let i = 0; i < self.VARIABLES.length; i++) {
		if (self.VARIABLES[i].name === variableName) {
			found = true;
			break;
		}
	}

	if (!found) {
		//add this variable to the list
		let variableObj = {};
		variableObj.name = variableName;
		variableObj.label = type + ' ' + ch + ' Fader Level';
		self.VARIABLES.push(variableObj);
		self.setVariableDefinitions(self.VARIABLES);
	}

	let faderVal = self.fader_val.find(({ id }) => id === level);

	if (faderVal && faderVal.label) {
		let variableValue = faderVal.label;

		self.setVariable(variableName, variableValue);
		self.VARIABLES[variableName] = variableValue;
	}
};

instance.prototype.init_presets = function () {
	var self = this;
	var presets = [];

	presets.push({
		category: 'Fader Level',
		label: 'Channel Fader +',
		bank: {
			style: 'text',
			text: 'Channel Fader +',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'channel_fad_increase_timer',
			options: {
				channel: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'channel_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Channel Fader -',
		bank: {
			style: 'text',
			text: 'Channel Fader -',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'channel_fad_decrease_timer',
			options: {
				channel: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'channel_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Main Fader +',
		bank: {
			style: 'text',
			text: 'Main Fader +',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'main_fad_increase_timer',
			options: {
				main: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'main_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Main Fader -',
		bank: {
			style: 'text',
			text: 'Main Fader -',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'main_fad_decrease_timer',
			options: {
				main: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'main_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Group Fader +',
		bank: {
			style: 'text',
			text: 'Group Fader +',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'group_fad_increase_timer',
			options: {
				group: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'group_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Group Fader -',
		bank: {
			style: 'text',
			text: 'Group Fader -',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'group_fad_decrease_timer',
			options: {
				group: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'group_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Monitor Fader +',
		bank: {
			style: 'text',
			text: 'Monitor Fader +',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'monitor_fad_increase_timer',
			options: {
				monitor: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'monitor_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	presets.push({
		category: 'Fader Level',
		label: 'Monitor Fader -',
		bank: {
			style: 'text',
			text: 'Monitor Fader -',
			size: '14',
			color: '16777215',
			bgcolor: self.rgb(0, 0, 0)
		},
		actions: [{
			action: 'monitor_fad_decrease_timer',
			options: {
				monitor: 1,
				rate: 500
			}
		}],
		release_actions: [{
			action: 'monitor_fad_stop',
			options: {
				channel: 1
			}
		}]
	});

	self.setPresetDefinitions(presets);
};


// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			tooltip: 'The IP of the Motu interface',
			width: 6,
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target port',
			tooltip: 'The port of the Motu interface',
			width: 6,
			default:'37297'

		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;

	for (let i = 0; i < self.FADER_TIMERS.length; i++) {
		clearInterval(self.FADER_TIMERS[i].timer);
	}

	self.FADER_TIMERS = [];

	debug('destroy', self.id);
};

instance.prototype.fader_val = [
		{ label: '- ∞',        id: '0.0' },
		{ label: '-60 dB',     id: '0.001' },
		{ label: '-55 dB',     id: '0.00178' },
		{ label: '-50 dB',     id: '0.00315' },
		{ label: '-45 dB',     id: '0.00562' },
		{ label: '-42 dB',     id: '0.00794' },
		{ label: '-40 dB',     id: '0.01' },
		{ label: '-39 dB',     id: '0.01122' },
		{ label: '-38 dB',     id: '0.01259' },
		{ label: '-37 dB',     id: '0.01412' },
		{ label: '-36 dB',     id: '0.01584' },
		{ label: '-35 dB',     id: '0.0178' },
		{ label: '-34 dB',     id: '0.01996' },
		{ label: '-33 dB',     id: '0.02239' },
		{ label: '-32 dB',     id: '0.02512' },
		{ label: '-31 dB',     id: '0.02818' },
		{ label: '-30 dB',     id: '0.0315' },
		{ label: '-29 dB',     id: '0.03548' },
		{ label: '-28 dB',     id: '0.03981' },
		{ label: '-27 dB',     id: '0.04467' },
		{ label: '-26 dB',     id: '0.05012' },
		{ label: '-25 dB',     id: '0.0562' },
		{ label: '-24 dB',     id: '0.06309' },
		{ label: '-23 dB',     id: '0.07079' },
		{ label: '-22 dB',     id: '0.07943' },
		{ label: '-21 dB',     id: '0.08913' },
		{ label: '-20 dB',     id: '0.1' },
		{ label: '-19 dB',     id: '0.11220' },
		{ label: '-18 dB',     id: '0.126' },
		{ label: '-17 dB',     id: '0.14125' },
		{ label: '-16 dB',     id: '0.15849' },
		{ label: '-15 dB',     id: '0.178' },
		{ label: '-14 dB',     id: '0.19953' },
		{ label: '-13 dB',     id: '0.22387' },
		{ label: '-12 dB',     id: '0.25' },
		{ label: '-11 dB',     id: '0.28184' },
		{ label: '-10 dB',     id: '0.31623' },
		{ label: '-9 dB',      id: '0.355' },
		{ label: '-8 dB',      id: '0.39811' },
		{ label: '-7 dB',      id: '0.44668' },
		{ label: '-6 dB',      id: '0.5' },
        	{ label: '-5 dB',      id: '0.56' },
        	{ label: '-4 dB',      id: '0.63' },        		
		{ label: '-3 dB',      id: '0.71' },
		{ label: '-3 dB',      id: '0.71' },
		{ label: '-2 dB',      id: '0.779' },
		{ label: '-1 dB',      id: '0.89' },
		{ label: '0 dB',       id: '1.0' },
		{ label: '+1 dB',      id: '1.12' },
		{ label: '+2 dB',      id: '1.26' },
		{ label: '+3 dB',      id: '1.42' },
		{ label: '+4 dB',      id: '1.59' },
		{ label: '+5 dB',      id: '1.77' },
		{ label: '+6 dB',      id: '2' },
		{ label: '+7 dB',      id: '2.2387' },
		{ label: '+8 dB',      id: '2.5118' },
		{ label: '+9 dB',      id: '2.83' },
		{ label: '+10 dB',     id: '3.1623' },
		{ label: '+11 dB',     id: '3.5481' },
		{ label: '+12 dB',     id: '4.0' }
];

instance.prototype.actions = function(system) {
	var self = this;
	self.setActions({

		'channel_mute':     {
			label:      'Set Channel mute',
			options: [
				{
				type:     'textinput',
				label:    'Channel Number',
				id:       'channel',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Mute / Unmute',
				id:       'mute',
				choices:  [ { id: '1', label: 'Mute' }, { id: '0', label: 'Unmute' } ]
				}
			]
		},
		'main_mute':     {
			label:      'Set Main mute',
			options: [
				{
				type:     'textinput',
				label:    'Main Number',
				id:       'main',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Mute / Unmute',
				id:       'mute',
				choices:  [ { id: '1', label: 'Mute' }, { id: '0', label: 'Unmute' } ]
				}
			]
		},
		'group_mute':     {
			label:      'Set Group mute',
			options: [
				{
				type:     'textinput',
				label:    'Group Number',
				id:       'group',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Mute / Unmute',
				id:       'mute',
				choices:  [ { id: '1', label: 'Mute' }, { id: '0', label: 'Unmute' } ]
				}
			]
		},
		'monitor_mute':     {
			label:      'Set monitor mute',
			options: [
				{
				type:     'textinput',
				label:    'Monitor Number',
				id:       'monitor',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Mute / Unmute',
				id:       'mute',
				choices:  [ { id: '1', label: 'Mute' }, { id: '0', label: 'Unmute' } ]
				}
			]
		},

		'channel_fad':     {
			label:      'Channel fader level',
			options: [
				{
				type:     'textinput',
				label:    'Channel Number',
				id:       'channel',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Fader Level',
				id:       'fad',
				choices:  self.fader_val
				}
			]
		},

		'main_fad':     {
			label:      'Main fader level',
			options: [
				{
				type:     'textinput',
				label:    'Main Number',
				id:       'main',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Fader Level',
				id:       'fad',
				choices:  self.fader_val
				}
			]
		},

		'group_fad':     {
			label:      'Group fader level',
			options: [
				{
				type:     'textinput',
				label:    'Group Number',
				id:       'group',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Fader Level',
				id:       'fad',
				choices:  self.fader_val
				}
			]
		},

		'monitor_fad':     {
			label:      'Monitor fader level',
			options: [
				{
				type:     'textinput',
				label:    'Monitor Number',
				id:       'monitor',
				default:  '1',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Fader Level',
				id:       'fad',
				choices:  self.fader_val
				}
			]
		},

		'channel_fad_increase':     {
			label:      'Increase Channel fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Channel Number',
				id:       'channel',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'channel_fad_increase_timer':     {
			label:      'Increase Channel Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Channel Number',
					id:       'channel',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'channel_fad_decrease':     {
			label:      'Decrease Channel fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Channel Number',
				id:       'channel',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'channel_fad_decrease_timer':     {
			label:      'Decrease Channel Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Channel Number',
					id:       'channel',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'channel_fad_stop': {
			label: 'Stop Increasing/Decreasing Channel Fader Level',
			options: [
				{
					type:     'textinput',
					label:    'Channel Number',
					id:       'channel',
					default:  '1',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'main_fad_increase':     {
			label:      'Increase Main fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Main Number',
				id:       'main',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'main_fad_increase_timer':     {
			label:      'Increase Main Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Main Number',
					id:       'main',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'main_fad_decrease':     {
			label:      'Decrease Main fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Main Number',
				id:       'main',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'main_fad_decrease_timer':     {
			label:      'Decrease Main Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Main Number',
					id:       'main',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'main_fad_stop': {
			label: 'Stop Increasing/Decreasing Main Fader Level',
			options: [
				{
					type:     'textinput',
					label:    'Main Number',
					id:       'main',
					default:  '1',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'group_fad_increase':     {
			label:      'Increase Group fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Group Number',
				id:       'group',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'group_fad_increase_timer':     {
			label:      'Increase Group Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Group Number',
					id:       'group',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'group_fad_decrease':     {
			label:      'Decrease Group fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Group Number',
				id:       'group',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'group_fad_decrease_timer':     {
			label:      'Decrease Group Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Group Number',
					id:       'group',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'group_fad_stop': {
			label: 'Stop Increasing/Decreasing Group Fader Level',
			options: [
				{
					type:     'textinput',
					label:    'Group Number',
					id:       'group',
					default:  '1',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'monitor_fad_increase':     {
			label:      'Increase Monitor fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Monitor Number',
				id:       'monitor',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'monitor_fad_increase_timer':     {
			label:      'Increase Monitor Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Monitor Number',
					id:       'monitor',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'monitor_fad_decrease':     {
			label:      'Decrease Monitor fader 1 level',
			options: [
				{
				type:     'textinput',
				label:    'Monitor Number',
				id:       'monitor',
				default:  '1',
				regex:    self.REGEX_NUMBER
				}
			]
		},

		'monitor_fad_decrease_timer':     {
			label:      'Decrease Monitor Fader Level Continuously',
			options: [
				{
					type:     'textinput',
					label:    'Monitor Number',
					id:       'monitor',
					default:  '1',
					regex:    self.REGEX_NUMBER
				},
				{
					type:     'textinput',
					label:    'Rate (in ms)',
					id:       'rate',
					default:  '500',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'monitor_fad_stop': {
			label: 'Stop Increasing/Decreasing Monitor Fader Level',
			options: [
				{
					type:     'textinput',
					label:    'Monitor Number',
					id:       'monitor',
					default:  '1',
					regex:    self.REGEX_NUMBER
				}
			]
		},

		'channel_solo':     {
			label:     'Set Solo on Channel',
			options: [
				{
				type:    'textinput',
				label:   'Channel Number',
				id:      'channel',
				default: '1',
				regex: self.REGEX_NUMBER
				},
				{
				type:    'dropdown',
				label:   'Solo On/Off',
				id:      'bol',
				choices: [ { id: '1', label: 'Solo On' }, { id: '0', label: 'Solo Off' } ]
				}
			]
		},

		'group_solo':     {
			label:     'Set Solo on Group',
			options: [
				{
				type:    'textinput',
				label:   'Group Number',
				id:      'group',
				default: '1',
				regex: self.REGEX_NUMBER
				},
				{
				type:    'dropdown',
				label:   'Solo On/Off',
				id:      'bol',
				choices: [ { id: '1', label: 'Solo On' }, { id: '0', label: 'Solo Off' } ]
				}
			]
		},
		'aux_send':     {
			label:      'Aux Send Levels',
			options: [
				{
				type:     'textinput',
				label:    'Channel Number',
				id:       'channel',
				default:  '1 ',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'textinput',
				label:    'Aux Number',
				id:       'aux',
				default:  '1 ',
				regex:    self.REGEX_NUMBER
				},
				{
				type:     'dropdown',
				label:    'Fader Level',
				id:       'fad',
				choices:  self.fader_val
				}
			]
		}

	});
}

instance.prototype.action = function(action) {
	var self = this;
	var cmd;
	var opt = action.options;

	switch (action.action){

		case 'channel_mute':
			var arg = {
				type: 'f',
				value: opt.mute
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/mute';
		break;

		case 'group_mute':
			var arg = {
				type: 'f',
				value: opt.mute
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/mute';
		break;

		case 'main_mute':
			var arg = {
				type: 'f',
				value: opt.mute
			};
			var ch = opt.main -1;
			cmd = '/mix/main/'+ ch +'/matrix/mute';
		break;

		case 'monitor_mute':
			var arg = {
				type: 'f',
				value: opt.mute
			};
			var ch = opt.monitor -1;
			cmd = '/mix/monitor/'+ ch +'/matrix/mute';
		break;

		case 'channel_fad':
			var arg = {
				type: 'f',
				value: parseFloat(opt.fad)
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/fader';
			self.setFaderLevel('channel', opt.channel, opt.fad);
		break;

		case 'main_fad':
			var arg = {
				type: 'f',
				value: parseFloat(opt.fad)
			};
			var ch = opt.main -1;
			cmd = '/mix/main/'+ ch +'/matrix/fader';
			self.setFaderLevel('main', opt.main, opt.fad);
		break;

		case 'group_fad':
			var arg = {
				type: 'f',
				value: parseFloat(opt.fad)
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/fader';
			self.setFaderLevel('group', opt.group, opt.fad);
		break;

		case 'monitor_fad':
			var arg = {
				type: 'f',
				value: parseFloat(opt.fad)
			};
			var ch = opt.monitor -1;
			cmd = '/mix/monitor/'+ ch +'/matrix/fader';
			self.setFaderLevel('monitor', opt.monitor, opt.fad);
		break;

		case 'channel_fad_increase':
			var ch = opt.channel -1;
			opt.fad = self.changeFaderLevel('channel', opt.channel, 'inc');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				cmd = '/mix/chan/'+ ch +'/matrix/fader';
				self.setFaderLevel('channel', opt.channel, opt.fad);
			}			
		break;

		case 'channel_fad_increase_timer':
			self.changeFaderLevelTimer('channel', opt.channel, 'inc', opt.rate);
		break;

		case 'channel_fad_decrease':
			var ch = opt.channel -1;
			opt.fad = self.changeFaderLevel('channel', opt.channel, 'dec');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				cmd = '/mix/chan/'+ ch +'/matrix/fader';
				self.setFaderLevel('channel', opt.channel, opt.fad);
			}			
		break;

		case 'channel_fad_decrease_timer':
			self.changeFaderLevelTimer('channel', opt.channel, 'dec', opt.rate);
		break;

		case 'channel_fad_stop':
			self.stopFaderLevelTimer('channel', opt.channel);
		break;

		case 'main_fad_increase':
			var ch = opt.main -1;
			opt.fad = self.changeFaderLevel('main', opt.main, 'inc');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				
				cmd = '/mix/main/'+ ch +'/matrix/fader';
				self.setFaderLevel('main', opt.main, opt.fad);
			}
		break;

		case 'main_fad_increase_timer':
			self.changeFaderLevelTimer('main', opt.main, 'inc', opt.rate);
		break;

		case 'main_fad_decrease':
			var ch = opt.main -1;
			opt.fad = self.changeFaderLevel('main', opt.main, 'dec');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				
				cmd = '/mix/main/'+ ch +'/matrix/fader';
				self.setFaderLevel('main', opt.main, opt.fad);
			}
		break;

		case 'main_fad_decrease_timer':
			self.changeFaderLevelTimer('main', opt.main, 'dec', opt.rate);
		break;

		case 'main_fad_stop':
			self.stopFaderLevelTimer('main', opt.main);
		break;

		case 'group_fad_increase':
			var ch = opt.group -1;
			opt.fad = self.changeFaderLevel('group', opt.group, 'inc');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};			
				cmd = '/mix/group/'+ ch +'/matrix/fader';
				self.setFaderLevel('group', opt.group, opt.fad);
			}
		break;

		case 'group_fad_increase_timer':
			self.changeFaderLevelTimer('group', opt.group, 'inc', opt.rate);
		break;

		case 'group_fad_decrease':
			var ch = opt.group -1;
			opt.fad = self.changeFaderLevel('group', opt.group, 'dec');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};			
				cmd = '/mix/group/'+ ch +'/matrix/fader';
				self.setFaderLevel('group', opt.group, opt.fad);
			}
		break;

		case 'group_fad_decrease_timer':
			self.changeFaderLevelTimer('group', opt.group, 'dec', opt.rate);
		break;

		case 'group_fad_stop':
			self.stopFaderLevelTimer('group', opt.group);
		break;

		case 'monitor_fad_increase':
			var ch = opt.monitor -1;
			opt.fad = self.changeFaderLevel('monitor', opt.monitor, 'inc');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				cmd = '/mix/monitor/'+ ch +'/matrix/fader';
				self.setFaderLevel('monitor', opt.monitor, opt.fad);
			}
		break;

		case 'monitor_fad_increase_timer':
			self.changeFaderLevelTimer('monitor', opt.monitor, 'inc', opt.rate);
		break;

		case 'monitor_fad_decrease':
			var ch = opt.monitor -1;
			opt.fad = self.changeFaderLevel('monitor', opt.monitor, 'dec');
			if (opt.fad !== null) {
				var arg = {
					type: 'f',
					value: parseFloat(opt.fad)
				};
				cmd = '/mix/monitor/'+ ch +'/matrix/fader';
				self.setFaderLevel('monitor', opt.monitor, opt.fad);
			}
		break;

		case 'monitor_fad_decrease_timer':
			self.changeFaderLevelTimer('monitor', opt.monitor, 'dec', opt.rate);
		break;

		case 'monitor_fad_stop':
			self.stopFaderLevelTimer('channel', opt.monitor);
		break;

		case 'channel_solo':
			var arg = {
				type: 'f',
				value: opt.bol
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/solo';
		break;

		case 'group_solo':
			var arg = {
				type: 'f',
				value: opt.bol
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/solo';
		break;

		case 'aux_send':
			var arg = {
				type: 'f',
				value: opt.fad
			};
			var ch = opt.channel -1;
			var send= opt.aux -1;
			cmd = '/mix/chan/'+ ch +'/matrix/aux/'+send+'/send';
		break;
	}

	if (cmd !== undefined && arg !== null)  {
		debug('sending',cmd,arg,'to',self.config.host);
		self.oscSend(self.config.host, self.config.port, cmd, [arg])
	}
	else if (cmd !== undefined && arg == null)  {
		debug('sending',cmd,'to',self.config.host);
		self.oscSend(self.config.host, self.config.port, cmd, [])
	}
};

instance.prototype.setFaderLevel = function(type, ch, level) {
	let self = this;

	let found = false;

	for (let i = 0; i < self.FADER_LEVELS.length; i++) {
		if (self.FADER_LEVELS[i].type === type) {
			if (self.FADER_LEVELS[i].ch === ch.toString()) {
				self.FADER_LEVELS[i].level = level;
				found = true;
				break;
			}
		}
	}

	if (!found) {
		let faderLevelObj = {};
		faderLevelObj.type = type;
		faderLevelObj.ch = ch.toString();
		faderLevelObj.level = level;
		self.FADER_LEVELS.push(faderLevelObj);
	}

	self.updateFaderVariable(type, ch, level);
};

instance.prototype.changeFaderLevel = function(type, ch, direction) {
	let self = this;

	try {
		let found = false;

		let currentLevel = null;
	
		for (let i = 0; i < self.FADER_LEVELS.length; i++) {
			if (self.FADER_LEVELS[i].type === type) {
				if (self.FADER_LEVELS[i].ch === ch.toString()) {
					found = true;
					currentLevel = self.FADER_LEVELS[i].level;
				}
			}
		}
	
		if (!found) {
			//we don't know the state of this particular channel fader, so throw an error
			self.log('error', `Fader level state for ${type}: Channel ${ch} unknown. Please set value manually first.`);
			self.stopFaderLevelTimer(type, ch);
			return null;
		}
		else {
			let faderIndex = null;
	
			for (let i = 0; i < self.fader_val.length; i++) {
				if (self.fader_val[i].id.toString() === currentLevel.toString()) {
					faderIndex = i;
					break;
				}
			}
	
			let newFaderIndex = faderIndex;

			if (direction === 'inc') {
				newFaderIndex++;
				if (newFaderIndex > self.fader_val.length - 1) {
					newFaderIndex = self.fader_val.length -1;
					self.stopFaderLevelTimer(type, ch);
				}
			}
			else {
				newFaderIndex--;
				if (newFaderIndex < 0) {
					newFaderIndex = 0;
					self.stopFaderLevelTimer(type, ch);
				}
			}
	
			return self.fader_val[newFaderIndex].id;
		}
	}
	catch(error) {
		self.log('error', `Error changing fader level: ${error}`);
		self.stopFaderLevelTimer(type, ch);
		return null;
	}
};

instance.prototype.changeFaderLevelTimer = function(type, ch, direction, rate) {
	let self = this;

	let timerObj = {};
	timerObj.type = type;
	timerObj.ch = ch.toString();
	timerObj.direction = direction;
	timerObj.rate = rate;

	let actionObj = {};
	actionObj.options = {};

	switch(type) {
		case 'channel':
			actionObj.action = 'channel_fad_';
			actionObj.options.channel = ch;
			break;
		case 'main':
			actionObj.action = 'channel_fad_';
			actionObj.options.main = ch;
			break;
		case 'group':
			actionObj.action = 'channel_fad_';
			actionObj.options.group = ch;
			break;
		case 'monitor':
			actionObj.action = 'channel_fad_';
			actionObj.options.monitor = ch;
			break;
	}

	if (direction === 'inc') {
		actionObj.action += 'increase';
	}
	else {
		actionObj.action += 'decrease';
	}

	timerObj.timer = setInterval(self.action.bind(self), rate, actionObj);

	self.FADER_TIMERS.push(timerObj);
};

instance.prototype.stopFaderLevelTimer = function(type, ch) {
	let self = this;

	for (let i = 0; i < self.FADER_TIMERS.length; i++) {
		if (self.FADER_TIMERS[i].type === type) {
			if (self.FADER_TIMERS[i].ch === ch.toString()) {
				clearInterval(self.FADER_TIMERS[i].timer);
				self.FADER_TIMERS.splice(i, 1);
				break;
			}
		}
	}
};

instance_skel.extendedBy(instance);
exports = module.exports = instance;

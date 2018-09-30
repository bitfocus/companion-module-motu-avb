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

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK); // status ok!
	debug = self.debug;
	log = self.log;
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
	debug("destory", self.id);;
};

instance.prototype.fader_val = [
		{ label: '- ∞',         id: '0.0' },
		{ label: '-50 dB: ',   id: '0.00315' },
		{ label: '-30 dB',     id: '0.0315' },
		{ label: '-20 dB',     id: '0.1' },
		{ label: '-18 dB',     id: '0.126' },
		{ label: '-15 dB',     id: '0.178' },
		{ label: '-12 dB',     id: '0.25' },
		{ label: '-9 dB',      id: '0.355' },
		{ label: '-6 dB',      id: '0.5' },
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
		{ label: '+9 dB',      id: '2.83' },
		{ label: '+12 dB',     id: '4.0' }
];



instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {

		'channel_mute':     {
			label:      'Set Channel mute',
			options: [
				{
				type:     'textinput',
				label:    'Channel number',
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
				label:    'Main number',
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
				label:    'Main number',
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
				label:    'Main number',
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
				label:    'Channel number)',
				id:       'channel',
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
		},

		'main_fad':     {
			label:      'Main fader level',
			options: [
				{
				type:     'textinput',
				label:    'Main number)',
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
				label:    'Main number)',
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
				label:    'Main number)',
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

		'channel_solo':     {
			label:     'Set Solo on Channel',
			options: [
				{
				type:    'textinput',
				label:   'Channel nr',
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
				label:   'Group nr',
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
	});
}

instance.prototype.action = function(action) {
	var self = this;
	var cmd
	var opt = action.options


	switch (action.action){


		case 'channel_mute':
			var arg = {
				type: "f",
				value: opt.mute
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/mute';
		break;

		case 'group_mute':
			var arg = {
				type: "f",
				value: opt.mute
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/mute';
		break;

		case 'main_mute':
			var arg = {
				type: "f",
				value: opt.mute
			};
			var ch = opt.main -1;
			cmd = '/mix/main/'+ ch +'/matrix/mute';
		break;

		case 'monitor_mute':
			var arg = {
				type: "f",
				value: opt.mute
			};
			var ch = opt.monitor -1;
			cmd = '/mix/monitor/'+ ch +'/matrix/mute';
		break;

		case 'channel_fad':
			var arg = {
				type: "f",
				value: parseFloat(opt.fad)
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/fader';
		break;

		case 'main_fad':
			var arg = {
				type: "f",
				value: parseFloat(opt.fad)
			};
			var ch = opt.main -1;
			cmd = '/mix/main/'+ ch +'/matrix/fader';
		break;

		case 'group_fad':
			var arg = {
				type: "f",
				value: parseFloat(opt.fad)
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/fader';
		break;

		case 'monitor_fad':
			var arg = {
				type: "f",
				value: parseFloat(opt.fad)
			};
			var ch = opt.monitor -1;
			cmd = '/mix/monitor/'+ ch +'/matrix/fader';
		break;

		case 'channel_solo':
			var arg = {
				type: "f",
				value: opt.bol
			};
			var ch = opt.channel -1;
			cmd = '/mix/chan/'+ ch +'/matrix/solo';
		break;

		case 'group_solo':
			var arg = {
				type: "f",
				value: opt.bol
			};
			var ch = opt.group -1;
			cmd = '/mix/group/'+ ch +'/matrix/solo';
		break;
	}


	if (cmd !== undefined && arg !== null)  {
		debug('sending',cmd,arg,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [arg])
	}
	else if (cmd !== undefined && arg == null)  {
		debug('sending',cmd,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [])
	}


};

instance_skel.extendedBy(instance);
exports = module.exports = instance;

const CordlrPlugin = require('cordlr-plugin')

module.exports = class Plugin extends CordlrPlugin {
  constructor (bot, config) {
    super (bot, config)

    this.name = '<%= pluginName %>'
    this.description = '<%= pluginDescription %>'

    this.commands = {
      'bot-command-one': {
        'usage': '<argument1> <argument2>',
        'function': 'commandOne',
        'description': 'Runs commandOne function',
        'permissions': []
      },
      'bot-command-two': {
        'usage': '',
        'function': 'commandTwo',
        'description': 'Runs commandTwo function',
        'permissions': []
      }
    }

    this.footer = this.embedFooter ('Cordlr Plugin: <%= pluginName %>')
    this.resolveConfiguration ()
  }

  resolveConfiguration () {
    if (!this.config['<%= pluginName %>']) {
      this.config['<%= pluginName %>'] = {}
    }
    this.roleConfig = this.config['<%= pluginName %>']
  }

  commandOne (message, args, flags) {
    if (!args[0])
      args[0] = 'Nothing'

    if (!args[1])
      args[1] = 'Nothing two'

    return this.sendEmbed(message, {
      title: '<%= pluginName %> Command One',
      description: args[0] + ' ' + args[1],
      url: '',
      footer: this.footer
    })
  }

  commandTwo (message, args, flags) {
    return this.sendEmbed(message, {
      title: 'Command Two',
      description: 'Nothing'
    })
  }
}

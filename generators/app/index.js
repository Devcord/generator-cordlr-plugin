'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(
      'Get your awesome ' + chalk.red('Cordlr Plugin') + ' in just a minute!'
    ));

    const prompts = [{
      type: 'input',
      name: 'pluginName',
      message: 'How do you want to call your plugin?',
      default: 'plugin',
      required: true
    }, {
      type: 'input',
      name: 'pluginDescription',
      message: 'Please enter a description for your plugin.',
      required: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.props.pluginName = 'cordlr-' + this.props.pluginName
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('plugin/**/*.*'),
      this.destinationPath(this.props.pluginName + '/'),
      this.props
    );
  }

  install() {
    process.chdir(process.cwd() + '/' + this.props.pluginName)
    this.npmInstall();
  }

  end() {
    this.spawnCommand('cd', ['./' + this.props.pluginName])
  }
};

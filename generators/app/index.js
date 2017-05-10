'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      { name: 'composeExtensionName', message: `What 's the name of your compose extension?`, default: 'sample' },
      { name: 'description', message: 'What will your compose extension do?', default: 'description' },
      { name: 'botId', message: 'What is the bot app Id from Microsoft Bot Framework?', default: 'botId' },
      { name: 'commandId', message: 'What is the Id of the command in your compose extension?', default: 'commandId' }
    ];
    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), {
      composeExtensionName: this.props.composeExtensionName,
      description: this.props.description
    });
    this.fs.copyTpl(this.templatePath('manifest.json'), this.destinationPath('manifest.json'),{
      composeExtensionName: this.props.composeExtensionName,
      description: this.props.description,
      botId: this.props.botId,
      commandId: this.props.commandId
    });
    this.fs.copy(this.templatePath('tsconfig.json'), this.destinationPath('tsconfig.json'));
    this.fs.copy(this.templatePath('_env'), this.destinationPath('.env'));
    this.fs.copyTpl(this.templatePath('app.ts'), this.destinationPath('app.ts'), {
      commandId: this.props.commandId
    });
    this.fs.copy(this.templatePath('_gitignore'), this.destinationPath('.gitignore'));
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      composeExtensionName: this.props.composeExtensionName, description: this.props.description
    });
  }

  install() {
    this.installDependencies();
  }
};

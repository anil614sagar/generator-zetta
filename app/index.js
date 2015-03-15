'use strict';

var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Your project name',
      default : this.appname // Default to current folder name
    }, function (props) {
      this.slugname = this._.slugify(props.name);
      this.safeSlugname = this.slugname.replace(/-+([a-zA-Z0-9])/g, function (g) {
        return g[1].toUpperCase();
      });

      done();
    }.bind(this));
  },

  askFor: function () {
    var cb = this.async();
    var prompts = [{
      name: 'description',
      message: 'Description',
      default: 'Zetta Server Application.'
    },  {
      name: 'version',
      message: 'Version',
      default: '0.1.0'
    },  {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }, {
      name: 'githubUsername',
      message: 'GitHub username'
    }, {
      name: 'authorName',
      message: 'Author\'s Name'
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email'
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage'
    }, {
      name: 'keywords',
      message: 'Key your keywords (comma to split)'
    }];

    this.prompt(prompts, function (props) {
      if(props.githubUsername){
        this.repoUrl = 'https://github.com/' + props.githubUsername + '/' + this.slugname;
      } else {
        this.repoUrl = 'user/repo';
      }

      this.keywords = props.keywords.split(',');
      this.props = props;

      cb();
    }.bind(this));
  },
  askZetta: function () {
    var cb = this.async();
    var prompts = [{
      name: 'serverName',
      message: 'Zetta Server Name',
      default: 'Firstname-Lastname'
    },  {
      name: 'serverPort',
      message: 'Zetta Server Runs on Port',
      default: 1337
    }];

    this.prompt(prompts, function (props) {
      this.zetta = props;
      cb();
    }.bind(this));
  },
  writing: {
    git: function () {
      this.copy('gitignore', '.gitignore');
    },
    packageJSON: function () {
      this.template('_package.json', 'package.json');
    },
    zetta: function () {
      this.template('_server.js', 'server.js');
    },
  },
  end: function () {
    this.installDependencies();
  }
});

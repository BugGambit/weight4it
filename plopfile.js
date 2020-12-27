module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'react component (eg. a button)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please (eg. CustomButton)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component.hbs',
      },
    ],
  });

  plop.setGenerator('container', {
    description: 'react container (eg. a page)',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'container name please (eg. LandingScreen)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/containers/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/container.hbs',
      },
    ],
  });
};

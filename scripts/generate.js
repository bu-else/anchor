'use strict';
const Generate = {
  Template: {
    name: 'Template',
    pluralName: 'Templates',
    schema: 'Joi.object().keys({\n' +
      '  _id: Joi.object(),\n' +
      '  name: Joi.string().required(),\n' +
      '  userId: Joi.boolean().required(),\n' +
      '  time: Joi.date().required()\n' +
    '});',
    payload: 'Joi.object().keys({\n' +
    '  name: Joi.string().required()\n' +
    '});',
    defaultValues: {
      time: 'new Date()'
    },
    indexes: '[\n' +
    '  { key: { name: 1 } },\n' +
    '  { key: { userId: 1 } }\n' +
    '];',
    user: true,
    exampleCreate: [
      'name',
      'userId'
    ],
    tableVars: 'user.username user.name name time',
    tableFields: 'username name time userId',
    tableHeaders: ['Username', 'Name', 'Template Name']
  }
};

module.exports = Generate;

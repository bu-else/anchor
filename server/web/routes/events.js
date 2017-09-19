'use strict';
const internals = {};
const Async = require('async');
const Config = require('../../../config');
const Event = require('../../models/event');

internals.applyRoutes = function (server, next) {

  server.route({
    method: 'GET',
    path: '/events',
    config: {
      auth: {
        strategy: 'session'
      }
    },
    handler: function (request, reply) {

      return reply.view('events/index', {
        user: request.auth.credentials.user,
        projectName: Config.get('/projectName')
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/events-name/{name}',
    config: {
      auth: {
        strategy: 'session'
      }
    },
    handler: function (request, reply) {

      Async.auto({
        names: function (callback) {

          Event.distinct('name',callback);
        },
        events: function (callback) {

          const fields = Event.fieldsAdapter('time');
          Event.find({ name: request.params.name },fields,callback);
        }
      },(err, results) => {

        if (err) {
          return reply(err);
        }

        results.events.sort((a, b) => {

          return parseFloat(a.time.getTime()) - parseFloat(b.time.getTime());
        });
        return reply.view('events/eventView', {
          user: request.auth.credentials.user,
          projectName: Config.get('/projectName'),
          eventName: request.params.name,
          eventData: results.events,
          events: results.names
        });
      });
    }
  });

  next();
};


exports.register = function (server, options, next) {

  server.dependency(['auth'], internals.applyRoutes);

  next();
};

exports.register.attributes = {
  name: 'eventList',
  dependencies: 'visionary'
};

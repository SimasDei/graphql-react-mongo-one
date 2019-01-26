const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingsResolver = require('./bookings');

rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingsResolver
};

module.exports = rootResolver;

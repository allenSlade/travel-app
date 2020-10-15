const today = require('./app.js');
const city = require('./app.js');
const performAction = require('./app.js');


test('city at console.log to be undefined', () => {
  expect(city).not.toBe('defined');
});

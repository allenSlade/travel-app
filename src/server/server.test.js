const app = require('./server.js') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

// app.get('/geoData', async (req, res) => {
//   res.json({message: 'pass!'})
// })


app.get('/geoData', async (req, res) => {
  function sendData (req, res) {
    res.send(projectData);
    console.log('Response sent', projectData)
  };
})


it('gets the test endpoint', async done => {
  const response = await request.get('/geoData')

  expect(response.status).toBe(200)
  done()
})

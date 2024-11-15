const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const bodyParser = require('body-parser');
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

module.exports = apiRouter;

apiRouter.use((req, res, next) => {
  // console.log(`${req.path} ${req.method}`)
  next()
})

apiRouter.param('minionId', (req, res, next, id) => {
  minion = db.getFromDatabaseById('minions', id)
  if (!minion) {
    res.status(404).send('Error: Minion Not Found')
  } else {
    req.minion = minion
    next()
  }
})

apiRouter.param('ideaId', (req, res, next, id) => {
  idea = db.getFromDatabaseById('ideas', id)
  if (!idea) {
    res.status(404).send('Error: Idea Not Found')
  } else {
    req.idea = idea
    next()
  }
})

// apiRouter.post('/ideas', checkMillionDollarIdea)
// apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea)

const checkMinion = (req, res, next) => {
  let { name, salary } = req.body
  req.body.salary = parseInt(salary)
  if (!name || req.body.salary == NaN) {
    res.status(400).send('Invalid Minion')
    // console.log('FAIL')
  } else {
    next()
    // console.log('SUCCESS')
  }
} 

apiRouter.get('/minions', (req, res, next) => {
  res.send(db.getAllFromDatabase('minions'))
})
apiRouter.get('/minions/:minionId', (req, res, next) => {
  res.send(req.minion)
})
apiRouter.post('/minions', checkMinion, (req, res, next) => {
  res.status(201).send(db.addToDatabase('minions', req.body))
})
apiRouter.put('/minions/:minionId', checkMinion, (req, res, next) => {
  res.status(200).send(db.updateInstanceInDatabase('minions', req.body))
})
apiRouter.delete('/minions/:minionId', (req, res, next) => {
  res.status(204).send(db.deleteFromDatabasebyId('minions', req.minion.id))
})

apiRouter.get('/ideas', (req, res, next) => {
  res.send(db.getAllFromDatabase('ideas'))
})
apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  res.send(req.idea)
})
apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {
  // console.log(req.body)
  req.body.numWeeks = parseInt(req.body.numWeeks)
  req.body.weeklyRevenue = parseInt(req.body.weeklyRevenue)
  res.status(201).send(db.addToDatabase('ideas', req.body))
})
apiRouter.put('/ideas/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  // console.log(req.body)
  req.body.numWeeks = parseInt(req.body.numWeeks)
  req.body.weeklyRevenue = parseInt(req.body.weeklyRevenue)
  res.send(db.updateInstanceInDatabase('ideas', req.body))
})
apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  res.status(204).send(db.deleteFromDatabasebyId('ideas', req.idea.id))
})
apiRouter.get('/meetings', (req, res, next) => {
  res.send(db.getAllFromDatabase('meetings'))
})
apiRouter.post('/meetings', (req, res, next) => {
  const meeting = db.createMeeting()
  // console.log(meeting)
  res.status(201).send(db.addToDatabase('meetings', meeting))
})
apiRouter.delete('/meetings', (req, res, next) => {
  res.status(204).send(db.deleteAllFromDatabase('meetings'))
})

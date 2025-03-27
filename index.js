require("dotenv").config()
const express = require('express')
const Score = require('./models/score')
const app = express()
//const mongoose = require("mongoose")

app.use(express.json())

const generateId = () => {
    const maxId = scores.length > 0
      ? Math.max(...scores.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
const scores = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get("/info", (request, response) => {
    response.send("Leaderboard ICT-päättötyön peliin")
})

app.get('/api/scores', (request, response) => {
  Score.find({}).then(scores => {
    response.json(scores)
  })
})


app.get('/api/scores/:id', (request, response) => {
    Score.findById(request.params.id).then(score => {
      response.json(score)
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: "wrong id"})
    })
  })

app.delete('/api/scores/:id', (request, response) => {
    Score.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
  
    .catch(error => {
      response.status(400).send({error: "operation failed"})
    }
    )

})

  app.post('/api/scores', (request, response) => {
    const body = request.body
  
    if (!body.username || !body.time) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
  const score = new Score({
      username: body.username,
      time: body.time,
      date: new Date().toString(),
      //id: generateId(),
    })
  
    score.save().then(savedScore => {
      response.json(savedScore)
    })
    .catch(error => {
      response.status(400).send({ error: "Validation Error"})
    })
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


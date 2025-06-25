require("dotenv").config()
const express = require('express')
const Score = require('./models/score')
const app = express()
const cors = require("cors")

app.use(cors())
//const mongoose = require("mongoose")

app.use(express.json())

const generateId = () => {
    const maxId = scores.length > 0
      ? Math.max(...scores.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
const scores = []
const apiKeyCode = process.env.apiKeyCode

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get("/info", (_request, response) => {
    response.send("Leaderboard ICT-päättötyön peliin")
})

app.get('/api/scores', (request, response) => {
    Score.find({}).then(scores => {
      response.json({scores : scores})
    })

})


app.get('/api/scores/:id', (request, response) => {

    Score.findById(request.params.id).then(score => {
      response.json({score : score})
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: "wrong id"})
    })
  
})

app.delete('/api/scores/:id', (request, response) => {
  if (request.body.keyCode === apiKeyCode) {
    Score.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
  
    .catch(error => {
      response.status(400).send({error: "operation failed"})
    }
    )
  } else {
    response.status(401).send({error: "missing keycode"})
  }
})

  app.post('/api/scores', (request, response) => {
    
    const body = request.body
    if (body.keyCode === apiKeyCode) {
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
    } else {
        return response.status(401).json({ 
          error: 'content missing (keyCode)' 
        })
    }
  })


  app.put('/api/scores/:id', (request, response) => {
  if (request.body.keyCode === apiKeyCode) {
    const { username, time} = request.body

    Score.findByIdAndUpdate(request.params.id,
      { username, time, date: new Date().toString() }
      //{ username, time, date},
      //{ time: request.params.time, data: new Date().toString(), runValidators: true, context: 'query' }
    )
      .then(updatedScore => {
        response.json(updatedScore)
      })
      .catch(error => response.status(400).send({ error: "Validation Error" + error.message}))
  } else {
      return response.status(401).json({ 
        error: 'content missing (keyCode)' 
      })
  }
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//package.json:
 //"build:ui": "rm -rf dist && cd ../frontend && npm run build && cp -r dist ../backend"
    //"build:ui": "rm -rf dist && npm run build && cp -r dist ../backend",
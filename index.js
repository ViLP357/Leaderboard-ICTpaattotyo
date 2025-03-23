const express = require('express')
const app = express()

app.use(express.json())

let scores = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]  
const generateId = () => {
    const maxId = scores.length > 0
      ? Math.max(...scores.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
app.get("/info", (request, response) => {
    response.send("Leaderboard ICT-päättötyön peliin")
})

app.get('/api/scores', (request, response) => {
  response.json(scores)
})

app.get('/api/scores/:id', (request, response) => {
    const id = request.params.id
    const score = scores.find(score => score.id === id)
    if (score) {
        response.json(score)
      } else {
        response.status(404).end()
      }
    response.json(score)
  })

app.delete('/api/scores/:id', (request, response) => {
    const id = request.params.id
    scores = scores.filter(score => score.id !== id)
  
    response.status(204).end()
})


  app.post('/api/scores', (request, response) => {
    const body = request.body
  
    if (!body.username || !body.time) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const score = {
      username: body.username,
      time: body.time,
      date: new Date().toString(),
      id: generateId(),
    }
  
    scores = scores.concat(score)
  
    response.json(score)
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
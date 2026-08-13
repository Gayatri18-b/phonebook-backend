const express = require('express')
const morgan = require('morgan')
const app = express()

// Middleware to parse incoming JSON data
app.use(express.json())

// Exercise 3.8: Define a custom morgan token to print the request body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Exercise 3.7 & 3.8: Use morgan with custom layout showing Method, Path, Status, Res-Time, and Body
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    id: "1",
    name: "Arto Hellas", 
    number: "040-123456"
  },
  { 
    id: "2",
    name: "Ada Lovelace", 
    number: "39-44-5323523"
  },
  { 
    id: "3",
    name: "Dan Abramov", 
    number: "12-43-234345"
  },
  { 
    id: "4",
    name: "Mary Poppendieck", 
    number: "39-23-6423122"
  }
]

// Exercise 3.1: GET all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.2: Info page
app.get('/info', (request, response) => {
  const count = persons.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
  `)
})

// Exercise 3.3: GET single person by ID
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Exercise 3.4: DELETE person by ID
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// Exercise 3.5: Random ID generator
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

// Exercise 3.5 & 3.6: POST a new person with error validation
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  const nameExists = persons.some(p => p.name.toLowerCase() === body.name.toLowerCase())
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  response.json(person)
})

// Catch-all middleware for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
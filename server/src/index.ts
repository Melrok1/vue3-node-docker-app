import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from './models/user.model'

dotenv.config()

const app = express()
const PORT = 3000

const {
  MONGO_USER,
  MONGO_PASS,
  MONGO_DB,
  MONGO_CLUSTER
} = process.env

const MONGO_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`

app.use(express.json()) 

mongoose.connect(MONGO_URI as string)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

// GET ------------
app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript + MongoDB Atlas!')
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find() // ← MongoDB čítanie
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
})

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id) // ← čítanie podľa ObjectId
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error })
  }
})

// POST ------------
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body

    const newUser = new User({ name, email })
    await newUser.save()

    res.status(201).json({ message: 'User created', user: newUser })
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error })
  }
})


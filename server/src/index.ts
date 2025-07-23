import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { User } from './models/user.model'
import { MongoServerError } from 'mongodb'

dotenv.config()

const app = express()
app.use(cors({
  origin: process.env.ORIGIN_LOCAL
}))
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
    const users = await User.find().sort({ createdAt: -1 }) // ← MongoDB čítanie
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
/*
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
*/

app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body
    const errors: Record<string, string> = {}

    // 1. Manuálna validácia (aby sme zachytili všetky chyby naraz)
    if (!name || name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters'
    } else if (name.trim().length > 20) {
      errors.name = 'Name cannot exceed 20 characters'
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format'
    }

    // 2. Duplicitné hodnoty (kontrola viacerých záznamov)
    const existingUsers = await User.find({ $or: [{ name }, { email }] })
    for (const user of existingUsers) {
      if (user.name === name) {
        errors.name = 'Name already exists'
      }
      if (user.email === email) {
        errors.email = 'Email already exists'
      }
    }

    // 3. Ak existujú chyby → return 400
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors })
    }

    // 4. Mongoose validácia (ako posledná ochrana pred zápisom)
    const newUser = new User({ name, email })
    await newUser.save()

    return res.status(201).json({ message: 'User created', user: newUser })

  } catch (err) {
    // 5. Mongoose chyby
    if (err instanceof mongoose.Error.ValidationError) {
      const errors: Record<string, string> = {}
      for (const key in err.errors) {
        if (Object.prototype.hasOwnProperty.call(err.errors, key)) {
          errors[key] = err.errors[key].message
        }
      }
      return res.status(400).json({ errors })
    }

    // 6. Neočakávaná chyba (z databázy, infra atď.)
    console.error('Unexpected error:', err)
    return res.status(500).json({ errors: { server: 'Unexpected server error' } })
  }
})
import express from 'express'

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello from Express + TypeScript!')
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

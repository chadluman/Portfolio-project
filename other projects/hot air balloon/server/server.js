import cors from 'cors'
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDirectory = path.join(__dirname, 'data')
const dataFile = path.join(dataDirectory, 'reservations.json')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

async function ensureDataFile() {
  await fs.mkdir(dataDirectory, { recursive: true })

  try {
    await fs.access(dataFile)
  } catch {
    await fs.writeFile(dataFile, '[]', 'utf8')
  }
}

async function readReservations() {
  await ensureDataFile()
  const raw = await fs.readFile(dataFile, 'utf8')
  return JSON.parse(raw)
}

async function writeReservations(reservations) {
  await ensureDataFile()
  await fs.writeFile(dataFile, JSON.stringify(reservations, null, 2), 'utf8')
}

function validateReservation(payload) {
  const requiredFields = ['reservationName', 'email', 'phone', 'date', 'time', 'partySize', 'experience']
  const missingField = requiredFields.find((field) => !String(payload[field] ?? '').trim())

  if (missingField) {
    return `${missingField} is required.`
  }

  return null
}

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/reservations', async (_request, response) => {
  try {
    const reservations = await readReservations()
    const sorted = [...reservations].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    response.json(sorted)
  } catch {
    response.status(500).json({ message: 'Unable to load reservations.' })
  }
})

app.post('/api/reservations', async (request, response) => {
  try {
    const error = validateReservation(request.body)
    if (error) {
      return response.status(400).json({ message: error })
    }

    const reservations = await readReservations()
    const newReservation = {
      id: `res_${Date.now()}`,
      reservationName: request.body.reservationName.trim(),
      email: request.body.email.trim(),
      phone: request.body.phone.trim(),
      date: request.body.date,
      time: request.body.time,
      partySize: Number(request.body.partySize),
      experience: request.body.experience,
      notes: String(request.body.notes ?? '').trim(),
      status: 'new',
      adminResponse: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    reservations.push(newReservation)
    await writeReservations(reservations)

    return response.status(201).json(newReservation)
  } catch {
    return response.status(500).json({ message: 'Unable to create reservation.' })
  }
})

app.patch('/api/reservations/:id/respond', async (request, response) => {
  try {
    const reservations = await readReservations()
    const reservationIndex = reservations.findIndex((item) => item.id === request.params.id)

    if (reservationIndex === -1) {
      return response.status(404).json({ message: 'Reservation not found.' })
    }

    const current = reservations[reservationIndex]
    const updatedReservation = {
      ...current,
      status: String(request.body.status || current.status),
      adminResponse: String(request.body.adminResponse ?? current.adminResponse),
      updatedAt: new Date().toISOString(),
    }

    reservations[reservationIndex] = updatedReservation
    await writeReservations(reservations)

    return response.json(updatedReservation)
  } catch {
    return response.status(500).json({ message: 'Unable to update reservation.' })
  }
})

app.listen(PORT, async () => {
  await ensureDataFile()
  console.log(`Reservation API running on http://localhost:${PORT}`)
})

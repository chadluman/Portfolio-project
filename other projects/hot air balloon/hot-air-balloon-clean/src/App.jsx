import { useCallback, useEffect, useMemo, useState } from 'react'

const experiences = [
  {
    title: 'Sunrise Signature Flight',
    price: '$249',
    description:
      'Drift over rolling hills at first light with a post-flight toast and enough golden-hour photos to make your social feed behave like it has standards.',
    perks: ['60-75 minute flight', 'Post-flight toast', 'Digital photo set'],
  },
  {
    title: 'Golden Hour Escape',
    price: '$279',
    description:
      'A sunset ride built for date nights, proposals, and people who want their memories filtered by actual sky magic instead of editing apps.',
    perks: ['Evening launch', 'Premium viewing basket', 'Couples add-on available'],
  },
  {
    title: 'Private Celebration Charter',
    price: '$899',
    description:
      'Reserve the whole balloon for birthdays, engagements, or any other occasion where staying on the ground feels weirdly insufficient.',
    perks: ['Private balloon', 'Custom banner option', 'Concierge planning'],
  },
]

const highlights = [
  'FAA-certified pilots and weather-first launch decisions',
  'Small-group baskets for a better view and calmer ride',
  'Photo-friendly launch field and recovery crew included',
  'Seasonal flights with flexible rescheduling options',
]

const steps = [
  {
    title: 'Reserve your flight',
    text: 'Choose a sunrise, sunset, or private experience and lock in a preferred date online.',
  },
  {
    title: 'Meet at launch field',
    text: 'Arrive early for a quick safety briefing, coffee, and the extremely theatrical balloon inflation process.',
  },
  {
    title: 'Lift into the skyline',
    text: 'Float above lakes, tree lines, and open country while your pilot narrates the route and conditions.',
  },
  {
    title: 'Celebrate the landing',
    text: 'Touch down, toast the flight, and head home with photos and a story people may finally care about.',
  },
]

const stats = [
  { value: '2,400+', label: 'guests flown' },
  { value: '4.9/5', label: 'average rating' },
  { value: '12', label: 'years flying' },
  { value: '100%', label: 'weather-checked launches' },
]

const testimonials = [
  {
    quote:
      'The sunrise flight felt unreal. Smooth takeoff, gorgeous views, and the crew made everything easy from check-in to landing.',
    name: '-Alicia R.',
  },
  {
    quote:
      'Booked the private charter to propose. They handled the timing, photos, and recovery so I could focus on not passing out.',
    name: '-Marcus T.',
  },
  {
    quote:
      'I expected it to be scenic. I did not expect it to be this peaceful. Easily one of the best experiences we have done.',
    name: '-Dana & Chris',
  },
]

const initialForm = {
  reservationName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  partySize: '2',
  experience: experiences[0].title,
  notes: '',
}

function BookingModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = useCallback(() => {
    setForm(initialForm)
    setStatus({ type: '', message: '' })
    setIsSubmitting(false)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') handleClose()
    }

    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleClose])

  if (!open) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit reservation.')
      }

      setStatus({
        type: 'success',
        message: 'Reservation request received. An admin can now review and respond from the site, because apparently efficiency won today.',
      })
      setForm(initialForm)
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something broke while sending the request.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close booking modal"
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative hidden min-h-full overflow-hidden bg-slate-900 lg:block">
            <img
              src="https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&fit=crop&w=1200&q=80"
              alt="Balloon preparing for launch"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/45 to-slate-950" />
            <div className="relative flex h-full flex-col justify-between p-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Flight booking</p>
                <h2 className="mt-4 text-3xl font-bold text-white">
                  Reserve a basket seat without emailing into the void.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Submit your preferred date, time, group size, and any special requests. Admins can review every request from the website dashboard and reply directly in the booking system.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white">What we collect</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>Reservation name and contact details</li>
                  <li>Preferred date and launch window</li>
                  <li>Party size and selected experience</li>
                  <li>Special requests or celebration notes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Book a flight</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Reservation request</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Reservation name">
                  <input
                    required
                    name="reservationName"
                    value={form.reservationName}
                    onChange={handleChange}
                    placeholder="Chad Luman"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Experience">
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className={inputClasses}
                  >
                    {experiences.map((experience) => (
                      <option key={experience.title} value={experience.title}>
                        {experience.title}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Email">
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="guest@example.com"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Phone number">
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-0142"
                    className={inputClasses}
                  />
                </FormField>
                <FormField label="Preferred date">
                  <input required type="date" name="date" value={form.date} onChange={handleChange} className={inputClasses} />
                </FormField>
                <FormField label="Preferred time">
                  <select name="time" value={form.time} onChange={handleChange} className={inputClasses} required>
                    <option value="">Select a time</option>
                    <option value="Sunrise | 6:00 AM">Sunrise | 6:00 AM</option>
                    <option value="Morning | 8:00 AM">Morning | 8:00 AM</option>
                    <option value="Golden Hour | 5:30 PM">Golden Hour | 5:30 PM</option>
                    <option value="Sunset | 6:45 PM">Sunset | 6:45 PM</option>
                  </select>
                </FormField>
                <FormField label="Party size">
                  <input
                    required
                    min="1"
                    max="12"
                    type="number"
                    name="partySize"
                    value={form.partySize}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </FormField>
                <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
                  Admin note workflow is enabled on the backend. Replies and status updates can be managed at <span className="font-semibold text-white">/admin</span> because apparently websites are expected to do things now.
                </div>
              </div>

              <FormField label="Special request notes">
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Accessibility needs, celebration details, proposal planning, scheduling notes, or other requests."
                  className={`${inputClasses} resize-none`}
                />
              </FormField>

              {status.message ? (
                <div
                  className={`rounded-3xl border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100'
                      : 'border-rose-400/25 bg-rose-400/10 text-rose-100'
                  }`}
                >
                  {status.message}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-400">Submitting this creates a reservation record for the admin dashboard.</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Send reservation request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">{label}</span>
      {children}
    </label>
  )
}

function AdminDashboard() {
  const [reservations, setReservations] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [statusValue, setStatusValue] = useState('new')
  const [loading, setLoading] = useState(true)
  const [banner, setBanner] = useState('')

  const selectedReservation = useMemo(
    () => reservations.find((reservation) => reservation.id === selectedId) ?? null,
    [reservations, selectedId],
  )

  const selectReservation = useCallback((reservation) => {
    if (!reservation) {
      setSelectedId(null)
      setReplyMessage('')
      setStatusValue('new')
      return
    }

    setSelectedId(reservation.id)
    setReplyMessage(reservation.adminResponse || '')
    setStatusValue(reservation.status || 'new')
  }, [])

  const loadReservations = async () => {
    setLoading(true)
    setBanner('')

    try {
      const response = await fetch('/api/reservations')
      const data = await response.json()
      const nextReservations = Array.isArray(data) ? data : []
      setReservations(nextReservations)

      const nextSelectedReservation =
        nextReservations.find((reservation) => reservation.id === selectedId) ?? nextReservations[0] ?? null

      selectReservation(nextSelectedReservation)
    } catch {
      setBanner('Could not load reservations. The dashboard is annoyed too.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true

    const initializeReservations = async () => {
      try {
        const response = await fetch('/api/reservations')
        const data = await response.json()

        if (!isActive) return

        const nextReservations = Array.isArray(data) ? data : []
        setReservations(nextReservations)
        selectReservation(nextReservations[0] ?? null)
      } catch {
        if (isActive) {
          setBanner('Could not load reservations. The dashboard is annoyed too.')
        }
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void initializeReservations()

    return () => {
      isActive = false
    }
  }, [selectReservation])

  const saveResponse = async () => {
    if (!selectedReservation) return

    try {
      const response = await fetch(`/api/reservations/${selectedReservation.id}/respond`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusValue, adminResponse: replyMessage }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save admin response.')
      }

      setReservations((current) =>
        current.map((reservation) =>
          reservation.id === selectedReservation.id ? data : reservation,
        ),
      )
      setBanner('Reservation updated. Humanity survives another round of admin work.')
    } catch (error) {
      setBanner(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">North Sky Ballooning</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">Admin reservation dashboard</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Review reservation submissions, update status, and send follow-up responses from the site instead of juggling inbox tabs like a caffeinated raccoon.
            </p>
          </div>
          <a href="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
            Back to website
          </a>
        </div>

        {banner ? (
          <div className="mt-6 rounded-3xl border border-sky-300/20 bg-sky-400/10 px-4 py-3 text-sm text-sky-100">{banner}</div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Incoming requests</h2>
              <button
                type="button"
                onClick={loadReservations}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                Refresh
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-slate-300">Loading reservations...</div>
              ) : reservations.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-slate-300">No reservations yet. Nature is healing.</div>
              ) : (
                reservations.map((reservation) => (
                  <button
                    key={reservation.id}
                    type="button"
                    onClick={() => selectReservation(reservation)}
                    className={`block w-full rounded-3xl border p-5 text-left transition ${
                      selectedId === reservation.id
                        ? 'border-sky-300/40 bg-sky-400/10'
                        : 'border-white/10 bg-slate-900/60 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{reservation.reservationName}</p>
                        <p className="mt-1 text-sm text-slate-300">{reservation.experience}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200">
                        {reservation.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                      <p>Date: {reservation.date || 'Not set'}</p>
                      <p>Time: {reservation.time || 'Not set'}</p>
                      <p>Party size: {reservation.partySize}</p>
                      <p>Submitted: {formatDateTime(reservation.createdAt)}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            {selectedReservation ? (
              <>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Reservation details</p>
                    <h2 className="mt-2 text-2xl font-bold text-white">{selectedReservation.reservationName}</h2>
                    <p className="mt-2 text-slate-300">{selectedReservation.experience}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
                    Submitted {formatDateTime(selectedReservation.createdAt)}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <AdminInfo label="Email" value={selectedReservation.email} />
                  <AdminInfo label="Phone" value={selectedReservation.phone} />
                  <AdminInfo label="Preferred date" value={selectedReservation.date} />
                  <AdminInfo label="Preferred time" value={selectedReservation.time} />
                  <AdminInfo label="Party size" value={String(selectedReservation.partySize)} />
                  <AdminInfo label="Current status" value={selectedReservation.status} />
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Special requests</p>
                  <p className="mt-3 whitespace-pre-wrap text-slate-200">{selectedReservation.notes || 'No additional notes.'}</p>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-[0.34fr_0.66fr]">
                  <FormField label="Update status">
                    <select value={statusValue} onChange={(event) => setStatusValue(event.target.value)} className={inputClasses}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </FormField>
                  <FormField label="Admin response">
                    <textarea
                      rows="6"
                      value={replyMessage}
                      onChange={(event) => setReplyMessage(event.target.value)}
                      className={`${inputClasses} resize-none`}
                      placeholder="Thanks for your request. We have availability on your selected date..."
                    />
                  </FormField>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={saveResponse}
                    className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
                  >
                    Save admin response
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-slate-300">
                Select a reservation to view details and respond.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

function AdminInfo({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-base text-white">{value || 'Not provided'}</p>
    </div>
  )
}

function MarketingSite() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <div className="bg-slate-950 text-white">
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(251,191,36,0.16),_transparent_25%),linear-gradient(180deg,_rgba(15,23,42,0.5),_rgba(2,6,23,0.95))]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8">
          <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
            <div>
              <span className="text-lg font-semibold tracking-wide text-white">North Sky Ballooning</span>
            </div>
            <div className="hidden gap-8 text-sm text-slate-200 md:flex">
              <a href="#experiences" className="transition hover:text-white">Experiences</a>
              <a href="#about" className="transition hover:text-white">About</a>
              <a href="#process" className="transition hover:text-white">How It Works</a>
              <a href="#reviews" className="transition hover:text-white">Reviews</a>
            </div>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              Book a Flight
            </button>
          </nav>

          <div className="grid items-center gap-14 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
            <div>
              <span className="inline-flex rounded-full border border-sky-300/20 bg-sky-400/10 px-4 py-1 text-sm font-medium text-sky-200">
                Scenic hot air balloon adventures
              </span>
              <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Quiet skies, wide views, and a booking flow that actually behaves like a business.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A full Tailwind remake of the hot air balloon concept with stronger branding, a polished reservation modal, and an admin-ready backend so bookings do more than sit there looking decorative.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#experiences"
                  className="rounded-full bg-white px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                  Explore Flights
                </a>
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Launch Booking Popup
                </button>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-sky-400/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur">
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80"
                  alt="Hot air balloon at sunrise"
                  className="h-[460px] w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/15 bg-slate-950/65 p-5 backdrop-blur">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Next Launch</p>
                      <p className="mt-2 text-xl font-semibold text-white">Sunrise Flight Experience</p>
                      <p className="mt-1 text-sm text-slate-300">Saturday • 6:10 AM • Limited spots available</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-center text-slate-950">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Starts at</p>
                      <p className="text-2xl font-bold">$249</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="experiences" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Experiences</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Choose the flight that matches your level of tasteful irresponsibility.
              </h2>
            </div>
            <p className="max-w-2xl text-slate-300">
              From calm sunrise drifts to private celebration charters, each experience now links naturally into a real booking workflow instead of the ancient ritual of vague contact forms.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article
                key={experience.title}
                className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">{experience.title}</h3>
                  <span className="rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-950">{experience.price}</span>
                </div>
                <p className="mt-5 text-slate-300">{experience.description}</p>
                <ul className="mt-6 space-y-3 text-sm text-slate-200">
                  {experience.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-sky-300" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="mt-8 inline-flex rounded-full border border-white/10 px-5 py-3 font-semibold text-white transition group-hover:bg-white group-hover:text-slate-950"
                >
                  Reserve this flight
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="border-y border-white/10 bg-white/5">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Why us</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Designed to feel calm, cinematic, and credible from the first scroll.
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Pilots are FAA-certified, launches are weather-first, and the customer journey now covers the part where people actually book. Small groups, flexible scheduling, and a real admin dashboard give the site some functional dignity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/10 text-xl text-sky-200">✦</div>
                  <p className="mt-4 text-base leading-7 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Four simple steps between you and a basket in the sky.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-slate-950">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Guest reviews</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  People had feelings about floating in the air. Shocking.
                </h2>
              </div>
              <p className="max-w-2xl text-slate-300">
                The views are memorable, the flights are smooth, and the reservation process no longer depends on crossing your fingers and waiting for an email reply from 2009.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <blockquote className="text-lg leading-8 text-slate-100">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                    {testimonial.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-sky-400/20 via-slate-900 to-amber-300/20 p-10 text-center shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ready to fly</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Open the splash booking form and let the site do its actual job.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
              Guests can submit their reservation details in the popup, and admins can review, update, and respond to every request from the website dashboard at /admin. Civilization advances one booking form at a time.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Book a Flight
              </button>
              <a
                href="/admin"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Open Admin Dashboard
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const inputClasses =
  'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-300/40 focus:bg-white/10'

function formatDateTime(value) {
  if (!value) return 'Unknown'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export default function App() {
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return <AdminDashboard />
  }

  return <MarketingSite />
}

export type Style = 'wedding' | 'portrait' | 'event' | 'fashion' | 'landscape'

export interface Photographer {
  id: string
  name: string
  email: string
  password: string
  city: string
  styles: Style[]
  priceRange: { min: number; max: number }
  rating: number
  reviewCount: number
  bio: string
  portfolio: { id: string; url: string; title: string }[]
  packages: {
    id: string
    name: string
    description: string
    price: number
    durationHours: number
  }[]
  availability?: string[]
}

export interface Client {
  id: string
  name: string
  email: string
  password: string
}

export interface Admin {
  id: string
  name: string
  email: string
  password: string
}

export interface Booking {
  id: string
  photographerId: string
  clientId: string
  packageId: string
  date: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  totalPrice: number
}

export interface Message {
  id: string
  bookingId: string
  from: 'client' | 'photographer'
  content: string
  timestamp: string
}

export interface Review {
  id: string
  bookingId: string
  photographerId: string
  clientId: string
  rating: number
  comment: string
  createdAt: string
}

export interface PaymentResult {
  id: string
  bookingId: string
  status: 'success' | 'failure'
  amount: number
  timestamp: string
}

export const photographers: Photographer[] = [
  {
    id: 'p1',
    name: 'Lena Carter',
    email: 'lena@picmatch.test',
    password: 'photo123',
    city: 'New York',
    styles: ['wedding', 'portrait'],
    priceRange: { min: 500, max: 2500 },
    rating: 4.8,
    reviewCount: 42,
    bio: 'Wedding and portrait photographer focused on natural light and candid emotions.',
    portfolio: [
      { id: 'pf1', url: 'https://picsum.photos/seed/p1a/600/400', title: 'Central Park Wedding' },
      { id: 'pf2', url: 'https://picsum.photos/seed/p1b/600/400', title: 'City Rooftop Session' },
    ],
    availability: ['2025-12-10', '2025-12-15', '2026-01-05'],
    packages: [
      {
        id: 'pkg1',
        name: 'Classic Wedding',
        description: '6 hours coverage, 300+ edited photos, online gallery.',
        price: 1500,
        durationHours: 6,
      },
      {
        id: 'pkg2',
        name: 'Engagement Portraits',
        description: '2 hours session, 50 edited photos, 2 locations.',
        price: 600,
        durationHours: 2,
      },
    ],
  },
  {
    id: 'p2',
    name: 'Marco Silva',
    email: 'marco@picmatch.test',
    password: 'photo123',
    city: 'Los Angeles',
    styles: ['fashion', 'event'],
    priceRange: { min: 400, max: 2000 },
    rating: 4.6,
    reviewCount: 31,
    bio: 'Fashion and event photographer with a cinematic style.',
    portfolio: [
      { id: 'pf3', url: 'https://picsum.photos/seed/p2a/600/400', title: 'Runway Show' },
      { id: 'pf4', url: 'https://picsum.photos/seed/p2b/600/400', title: 'Editorial Shoot' },
    ],
    packages: [
      {
        id: 'pkg3',
        name: 'Event Coverage',
        description: '4 hours coverage, highlights gallery delivered in 48h.',
        price: 1200,
        durationHours: 4,
      },
      {
        id: 'pkg4',
        name: 'Lookbook Session',
        description: 'Half-day studio session, 10 fully retouched images.',
        price: 900,
        durationHours: 4,
      },
    ],
  },
  {
    id: 'p3',
    name: 'Sara Nguyen',
    email: 'sara@picmatch.test',
    password: 'photo123',
    city: 'Chicago',
    styles: ['portrait', 'fashion'],
    priceRange: { min: 300, max: 1500 },
    rating: 4.9,
    reviewCount: 18,
    bio: 'Portrait and fashion photographer with a minimal, editorial look.',
    portfolio: [
      { id: 'pf5', url: 'https://picsum.photos/seed/p3a/600/400', title: 'Studio Portrait' },
      { id: 'pf6', url: 'https://picsum.photos/seed/p3b/600/400', title: 'Street Fashion' },
    ],
    packages: [
      {
        id: 'pkg5',
        name: 'Portrait Session',
        description: '1.5 hour session, 20 edited images, indoor or outdoor.',
        price: 450,
        durationHours: 1.5,
      },
      {
        id: 'pkg6',
        name: 'Lookbook Day',
        description: 'Full-day shoot for brands with up to 4 looks.',
        price: 1600,
        durationHours: 8,
      },
    ],
    availability: ['2026-01-12', '2026-01-20', '2026-02-10'],
  },
  {
    id: 'p4',
    name: 'Omar Haddad',
    email: 'omar@picmatch.test',
    password: 'photo123',
    city: 'Dubai',
    styles: ['event', 'wedding'],
    priceRange: { min: 700, max: 3000 },
    rating: 4.7,
    reviewCount: 27,
    bio: 'Event and wedding photographer capturing vibrant stories across the city.',
    portfolio: [
      { id: 'pf7', url: 'https://picsum.photos/seed/p4a/600/400', title: 'Destination Wedding' },
      { id: 'pf8', url: 'https://picsum.photos/seed/p4b/600/400', title: 'Corporate Gala' },
    ],
    packages: [
      {
        id: 'pkg7',
        name: 'Premium Wedding',
        description: '10 hours coverage, 500+ edited images, highlight slideshow.',
        price: 2800,
        durationHours: 10,
      },
      {
        id: 'pkg8',
        name: 'Corporate Event',
        description: '4 hours coverage, event highlights ready in 24h.',
        price: 1800,
        durationHours: 4,
      },
    ],
    availability: ['2025-12-30', '2026-01-08', '2026-01-22'],
  },
  {
    id: 'p5',
    name: 'Maya Rossi',
    email: 'maya@picmatch.test',
    password: 'photo123',
    city: 'Rome',
    styles: ['wedding', 'landscape'],
    priceRange: { min: 500, max: 2200 },
    rating: 4.5,
    reviewCount: 15,
    bio: 'Wedding and travel photographer in love with natural light and historic streets.',
    portfolio: [
      { id: 'pf9', url: 'https://picsum.photos/seed/p5a/600/400', title: 'Old Town Wedding' },
      { id: 'pf10', url: 'https://picsum.photos/seed/p5b/600/400', title: 'Sunset Over City' },
    ],
    packages: [
      {
        id: 'pkg9',
        name: 'Intimate Wedding',
        description: '5 hours coverage for small celebrations and elopements.',
        price: 1300,
        durationHours: 5,
      },
      {
        id: 'pkg10',
        name: 'Couple Session',
        description: '1 hour session in a scenic location, 30 edited photos.',
        price: 400,
        durationHours: 1,
      },
    ],
    availability: ['2026-02-05', '2026-02-18', '2026-03-01'],
  },
]

export const clients: Client[] = [
  { id: 'c1', name: 'Alice Johnson', email: 'alice@picmatch.test', password: 'client123' },
  { id: 'c2', name: 'David Kim', email: 'david@picmatch.test', password: 'client123' },
]

export const admins: Admin[] = [
  { id: 'a1', name: 'Site Admin', email: 'admin@picmatch.test', password: 'admin123' },
]

export const bookings: Booking[] = [
  {
    id: 'b1',
    photographerId: 'p1',
    clientId: 'c1',
    packageId: 'pkg1',
    date: '2025-12-10',
    status: 'confirmed',
    totalPrice: 1500,
  },
  {
    id: 'b2',
    photographerId: 'p2',
    clientId: 'c2',
    packageId: 'pkg3',
    date: '2025-12-20',
    status: 'pending',
    totalPrice: 1200,
  },
]

export const messages: Message[] = [
  {
    id: 'm1',
    bookingId: 'b1',
    from: 'client',
    content: 'Hi Lena! Excited for our wedding shoot. Do you have sample timelines?',
    timestamp: '2025-11-20T10:00:00Z',
  },
  {
    id: 'm2',
    bookingId: 'b1',
    from: 'photographer',
    content: 'Hi Alice! Absolutely, I can share a sample timeline later today.',
    timestamp: '2025-11-20T10:05:00Z',
  },
]

export const reviews: Review[] = [
  {
    id: 'r1',
    bookingId: 'b1',
    photographerId: 'p1',
    clientId: 'c1',
    rating: 5,
    comment: 'Amazing experience, beautiful photos and very professional!',
    createdAt: '2025-11-22T12:00:00Z',
  },
]

export const payments: PaymentResult[] = [
  {
    id: 'pay1',
    bookingId: 'b1',
    status: 'success',
    amount: 1500,
    timestamp: '2025-11-22T11:00:00Z',
  },
]

// Helpers for working with the in-memory data for this app.
export const mockStore = {
  photographers,
  clients,
  admins,
  bookings,
  messages,
  reviews,
  payments,
}

// Utility helpers for working with the in-memory data.

let bookingCounter = bookings.length + 1
let messageCounter = messages.length + 1
let reviewCounter = reviews.length + 1
let paymentCounter = payments.length + 1

export function createBooking(input: {
  photographerId: string
  clientId: string
  packageId: string
  date: string
  totalPrice: number
}): Booking {
  const booking: Booking = {
    id: `b${bookingCounter++}`,
    status: 'pending',
    ...input,
  }
  bookings.push(booking)
  return booking
}

export function addMessage(input: {
  bookingId: string
  from: Message['from']
  content: string
}): Message {
  const message: Message = {
    id: `m${messageCounter++}`,
    timestamp: new Date().toISOString(),
    ...input,
  }
  messages.push(message)
  return message
}

export function addReview(input: {
  bookingId: string
  photographerId: string
  clientId: string
  rating: number
  comment: string
}): Review {
  const review: Review = {
    id: `r${reviewCounter++}`,
    createdAt: new Date().toISOString(),
    ...input,
  }
  reviews.push(review)

  // Naively recompute rating and review count for the photographer in-memory.
  const photographer = photographers.find((p) => p.id === input.photographerId)
  if (photographer) {
    const photographerReviews = reviews.filter((r) => r.photographerId === photographer.id)
    const avg =
      photographerReviews.reduce((sum, r) => sum + r.rating, 0) /
      (photographerReviews.length || 1)
    photographer.rating = parseFloat(avg.toFixed(1))
    photographer.reviewCount = photographerReviews.length
  }

  return review
}

export function addPayment(input: {
  bookingId: string
  status: PaymentResult['status']
  amount: number
}): PaymentResult {
  const payment: PaymentResult = {
    id: `pay${paymentCounter++}`,
    timestamp: new Date().toISOString(),
    ...input,
  }
  payments.push(payment)
  const booking = bookings.find((b) => b.id === input.bookingId)
  if (booking && input.status === 'success') {
    booking.status = 'confirmed'
  }
  return payment
}




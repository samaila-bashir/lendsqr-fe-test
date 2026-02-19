import { describe, it, expect } from 'vitest'
import { formatDateJoined } from './userData'

describe('formatDateJoined', () => {
  it('formats date as "Mon D, YYYY H:MM AM/PM"', () => {
    const date = new Date(2024, 0, 15, 14, 30) // Jan 15, 2024, 2:30 PM
    expect(formatDateJoined(date)).toBe('Jan 15, 2024 2:30 PM')
  })
})

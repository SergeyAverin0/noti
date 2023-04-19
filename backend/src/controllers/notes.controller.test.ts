import request from 'supertest'
import { describe, expect, it } from '@jest/globals'

import app from '../app'

describe('GET /api/v1.0/notes', () => {
  it('should return 200 status', async () => {
    const res = await request(app).get('/api/v1.0/notes')
    expect(res.statusCode).toBe(200)
  })
})

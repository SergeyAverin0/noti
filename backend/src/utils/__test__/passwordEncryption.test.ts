import {
    describe,
    expect,
    it
  } from '@jest/globals'
  
  import { comparePassword, hashPassword } from '../passwordEncryption'
  
  describe('Note model', () => {
    it('should generate hashed password', async () => {
      const password = 'TestPassword';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).not.toBe(password)
    })

    it('should ', async () => {
        const password = 'TestPassword';
        const hashedPassword = await hashPassword(password);
        const isValidPassword = await comparePassword(password, hashedPassword);
  
        expect(isValidPassword).toBe(true)
    })
    
    it('should must check the similarity of the password and the hash', async () => {
        const password = 'TestPassword';
        const hashedPassword = await hashPassword(password);
        const isValidPassword = await comparePassword(password, hashedPassword);
  
        expect(isValidPassword).toBe(true)
    })

    it('should must check the distinction of the password and the hash', async () => {
        const password = 'TestPassword';
        const hashedPassword = await hashPassword(password);
        const isValidPassword = await comparePassword('fake password', hashedPassword);
  
        expect(isValidPassword).toBe(false)
    })
  })
  
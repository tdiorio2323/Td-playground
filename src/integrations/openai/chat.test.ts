import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getChatCompletion, streamChatCompletion } from './chat'

// Mock the openaiClient module
vi.mock('@/lib/openaiClient', () => ({
  openai: null,
  isOpenAIConfigured: vi.fn(() => false)
}))

describe('OpenAI Chat Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getChatCompletion', () => {
    it('should return null when OpenAI is not configured', async () => {
      const result = await getChatCompletion('test prompt')
      expect(result).toBeNull()
    })

    it('should warn when OpenAI is not configured', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn')
      
      await getChatCompletion('test prompt')
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'OpenAI is not configured. Please set VITE_OPENAI_API_KEY.'
      )
      
      consoleWarnSpy.mockRestore()
    })

    it('should accept system message parameter', async () => {
      const result = await getChatCompletion('test', 'custom system message')
      // Since OpenAI is not configured in tests, should return null
      expect(result).toBeNull()
    })
  })

  describe('streamChatCompletion', () => {
    it('should return early when OpenAI is not configured', async () => {
      const onChunk = vi.fn()
      
      await streamChatCompletion('test prompt', onChunk)
      
      expect(onChunk).not.toHaveBeenCalled()
    })

    it('should warn when OpenAI is not configured', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn')
      const onChunk = vi.fn()
      
      await streamChatCompletion('test prompt', onChunk)
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'OpenAI is not configured. Please set VITE_OPENAI_API_KEY.'
      )
      
      consoleWarnSpy.mockRestore()
    })

    it('should accept system message parameter', async () => {
      const onChunk = vi.fn()
      
      await streamChatCompletion('test', onChunk, 'custom system message')
      
      // Since OpenAI is not configured in tests, callback should not be called
      expect(onChunk).not.toHaveBeenCalled()
    })
  })
})

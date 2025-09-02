import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, FileText, Plus } from 'lucide-react'
import ApiClient from '../services/ApiClient'

function CardEditor({ deck }) {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [generatedCards, setGeneratedCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('ai') // 'ai' or 'manual'

  const generateCards = async () => {
    if (!text.trim()) return

    setLoading(true)
    try {
      const response = await ApiClient.post('/generate', {
        text: text,
        deck_id: deck.id
      })
      setGeneratedCards(response.data)
    } catch (error) {
      console.error('Failed to generate cards:', error)
      alert('Failed to generate cards. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addManualCard = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const response = await ApiClient.post('/cards', {
        question: formData.get('question'),
        answer: formData.get('answer'),
        deck_id: deck.id
      })
      
      setGeneratedCards([...generatedCards, response.data])
      e.target.reset()
    } catch (error) {
      console.error('Failed to add card:', error)
      alert('Failed to add card. Please try again.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{deck.title}</h1>
          <p className="text-gray-600 mb-8">{deck.description}</p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('ai')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                mode === 'ai'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Generate
            </button>
            <button
              onClick={() => setMode('manual')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                mode === 'manual'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Manual Add
            </button>
          </div>

          {mode === 'ai' ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your study material
                </label>
                <textarea
                  id="content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Paste your notes, textbook content, or any study material here. The AI will automatically generate flashcards from this content..."
                />
              </div>
              
              <button
                onClick={generateCards}
                disabled={loading || !text.trim()}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Cards...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Flashcards
                  </>
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={addManualCard} className="space-y-6">
              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter the question..."
                />
              </div>
              
              <div>
                <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                  Answer
                </label>
                <textarea
                  id="answer"
                  name="answer"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter the answer..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Card
              </button>
            </form>
          )}
        </div>

        {generatedCards.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Cards</h2>
            {generatedCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Question:</h3>
                    <p className="text-gray-700">{card.question}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Answer:</h3>
                    <p className="text-gray-700">{card.answer}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-6">
              <button
                onClick={() => navigate(`/deck/${deck.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View Deck
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardEditor
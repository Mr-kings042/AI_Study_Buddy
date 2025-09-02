import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Sparkles, FileText } from 'lucide-react'
import CardEditor from '../components/CardEditor'
import ApiClient from '../services/ApiClient'

function Create() {
  const navigate = useNavigate()
  const [deck, setDeck] = useState(null)
  const [step, setStep] = useState('deck') // 'deck' or 'content'
  const [loading, setLoading] = useState(false)

  const createDeck = async (deckData) => {
    setLoading(true)
    try {
      const response = await ApiClient.post('/decks', deckData)
      setDeck(response.data)
      setStep('content')
    } catch (error) {
      console.error('Failed to create deck:', error)
      alert('Failed to create deck. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeckSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    createDeck({
      title: formData.get('title'),
      description: formData.get('description')
    })
  }

  if (step === 'content' && deck) {
    return <CardEditor deck={deck} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-10 w-10 text-primary-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Create New Deck</h1>
            </div>
            <p className="text-gray-600">Start by giving your deck a name and description</p>
          </div>

          <form onSubmit={handleDeckSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Deck Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Biology Chapter 5"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Brief description of what this deck covers..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Create Deck
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Play, Plus, Edit, Trash2 } from 'lucide-react'
import ApiClient from '../services/ApiClient'

function Deck() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [deck, setDeck] = useState(null)
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDeck()
  }, [id])

  const loadDeck = async () => {
    try {
      const [deckResponse, cardsResponse] = await Promise.all([
        ApiClient.get(`/decks/${id}`),
        ApiClient.get(`/decks/${id}/cards`)
      ])
      setDeck(deckResponse.data)
      setCards(cardsResponse.data)
    } catch (error) {
      console.error('Failed to load deck:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{deck?.title}</h1>
              <p className="text-gray-600">{deck?.description}</p>
              <p className="text-sm text-gray-500 mt-2">{cards.length} cards</p>
            </div>
            
            <div className="flex gap-3 mt-4 sm:mt-0">
              <Link
                to={`/study/${id}`}
                className="flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <Play className="h-4 w-4 mr-2" />
                Study
              </Link>
              <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                <Plus className="h-4 w-4 mr-2" />
                Add Cards
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {cards.map((card, index) => (
            <div key={card.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Card {index + 1}</span>
                <div className="flex gap-2">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
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
          
          {cards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No cards yet. Add some cards to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Deck
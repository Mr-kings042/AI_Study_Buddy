import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, CheckCircle, XCircle } from 'lucide-react'
import CardView from '../components/CardView'
import ApiClient from '../services/ApiClient'

function Study() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sessionComplete, setSessionComplete] = useState(false)

  useEffect(() => {
    loadCards()
  }, [id])

  const loadCards = async () => {
    try {
      const response = await ApiClient.get(`/decks/${id}/cards`)
      setCards(response.data)
      if (response.data.length === 0) {
        setSessionComplete(true)
      }
    } catch (error) {
      console.error('Failed to load cards:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    } else {
      setSessionComplete(true)
    }
  }

  const handleDifficulty = async (difficulty) => {
    try {
      await ApiClient.post('/reviews', {
        card_id: cards[currentIndex].id,
        difficulty: difficulty
      })
      handleNext()
    } catch (error) {
      console.error('Failed to record review:', error)
      handleNext()
    }
  }

  const resetSession = () => {
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionComplete(false)
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

  if (sessionComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Session Complete!</h1>
            <p className="text-gray-600 mb-8">Great job! You've reviewed all cards in this deck.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetSession}
                className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Study Again
              </button>
              <button
                onClick={() => navigate(`/deck/${id}`)}
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Back to Deck
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentCard = cards[currentIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/deck/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Deck
        </button>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Card {currentIndex + 1} of {cards.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <CardView 
          card={currentCard}
          showAnswer={showAnswer}
          onReveal={() => setShowAnswer(true)}
          onDifficulty={handleDifficulty}
        />
      </div>
    </div>
  )
}

export default Study
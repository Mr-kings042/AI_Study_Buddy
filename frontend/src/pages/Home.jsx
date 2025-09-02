import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, BookOpen, Brain } from 'lucide-react'
import DeckList from '../components/DeckList'
import ApiClient from '../services/ApiClient'

function Home() {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDecks()
  }, [])

  const loadDecks = async () => {
    try {
      const response = await ApiClient.get('/decks')
      setDecks(response.data)
    } catch (error) {
      console.error('Failed to load decks:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Study Buddy</h1>
          </div>
          <p className="text-xl text-gray-600">
            Transform your notes into smart flashcards with AI
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/create"
            className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Deck
          </Link>
          
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>{decks.length} deck{decks.length !== 1 ? 's' : ''} total</span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <DeckList decks={decks} onUpdate={loadDecks} />
        )}
      </div>
    </div>
  )
}

export default Home
import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Play, Calendar, Trash2 } from 'lucide-react'

function DeckList({ decks, onUpdate }) {
  if (decks.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No decks yet</h3>
        <p className="text-gray-600 mb-6">Create your first deck to get started with AI-powered studying</p>
        <Link
          to="/create"
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Your First Deck
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <div key={deck.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{deck.title}</h3>
              <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            {deck.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{deck.description}</p>
            )}
            
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{deck.card_count} cards</span>
              <Calendar className="h-4 w-4 ml-4 mr-1" />
              <span>{new Date(deck.created_at).toLocaleDateString()}</span>
            </div>
            
            <div className="flex gap-2">
              <Link
                to={`/study/${deck.id}`}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Play className="h-4 w-4 mr-1" />
                Study
              </Link>
              <Link
                to={`/deck/${deck.id}`}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg transition-colors duration-200"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DeckList
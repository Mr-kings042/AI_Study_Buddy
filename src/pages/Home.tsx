import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, BookOpen, Brain, Sparkles } from 'lucide-react';

function Home() {
  const [decks] = useState([
    {
      id: 1,
      title: 'Biology Basics',
      description: 'Fundamental concepts in biology',
      card_count: 12,
      created_at: '2025-01-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'History Facts',
      description: 'Important historical events and dates',
      card_count: 8,
      created_at: '2025-01-02T00:00:00Z'
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AI Study Buddy</h1>
          </div>
          <p className="text-xl text-gray-600">
            Transform your notes into smart flashcards with AI
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link
            to="/create"
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Deck
          </Link>
          
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>{decks.length} deck{decks.length !== 1 ? 's' : ''} total</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div key={deck.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{deck.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{deck.description}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{deck.card_count} cards</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Study
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg transition-colors duration-200">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {decks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No decks yet</h3>
            <p className="text-gray-600 mb-6">Create your first deck to get started with AI-powered studying</p>
            <Link
              to="/create"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Deck
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
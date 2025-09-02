import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, Upload } from 'lucide-react';

function Create() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCards, setGeneratedCards] = useState([]);

  const handleGenerate = async () => {
    if (!text.trim() || !deckTitle.trim()) return;

    setLoading(true);
    
    // Simulate AI generation for demo
    setTimeout(() => {
      const sampleCards = [
        {
          id: 1,
          question: "What is the main concept discussed in the text?",
          answer: "The key concept from your input text"
        },
        {
          id: 2,
          question: "What are the important details mentioned?",
          answer: "Relevant details extracted from your content"
        }
      ];
      setGeneratedCards(sampleCards);
      setLoading(false);
    }, 2000);
  };

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

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-10 w-10 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Create New Deck</h1>
            </div>
            <p className="text-gray-600">Transform your study material into smart flashcards</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Deck Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Biology Chapter 5"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  id="description"
                  value={deckDescription}
                  onChange={(e) => setDeckDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Brief description..."
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Study Material
              </label>
              <textarea
                id="content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Paste your notes, textbook content, or any study material here. The AI will automatically generate flashcards from this content..."
              />
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={loading || !text.trim() || !deckTitle.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
        </div>

        {generatedCards.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Cards</h2>
            {generatedCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
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
                onClick={() => navigate('/')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Save Deck
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Create;
import React from 'react'
import { Eye, ThumbsUp, Meh, ThumbsDown } from 'lucide-react'

function CardView({ card, showAnswer, onReveal, onDifficulty }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="min-h-[300px] flex flex-col justify-between">
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{card.question}</h2>
          </div>

          {showAnswer ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-800 mb-2">Answer:</h3>
              <p className="text-green-700 text-lg">{card.answer}</p>
            </div>
          ) : (
            <div className="text-center mb-8">
              <button
                onClick={onReveal}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center mx-auto"
              >
                <Eye className="h-5 w-5 mr-2" />
                Reveal Answer
              </button>
            </div>
          )}
        </div>

        {showAnswer && (
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-600 mb-4">How difficult was this card?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => onDifficulty(1)}
                className="flex flex-col items-center bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <ThumbsUp className="h-6 w-6 mb-1" />
                <span className="text-xs">Easy</span>
              </button>
              <button
                onClick={() => onDifficulty(3)}
                className="flex flex-col items-center bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <Meh className="h-6 w-6 mb-1" />
                <span className="text-xs">Medium</span>
              </button>
              <button
                onClick={() => onDifficulty(5)}
                className="flex flex-col items-center bg-red-100 hover:bg-red-200 text-red-700 py-3 px-4 rounded-lg transition-colors duration-200"
              >
                <ThumbsDown className="h-6 w-6 mb-1" />
                <span className="text-xs">Hard</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardView
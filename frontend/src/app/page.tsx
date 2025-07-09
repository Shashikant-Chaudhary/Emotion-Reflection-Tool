'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<{ emotion: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/analyze', { text });
      setResult(response.data);
    } catch (err) {
      setError('Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          🧠 Emotion Reflection Tool
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
<textarea
  className="w-full bg-black text-white placeholder-gray-400 border border-gray-300 rounded-xl p-4 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none resize-none"
            placeholder="Write how you’re feeling today..."
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl hover:bg-purple-700 transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Submit'}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-center text-red-500 font-medium">{error}</div>
        )}

        {result && (
          <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 text-purple-900 p-4 rounded-xl shadow text-center">
<p className="text-lg font-medium">
  Detected Emotion:
  <span className="font-bold ml-1">
    {result.emotion}
    {result.emotion === 'Happy' && ' 😊'}
    {result.emotion === 'Sad' && ' 😢'}
    {result.emotion === 'Angry' && ' 😠'}
    {result.emotion === 'Anxious' && ' 😰'}
    {result.emotion === 'Excited' && ' 🤩'}
  </span>
</p>
            <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
          </div>
        )}
      </div>
    </main>
  );
}

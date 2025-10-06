'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import CodeEditor from '@/components/CodeEditor'
import { Sparkles, Code2, Database } from 'lucide-react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [projectName, setProjectName] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    try {
      // n8n webhook'a istek gÃ¶nder
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          projectName,
          userId: 'test-user'
        })
      })

      const data = await response.json()
      setGeneratedCode(data.code || '// Code will appear here')

      // Supabase'e kaydet
      await supabase.from('projects').insert({
        name: projectName,
        prompt,
        code: data.code,
        user_id: 'test-user',
        created_at: new Date().toISOString()
      })

    } catch (error) {
      console.error('Error:', error)
      setGeneratedCode('// Error generating code')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Kodari Test</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">AI Prompt</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="MyAwesomePlugin"
                  className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Describe your plugin
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Create a simple shop system with GUI..."
                  rows={10}
                  className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !prompt || !projectName}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Code
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-3 border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">0</div>
                <div className="text-xs text-purple-200">Projects</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-purple-500/20">
                <div className="text-2xl font-bold text-pink-400">0</div>
                <div className="text-xs text-purple-200">Tokens</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-purple-500/20">
                <div className="text-2xl font-bold text-blue-400">n8n</div>
                <div className="text-xs text-purple-200">Ready</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Generated Code</h2>
            </div>
            
            <CodeEditor code={generatedCode} />
          </div>
        </div>
      </div>
    </main>
  )
}

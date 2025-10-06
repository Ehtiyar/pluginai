'use client'

import Editor from '@monaco-editor/react'

export default function CodeEditor({ code }: { code: string }) {
  return (
    <div className="h-[600px] rounded-lg overflow-hidden border border-purple-500/30">
      <Editor
        height="100%"
        defaultLanguage="java"
        theme="vs-dark"
        value={code || '// Your generated code will appear here...'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

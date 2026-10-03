import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Braces, Binary, Link2, Fingerprint, Hash, Clock3, Regex, Copy,
  Check, ShieldCheck, Github, Sparkles, Search, Moon, Sun
} from 'lucide-react'
import './styles.css'

type ToolId = 'json' | 'base64' | 'url' | 'uuid' | 'hash' | 'timestamp' | 'regex'

const tools = [
  { id: 'json' as ToolId, name: 'JSON', description: 'Format and validate JSON', icon: Braces },
  { id: 'base64' as ToolId, name: 'Base64', description: 'Encode or decode Base64', icon: Binary },
  { id: 'url' as ToolId, name: 'URL', description: 'Encode or decode URLs', icon: Link2 },
  { id: 'uuid' as ToolId, name: 'UUID', description: 'Generate unique IDs', icon: Fingerprint },
  { id: 'hash' as ToolId, name: 'Hash', description: 'Generate SHA-256 hashes', icon: Hash },
  { id: 'timestamp' as ToolId, name: 'Timestamp', description: 'Convert Unix timestamps', icon: Clock3 },
  { id: 'regex' as ToolId, name: 'Regex', description: 'Test regular expressions', icon: Regex },
]

const examples: Record<ToolId, string> = {
  json: '{"name":"DevVault","features":["JSON","Base64"],"openSource":true}',
  base64: 'Hello, DevVault!',
  url: 'https://example.com/search?q=hello world&lang=en',
  uuid: '',
  hash: 'DevVault',
  timestamp: '',
  regex: 'The quick brown fox jumps over the lazy dog.',
}

function App() {
  const [active, setActive] = useState<ToolId>('json')
  const [input, setInput] = useState(examples.json)
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [dark, setDark] = useState(true)
  const [copied, setCopied] = useState(false)
  const [pattern, setPattern] = useState('fox')
  const [flags, setFlags] = useState('gi')
  const [search, setSearch] = useState('')

  const visibleTools = useMemo(() =>
    tools.filter(t => `${t.name} ${t.description}`.toLowerCase().includes(search.toLowerCase())),
    [search])

  const selectTool = (id: ToolId) => {
    setActive(id)
    setInput(examples[id])
    setOutput('')
    if (id === 'uuid') runUUID()
    if (id === 'timestamp') setInput(String(Math.floor(Date.now() / 1000)))
  }

  const run = async () => {
    try {
      if (active === 'json') {
        setOutput(JSON.stringify(JSON.parse(input), null, 2))
      } else if (active === 'base64') {
        setOutput(mode === 'encode'
          ? btoa(unescape(encodeURIComponent(input)))
          : decodeURIComponent(escape(atob(input))))
      } else if (active === 'url') {
        setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input))
      } else if (active === 'hash') {
        const data = new TextEncoder().encode(input)
        const digest = await crypto.subtle.digest('SHA-256', data)
        setOutput(Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join(''))
      } else if (active === 'timestamp') {
        const n = Number(input)
        if (!Number.isFinite(n)) throw new Error('Enter a valid Unix timestamp.')
        setOutput(new Date(n < 100000000000 ? n * 1000 : n).toISOString())
      } else if (active === 'regex') {
        const re = new RegExp(pattern, flags)
        const matches = [...input.matchAll(re)].map(m => m[0])
        setOutput(matches.length ? `Matched ${matches.length} time(s):\n\n${matches.join('\n')}` : 'No matches found.')
      }
    } catch (e) {
      setOutput(`Error: ${e instanceof Error ? e.message : 'Invalid input.'}`)
    }
  }

  function runUUID() {
    const id = crypto.randomUUID()
    setInput('')
    setOutput(id)
  }

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className={dark ? 'app dark' : 'app'}>
      <header className="topbar">
        <div className="brand"><div className="logo"><Sparkles size={19}/></div><span>DevVault</span></div>
        <div className="top-actions">
          <div className="privacy"><ShieldCheck size={16}/> Runs locally</div>
          <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
          <a className="github" href="https://github.com/feloony/devvault" target="_blank"><Github size={17}/> GitHub</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow">DEVELOPER TOOLBOX</div>
          <h1>Useful tools.<br/><span>Zero uploads.</span></h1>
          <p>DevVault is a collection of fast developer utilities designed to work entirely in your browser.</p>
        </section>

        <section className="workspace">
          <aside className="sidebar">
            <div className="search"><Search size={16}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tools..." /></div>
            <div className="tool-list">
              {visibleTools.map(t => {
                const Icon = t.icon
                return <button key={t.id} className={active === t.id ? 'tool active' : 'tool'} onClick={() => selectTool(t.id)}>
                  <span className="tool-icon"><Icon size={18}/></span><span><b>{t.name}</b><small>{t.description}</small></span>
                </button>
              })}
            </div>
          </aside>

          <section className="panel">
            <div className="panel-head">
              <div><h2>{tools.find(t => t.id === active)?.name} Tool</h2><p>{tools.find(t => t.id === active)?.description}</p></div>
              {['base64','url'].includes(active) && <div className="segmented"><button className={mode==='encode'?'selected':''} onClick={()=>setMode('encode')}>Encode</button><button className={mode==='decode'?'selected':''} onClick={()=>setMode('decode')}>Decode</button></div>}
            </div>

            {active === 'regex' && <div className="regex-controls"><label>Pattern<input value={pattern} onChange={e=>setPattern(e.target.value)} /></label><label>Flags<input value={flags} onChange={e=>setFlags(e.target.value)} /></label></div>}

            <div className="editors">
              <div className="editor"><div className="editor-title">INPUT</div><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter your input..." /></div>
              <div className="editor"><div className="editor-title">OUTPUT <button className="copy" onClick={copyOutput} disabled={!output}>{copied ? <Check size={14}/> : <Copy size={14}/>} {copied?'Copied':'Copy'}</button></div><pre>{output || 'Output will appear here...'}</pre></div>
            </div>

            <div className="actions">
              {active === 'uuid' ? <button className="primary" onClick={runUUID}>Generate UUID</button> : <button className="primary" onClick={run}>Run tool</button>}
              <button className="ghost" onClick={() => {setInput('');setOutput('')}}>Clear</button>
            </div>
          </section>
        </section>

        <footer><span>🔒 Your data stays in your browser.</span><span>Open source • MIT License</span></footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)

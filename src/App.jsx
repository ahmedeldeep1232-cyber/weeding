import { useEffect, useRef, useState } from 'react'
import { wedding as W } from './config/wedding.js'

const pad = (n) => String(n).padStart(2, '0')

// Convert a Cairo wall-clock time to a UTC timestamp (DST-safe, uses Intl).
function cairoToUtc({ year, month, day, time }, tz) {
  const [h, m] = time.split(':').map(Number)
  const guess = Date.UTC(year, month - 1, day, h, m)
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })
      .formatToParts(guess).map((x) => [x.type, x.value]))
  return guess - (Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute) - guess)
}
const TARGET = cairoToUtc(W.date, W.timeZone)

function useCountdown() {
  const calc = () => Math.max(0, TARGET - Date.now())
  const [ms, setMs] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setMs(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.floor(ms / 1000)
  return { done: ms === 0, v: [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60] }
}

function useMusic() {
  const player = useRef(null), want = useRef(false), audio = useRef(null)
  const [on, setOn] = useState(false)
  const { youtubeId: id, audioFile } = W.music
  useEffect(() => {
    if (!id) return
    const make = () => {
      player.current = new window.YT.Player('yt-player', {
        height: '1', width: '1', videoId: id,
        playerVars: { loop: 1, playlist: id, playsinline: 1, controls: 0 },
        events: { onReady: () => want.current && player.current.playVideo() },
      })
    }
    if (window.YT?.Player) make()
    else {
      const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(s); window.onYouTubeIframeAPIReady = make
    }
    return () => player.current?.destroy?.()
  }, [id])
  const set = (v) => {
    want.current = v; setOn(v)
    if (id) { const p = player.current; if (p?.playVideo) v ? p.playVideo() : p.pauseVideo() }
    else if (audioFile) {
      audio.current ||= Object.assign(new Audio(audioFile), { loop: true })
      v ? audio.current.play().catch(() => {}) : audio.current.pause()
    }
  }
  return [on, set, !!(id || audioFile)]
}

const Flower = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <g fill="#fffdf8" stroke="#b8975a" strokeWidth="1.2">
      {[0, 72, 144, 216, 288].map((r) => <ellipse key={r} cx="50" cy="26" rx="13" ry="22" transform={`rotate(${r} 50 50)`} />)}
    </g>
    <circle cx="50" cy="50" r="8" fill="#d9bf86" stroke="#b8975a" />
  </svg>
)

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || W.defaultLang)
  const [phase, setPhase] = useState('closed') // closed | opening | open
  const [music, setMusic, hasMusic] = useMusic()
  const { done, v } = useCountdown()
  const t = W[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  const open = () => {
    setPhase('opening'); if (hasMusic) setMusic(true) // user gesture → music allowed
    setTimeout(() => setPhase('open'), 1400)
  }

  return (
    <>
      <div className="yt" aria-hidden="true"><div id="yt-player" /></div>

      <div className="topbar">
        <div className="lang" role="group" aria-label="Language">
          <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
          <span>|</span>
          <button className={lang === 'ar' ? 'on' : ''} onClick={() => setLang('ar')} aria-pressed={lang === 'ar'}>العربية</button>
        </div>
        {hasMusic && phase !== 'closed' && (
          <button className="music" onClick={() => setMusic(!music)} aria-label={music ? t.pause : t.play}>
            {music ? '❚❚' : '♪'}
          </button>
        )}
      </div>

      {phase !== 'open' && (
        <div className={`cover ${phase}`}>
          <div className="flap top" /><div className="flap bottom" />
          <div className="cover-content">
            <Flower className="flower sm" />
            <h1 className="names">{t.names[0]}<span className="amp">&amp;</span>{t.names[1]}</h1>
            <p className="sub">{t.subtitle}</p>
            <button className="btn" onClick={open} disabled={phase !== 'closed'}>{t.open}</button>
          </div>
        </div>
      )}

      <main className={phase === 'closed' ? 'hidden' : 'reveal'}>
        <section className="hero">
          <Flower className="flower tl" /><Flower className="flower br" />
          <p className="kicker">{t.kicker}</p>
          <h2 className="names big">{t.names[0]}<span className="amp">&amp;</span>{t.names[1]}</h2>
          <p className="date">{t.date}</p>
        </section>

        <section className="photo">
          <div className="arch"><img src={W.photo} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = 'none')} /></div>
          <p className="message">{t.message}</p>
        </section>

        <section className="count">
          <h3>{t.countdown}</h3>
          {done ? <p className="message">{t.done}</p> : (
            <div className="grid" role="timer" aria-live="off">
              {v.map((n, i) => <div key={i}><b>{pad(n)}</b><small>{t.units[i]}</small></div>)}
            </div>
          )}
        </section>

        {W.venue && (
          <section className="venue">
            <h3>{t.venueTitle}</h3><p>{W.venue[lang]}</p>
            {W.venue.mapUrl && <a className="btn" href={W.venue.mapUrl} target="_blank" rel="noreferrer">{t.map}</a>}
          </section>
        )}
        <footer>{t.footer}</footer>
      </main>
    </>
  )
}

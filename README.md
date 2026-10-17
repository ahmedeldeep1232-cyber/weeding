# Adham & Nagham — Wedding Invitation (React + Vite)
Bilingual (EN/AR, RTL), opening animation, live countdown (Africa/Cairo), background music, Netlify-ready.

## Run
    npm install
    npm run dev       # local
    npm run build     # production build -> dist/
    npm run preview

## Customize — everything is in `src/config/wedding.js`
- Names, date text, messages (EN + AR), labels.
- `date.time` is a **default placeholder (18:00 Cairo)** used only by the countdown. Change it when the ceremony time is confirmed.
- `photo`: replace `public/images/couple.jpg`.
- `venue`: set `{ en, ar, mapUrl }` to show a venue section; `null` keeps it hidden.
- `music.youtubeId`: YouTube video ID (plays only after "Open Invitation" click; play/pause button shown). Or leave empty and set `audioFile` to a file in `public/audio/`.
  Make sure you have the rights to use the song publicly.

## Deploy to Netlify
Push to Git and import the repo in Netlify (build `npm run build`, publish `dist`, already set in `netlify.toml`, with SPA redirect) — or drag the `dist` folder into Netlify Drop.
Set `og:image` in `index.html` to your full site URL after deploying so social previews work everywhere.

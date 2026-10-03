# DevVault 🧰

A fast, privacy-first developer toolbox built for everyday tasks and designed to run locally in your browser.

## ✨ Included Tools

| Tool | Purpose |
| --- | --- |
| 🧩 JSON | Format and validate JSON |
| 🔐 Base64 | Encode and decode Base64 |
| 🔗 URL | Encode and decode URLs |
| 🆔 UUID | Generate UUIDs |
| #️⃣ Hash | Generate SHA-256 hashes |
| 🕐 Timestamp | Convert Unix timestamps |
| 🔎 Regex | Test regular expressions |

## 🔒 Privacy First

DevVault follows a local-first approach: built-in utilities process input in the browser and do not require an application backend.

Always review the implementation before using any tool with highly sensitive information.

## 🚀 Getting Started

Requirements:

- Node.js 18+
- npm

```bash
git clone https://github.com/feloony/devvault.git
cd devvault
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Lucide React
- Modern CSS
- Browser Web Crypto API

## 🗺️ Roadmap

- [ ] JWT decoder
- [ ] Color converter
- [ ] Cron expression helper
- [ ] Markdown previewer
- [ ] Open Graph previewer
- [ ] JSON → TypeScript converter
- [ ] YAML formatter
- [ ] SQL formatter
- [ ] HTTP status lookup
- [ ] PWA/offline support
- [ ] Keyboard shortcuts
- [ ] Shareable configurations

Have an idea? Open an issue.

## 🤝 Contributing

Fork the repository, create a feature branch, make your change, run the production build, and open a pull request with a clear description.

```bash
git checkout -b feature/my-feature
npm run build
git commit -m "feat: describe your change"
git push origin feature/my-feature
```

## 🌐 Deployment

DevVault can be deployed as a static frontend to GitHub Pages, Vercel, Netlify, Cloudflare Pages, or similar platforms.

## 📄 License

MIT License. See [`LICENSE`](LICENSE).

⭐ If DevVault saves you time, consider starring the repository.

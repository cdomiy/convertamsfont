# ConvertAMSFont.com

Free Online AMS Font Converter - Convert Unicode Devanagari to AMS font encoding instantly.

## Tech Stack
- Static HTML/CSS/JS (no framework)
- Cloudflare Pages hosting
- GitHub Actions CI/CD

## Features
- Unicode → AMS font encoding conversion
- English → Devanagari transliteration (Google Input Tools)
- TTF & OTF font mode support
- Hindi + English bilingual (with hreflang)
- 100% client-side (no server processing)
- SoftwareApplication + HowTo structured data

## Development
```bash
# Local preview
cd public && python3 -m http.server 8080

# Deploy
git push origin main
```

## License
Converter engine code: MIT
AMS font files: NOT included in production (users must have their own font license)

# EN-Ran - English Vocabulary Learning App

A modern vocabulary learning application built with Vite, React, TypeScript, Tailwind CSS 4, and shadcn/ui components.

## Features

- 🎲 Random English word fetcher from WordsAPI
- 📅 Daily word tracking with automatic refresh
- 📚 Complete word details including:
  - Definitions with part of speech
  - Pronunciation
  - Syllable breakdown
  - Synonyms and antonyms
  - Usage examples
  - Word frequency
- 💾 Learning history with localStorage persistence
- ✅ Mark words as "known" or save as "new"
- 🎨 Beautiful gradient UI with Tailwind CSS 4
- 📱 Responsive design

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- RapidAPI account with WordsAPI subscription

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SanekxArcs/EN-Ran.git
cd EN-Ran
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your RapidAPI key to `.env`:
```
VITE_RAPIDAPI_KEY=your_actual_api_key_here
```

To get an API key:
- Go to [WordsAPI on RapidAPI](https://rapidapi.com/dpventures/api/wordsapi/)
- Sign up/Login to RapidAPI
- Subscribe to a plan (free tier available)
- Copy your API key

### Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Note:** Without a valid API key, the app will show an error. You can:
1. Get a free API key from [WordsAPI on RapidAPI](https://rapidapi.com/dpventures/api/wordsapi/)
2. Or use the mock data mode for testing (see below)

#### Testing without API Key

To test the app functionality without an API key, you can temporarily modify `src/data-layer/api-client.ts` to return mock data:

```typescript
import { mockWordData, mockWordData2 } from './mock-data'

export const grabRandomTerm = async (): Promise<VocabEntry> => {
  // For testing without API key
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
  return Math.random() > 0.5 ? mockWordData : mockWordData2
}
```

### Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. Open the app - it will automatically fetch a random word for the day
2. View comprehensive word details including definitions, examples, synonyms, etc.
3. Click "I Already Know This" to mark the word as known and fetch a new one
4. Click "Save & Continue" to save the word to your history without marking it as known
5. View your learning history in the bottom section
6. Words are automatically cached, and new words are fetched daily

## Tech Stack

- **Vite** - Build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component patterns
- **Lucide React** - Icon library
- **WordsAPI** - English dictionary and word data

## Project Structure

```
src/
├── components/       # React components
│   ├── WordDisplay.tsx
│   └── HistoryList.tsx
├── ui/              # UI component library
│   ├── Button.tsx
│   ├── Card.tsx
│   └── Badge.tsx
├── data-layer/      # Data fetching and persistence
│   ├── api-client.ts
│   └── persistence.ts
├── models/          # TypeScript interfaces
│   └── vocabulary.ts
├── helpers/         # Utility functions
│   └── styling.ts
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## API Documentation

This app uses [WordsAPI](https://www.wordsapi.com/docs/) to fetch word data. Key endpoints used:

- `GET /words/?random=true` - Fetch a random word
- `GET /words/{word}` - Get details for a specific word

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

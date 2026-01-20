# DailyPulse - Your Summarized News Feed

DailyPulse is a modern news aggregation app that delivers concise, summarized articles based on your personal interests. Stay informed without the noise, with a clean and customizable reading experience.

## ✨ Features

- **Personalized Feed:** Select your interests (e.g., Technology, AI, Sports) to get a news feed tailored to you.
- **AI-Powered Summaries (Optional):** Originally built with a placeholder summarizer, it can be easily upgraded to use Genkit and the Gemini API for intelligent, AI-generated article summaries.
- **Save for Later:** Bookmark articles you find interesting to read them later on the "Saved Articles" page.
- **Light & Dark Mode:** Choose between a light or dark theme for comfortable reading at any time of day.
- **Responsive Design:** Enjoy a seamless experience on any device, from mobile phones to desktops.
- **Manual Refresh:** Don't like the current articles? Hit the refresh button to get a new batch instantly.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit) (for optional AI features)
- **News Source:** [NewsAPI](https://newsapi.org/)

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <your-repository-url>
cd <repository-folder>
npm install
```

### 2. Environment Variables

This project requires a NewsAPI key to fetch articles.

1.  Create a file named `.env` in the root of your project.
2.  Go to [newsapi.org](https://newsapi.org/), sign up for a free developer account, and get your API key.
3.  Add your API key to the `.env` file:

```
NEWS_API_KEY=YOUR_API_KEY_HERE
```

*Note: If you plan to enable the Genkit AI summarization features, you will also need a `GEMINI_API_KEY`.*

### 3. Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

---

*This project was bootstrapped and developed in Firebase Studio.*
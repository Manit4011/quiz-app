# Edzy Quiz App - Frontend Hackathon Task 3

A production-ready, interactive Quiz Application built for the Edzy Frontend Hackathon. This project features a robust "Edzy Glass" UI, real-time feedback, and dynamic API integration using Next.js App Router and TanStack Query.

![Edzy Quiz Preview](https://via.placeholder.com/800x400?text=Edzy+Quiz+App+Preview)

## 🚀 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS + Shadcn/UI (Custom "Edzy Glass" Theme)
* **State Management:** React Query (TanStack Query) v5
* **API Client:** Axios
* **Icons:** Lucide React

## ✨ Key Features

1.  **Dynamic Setup:** Users can select subjects (Class 10 English, Math, Science, Social Science) and question limits (5, 10, 15).
2.  **Robust API Integration:** * Fetches live questions from the Edzy API.
    * Includes a custom **Adapter Pattern** (`lib/api.js`) to normalize complex nested backend data into clean frontend models.
    * Handles loading, error, and empty states gracefully.
3.  **Interactive Quiz Experience:**
    * **Edzy Glass UI:** Custom mesh gradient backgrounds and glassmorphism cards.
    * **Haptic Visuals:** "Shake" animations for incorrect answers and "Pop-in" transitions for new questions.
    * **Timer:** Per-question elapsed time tracking.
    * **Immediate Feedback:** Visual validation (Green/Red) with explanation support.
4.  **Resilience:** * Guards against `undefined` API responses.
    * Auto-retry logic for network failures.
    * Fallback mock data (if API is unreachable during demos).

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/edzy-quiz-task.git](https://github.com/your-username/edzy-quiz-task.git)
    cd edzy-quiz-task
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```text
/app
  ├── layout.js          # Root layout with QueryProvider & Mesh Gradients
  ├── page.js            # Main Game Controller (State Machine)
  └── globals.css        # Tailwind directives & Custom Animations
/components
  ├── /ui                # Reusable Shadcn primitives (Card, Button)
  └── /quiz              # Core Game Logic
      ├── SetupForm.jsx    # Subject selection with visual cards
      ├── QuizBoard.jsx    # Game loop & Score tracking
      ├── QuestionCard.jsx # Interactive question display
      └── ResultScreen.jsx # Final performance summary
/lib
  ├── api.js             # Axios instance & Data Transformers
  └── utils.js           # CSS class merging utility
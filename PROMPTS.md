---

### 2. `PROMPTS.md`
This file documents your interaction with the LLM as required by the submission guidelines.

```markdown
# LLM Prompting History

This document records the prompting process used to build the Edzy Quiz Application, demonstrating the iterative development approach using Large Language Models.

## Session Overview
**Goal:** Build a production-ready Next.js Quiz App connecting to the Edzy API.
**Model Used:** Google Gemini

---

### 1. Initial Project Scaffolding
**Prompt:**
> "You are a senior frontend engineer. Build a production-ready Quiz Application based on the following requirements... Tech Stack: Next.js, Tailwind, Shadcn/UI, Axios, TanStack Query. Feature Requirements: Start/Setup Screen, API Integration, Quiz Experience (immediate feedback, retry logic), Bonus Timer, Completion Screen. Provide full folder structure and code."

**Outcome:** Generated the core project structure, `SetupForm`, `QuizBoard`, and basic API logic.

---

### 2. Debugging API Integration (Runtime Error)
**Prompt:**
> "After clicking start quiz I am getting this error: TypeError: Cannot read properties of undefined (reading 'length') at QuizBoard."

**Outcome:** Identified that the initial API response parsing was fragile. The LLM suggested adding "Guard Clauses" and initializing the `questions` array with a default empty array `[]` to prevent crashes during loading states.

---

### 3. Debugging API 404 Error
**Prompt:**
> "Now I am facing this error: Console AxiosError: Request failed with status code 404 at async fetchQuizQuestions."

**Outcome:** The LLM diagnosed a discrepancy between the provided PDF instructions (which used `/task-1/`) and the actual working endpoint found via Bruno testing (`/task/`). The `lib/api.js` file was updated to use the correct URL.

---

### 4. Data Structure Adaptation
**Prompt:**
> "Can you update the code using the following information: [JSON Response Snippet showing deep nesting and separated answer keys]."

**Outcome:** The API response revealed that `isCorrect` flags were not on the option objects but stored separately in a `questionInfo` object. The LLM rewrote `lib/api.js` to include a **Data Transformer** that maps this complex backend structure into a clean frontend-friendly format.

---

### 5. UI/UX Polish ("Edzy Glass")
**Prompt:**
> "Great, everything is working. Now I want to enhance the UI of this app. Make it look like a modern, polished EdTech product."

**Outcome:** * **Visuals:** Implemented a "Mesh Gradient" background and Glassmorphism card effects.
* **Interactivity:** Added "Shake" animations for wrong answers and "Pop-in" transitions for new questions.
* **Components:** Replaced standard dropdowns with interactive visual cards for Subject Selection.

---

### 6. Documentation
**Prompt:**
> "Great, make a readme.md and prompts.md file for this project."

**Outcome:** Generated this documentation to fulfill submission requirements.
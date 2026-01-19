import axios from 'axios';

const API_URL = 'https://api.paraheights.com/edzy-api/hackathon/task/quizDetails';

export const fetchQuizQuestions = async ({ subject, limit }) => {
  try {
    const response = await axios.post(API_URL, {
      examSubjectName: subject,
      numberOfQuestions: parseInt(limit)
    });

    // 1. Navigate to the raw questions array based on your provided JSON
    const rawQuestions = response.data?.data?.questions || [];

    // 2. Transform the data into a clean format for our UI
    // We map the backend structure to our frontend component needs
    return rawQuestions.map(q => {
      // The correct answer ID is hidden inside 'questionInfo.option'
      const correctAnswerId = q.questionInfo?.option;

      return {
        id: q._id,
        question: q.text, // Top level "text" is the question
        options: q.optionOrdering.map(opt => ({
          id: opt._id,
          text: opt.text,
          // We determine if this option is correct by comparing IDs
          isCorrect: opt._id === correctAnswerId 
        }))
      };
    });

  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
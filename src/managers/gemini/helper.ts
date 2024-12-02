export const getPromptQuiz = (question: string, answer: string): string => {
  return `
    Khi một ai đó hỏi "${question}" Thì tôi trả lời "${answer}" Phần trăm chính xác của câu đó là bao nhiêu percent, tính phần trăm theo độ sai của câu và độ phù hợp với câu hỏi, trả lời như thế nào là hợp lý. Không cần quá khắt khe với câu trả lời chỉ cần để mọi người hiểu nghĩa là được. Hãy trả về cho tôi một obj có những ý trên có dạng
wrongWords: string[],
correctAnswer: string,
explanation: string,
percent: number,
} phần explanation bằng tiếng việt nếu đúng không vượt quá 60 từ, nếu sai cần bổ sụng thêm đáp án đúng vào explanation và giải thích ngắn gọn có thể vượt quá quá 60 từ. Chỉ trả về text với dạng json.stringify
    `;
};


export const cleanText = (text: string): string => {
  return text.replace('```json', '').replace('```', '');
};

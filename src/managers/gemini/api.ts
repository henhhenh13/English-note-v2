import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

type UseGeminiApi = {
  fetchText: (prompt: string) => Promise<string>;
};

export default function useGeminiApi(): UseGeminiApi {
  const google = createGoogleGenerativeAI({
    apiKey: import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const fetchText: UseGeminiApi['fetchText'] = async (prompt: string) => {
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt
    });

    return text;
  };

  return { fetchText };
}
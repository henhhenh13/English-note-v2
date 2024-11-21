import { ApiStatus } from "@/contains/type";

export type Grammar = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export type GrammarApiService = {
  addGrammar: (params: {
    title: string;
    description: string;
    content: string;
  }) => Promise<{
    data: Grammar | null;
    flags: ApiStatus;
  }>;
  updateGrammar: (params: Grammar) => Promise<{
    data: Grammar;
    flags: ApiStatus;
  }>;
  deleteGrammar: (id: string) => Promise<ApiStatus>;
};

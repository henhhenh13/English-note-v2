import { ApiStatus } from "@/contains/type";

export type Grammar = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export type GrammarState = {
  list: Map<string, Grammar>;
  flags: ApiStatus;
};

export type GrammarSelector = {
  list: Grammar[];
  flags: ApiStatus;
};

export type GrammarApiService = {
  fetchGrammars: () => Promise<{
    data: Grammar[];
    flags: ApiStatus;
  }>;
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

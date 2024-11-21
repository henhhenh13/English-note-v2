import useGrammarManager from '@/managers/grammar/manager';
import { useEffect } from 'react';

export default function GrammarPage() {
  const { fetchGrammars, flags } = useGrammarManager();
  useEffect(() => {
    if (flags.isLoading) {
      fetchGrammars();
    }
  }, [fetchGrammars, flags.isLoading]);

  return <div>Grammar</div>;
}

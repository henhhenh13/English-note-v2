import { PAGE_STATE, PageState } from '@/managers/page/state';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';


type UsePageManager = {
  page: PageState;
  updatePage: (page: PageState) => void;
};
export default function usePageManager(): UsePageManager {
  const [page, setPageState] = useRecoilState(PAGE_STATE);

  const updatePage = useCallback(
    (page: PageState) => {
      setPageState(page);
    },
    [setPageState],
  );

  return {
    page,
    updatePage,
  };
}

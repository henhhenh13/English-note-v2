import { atom } from 'recoil';

export type PageState = 'unit' | 'vocabulary' | 'grammar' | 'apiTesting';

export const PAGE_STATE = atom<PageState>({
  key: 'pageState',
  default: 'unit',
});
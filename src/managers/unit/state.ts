import { UnitSelector, UnitState } from '@/managers/unit/interface';
import { atom, selector } from 'recoil';

export const UNITS_STATE = atom<UnitState>({
  key: 'UNIT_STATE',
  default: {
    units: new Map(),
    flags: { isSuccess: false, isError: false, isLoading: true },
  },
});

export const UNITS_SELECTOR = selector<UnitSelector>({
  key: 'UNIT_SELECTOR',
  get: ({ get }) => {
    const state = get(UNITS_STATE);
    return {
      units: Array.from(state.units.values()),
      flags: state.flags,
    };
  },
});

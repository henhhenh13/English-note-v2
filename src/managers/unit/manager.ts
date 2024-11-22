import { ApiStatus } from '@/contains/type';
import useUnitApi from '@/managers/unit/api';
import { Unit } from '@/managers/unit/interface';
import { UNITS_SELECTOR, UNITS_STATE } from '@/managers/unit/state';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseUnitsManager = {
  fetchUnits: () => Promise<void>;
  addUnit: (params: {
    title: string;
    description: string;
  }) => Promise<ApiStatus>;
  updateUnit: (params: Unit) => Promise<ApiStatus>;
  deleteUnit: (id: string) => Promise<ApiStatus>;
  units: Unit[];
  flags: ApiStatus;
};

export default function useUnitsManager(): UseUnitsManager {
  const setUnitsState = useSetRecoilState(UNITS_STATE);
  const { units, flags } = useRecoilValue(UNITS_SELECTOR);
  const {
    fetchUnits: fetchUnitsApi,
    addUnit: addUnitApi,
    updateUnit: updateUnitApi,
    deleteUnit: deleteUnitApi,
  } = useUnitApi();

  const fetchUnits: UseUnitsManager['fetchUnits'] = useCallback(async () => {
    const { data, flags } = await fetchUnitsApi();
    if (flags.isSuccess) {
      setUnitsState((prevState) => {
        data.forEach((unit) => {
          prevState.units.set(unit.id, unit);
        });
        return { ...prevState, flags };
      });
    }
  }, [fetchUnitsApi, setUnitsState]);

  const addUnit: UseUnitsManager['addUnit'] = useCallback(async (params) => {
    const { data, flags } = await addUnitApi(params);
    if (!!data && flags.isSuccess) {
      setUnitsState((prevState) => {
        prevState.units.set(data.id, data);
        return { ...prevState };
      });
    }
    return flags;
  }, [addUnitApi, setUnitsState]);

  const updateUnit: UseUnitsManager['updateUnit'] = useCallback(
    async (params) => {
      const { data, flags } = await updateUnitApi(params);
      if (!!data && flags.isSuccess) {
        setUnitsState((prevState) => {
          prevState.units.set(data.id, data);
          return { ...prevState };
        });
      }
      return flags;
    },
    [updateUnitApi, setUnitsState],
  );

  const deleteUnit: UseUnitsManager['deleteUnit'] = useCallback(
    async (id) => {
      const flags = await deleteUnitApi(id);
      if (flags.isSuccess) {
        setUnitsState((prevState) => {
          prevState.units.delete(id);
          return { ...prevState };
        });
      }
      return flags;
    },
    [deleteUnitApi, setUnitsState],
  );

  return {
    fetchUnits,
    addUnit,
    updateUnit,
    deleteUnit,
    units,
    flags,
  };
}

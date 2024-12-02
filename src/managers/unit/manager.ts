import { ApiStatus } from '@/contains/type';
import { AIQuestion } from '@/managers/ai-question/interface';
import { Quiz } from '@/managers/quiz/interface';
import useUnitApi from '@/managers/unit/api';
import { Unit } from '@/managers/unit/interface';
import { UNITS_SELECTOR, UNITS_STATE } from '@/managers/unit/state';
import { Video } from '@/managers/video/interface';
import { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type UseUnitsManager = {
  fetchUnits: () => Promise<void>;
  addUnit: (params: {
    title: string;
    description: string;
  }) => Promise<{ data: Unit; flags: ApiStatus }>;
  updateUnit: (params: Unit) => Promise<ApiStatus>;
  deleteUnit: (id: string) => Promise<ApiStatus>;
  addVideosOnUnitByUnitId: (unitId: string, videos: Video[]) => void;
  addQuizzesOnUnitByUnitId: (unitId: string, quizzes: Quiz[]) => void;
  addAiQuestionsOnUnitByUnitId: (
    unitId: string,
    aiQuestions: AIQuestion[],
  ) => void;
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

  const addUnit: UseUnitsManager['addUnit'] = useCallback(
    async (params) => {
      const { data, flags } = await addUnitApi(params);
      if (!!data && flags.isSuccess) {
        setUnitsState((prevState) => {
          prevState.units.set(data.id, data);
          return { ...prevState };
        });
      }
      return { data, flags };
    },
    [addUnitApi, setUnitsState],
  );

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

  const addVideosOnUnitByUnitId: UseUnitsManager['addVideosOnUnitByUnitId'] =
    useCallback(
      async (unitId, videos) => {
        setUnitsState((prevState) => {
          const unit = prevState.units.get(unitId);

          if (unit) {
            prevState.units.set(unitId, {
              ...unit,
              videos: [...unit.videos, ...videos],
            });
          }
          return { ...prevState };
        });
      },
      [setUnitsState],
    );

  const addQuizzesOnUnitByUnitId: UseUnitsManager['addQuizzesOnUnitByUnitId'] =
    useCallback(
      async (unitId, quizzes) => {
        setUnitsState((prevState) => {
          const unit = prevState.units.get(unitId);

          if (unit) {
            prevState.units.set(unitId, {
              ...unit,
              quizzes: [...unit.quizzes, ...quizzes],
            });
          }
          return { ...prevState };
        });
      },
      [setUnitsState],
    );

  const addAiQuestionsOnUnitByUnitId: UseUnitsManager['addAiQuestionsOnUnitByUnitId'] =
    useCallback(
      async (unitId, aiQuestions) => {
        setUnitsState((prevState) => {
          const unit = prevState.units.get(unitId);

          if (unit) {
            prevState.units.set(unitId, {
              ...unit,
              aiQuestions: [...unit.aiQuestions, ...aiQuestions],
            });
          }
          return { ...prevState };
        });
      },
      [setUnitsState],
    );

  return {
    addAiQuestionsOnUnitByUnitId,
    addQuizzesOnUnitByUnitId,
    addVideosOnUnitByUnitId,
    fetchUnits,
    addUnit,
    updateUnit,
    deleteUnit,
    units,
    flags,
  };
}

import { ApiStatus } from '@/contains/type';
import { Video } from '@/managers/video/interface';

export type Unit = {
  id: string;
  title: string;
  description: string;
  videos: Video[];
};

export type UnitState = {
  units: Map<string, Unit>;
  flags: ApiStatus;
};

export type UnitSelector = {
  units: Unit[];
  flags: ApiStatus;
};

export type UnitService = {
  fetchUnits: () => Promise<{ data: Unit[]; flags: ApiStatus }>;
  addUnit: (params: { title: string; description: string }) => Promise<{
    data: Unit | null;
    flags: ApiStatus;
  }>;
  updateUnit: (params: {
    id: string;
    title: string;
    description: string;
  }) => Promise<{ data: Unit; flags: ApiStatus }>;
  deleteUnit: (id: string) => Promise<ApiStatus>;
};

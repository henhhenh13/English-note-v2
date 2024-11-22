import { ApiStatus } from '@/contains/type';

export type Unit = {
  id: string;
  title: string;
  description: string;
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
    data: Unit;
    flags: ApiStatus;
  }>;
  updateUnit: (params: Unit) => Promise<{ data: Unit; flags: ApiStatus }>;
  deleteUnit: (id: string) => Promise<ApiStatus>;
};

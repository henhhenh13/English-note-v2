import { ApiStatus } from '@/contains/type';

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  unitId: string;
};

export type VideoService = {
  addVideos: (params: {
    title: string;
    description: string;
    url: string;
    unitId: string;
  }[]) => Promise<{ data: Video[] | null; flags: ApiStatus }>;
};

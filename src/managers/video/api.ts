import { Video, VideoService } from '@/managers/video/interface';
import { supabase } from '@/supabase-client';
import camelize from 'camelize-ts';
import snakify from 'snakify-ts';

type UseVideoApi = {
  addVideos: VideoService['addVideos'];
};

export default function useVideoApi(): UseVideoApi {
  const addVideos: UseVideoApi['addVideos'] = async (
    params: {
      title: string;
      description: string;
      url: string;
    }[],
  ) => {
    const paramsSnakify = params.map((item) => snakify(item));
    const { data, error } = await supabase
      .from('videos')
      .insert(paramsSnakify)
      .select<string, Video>('*');

    const dataCamelize = data ? data.map((item) => camelize(item)) : null;
    return {
      data: dataCamelize,
      flags: {
        isError: !!error,
        isLoading: false,
        isSuccess: !!data && !error,
      },
    };
  };
  return {
    addVideos,
  };
}

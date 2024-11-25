import useVideoApi from "@/managers/video/api";
import { VideoService } from "@/managers/video/interface";


type UseVideoManager = {
  addVideos: VideoService['addVideos'];
};

export default function useVideoManager(): UseVideoManager {
  const { addVideos } = useVideoApi();

  return {
    addVideos,
  };
}

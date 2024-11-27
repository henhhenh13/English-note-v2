import useVideoApi from "@/managers/video/api";
import { VideoService } from "@/managers/video/interface";


type UseVideoManager = {
  addVideos: VideoService['addVideos'];
  deleteVideos: VideoService['deleteVideos'];
};

export default function useVideoManager(): UseVideoManager {
  const { addVideos, deleteVideos } = useVideoApi();

  return {
    addVideos,
    deleteVideos,
  };
}

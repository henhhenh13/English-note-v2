import { useCallback } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

interface CustomReactPlayerProps extends ReactPlayerProps {
  onTimeUpdate?: (currentTime: number) => void;
  onPlayWithTime?: (currentTime: number) => void;
}

export default function CustomReactPlayer({
  onTimeUpdate,
  onPlayWithTime,
  ...props
}: CustomReactPlayerProps) {
  const handleProgress = useCallback(
    (state: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => {
      onTimeUpdate?.(state.playedSeconds);
      props.onProgress?.(state);
    },
    [onTimeUpdate, props],
  );

  const handlePlay = useCallback(() => {
    if (onPlayWithTime) {
      const player = props.ref as React.MutableRefObject<ReactPlayer>;
      const currentTime = player?.current?.getCurrentTime() || 0;
      onPlayWithTime(currentTime);
    }
    props.onPlay?.();
  }, [onPlayWithTime, props]);

  return (
    <ReactPlayer {...props} onProgress={handleProgress} onPlay={handlePlay} />
  );
}

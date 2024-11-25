import ReactPlayer, { ReactPlayerProps } from 'react-player';

type CustomReactPlayerProps = ReactPlayerProps;

export default function CustomReactPlayer({
  ...props
}: CustomReactPlayerProps) {
  return <ReactPlayer {...props} />;
}

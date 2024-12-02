import {
  CircularProgressProps,
  Box,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';

type CircularProgressWithLabelProps = CircularProgressProps & {
  value: number;
};

export default function CircularProgressWithLabel(
  props: CircularProgressWithLabelProps,
) {
  const getColor = () => {
    if (props.value >= 75) return 'success';
    if (props.value >= 40) return 'warning';
    return 'error';
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        display: 'inline-flex',
        borderRadius: '100%',
      }}
      variant="outlined"
    >
      <CircularProgress
        variant="determinate"
        {...props}
        color={getColor()}
        thickness={4.2}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Paper>
  );
}

import { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  DialogTitle,
  DialogActions,
  DialogContent,
  Divider,
} from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
type ModalContainer = {
  open: boolean;
  title?: string;
  titleIcon?: SvgIconComponent;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  submitButtonColor?: 'error' | 'primary';
  titleColor?: 'error' | 'primary';
  submitButtonTitle?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export default function ModalContainer({
  open,
  title,
  titleIcon: TitleIcon,
  submitButtonColor = 'primary',
  titleColor = 'primary',
  submitButtonTitle = 'Save changes',
  children,
  maxWidth = 'lg',
  onClose,
  onSubmit,
}: PropsWithChildren<ModalContainer>) {
  return (
    <Dialog
      closeAfterTransition
      open={open}
      maxWidth={maxWidth}
      onClose={onClose}
    >
      <DialogTitle
        color={titleColor}
        sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center' }}
        id="customized-dialog-title"
      >
        {TitleIcon && <TitleIcon sx={{ mr: 1 }} />}
        {title || 'Modal title'}
      </DialogTitle>
      <Divider />
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>

      <DialogActions>
        {onSubmit && (
          <Button onClick={onSubmit} color={submitButtonColor} autoFocus>
            {submitButtonTitle}
          </Button>
        )}
        <Button onClick={onClose} color="info" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

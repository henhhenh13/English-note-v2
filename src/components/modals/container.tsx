import { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';

type ModalContainer = {
  open: boolean;
  title?: string;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  submitButtonColor?: 'error' | 'primary';
  titleColor?: 'error' | 'primary';
  submitButtonTitle?: string;
};
export default function ModalContainer({
  open,
  title,
  submitButtonColor = 'primary',
  titleColor = 'primary',
  submitButtonTitle = 'Save changes',
  children,
  onClose,
  onSubmit,
}: PropsWithChildren<ModalContainer>) {
  return (
    <Dialog closeAfterTransition open={open} maxWidth="lg" onClose={onClose}>
      <DialogTitle
        color={titleColor}
        sx={{ m: 0, p: 2 }}
        id="customized-dialog-title"
      >
        {title || 'Modal title'}
      </DialogTitle>
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

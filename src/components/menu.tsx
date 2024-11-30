import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useId } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

export type CustomMenuProps = {
  buttonTitle?: string;
  items: {
    title: string;
    icon: SvgIconComponent;
    iconColor: 'info' | 'error' | 'primary';
    onClick: () => void;
  }[];
};
export default function CustomMenu({ buttonTitle, items }: CustomMenuProps) {
  const id = useId();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={id}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {buttonTitle && (
          <Typography variant="body2" sx={{ mr: 1 }} fontWeight={600}>
            {buttonTitle}
          </Typography>
        )}
        <SettingsIcon />
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {items.map(({ title, iconColor, icon: Icon, onClick }, index) => (
          <MenuItem
            key={title + index}
            onClick={() => {
              onClick();
              handleClose();
            }}
          >
            <Stack direction="row" spacing={1}>
              <SvgIcon color={iconColor} component={Icon} fontSize="small" />
              <span>{title}</span>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

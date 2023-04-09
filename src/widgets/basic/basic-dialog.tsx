import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonProps } from '@mui/material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  SxProps,
  Typography
} from '@mui/material';
import { BasicTip } from './basic-tip';
import CloseIcon from '@mui/icons-material/Close';

interface BasicActionButtonProps extends ButtonProps {
  text?: string;
}

export const BasicActionButton: FC<BasicActionButtonProps> = ({ text="Submit", color="secondary", sx={}, ...props }) => {
  return <Button color={color} {...props} sx={{ '&:hover': { backgroundColor: 'rgba(155, 155, 155, 0.1)' }, ...sx }}>
    { text }
  </Button>
}

interface BasicDialogProps {
  children?: ReactNode;
  actions?: ReactNode;
  sx?: SxProps;
  title?: string;
  tip?: any;
  open?: boolean;
  close?: () => void;
}

export const BasicDialog: FC<BasicDialogProps> = (props) => {
  const { title='', tip, open, close, children, actions, ...other } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={close}
      open={!!open}
      {...other}
    >
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          { title }
        </Typography>
        <IconButton
          color="inherit"
          onClick={close}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      { tip && 
        <Box sx={{ px: '1.5em', pt: '1em' }}>
          <BasicTip {...tip}/>
        </Box>
      }
      <DialogContent>
        { children }
      </DialogContent>
      { actions && <DialogActions>
        { actions }
      </DialogActions> }
    </Dialog>
  );
};

BasicDialog.propTypes = {
  close: PropTypes.func,
  open: PropTypes.bool
};

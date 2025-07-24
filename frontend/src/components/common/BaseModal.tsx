import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  onCancel,
  submitText = 'Save',
  cancelText = 'Cancel',
  maxWidth = 'sm',
  loading = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid',
        borderColor: 'divider',
        pb: 2,
      }}>
        <Box sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
          {title}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        {children}
      </DialogContent>
      
      {(onSubmit || onCancel) && (
        <DialogActions sx={{ 
          px: 3, 
          pb: 3,
          borderTop: '1px solid',
          borderColor: 'divider',
          pt: 2,
        }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            disabled={loading}
          >
            {cancelText}
          </Button>
          {onSubmit && (
            <Button
              onClick={onSubmit}
              variant="contained"
              disabled={loading}
              sx={{ ml: 2 }}
            >
              {submitText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BaseModal;
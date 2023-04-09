import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Stack, SxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LightBulbIcon from '@mui/icons-material/Lightbulb';

interface BasicTipProps {
  sx?: SxProps;
  message: string;
  prefix?: string;
  postfix?: string;
  start?: ReactNode;
  end?: ReactNode;
}

const lightBulb = <LightBulbIcon fontSize="small" sx={{ color: 'text.secondary', mt: '-0.2em', mr: 1 }}/>

const BasicTipRoot = styled('div')(
  (({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    padding: theme.spacing(1)
  }))
);

export const BasicTip: FC<BasicTipProps> = (props) => {
  const { message, prefix='', postfix='', start = lightBulb, end=null, sx } = props;

  return (
    <BasicTipRoot sx={sx}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%' }}>
        { start }
        <Typography
          color="textSecondary"
          sx={{
            '& span': {
              fontWeight: 700
            }
          }}
          variant="caption"
        >
          {prefix}
          {message}
          {postfix}
        </Typography>
        { end }
      </Stack>
    </BasicTipRoot>
  );
};

BasicTip.propTypes = {
  message: PropTypes.string.isRequired
};

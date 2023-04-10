import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

type Variant = 'light' | 'primary';

interface LogoProps {
  variant?: Variant;
}

export const Logo = styled((props: LogoProps) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';
  const fill1 = '#4d4d4d';
  const fill2 = '#045cd2';
  const fill3 = '#4d4d4d';
  const fill4 = '#047aff';
  const fill5 = '#04caff';
  const height = '60';

  return (
    <svg
      height={height}
      viewBox="0 0 1999.45 1009.56"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path fill={fill1} d="M195,752h19.83V946.37H195V902.44a91.7,91.7,0,0,1-34.21,35.38Q139,950.65,111.38,950.65q-41.61,0-71.15-29.36T10.68,849.18q0-42.76,29.55-72.12t71.15-29.35q27.59,0,49.37,12.83A91.67,91.67,0,0,1,195,795.91ZM54.42,907.88Q78.33,932,112.93,932t58.32-24.11Q195,883.79,195,849.18t-23.71-58.71q-23.72-24.11-58.32-24.1t-58.51,24.1q-23.91,24.1-23.91,58.71T54.42,907.88Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M307.31,802.3q0,14.16,12.19,22.18T349,837.06l34.79,9.15A62.72,62.72,0,0,1,413.19,863q11.93,12.16,11.92,32.47,0,24.12-19.24,39.66t-50.35,15.55q-28,0-47.23-11.86t-26.63-31.3l16.71-9.71a46.2,46.2,0,0,0,20.41,25.07q15,9.14,36.74,9.14t36-9.52q14.17-9.51,14.19-27,0-14.38-12.06-22.93t-29.36-13.1l-34.79-9.16A65.58,65.58,0,0,1,299.93,834q-12.06-11.65-12.06-31.1,0-23.32,18.47-39.26T354,747.71q23.32,0,40.63,10.49a63.44,63.44,0,0,1,25.46,28.38l-16.33,9.33a43,43,0,0,0-19.44-22A61.17,61.17,0,0,0,354,766.37q-19.83,0-33.24,9.75T307.31,802.3Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M493.15,802.3q0,14.16,12.18,22.18t29.5,12.58l34.79,9.15A62.77,62.77,0,0,1,599,863Q611,875.14,611,895.44q0,24.12-19.25,39.66t-50.34,15.55q-28,0-47.24-11.86t-26.63-31.3l16.72-9.71a46.16,46.16,0,0,0,20.41,25.07q15,9.14,36.74,9.14t36-9.52q14.19-9.51,14.19-27,0-14.38-12.06-22.93t-29.36-13.1l-34.79-9.16A65.58,65.58,0,0,1,485.76,834q-12.06-11.65-12.05-31.1,0-23.32,18.47-39.26t47.62-15.94q23.33,0,40.63,10.49a63.44,63.44,0,0,1,25.46,28.38l-16.32,9.33a43,43,0,0,0-19.44-22,61.23,61.23,0,0,0-30.33-7.58q-19.83,0-33.24,9.75T493.15,802.3Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M759.07,747.71q42.76,0,69.4,30.32T855.1,850c0,1-.07,2.6-.19,4.67s-.2,3.63-.2,4.67H678.6q3.49,32.65,26.24,52.67T761,932q23.33,0,40.82-9.72t26.44-25.66l17.1,10.11q-12.06,20.22-34.21,32.07t-50.54,11.86q-44.71,0-73.48-28.58t-28.77-72.89q0-43.54,28.18-72.51T759.07,747.71Zm0,18.66q-33,0-55.2,20.6T678.6,840.23H834.89Q831.77,805.64,810.2,786T759.07,766.37Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1013.72,771H955.79V897.39q0,16.71,6.22,24.1t19,8.36q12.83,1,32.66-1v17.49q-39.29,5.83-58.51-5.44T936,897.39V771H893.2V752H936V703.39l19.83-5.84V752h57.93Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1074.36,946.37V662.56h42V946.37Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1338.34,752h42V946.37h-42v-28q-23.71,33-68,33-40,0-68.42-29.75t-28.38-72.5q0-43.15,28.38-72.71t68.42-29.54q44.33,0,68,32.66ZM1233,893.69q17.49,17.7,43.93,17.69t43.93-17.69q17.51-17.69,17.5-44.51t-17.5-44.52Q1303.35,787,1276.91,787T1233,804.66q-17.49,17.7-17.49,44.52T1233,893.69Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1579.76,752h44.71l-74.64,200.61q-28,75.42-94.86,71.54V984.86q19.82,1.17,31.88-8.36t19.82-29.74l1.95-3.89L1426.2,752h45.87l58,141.11Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1695.62,867.06q4.67,22.17,21.38,34t40.83,11.86q33.42,0,50.15-24.11l34.6,20.22q-28.77,42.38-85.14,42.38-47.45,0-76.59-29t-29.16-73.28q0-43.54,28.77-72.9t73.87-29.35q42.76,0,70.17,29.93t27.41,72.71a129.27,129.27,0,0,1-1.56,17.49Zm-.39-34.21h114.3q-4.27-23.72-19.63-35.77t-36-12.05q-23.32,0-38.88,12.83T1695.23,832.85Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill1} d="M1950.27,784.64q15.93-36.15,59.87-36.16V794q-24.12-1.54-42,11.47t-17.88,43v98h-42V752h42Z" transform="translate(-10.68 -14.76)"/>
      <path fill={fill2} d="M1161.78,14.76c-152.75,0-276.59,123.83-276.59,276.59V568h276.59c152.76,0,276.6-123.84,276.6-276.6S1314.54,14.76,1161.78,14.76Z" transform="translate(-10.68 -14.76)"/>
      <circle fillOpacity="0.1" cx="931.17" cy="355.21" r="197.97"/>
      <path fill={fill4} d="M885.19,172c-109.34,0-198,88.63-198,198V568h198c109.34,0,198-88.64,198-198S994.53,172,885.19,172Z" transform="translate(-10.68 -14.76)"/>
      <circle fillOpacity="0.1" cx="711.95" cy="441.29" r="111.89"/>
      <circle fill={fill5} cx="676.53" cy="441.29" r="111.89"/>
    </svg>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf<Variant>(['light', 'primary'])
};
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Footer } from './footer';
import { MainNavbar } from './main-navbar';
const MainLayoutRoot = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100vw',
    height: '100vh',
    border: '1px solid green'
}));

export const MainLayout = (props) => {
    const { children } = props;

    return (
        <MainLayoutRoot>
            <MainNavbar />
            { children }
            <Footer />
        </MainLayoutRoot>
      );

};

MainLayout.propTypes = {
    children: PropTypes.node
};
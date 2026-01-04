import { Box, CircularProgress } from '@mui/material';
import { styled } from '@mui/material';

const PageLoader = () => {
  return (
    <StyledPageLoader>
      <CircularProgress size={60} />
    </StyledPageLoader>
  );
};

const StyledPageLoader = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default PageLoader;


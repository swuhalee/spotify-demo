import { TextField, InputAdornment, Typography, Grid, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';
import CategoryCard from './components/CategoryCard';
import { useInView } from 'react-intersection-observer';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import useGetCategories from '../../hooks/useGetCategories';

const SearchPage = () => {
  const { ref, inView } = useInView();
  const { data: categories, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCategories({ limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const [keyword, setKeyword] = useState('');
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', paddingY: '24px' }}>
      <TextField
        fullWidth
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="What do you want to play?"
        sx={{
          marginBottom: '32px',
          '& .MuiOutlinedInput-root': {
            borderRadius: '100px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '& input': {
              color: '#fff',
              padding: '12px 16px',
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Typography variant="h1" sx={{ marginBottom: '16px' }}>
        Browse all
      </Typography>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Grid container spacing={2}>
          {categories?.pages.map((page, pageIndex) => 
            page?.items?.map((category, index) => (
              <Grid key={pageIndex * PAGE_LIMIT + index + 1} size={{ xs: 12, sm: 6, md: 4 }}>
                <CategoryCard title={category.name} imageUrl={category.icons[0]?.url} />
              </Grid>
            ))
          )}
          <Grid size={{ xs: 12 }}>
            <Box ref={ref} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchPage;

import { Typography, Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import useGetCategories from '../../hooks/useGetCategories';
import CategoryCard from './components/CategoryCard';

const SearchPage = () => {
  const { ref, inView } = useInView();
  const { data: categories, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCategories({ limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div style={{ padding: '24px 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
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
    </div>
  );
};

export default SearchPage;

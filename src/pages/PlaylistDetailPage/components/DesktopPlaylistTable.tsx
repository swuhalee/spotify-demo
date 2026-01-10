import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DesktopPlaylistItem from './DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../../configs/commonConfig';
import { InfiniteData } from '@tanstack/react-query';
import { GetPlaylistItemsResponse } from '../../../models/playlist';
import { forwardRef } from 'react';

interface DesktopPlaylistTableProps {
  playlistItems: InfiniteData<GetPlaylistItemsResponse> | undefined;
}

const DesktopPlaylistTable = forwardRef<HTMLTableRowElement, DesktopPlaylistTableProps>(({ playlistItems }, ref) => {
  return (
    <TableContainer sx={{ 
      height: "100%",
      "&::-webkit-scrollbar": {
        display: "none"
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none"
    }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: "background.paper" }}>
              #
            </TableCell>
            <TableCell sx={{ backgroundColor: "background.paper" }}>
              Title
            </TableCell>
            <TableCell sx={{ backgroundColor: "background.paper" }}>
              Album
            </TableCell>
            <TableCell sx={{ backgroundColor: "background.paper" }}>
              Date added
            </TableCell>
            <TableCell sx={{ backgroundColor: "background.paper" }}>
              Duration
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
            return (
              <DesktopPlaylistItem
                key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                item={item}
              />
            );
          }))}
          <TableRow sx={{ height: "4px" }} ref={ref} />
        </TableBody>
      </Table>
    </TableContainer>
  );
});

DesktopPlaylistTable.displayName = 'DesktopPlaylistTable';

export default DesktopPlaylistTable;


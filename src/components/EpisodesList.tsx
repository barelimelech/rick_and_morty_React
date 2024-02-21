import React, { useState } from "react";
import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { useRouter } from "next/router";
import { Episode } from "../../types";
import { Column } from "../../types";

interface EpisodesListProps {
  episodes: Episode[];
  title: string;
}

const columns: readonly Column[] = [
  { id: "number", label: "#", width: 20, align: "center" },
  { id: "name", label: "Name", width: 200, align: "left" },
  {
    id: "air_date",
    label: "Air Date",
    width: 100,
    align: "left",
  },
  {
    id: "season",
    label: "Season",
    width: 100,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
];

const EpisodesList = ({ episodes, title }: EpisodesListProps) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = episodes?.map((episode) => ({
    id: episode.id,
    number: episode.number,
    name: episode.name,
    air_date: episode.air_date,
    season: episode.season,
  }));

  const handleCardClick = (episodeId: number) => {
    router.push(`/episode/${episodeId}`);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <Typography align="center">{title}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    width: column.width,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      onClick={() => handleCardClick(row.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {column.format && typeof row[column.id] === "number" ? (
                        column.format(row[column.id] as unknown as number)
                      ) : column.id === "name" ? (
                        <Typography variant="body1" fontWeight="bold">
                          {row[column.id]}
                        </Typography>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default EpisodesList;

import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  FormControl,
  Input,
  InputLabel,
  Container,
  Grid,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const getDataFromApi = async (page, tags) => {
  console.log(page);
  const apiUrl =
    "https://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + page;
  const response = fetch(apiUrl);
  const res = await response.then((posts) => posts.json());
  return res;
};

export default function App() {
  const classes = useStyles();
  const [dataList, setData] = useState({ loading: true, hits: [] });

  const [page, setPage] = React.useState(0);

  const changeEvent = (e) => {
    var string = e.target.value;
    var regex = new RegExp(string, "i");
    const filtered = dataList.data.hits.filter((res) => res.title.match(regex));
    setData({ data: dataList.data, hits: filtered });
    console.log(filtered);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const listOfRecordsInit = getDataFromApi(page, "tags");
    listOfRecordsInit.then((data) => setData({ data, hits: data.hits }));

    const timeInterVal = setInterval(() => {
      const listOfRecords = getDataFromApi(page, "tags");
      listOfRecords.then((data) => setData({ data, hits: data.hits }));
    }, 10000);

    return function clenup() {
      clearInterval(timeInterVal);
    };
  }, [page]);

  console.log(dataList);

  return (
    <React.Fragment>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Search</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                onChange={changeEvent}
              />
            </FormControl>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell align="right">Url</StyledTableCell>
                  <StyledTableCell align="right">Created_at</StyledTableCell>
                  <StyledTableCell align="right">author </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList.hits.map((row) => (
                  <StyledTableRow key={row.objectID}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.url}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.created_at}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.author}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[{ label: "All", value: -1 }]}
                    colSpan={4}
                    count={1000}
                    rowsPerPage={20}
                    page={page}
                    onChangePage={handleChangePage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

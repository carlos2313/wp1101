import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [{id: 'Name'}, {id: 'Subject'}, {id: 'Score'}];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.id}
                    </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function MyTable(props){

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('Score');
  
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    var dataWithNumberTypeScore = [...props.rows];
    for(var i=0;i<dataWithNumberTypeScore.length;i++){
        dataWithNumberTypeScore[i].Score = parseFloat(dataWithNumberTypeScore[i].Score, 10)
    }
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
                <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort}/>
                <TableBody>
                {dataWithNumberTypeScore.slice().sort(getComparator(order, orderBy)).map(row => 
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Name + row.Subject}>
                        <TableCell>{row.Name}</TableCell>
                        <TableCell>{row.Subject}</TableCell>
                        <TableCell>{ parseFloat(row.Score, 10)}</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default MyTable;
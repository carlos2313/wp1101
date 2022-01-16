import { DataGrid } from '@mui/x-data-grid';

import { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import { message } from 'antd';
import Typography from '@mui/material/Typography';

import { GET_SCORE_QUERY } from "../graphql";


const ScorePage = ({username, password, secretKey, examName}) => {
    console.log(examName)
    
    const [valid, setValid] = useState(true);
    const [grid, setGrid] = useState(false);
    const [newRow, setRow] = useState(null);
    const [newColumn, setColumn] = useState(null);
    const { data } = useQuery(GET_SCORE_QUERY, {
        variables: { username, password, secretKey, exam: examName },
    });
    
    const tasksArray2Object = (x) => {
        const tasksObject = {totalScore: x.totalScore, id: x.timeStamp};
        x.tasks.map(tmp => tasksObject[tmp.name] = tmp.score);
        return tasksObject;
    }

    console.log("ok");
    
    useEffect(() => {
        console.log("data:", data);
        if (!data)
            return;
        if (data.score.type !== 'success') {
            setValid(false);
            message.destroy();
            message.error("No Score!")
            return;
        }
        // console.log(data);
        const queryData = data.score.scores;
        // console.log(queryData);
        const queryRow = queryData.map(x => tasksArray2Object(x) );
        // console.log(queryRow);
        const queryGradeColumn = queryData[0].tasks.map(x => ({field: x.name, headerName: x.name, type: 'string'}));
        const queryColumn = [{
            field: 'id',
            headerName: 'time',
    }, ...queryGradeColumn, {
            field: 'totalScore',
            headerName: 'totalScore',
            width: '3vw',
            type: 'string'
        }];
        // console.log(queryColumn);

        setRow(queryRow);
        setColumn(queryColumn);
        setGrid(true);
        message.destroy();
        message.success("Loading Score Successfully")
    }, [data]);

    return (
        <>
            {!valid ? 
            <Typography variant="h6"> No score! </Typography>
            :
                !grid ?
            <Typography variant="h6"> Wait a minute! </Typography>:
            <DataGrid
                style={{ width: '100%' }}
                autoHeight
                rows={newRow}
                columns={newColumn}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />}
        </>
    );
}


export default ScorePage;
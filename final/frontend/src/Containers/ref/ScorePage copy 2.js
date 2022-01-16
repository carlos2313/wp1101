import { DataGrid } from '@mui/x-data-grid';

import { useState, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import { GET_SCORE_QUERY } from "../../graphql";

import Typography from '@mui/material/Typography';


const ScorePage = async ({ username, password, secretKey }) => {
    // const { data2, subscribeToMore } = useQuery(GET_SCORE_QUERY);

    const tasksArray2Object = (x) => {
        const tasksObject = { totalScore: x.totalScore, id: x.timeStamp };
        x.tasks.map(tmp => tasksObject[tmp.name] = tmp.score);
        return tasksObject;
    }

    const newData = [
        {
            tasks: [
                { name: '1 (20%)', status: 'Passing', score: 20 },
                { name: '2-(1) (10%)', status: 'Passing', score: 10 }
            ],
            totalScore: 30,
            timeStamp: 0,
        },
        {
            tasks: [
                { name: '1 (20%)', status: 'Passing', score: 20 },
                { name: '2-(1) (10%)', status: 'Failing', score: 0 }
            ],
            totalScore: 20,
            timeStamp: 1,
        }]

    const newRow = newData.map(x => tasksArray2Object(x));
    console.log(newRow);
    const newGradeColumn = newData[0].tasks.map(x => ({ field: x.name, headerName: x.name, type: 'string' }));
    const newColumn = [{
        field: 'id',
        headerName: 'TimeStamp'
    }, ...newGradeColumn, {
        field: 'totalScore',
        headerName: 'totalScore',
        type: 'string'
    }];
    console.log(newColumn);
    /*
    const data = [
        {
            id: 0,
            grade: { '1 (20%)': 'Passing', '2-(1) (10%)': 'Passing', '2-(2) (10%)': 'Passing', '3-(1) (10%)': 'Passing', '3-(2) (10%)': 'Passing', '4-(1) (10%)': 'Passing', '4-(2) (10%)': 'Failing', '5-(1) (10%)': 'Failing', '5-(2) (10%)': 'Failing' },
            result: { 'Tests': 9, 'Passing': 6, 'Failing': 3, 'Pending': 0, 'Skipped': 0 }
        },
        {
            id: 1,
            grade: { '1 (20%)': 'Passing', '2-(1) (10%)': 'Passing', '2-(2) (10%)': 'Passing', '3-(1) (10%)': 'Passing', '3-(2) (10%)': 'Passing', '4-(1) (10%)': 'Passing', '4-(2) (10%)': 'Passing', '5-(1) (10%)': 'Passing', '5-(2) (10%)': 'Passing' },
            result: { 'Tests': 9, 'Passing': 9, 'Failing': 0, 'Pending': 0, 'Skipped': 0 }
        }
    ]
    const row = data.map(x => ({ id: x.id,...x.grade, ...x.result }) );
    console.log(row);
    
    const gradeKeys = Object.keys(data[0].grade);
    const resultKeys = Object.keys(data[0].result);
    console.log(gradeKeys, resultKeys);
    const gradeColumn = gradeKeys.map(x => ({
        field: x,
        headerName: x,
        type: 'string',
    }));
    const resultColumn = resultKeys.map(x => ({
        field: x,
        headerName: x,
        type: 'number',
    }));
    const column = [{
        field: 'id',
        headerName: 'ID'
    }, ...gradeColumn, ...resultColumn];
    // console.log(column);
*/
    return (
        <DataGrid
            style={{ width: '100%' }}
            autoHeight
            //autoPageSize
            rows={newRow}
            columns={newColumn}
            density='compact'
            //pageSize={5}
            //rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            columnHeader--alignCenter
            cell--textCenter
        />
    );
}

export default ScorePage;
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Button, Grid} from "@mui/material";

function JournalExercises() {
    // Use the Navigate for redirection
    const redirect = useNavigate();
    const location = useLocation();
    const {currentRow} = location.state;
    console.log(currentRow);
    const [rows, setRows] = useState<Array<any>>([]);
    const columns: GridColDef[] = [
        {field: 'exercise', headerName: 'Exercise', width: 150},
        {field: 'exerciseType', headerName: 'Exercise Type', width: 150},
        {field: 'sets', headerName: 'Sets', width: 150},
        {field: 'reps', headerName: 'Reps', width: 150},
        {field: 'rest', headerName: 'Rest', width: 150},
        {field: 'load', headerName: 'Load (lbs)', width: 150}
    ]

    const updateRowData = (row: any) => {
        let buffer: any = [];
        row.forEach((item: any) => {
            let newItem: any
                = {
                id: item._id,
                exercise: item.exercise,
                exerciseType: item.exerciseType,
                sets: item.sets,
                reps: item.reps,
                rest: item.rest,
                load: item.load
            }
            buffer.push(newItem);
        })
        setRows(buffer);
    }

    useEffect(() => {
        updateRowData(currentRow)
    }, [currentRow]);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <h2>Journal Exercises</h2>
                </Grid>
                <Grid item xs={12}>
                    <DataGrid
                        autoHeight={true}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={() => {
                        redirect("/fitnessJournals")
                    }}>Back</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default JournalExercises;
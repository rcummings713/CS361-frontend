import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, Grid, TextField, Tooltip} from "@mui/material";
import AddExerciseForm from "../components/AddExerciseForm";
import {DataGrid, GridColDef, GridRowId, GridRowParams, GridActionsCellItem} from "@mui/x-data-grid";
import {createSearchParams, useNavigate} from "react-router-dom";
import navigation from "../components/Navigation";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Box} from "@mui/system";

function FitnessJournals() {
    const [rows, setRows] = useState<Array<any>>([]);
    const columns: GridColDef[] = [
        {field: 'workoutName', headerName: 'Journal Entry Name', width: 150, flex: 1},
        {field: 'notes', headerName: 'Notes', width: 150, flex: 1},
        {field: 'dateLogged', headerName: 'Date Logged', width: 150, flex: 1},
        {
            field: 'action',
            headerName: 'View Exercises',
            type: 'actions',
            width: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <Tooltip title="View Exercises related to this journal entry">
                    <Box>
                        <Button
                            sx={{fontSize: '0.5rem'}}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleOnCellClick(params)}>
                            View Exercises
                        </Button>
                    </Box>
                </Tooltip>
            }
        },
        {
            field: 'delete',
            type: 'actions',
            headerName: 'Delete',
            width: 100,
            flex: 1,
            sortable: false,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                return [<Tooltip title={"Delete journal entry"}>
                    <Box>
                        <GridActionsCellItem
                            icon={<DeleteIcon/>}
                            label="Delete"
                            onClick={handleDeleteClick(params.id)}
                            color="inherit"
                        />
                    </Box>
                </Tooltip>
                ]
            }
        }

    ]
    const handleDeleteClick = (id: GridRowId) => async () => {
        console.log(JSON.stringify({id: id}));
        const response = await fetch(`/deleteJournal/${id}`,
            {
                method: "DELETE",
                headers: {ContentType: "application/json"},
                body: JSON.stringify({id: id})
            }).then(status => {
            if (status.status === 200) {
                setRows(rows.filter((row) => row.id !== id));
            } else {
                alert(`Error: ${status.status} client side issue with request made to server`);
            }
        });
    };
    const navigate = useNavigate();
    const loadJournals = async () => {
        const response = await fetch('/getJournals');
        const journals = await response.json()
        console.log('JOURNALS RETRIEVED', journals);

        let newRows: any = []
        journals.forEach((journal: any) => {
            console.log(journal);
            let newRow = {
                id: journal._id,
                workoutName: journal.workoutName,
                notes: journal.notes,
                dateLogged: journal.dateLogged,
                exercises: journal.exercises
            }
            newRows.push(newRow);
            console.log('newRow', newRow);
            console.log(rows);
        })
        setRows(newRows);
    }
    const handleOnCellClick = (params: any) => {
        const currentRow = params.row.exercises
        console.log(currentRow);
        navigate(
            '/viewJournalExercises',
            {state: {currentRow: currentRow}}
        );
    }

    // LOAD all the journals
    useEffect(() => {
            loadJournals()
        }, []
    );

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <h2>Journal Entries</h2>
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
                <Grid item xs={3}>
                    <Button variant="contained" onClick={() => {
                        navigate('/logJournal')
                    }}>Add Journal Entry</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default FitnessJournals;
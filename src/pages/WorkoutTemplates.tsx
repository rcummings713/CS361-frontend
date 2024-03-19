import React, {useEffect, useState} from 'react'
import Typography from '@mui/material/Typography';
import {Button, Grid, TextField, Tooltip} from "@mui/material";
import AddExerciseForm from "../components/AddExerciseForm";
import {DataGrid, GridColDef, GridRowId, GridRowParams, GridActionsCellItem} from "@mui/x-data-grid";
import {createSearchParams, useNavigate} from "react-router-dom";
import navigation from "../components/Navigation";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Box} from "@mui/system";

function WorkoutTemplates() {
    const [rows, setRows] = useState<Array<any>>([]);
    const columns: GridColDef[] = [
        {field: 'templateName', headerName: 'Workout Template Name', width: 150, flex: 1},
        {field: 'description', headerName: 'Description', width: 150, flex: 1},
        {field: 'dateCreated', headerName: 'Date Created', width: 150, flex: 1},
        {
            field: 'action',
            headerName: 'View Templates',
            type: 'actions',
            width: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return <Tooltip title="View Exercises related to this template">
                    <Box>
                        <Button
                            sx={{fontSize: '0.5rem'}}
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleOnCellClick(params)}>
                            View Templates
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
                return [<Tooltip title={"Delete workout template"}>
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
        const response = await fetch(`/deleteWorkoutTemplate/${id}`,
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
    const loadTemplates = async () => {
        const response = await fetch('/getWorkoutTemplates');
        const workoutTemplate = await response.json()
        console.log('TEMPLATES RETRIEVED', workoutTemplate);

        let newRows: any = []
        workoutTemplate.forEach((template: any) => {
            console.log(template);
            let newRow = {
                id: template._id,
                templateName: template.templateName,
                description: template.description,
                dateCreated: template.dateCreated,
                exercises: template.exercises
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
            '/viewTemplates',
            {state: {currentRow: currentRow}}
        );
    }

    // LOAD all the journals
    useEffect(() => {
            loadTemplates()
        }, []
    );

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <h2>Workout Templates</h2>
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
                <Grid item xs={4}>
                    <Button variant="contained" onClick={() => {
                        navigate('/logTemplates')
                    }}>Add Workout Template</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default WorkoutTemplates;
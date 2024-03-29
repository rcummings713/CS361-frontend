import React, {useState} from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField, Tooltip
} from "@mui/material";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams, GridRowProps} from '@mui/x-data-grid';
import AddExerciseForm from "../components/AddExerciseForm";
import {redirect, useNavigate} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {Box} from "@mui/system";

function LogTemplate() {
    // Use the Navigate for redirection
    const redirect = useNavigate();
    const [rows, setRows] = useState<Array<any>>([]);

    const columns: GridColDef[] = [
        {field: 'exercise', headerName: 'Exercise', width: 150, flex: 1},
        {field: 'exerciseType', headerName: 'Exercise Type', width: 150, flex: 1},
        {field: 'sets', headerName: 'Sets', width: 150, flex: 1},
        {field: 'reps', headerName: 'Reps', width: 150, flex: 1},
        {field: 'rest', headerName: 'Rest (mins)', width: 150, flex: 1},
        {field: 'load', headerName: 'Load (lbs)', width: 150, flex: 1},
        {
            field: 'delete',
            type: 'actions',
            headerName: 'Delete',
            width: 150,
            flex: 1,
            sortable: false,
            cellClassName: 'actions',
            getActions: (params: GridRowParams) => {
                return [<GridActionsCellItem
                    icon={<DeleteIcon/>}
                    label="Delete"
                    onClick={handleDeleteClick(params.id)}
                    color="inherit"
                />
                ]
            }
        }
    ]

    const handleDeleteClick = (id: GridRowId) => async () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const addToGrid = (items: any) => {
        console.log(items);
        const newId = rows.length + 1;
        const newRow = {
            id: newId,
            exercise: items.exercise,
            exerciseType: items.exerciseType,
            sets: items.sets,
            reps: items.reps,
            rest: items.rest,
            load: items.load
        };
        setRows([...rows, newRow]);
    }

    const [formData, setFormData] = useState({
        templateName: '',
    });

    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const handleSubmit = (e: any) => {
        console.log(e)
        e.preventDefault();
        let template: any = []
        template.push(formData);
        rows.forEach((item) => {
                const row = {
                    exercise: item.exercise,
                    exerciseType: item.exerciseType,
                    sets: item.sets,
                    reps: item.reps,
                    rest: item.rest,
                    load: item.load
                }
                console.log('row', row);
                template = [...template, row];
            }
        )
        console.log('Template entry', template);
        console.log('Form submitted:', formData);
        logTemplate(template)
    };

    const logTemplate = async (template: any) => {
        const response = await fetch('/createWorkoutTemplate', {
            method: 'post',
            body: JSON.stringify(template),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            // alert(`was added to the collection.`);
            redirect("/workoutTemplates");
        } else {
            alert(`Error: ${response.status} issue with request made to server`);
            redirect("/workoutTemplates");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Template Name"
                            name="templateName"
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <AddExerciseForm addToGrid={addToGrid}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DataGrid autoHeight={true}
                                  rows={rows}
                                  columns={columns}
                                  initialState={{
                                      pagination: {
                                          paginationModel: {
                                              pageSize: 7,
                                          },
                                      },
                                  }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            placeholder="Provide a description for this workout!"
                            name="description"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" onClick={() => {
                            redirect("/workoutTemplates")
                        }}>Back</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
        ;
}

export default LogTemplate;
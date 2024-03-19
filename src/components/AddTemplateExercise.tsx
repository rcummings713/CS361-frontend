import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {Link} from "react-router-dom";
import {DataGrid, GridActionsCellItem, GridColDef, GridRowParams} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {useEffect, useState} from "react";

// @ts-ignore
export default function AddTemplateExercise({addToGrid, workoutTemplates}) {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<Array<any>>([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const columns: GridColDef[] = [
        {field: 'exercise', headerName: 'Exercise', width: 150, flex: 1},
        {field: 'exerciseType', headerName: 'Exercise Type', width: 150, flex: 1},
        {field: 'sets', headerName: 'Sets', width: 150, flex: 1},
        {field: 'reps', headerName: 'Reps', width: 150, flex: 1},
        {field: 'rest', headerName: 'Rest (mins)', width: 150, flex: 1},
        {field: 'load', headerName: 'Load (lbs)', width: 150, flex: 1},
    ]
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectChange = (event: any) => {
        const value = event.target.value
        console.log(value);
        setSelectedOption(value);
        console.log(selectedOption);
        const updatedRows = workoutTemplates.filter((row: any) => row.id === value)
        if (value.length > 0) {
            const data = updateRows(updatedRows[0].exercises)
            console.log(updatedRows[0].exercises);
            setRows(data);
        }
    };

    function updateRows(items: any) {
        let data: any = []
        items.forEach((item: any) => {
            console.log(item)
            const newId = data.length + 1;
            const row = {
                id: newId,
                exercise: item.exercise,
                exerciseType: item.exerciseType,
                sets: item.sets,
                reps: item.reps,
                rest: item.rest,
                load: item.load
            }
            console.log('row', row);
            data = [...data, row];
        })
        return data
    }

    function handleSelection(items: Array<any>) {
        console.log(items)
        const nums = new Set(items)
        const data: any = rows.filter((row: any) => nums.has(row.id)).map(row => row)
        console.log(data)
        setSelectedItems(data)
    }

    function addValues(e: any) {
        e.preventDefault();
        console.log(selectedItems)
        selectedItems.forEach((item: any) => {
            console.log(item)
            addToGrid(item)
        })
        e.stopPropagation()
        handleClose()
    }

    useEffect(() => {
        console.log(workoutTemplates);
    }, [])

    return (
        <div style={{width: '600px'}}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Exercise from Template
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{width: '100%'}}
                fullWidth
                maxWidth={"md"}
            >
                <DialogTitle>Add Exercise</DialogTitle>
                <DialogContent>
                    <FormControl sx={{m: 1, minWidth: 200}}>
                        <InputLabel id="option-label">Workout Template</InputLabel>
                        <Select
                            labelId="option-label"
                            id="templates"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            autoWidth
                            label="Workout Templates"
                        >
                            {workoutTemplates.map((item: any, index: any) => (
                                <MenuItem key={index} value={item.id}>{item.templateName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{height: 400, width: '100%'}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(items: any) => handleSelection(items)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={addValues}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
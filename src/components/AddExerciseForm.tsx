import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddExerciseForm({addToGrid}: { addToGrid: any }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Exercise
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        addToGrid(formJson);
                        handleClose();
                        event.stopPropagation();
                    },
                }}
            >
                <DialogTitle>Add Exercise</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="exercise"
                        name="exercise"
                        label="Exercise Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="exerciseType"
                        name="exerciseType"
                        label="Exercise Type"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="sets"
                        name="sets"
                        label="Sets"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="reps"
                        name="reps"
                        label="Reps"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rest"
                        name="rest"
                        label="Rest (mins)"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="load"
                        name="load"
                        label="Load (lbs)"
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
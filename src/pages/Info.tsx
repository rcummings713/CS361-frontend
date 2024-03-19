import React from 'react'

function Info() {
    return (
        <>
            <div className={"infoPage"}>
                <h2 style={{paddingBottom: "10px"}}><strong>Features</strong></h2>
                <p style={{paddingBottom: "10px"}}><strong>Home Screen Details</strong></p>
                <p style={{paddingBottom: "10px"}}>The home screen includes valuable information that assist the user as
                    they progress on their fitness journey. The rotating quotes provide the user
                    with motivation to endure towards their goal. The journal entry count
                    gives them a sense of their progress. The UberFit application details
                    provides information for the user to keep their goals between applications in sync.
                </p>
                <h4 style={{paddingBottom: "10px"}}><strong>Log Journal</strong></h4>
                <p style={{paddingBottom: "10px"}}>This feature allows a user to log a fitness journal entry. By
                    selecting
                    the Fitness Journal Entry tab, the user can view their already logged journals
                    or select the add journal entry button. Following this screen the user
                    can set the name of the journal entry, provide any notes regarding their workout
                    and provide the exercises including the reps, sets, rest time, and
                    weight associated with each exercise
                </p>
                <h4 style={{paddingBottom: "10px"}}><strong>Create workout template</strong></h4>
                <p>Workout templates allow a user to create groups of exercises that they
                    may log repeatedly. To do so, a user can go to the workout templates tab where
                    they can view previously created workouts. By selecting the add workout
                    template button and following the screen, the user can name their template,
                    and add exercises and their respective details. Then, when logging a fitness journal entry, the user
                    has can select the add from template button to add an exercise from a template they've created
                </p>
            </div>
        </>
    )
}

export default Info;
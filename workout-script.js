document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const workoutList = document.getElementById("workout-list");
    const exerciseDropdown = document.getElementById("exercise-dropdown");
    const repsInput = document.getElementById("reps");
    const setsInput = document.getElementById("sets");

    // Extract the date parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDate = urlParams.get('date');

    // Update the title with the selected date
    app.querySelector("h1").textContent = `Workout Planner - ${selectedDate}`;

    // Create a new instance of WorkoutTracker for the selected day
    const wt = new WorkoutTracker(app);

    // Modify the addEntry method to use the selected date
    wt.addEntry = function (data) {
        data.date = selectedDate;
        this.entries.push(data);
        this.saveEntries();
        this.updateView();
    };

    // Populate dropdown with predefined exercises
    const predefinedExercises = ['Running', 'Walking', 'Cycling', 'Swimming', 'Yoga'];
    predefinedExercises.forEach(exercise => {
        const option = document.createElement('option');
        option.value = exercise;
        option.textContent = exercise;
        exerciseDropdown.appendChild(option);
    });

    // Add an event listener for a button to add a new workout entry
    app.querySelector("#addWorkout").addEventListener("click", () => {
        const selectedExercise = exerciseDropdown.value;
        const reps = repsInput.value.trim();
        const sets = setsInput.value.trim();

        if (selectedExercise) {
            const workoutEntry = {
                date: selectedDate,
                exercises: [{ name: selectedExercise, reps, sets }]  // Array to store individual exercises
            };

            updateWorkoutList();
        }
    });

    // Helper function to update the workout list in the UI
    const updateWorkoutList = () => {
        workoutList.innerHTML = ""; // Clear existing list

        wt.entries.forEach(entry => {
            if (entry.date === selectedDate) {
                entry.exercises.forEach((exercise, index) => {
                    const exerciseItem = document.createElement("div");
                    exerciseItem.textContent = `${index + 1}. ${exercise.name} - Reps: ${exercise.reps}, Sets: ${exercise.sets}`;
                    workoutList.appendChild(exerciseItem);
                });
            }
        });
    };
});

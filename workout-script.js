

document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const workoutList = document.getElementById("workout-list");
    const exerciseDropdown = document.getElementById("exercise-dropdown");
    const repsInput = document.getElementById("reps");
    const setsInput = document.getElementById("sets");
    const goBackButton = document.getElementById("goBack");
    const logoutButton = document.getElementById("logout");

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
        updateWorkoutList(); // Call the updateWorkoutList function after adding an entry
    };

    // Populate dropdown with predefined exercises
    const predefinedExercises = [
        'Bench Press', 'Push-ups', 'Dumbbell Curls', 'Tricep Dips',
        'Chest Fly', 'Hammer Curls', 'Skull Crushers', 'Tricep Kickbacks'
        // Add more exercises as needed
    ];

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

        if (selectedExercise && reps !== "" && sets !== "") {
            const workoutEntry = {
                date: selectedDate,
                exercises: [{ name: selectedExercise, reps, sets }]  // Array to store individual exercises
            };

            wt.addEntry(workoutEntry); // Call the addEntry method
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

    // Go Back button functionality
    if (goBackButton) {
        goBackButton.addEventListener("click", () => {
            // Add your go back functionality here
            // For example, redirect to the previous page
            window.history.back();
        });
    }

    // Logout button functionality
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Add your logout functionality here
            // For example, redirect to a logout page or clear user session
            window.location.href = "logout.html";
        });
    }
});

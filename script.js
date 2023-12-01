
document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.getElementById("days-container");
    const exerciseInput = document.getElementById("exercise");
    const exerciseList = document.getElementById("exercise-list");

    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();

    // Display days of the week with dates
    daysOfWeek.forEach((day, index) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = `${day} (${getDateString(index)})`;

        if (index === currentDate.getDay()) {
            dayElement.classList.add("current-day");
        }

        daysContainer.appendChild(dayElement);
    });

    // Add exercise function
    window.addExercise = function () {
        const exercise = exerciseInput.value.trim();
        if (exercise !== "") {
            const exerciseItem = document.createElement("div");
            exerciseItem.textContent = exercise;
            exerciseList.appendChild(exerciseItem);
            exerciseInput.value = ""; // Clear input after adding exercise
        }
    };

    // Helper function to get the date string (e.g., "1/1")
    function getDateString(dayIndex) {
        const date = new Date();
        date.setDate(date.getDate() + dayIndex);
        const month = date.getMonth() + 1; // Months are zero-indexed
        const day = date.getDate();
        return `${month}/${day}`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.getElementById("days-container");
    const exerciseInput = document.getElementById("exercise");
    const exerciseList = document.getElementById("exercise-list");
    const logoutButton = document.getElementById("logout");

    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();

    // Predefined workout options
    const workoutOptions = ['Legs', 'Chest', 'Arms', 'Cardio', 'Other'];

    // Display days of the week with dates
    daysOfWeek.forEach((day, index) => {
        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        dayElement.textContent = `${day} (${getDateString(index)})`;

        if (index === currentDate.getDay()) {
            dayElement.classList.add("current-day");
        }

        // Add a table for workout entries
        const table = document.createElement("table");
        table.classList.add("tracker");
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Workout</th>
                    <th>Duration (minutes)</th>
                    <th>Weight (lbs)</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th></th>
                </tr>
            </thead>
            <tbody class="tracker__entries"></tbody>
            <tbody>
                <tr class="tracker__row tracker__row--add">
                    <td>
                        <select class="tracker__workout">
                            ${workoutOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
                        </select>
                    </td>
                    <td>
                        <input type="number" class="tracker__duration">
                    </td>
                    <td>
                        <input type="number" class="tracker__weight">
                    </td>
                    <td>
                        <input type="number" class="tracker__sets">
                    </td>
                    <td>
                        <input type="number" class="tracker__reps">
                    </td>
                    <td>
                        <button type="button" class="tracker__button tracker__add">Add Entry</button>
                    </td>
                </tr>
            </tbody>
        `;

        // Add an event listener for the "Add Entry" button
        const addEntryButton = table.querySelector(".tracker__add");
        addEntryButton.addEventListener("click", () => {
            const workoutInput = table.querySelector(".tracker__workout");
            const durationInput = table.querySelector(".tracker__duration");
            const weightInput = table.querySelector(".tracker__weight");
            const setsInput = table.querySelector(".tracker__sets");
            const repsInput = table.querySelector(".tracker__reps");

            const workout = workoutInput.value.trim();
            const duration = durationInput.value.trim();
            const weight = weightInput.value.trim();
            const sets = setsInput.value.trim();
            const reps = repsInput.value.trim();

            if (workout !== "" && duration !== "") {
                const entry = {
                    workout,
                    duration,
                    weight,
                    sets,
                    reps,
                };

                addRow(entry);
                clearInputs();
            }
        });

        // Append the table to the day element
        dayElement.appendChild(table);

        daysContainer.appendChild(dayElement);

        // Function to add a row for each entry
        const addRow = data => {
            const tableBody = table.querySelector(".tracker__entries");
            const template = document.createElement("template");

            // Create row from HTML template
            template.innerHTML = rowHtml().trim();
            const row = template.content.firstElementChild;

            // Populate row with data
            row.querySelector(".tracker__workout").textContent = data.workout;
            row.querySelector(".tracker__duration").textContent = data.duration;
            row.querySelector(".tracker__weight").textContent = data.weight;
            row.querySelector(".tracker__sets").textContent = data.sets;
            row.querySelector(".tracker__reps").textContent = data.reps;

            // Event listener for deleting entry
            row.querySelector(".tracker__delete").addEventListener("click", () => {
                deleteEntry(row);
            });

            // Append the row to the table body
            tableBody.appendChild(row);
        };

        // Function to delete an entry from the tracker
        const deleteEntry = row => {
            row.remove();
        };

        // Helper function to clear input fields after adding an entry
        const clearInputs = () => {
            workoutInput.value = "";
            durationInput.value = "";
            weightInput.value = "";
            setsInput.value = "";
            repsInput.value = "";
        };

        // Function returning HTML structure for a tracker row
        const rowHtml = () => {
            return `
                <tr class="tracker__row">
                    <td class="tracker__workout"></td>
                    <td class="tracker__duration"></td>
                    <td class="tracker__weight"></td>
                    <td class="tracker__sets"></td>
                    <td class="tracker__reps"></td>
                    <td>
                        <!-- Button to delete the entry -->
                        <button type="button" class="tracker__button tracker__delete">&times;</button>
                    </td>
                </tr>
            `;
        };
    });

    // Logout button functionality
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Add your logout functionality here
            // For example, redirect to a logout page or clear user session
            window.location.href = "logout.html";
        });
    }

    // Helper function to get the date string (e.g., "1/1")
    function getDateString(dayIndex) {
        const date = new Date();
        date.setDate(date.getDate() + dayIndex);
        const month = date.getMonth() + 1; // Months are zero-indexed
        const day = date.getDate();
        return `${month}/${day}`;
    }
});

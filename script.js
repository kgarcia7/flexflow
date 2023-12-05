document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.getElementById("days-container");
    const exerciseInput = document.getElementById("exercise");
    const exerciseList = document.getElementById("exercise-list");

    // Get the current day of the week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();

    // Display days of the week with dates
    // ...

// Display days of the week with dates
daysOfWeek.forEach((day, index) => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = `${day} (${getDateString(index)})`;

    if (index === currentDate.getDay()) {
        dayElement.classList.add("current-day");
    }

    daysContainer.appendChild(dayElement);

    // Add an event listener to navigate to a new page when a day is clicked
    dayElement.addEventListener("click", () => {
        const selectedDate = getDateString(index);
        window.location.href = `workout-page.html?date=${selectedDate}`;
    });
});

// ...


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

    // Class representing a Workout Tracker
    class WorkoutTracker {
        // Static property for the key used in local storage
        static LOCAL_STORAGE_DATA_KEY = "workout-tracker-entries";

        // Constructor that initializes the WorkoutTracker instance
        constructor(root) {
            // Root element where the tracker will be rendered
            this.root = root;

            // Insert HTML structure into the root element
            this.root.insertAdjacentHTML("afterbegin", WorkoutTracker.html());

            // Array to store workout entries
            this.entries = [];

            // Load existing entries from local storage and update the view
            this.loadEntries();
            this.updateView();

            // Event listener for the "Add Entry" button
            this.root.querySelector(".tracker__add").addEventListener("click", () => {
                // Create a new entry with default values and add it
                const date = new Date();
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");

                this.addEntry({
                    date: `${year}-${month}-${day}`,
                    workout: "walking",
                    duration: 30
                });
            });
        }

        // Static method returning HTML structure for the tracker table
        static html() {
            return `
                <table class="tracker">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workout</th>
                            <th>Duration</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="tracker__entries"></tbody>
                    <tbody>
                        <tr class="tracker__row tracker__row--add">
                            <td colspan="4">
                                <span class="tracker__add">Add Entry &plus;</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `;
        }

        // Static method returning HTML structure for a tracker row
        static rowHtml() {
            return `
                <tr class="tracker__row">
                    <td>
                        <input type="date" class="tracker__date">
                    </td>
                    <td>
                        <select class="tracker__workout">
                            <!-- Options for workout types -->
                            <option value="walking">Walking</option>
                            <option value="running">Running</option>
                            <option value="outdoor-cycling">Outdoor Cycling</option>
                            <option value="indoor-cycling">Indoor Cycling</option>
                            <option value="swimming">Swimming</option>
                            <option value="yoga">Yoga</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" class="tracker__duration">
                        <span class="tracker__text">minutes</span>
                    </td>
                    <td>
                        <!-- Button to delete the entry -->
                        <button type="button" class="tracker__button tracker__delete">&times;</button>
                    </td>
                </tr>
            `;
        }

        // Load entries from local storage
        loadEntries() {
            this.entries = JSON.parse(localStorage.getItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY) || "[]");
        }

        // Save entries to local storage
        saveEntries() {
            localStorage.setItem(WorkoutTracker.LOCAL_STORAGE_DATA_KEY, JSON.stringify(this.entries));
        }

        // Update the view based on the current entries
        updateView() {
            const tableBody = this.root.querySelector(".tracker__entries");

            // Function to add a row for each entry
            const addRow = data => {
                const template = document.createElement("template");
                let row = null;

                // Create row from HTML template
                template.innerHTML = WorkoutTracker.rowHtml().trim();
                row = template.content.firstElementChild;

                // Populate row with data
                row.querySelector(".tracker__date").value = data.date;
                row.querySelector(".tracker__workout").value = data.workout;
                row.querySelector(".tracker__duration").value = data.duration;

                // Event listeners for updating data and deleting entry
                row.querySelector(".tracker__date").addEventListener("change", ({ target }) => {
                    data.date = target.value;
                    this.saveEntries();
                });

                row.querySelector(".tracker__workout").addEventListener("change", ({ target }) => {
                    data.workout = target.value;
                    this.saveEntries();
                });

                row.querySelector(".tracker__duration").addEventListener("change", ({ target }) => {
                    data.duration = target.value;
                    this.saveEntries();
                });

                row.querySelector(".tracker__delete").addEventListener("click", () => {
                    this.deleteEntry(data);
                });

                // Append the row to the table body
                tableBody.appendChild(row);
            };

            // Remove existing rows from the table body
            tableBody.querySelectorAll(".tracker__row").forEach(row => {
                row.remove();
            });

            // Add a row for each entry
            this.entries.forEach(data => addRow(data));
        }

        // Add a new entry to the tracker
        addEntry(data) {
            this.entries.push(data);
            this.saveEntries();
            this.updateView();
        }

        // Delete an entry from the tracker
        deleteEntry(dataToDelete) {
            this.entries = this.entries.filter(data => data !== dataToDelete);
            this.saveEntries();
            this.updateView();
        }
    }

    // Get the root element where the tracker will be rendered
    const app = document.getElementById("app");

    // Create a new instance of WorkoutTracker
    const wt = new WorkoutTracker(app);

    // Make the instance accessible globally for testing or debugging
    window.wt = wt;
});

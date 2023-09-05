document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const createTaskForm = document.getElementById("createTaskForm");
    const updateTaskForm = document.getElementById("updateTaskForm");
    const deleteTaskForm = document.getElementById("deleteTaskForm");

    //Function to fetch and display tasks
    function displayTasks() {
        fetch("http://localhost:5200/api/Movies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(tasks => {
                taskList.innerHTML = "",  //Clear previous list
                    tasks.forEach(task => {
                        const listItem = document.createElement("li");
                        listItem.textContent = `ID: ${task.id}, Name: ${task.name}, Genre: ${task.genre}, Release Date: ${task.releaseDate}`;
                        taskList.appendChild(listItem);
                    });
            })
            .catch(error => {
                console.error("Fetch error: ", error);
                taskList.innerHTML = "Error fetching tasks";
            });
    }



    //Event Listener for Create Task form submission
    createTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const genre = document.getElementById("genre").value;
        const releaseDate = document.getElementById("releaseDate").value;

        fetch("http://localhost:5200/api/Movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, genre, releaseDate })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form fields after successful creation
                document.getElementById("name").value = "";
                document.getElementById("genre").value = "";
                document.getElementById("releaseDate").value = "";

                //Refresh the task list
                displayTasks();
            })

            .catch(error => {
                console.error("Fetch error: ", error);
            });

    });


    //Event listener for Update Task form Submission
    updateTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieId = document.getElementById("movieId").value;
        const newName = document.getElementById("newName").value;
        const newGenre = document.getElementById("newGenre").value;
        const newReleaseDate = document.getElementById("newReleaseDate").value;


        fetch(`http://localhost:5200/api/Movies/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: movieId, name: newName, genre: newGenre, releaseDate: newReleaseDate })



        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);

                }
                return response.json();
            })
            .then(() => {
                //Clear form fields after successful creation
                document.getElementById("movieId").value = "";
                document.getElementById("newName").value = "";
                document.getElementById("newGenre").value = "";
                document.getElementById("newReleaseDate").value = "";


                //Refresh the task list
                displayTasks();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    });

    //Event listener for Update Task form Submission
    deleteTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const deleteMovieId = document.getElementById("deleteMovieId").value;

        fetch(`http://localhost:5200/api/Movies/${deleteMovieId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form field after successful deletion
                document.getElementById("deleteMovieId").value = "";

                //Refresh the task list
                displayTasks();
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });

    });

    //Initial display of tasks when the page loads
    displayTasks();

});
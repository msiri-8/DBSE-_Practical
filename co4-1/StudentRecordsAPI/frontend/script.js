const API_URL = "http://localhost:3000/students";


// ADD STUDENT
document.getElementById("studentForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        age: Number(document.getElementById("age").value),
        course: document.getElementById("course").value,
        email: document.getElementById("email").value
    };

    try {

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to add student");
            return;
        }

        alert("Student added successfully!");

        document.getElementById("studentForm").reset();

        getStudents();

    } catch (error) {

        alert("Cannot connect to the backend.");

        console.error(error);
    }
});


// GET ALL STUDENTS
async function getStudents() {

    try {

        const response = await fetch(API_URL);

        const students = await response.json();

        const studentList = document.getElementById("studentList");

        studentList.innerHTML = "";

        if (students.length === 0) {

            studentList.innerHTML = "<p>No students found.</p>";

            return;
        }

        students.forEach(student => {

            const card = document.createElement("div");

            card.className = "student-card";

            card.innerHTML = `
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Age:</strong> ${student.age}</p>
                <p><strong>Course:</strong> ${student.course}</p>
                <p><strong>Email:</strong> ${student.email}</p>

                <button class="edit-btn"
                    onclick="updateStudent('${student._id}', '${student.name}', ${student.age}, '${student.course}', '${student.email}')">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent('${student._id}')">
                    Delete
                </button>
            `;

            studentList.appendChild(card);
        });

    } catch (error) {

        document.getElementById("studentList").innerHTML =
            "<p>Cannot connect to the backend.</p>";

        console.error(error);
    }
}


// DELETE STUDENT
async function deleteStudent(id) {

    const confirmDelete = confirm("Are you sure you want to delete this student?");

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to delete student");
            return;
        }

        alert("Student deleted successfully!");

        getStudents();

    } catch (error) {

        alert("Cannot connect to the backend.");

        console.error(error);
    }
}


// UPDATE STUDENT
async function updateStudent(id, oldName, oldAge, oldCourse, oldEmail) {

    const name = prompt("Enter student name:", oldName);

    if (name === null) return;

    const age = prompt("Enter student age:", oldAge);

    if (age === null) return;

    const course = prompt("Enter student course:", oldCourse);

    if (course === null) return;

    const email = prompt("Enter student email:", oldEmail);

    if (email === null) return;

    const updatedStudent = {
        name: name,
        age: Number(age),
        course: course,
        email: email
    };

    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStudent)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Failed to update student");
            return;
        }

        alert("Student updated successfully!");

        getStudents();

    } catch (error) {

        alert("Cannot connect to the backend.");

        console.error(error);
    }
}
const name1 = document.querySelector("#courseName");
const description = document.querySelector("#courseDescription");
const price = document.querySelector("#coursePrice");
const category = document.querySelector("#courseCategory");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");
const deleteall = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");
let courses = [];

if (localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
    displayCourses();
}

addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Validation for course name
    if (!/^[A-Z][a-z]{3,10}$/.test(name1.value)) {
        alert("Course name must start with a capital letter and have 3-10 characters.");
        return;
    }

    // Validation for price
    if (!/^[0-9]{1,3}$/.test(price.value)) {
        alert("Price must be a number with at least 1 digit and a maximum of 3 digits.");
        return;
    }

    // Validation for category
    if (!/^[A-Z][a-z]{3,10}$/.test(category.value)) {
        alert("Category must start with a capital letter and have 3-10 characters.");
        return;
    }

    // Validation for capacity
    if (!/^[0-9]{1,3}$/.test(capacity.value)) {
        alert("Capacity must be a number with at least 1 digit and a maximum of 3 digits.");
        return;
    }

    // Validation for description
    if (!/^[A-Z][a-z]{10,100}$/.test(description.value)) {
        alert("Description must start with a capital letter and have 10-100 characters.");
        return;
    }

    // If all validations pass, add the course
    const course = {
        name: name1.value,
        description: description.value.trim(),
        price: price.value,
        category: category.value,
        capacity: capacity.value,
    };

    courses.push(course);
    localStorage.setItem("courses", JSON.stringify(courses));

    Swal.fire({
        title: "هل تريد الاستمرار؟",
        icon: "question",
        iconHtml: "؟",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
        showCancelButton: true,
        showCloseButton: true,
    });

    displayCourses();

    // Clear form inputs
    name1.value = "";
    description.value = "";
    price.value = "";
    category.value = "";
    capacity.value = "";
});

function displayCourses() {
    const dataContainer = document.querySelector("#data");
    dataContainer.innerHTML = ""; // Clear existing rows

    dataContainer.innerHTML = courses
        .map((course, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.category}</td>
                    <td>${course.price}</td>
                    <td>${course.description}</td>
                    <td>${course.capacity}</td>
                    <td><button class="btn btn-warning btn-sm" onclick="updateCourse(${index})">Update</button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteCourse(${index})">Delete</button></td>
                </tr>
            `;
        })
        .join("");
}

function deleteCourse(index) {
    courses.splice(index, 1); // Remove the course from the array
    localStorage.setItem("courses", JSON.stringify(courses)); // Update localStorage
    displayCourses(); // Refresh the table
}

deleteall.addEventListener("click", function () {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete all!",
        cancelButtonText: "No, cancel!",
    }).then((result) => {
        if (result.isConfirmed) {
            courses = []; // Remove all courses from the array
            localStorage.setItem("courses", JSON.stringify(courses)); // Update localStorage
            displayCourses(); // Refresh the table
            Swal.fire("Deleted!", "All courses have been deleted.", "success");
        }
    });
});

search.addEventListener("input", function () {
    const keyword = search.value.toLowerCase();
    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(keyword)
    );

    const dataContainer = document.querySelector("#data");
    dataContainer.innerHTML = filteredCourses
        .map((course, index) => {
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${course.name}</td>
                    <td>${course.category}</td>
                    <td>${course.price}</td>
                    <td>${course.description}</td>
                    <td>${course.capacity}</td>
                    <td><button class="btn btn-warning btn-sm" onclick="updateCourse(${index})">Update</button></td>
                    <td><button class="btn btn-danger btn-sm" onclick="deleteCourse(${index})">Delete</button></td>
                </tr>
            `;
        })
        .join("");
});

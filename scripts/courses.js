const courses = [
    {
        code: "WDD 130",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 131",
        credits: 2,
        completed: true
    },
    {
        code: "WDD 231",
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#web-cert2");
const buttons = document.querySelectorAll(".web-cert1 button");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.credits} credits</p>
        `;

        courseContainer.appendChild(courseCard);
    });

    displayCredits(courseList);
}

function displayCredits(courseList) {

    const totalCredits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    const creditText = document.createElement("p");

    creditText.classList.add("total-credits");

    creditText.textContent =
        `The total credits for courses listed above is ${totalCredits}`;

    courseContainer.appendChild(creditText);
}


buttons.forEach(button => {

    button.addEventListener("click", () => {

        const selection = button.textContent;

        let filteredCourses;

        if (selection === "WDD") {

            filteredCourses = courses.filter(course =>
                course.code.startsWith("WDD")
            );

        } else if (selection === "CSE") {

            filteredCourses = courses.filter(course =>
                course.code.startsWith("CSE")
            );

        } else {

            filteredCourses = courses;
        }

        displayCourses(filteredCourses);
    });
});


displayCourses(courses);
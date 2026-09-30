// Select the modal
const courseDetails = document.querySelector("#course-details");

// Function to display the course details
function displayCourseDetails(course) {

    courseDetails.innerHTML = `
        <button id="closeModal">❌</button>

        <h2>${course.subject} ${course.number}</h2>

        <h3>${course.title}</h3>

        <p><strong>Credits:</strong> ${course.credits}</p>

        <p><strong>Certificate:</strong> ${course.certificate}</p>

        <p>${course.description}</p>

        <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
    `;

    // Open the modal
    courseDetails.showModal();

    // Select the close button
    const closeModal = document.querySelector("#closeModal");

    // Close the modal
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}


// TEST THE MODAL
displayCourseDetails({
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 3,
    certificate: "Web and Computer Programming",
    description: "This course teaches the fundamentals of web development using HTML, CSS, and JavaScript.",
    technology: ["HTML", "CSS", "JavaScript"]
});
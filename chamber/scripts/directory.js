// ------------------------------
// HAMBURGER MENU
// ------------------------------

const menuButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".nav-bar");

menuButton.addEventListener("click", () => {
    navBar.classList.toggle("show");
});


// ------------------------------
// MEMBER DIRECTORY
// ------------------------------

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");


async function loadMembers() {

    try {
        const response = await fetch("data/members.json");

        console.log("Status:", response.status);
        console.log("URL:", response.url);

        const data = await response.json();

        data.forEach(member => {

            const card = document.createElement("article");

            card.classList.add("member-card");

            let membershipLevel;

            if (member.membership === 1) {
                membershipLevel = "Member";
            } else if (member.membership === 2) {
                membershipLevel = "Silver";
            } else if (member.membership === 3) {
                membershipLevel = "Gold";
            } else {
                membershipLevel = "Non member";
            }

            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" width="100" height="80">

                <div class="member-info">
                    <h2>${member.name}</h2>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank" rel="noopener noreferrer">
                        Visit Website
                    </a>
                    <p>Membership Level: ${membershipLevel}</p>
                </div>
            `;

            membersContainer.appendChild(card);

            console.log(member.name);
        });

    } catch (error) {
        console.error("Error loading members:", error);
    }
}


// Load the members
loadMembers();


// ------------------------------
// GRID AND LIST VIEW
// ------------------------------

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});


// ------------------------------
// FOOTER INFORMATION
// ------------------------------

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    document.lastModified;
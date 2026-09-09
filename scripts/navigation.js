const hamButton = document.querySelector("#hm-btn");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("show");

    if (navigation.classList.contains("show")) {
        hamButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        hamButton.setAttribute("aria-label", "Open navigation menu");
    }
});
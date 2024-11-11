let visiters = JSON.parse(localStorage.getItem('visiters')) || []

const button = document.querySelector(".btn");
const nameVisiter = document.getElementById('name_visiter');
const surenameVisiter = document.getElementById('surename_visiter');
const age = document.getElementById('age');
const gender = document.getElementById('gender');
const formVisiterLastVisiter = document.querySelector(".form_visiter_last_visiter")

export function saveVisiters(visiter) {
    let savedVisiters = JSON.parse(localStorage.getItem('visiters')) || [];
    savedVisiters.push(visiter);
    localStorage.setItem('visiters', JSON.stringify(savedVisiters));
}

export function loadVisiters() {
    return JSON.parse(localStorage.getItem('visiters')) || [];
}

const displayVisiter = () => {
    const visitersFromStorage = loadVisiters();

    if (visiters.length === 0) {
        formVisiterLastVisiter.innerHTML = "Visiters haven't added yet";
        return;
    }

    let i = visiters.length - 1

    formVisiterLastVisiter.innerHTML = "";

    const lastVisiter = document.createElement('div');

    lastVisiter.innerHTML = `
        <div class="name">
            <h3>Name</h3>
            <h4>${visitersFromStorage[i].name}</h4>
        </div>
        <div class="surename">
            <h3>Surename</h3>
            <h4>${visitersFromStorage[i].surename}</h4>
        </div>
        <div class="age">
            <h3>Age</h3>
            <h4>${visitersFromStorage[i].age}</h4>
        </div>
        <div class="gender">
            <h3>Gender</h3>
            <h4>${visitersFromStorage[i].gender}</h4>
        </div>
    `;

    formVisiterLastVisiter.append(lastVisiter)
}

button.addEventListener('click', (event) => {
    event.preventDefault();

    if (nameVisiter.value !== "" && surenameVisiter.value !== "" && age.value !== "") {
        if (gender.value === "") {
            gender.value = "None";
        }

        const newVisiter = {
            name: nameVisiter.value,
            surename: surenameVisiter.value,
            age: age.value,
            gender: gender.value,
            bookTook: "",
            points: 0
        };
        visiters.push(newVisiter);
        saveVisiters(newVisiter)

        nameVisiter.value = "";
        surenameVisiter.value = "";
        age.value = "";
        gender.value = "";

        displayVisiter()
    }
    else {
        alert("You have to enter at least the name,surename and year.");
        return;
    }
});

displayVisiter()

export default visiters
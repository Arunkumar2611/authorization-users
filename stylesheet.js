
// import axios from "axios";

var myForm = document.getElementById("myForm");
var result = document.getElementById("result");
function submitForm(event) {
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    console.log(firstname, lastname);
    const data = {
        firstname: firstname,
        lastname: lastname
    }
    // fetchUsers()
    createUser(data)
    event.preventDefault();
}

const createLi = user => {
    const li = document.createElement('li')
    // add user details to `li`
    li.textContent = `${user._id}: ${user.firstname} ${user.lastname}`
    return li
}

const appendToDOM = users => {
    const ul = document.querySelector('ul')
    //iterate over all users
    users.map(user => {
        ul.appendChild(createLi(user))
    })
}

const fetchUsers = () => {
    const url = {
        method: 'get',
        url: 'http://localhost:5000/users',
        headers: { 'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNhYzNiYjRlMzBkZjkwMzdkZmRkYTA0IiwiZW1haWwiOiJhcnVuLmt1bWFyQGdtYWlsLmNvbSIsImlhdCI6MTY3Mzc3NjAzOCwiZXhwIjoxNjczNzc5NjM4fQ.oqkKViCvqvjZ-rIpNDe-hfUtXL6hOmLCEFAvJlxcTwY' }
    }
    axios(url)
        .then(response => {
            const users = response.data
            console.log(response);
            console.log(`GET list users`, users)
            // append to DOM
            appendToDOM(users)
        })
        .catch(error => console.error(error))
}

const createUser = user => {
    const url = {
        method: 'post',
        url: 'http://localhost:5000/user',
        headers: { 'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNhYzNiYjRlMzBkZjkwMzdkZmRkYTA0IiwiZW1haWwiOiJhcnVuLmt1bWFyQGdtYWlsLmNvbSIsImlhdCI6MTY3Mzc3NjAzOCwiZXhwIjoxNjczNzc5NjM4fQ.oqkKViCvqvjZ-rIpNDe-hfUtXL6hOmLCEFAvJlxcTwY' },
        data: user
    }
    axios(url)
        .then(response => {
            const addedUser = response.data
            console.log(`POST: user is added`, addedUser)
            // append to DOM
            appendToDOM([addedUser])
        })
        .catch(error => console.error(error))
}
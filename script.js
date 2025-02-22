let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (!username || !password) {
        message.textContent = 'Please enter both username and password.';
        return;
    }

    if (!users[username]) {
        users[username] = {
            password: password,
            series: []
        };
        message.textContent = 'Account created! Logging in...';
    } else if (users[username].password !== password) {
        message.textContent = 'Incorrect password.';
        return;
    } else {
        message.textContent = 'Logged in successfully!';
    }

    currentUser = username;
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('tracker-container').style.display = 'block';
    document.getElementById('current-user').textContent = username;
    loadSeries();
}

function logout() {
    currentUser = null;
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('tracker-container').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('message').textContent = '';
}

function addSeries() {
    const name = document.getElementById('series-name').value;
    const season = parseInt(document.getElementById('season').value);

    if (!name || !season) {
        alert('Please enter a series name and season.');
        return;
    }

    const series = {
        name: name,
        season: season,
        episode: 1
    };

    users[currentUser].series.push(series);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('series-name').value = '';
    document.getElementById('season').value = '';
    loadSeries();
}

function loadSeries() {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = '';

    users[currentUser].series.forEach((series, index) => {
        const div = document.createElement('div');
        div.className = 'series';
        div.innerHTML = `
            <h3>${series.name} - Season ${series.season}, Episode ${series.episode}</h3>
            <button class="finished-btn" onclick="finishEpisode(${index})">Finished Episode</button>
            <button class="delete-btn" onclick="deleteSeries(${index})">Delete Series</button>
        `;
        seriesList.appendChild(div);
    });
}

function finishEpisode(index) {
    users[currentUser].series[index].episode++;
    localStorage.setItem('users', JSON.stringify(users));
    loadSeries();
}

function deleteSeries(index) {
    users[currentUser].series.splice(index, 1); // Remove the series at the given index
    localStorage.setItem('users', JSON.stringify(users));
    loadSeries(); // Refresh the list
}
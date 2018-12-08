////ATTENDANCE_SENATE_BOTTOM_AND_TOP///--->

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: {
        'X-API-KEY': '74EEGbR5Xu3jVEAIldO4M6hBtfRGvOsQepPa802Y'
    }
}).then(function(response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);

}).then(function(json) {

    data = json;
    init2(data.results[0].members);


}).catch(function(error) {
    console.log('Request field: ' + error.message);
});

function init2(members) {
    createTableBottomAttendance();
    createTableTopAttendance();

}

//10% Sorting//
// 0 --> 100 ATTENDANCE
function createTableBottomAttendance() {
    data.results[0].members.sort(function(member1, member2) {
        return member1.missed_votes_pct - member2.missed_votes_pct;

    })

    var missVotesPct = [];
    for (var i = 0; i < 11; i++) {
        missVotesPct.push(data.results[0].members[i])
    }
    var tbody = document.getElementById("tbodyTop");
    tbody.innerHTML = "";
    for (var i = 0; i < missVotesPct.length; i++) {
        var hex = '%'.charCodeAt().toString();

        var tr = document.createElement('tr');
        tbody.appendChild(tr);

        var tdName = document.createElement('td');
        tr.appendChild(tdName);

        var link = document.createElement('a');
        link.setAttribute('href', missVotesPct[i].url);
        link.textContent = (missVotesPct[i].first_name + ' ' + (missVotesPct[i].middle_name || "") + ' ' + missVotesPct[i].last_name);
        tdName.appendChild(link);

        var numMissVotes = document.createElement('td');
        numMissVotes.textContent = missVotesPct[i].missed_votes;
        tr.appendChild(numMissVotes);

        var pctMissVotes = document.createElement('td');
        pctMissVotes.textContent = missVotesPct[i].missed_votes_pct + String.fromCharCode(hex);
        tr.appendChild(pctMissVotes);


    }
}

//100 --> 0 ATTENDANCE
function createTableTopAttendance() {
    data.results[0].members.sort(function(member1, member2) {
        return member2.missed_votes_pct - member1.missed_votes_pct;

    })

    var missVotesPctMAX = [];
    for (var i = 0; i < 11; i++) {
        missVotesPctMAX.push(data.results[0].members[i])
    }

    var tbody = document.getElementById("tbodyBottom");
    tbody.innerHTML = "";
    for (var i = 0; i < missVotesPctMAX.length; i++) {
        var hex = '%'.charCodeAt().toString();

        var tr = document.createElement('tr');
        tbody.appendChild(tr);

        var tdName = document.createElement('td');
        tr.appendChild(tdName);

        var link = document.createElement('a');
        link.setAttribute('href', missVotesPctMAX[i].url);
        link.textContent = (missVotesPctMAX[i].first_name + ' ' + (missVotesPctMAX[i].middle_name || "") + ' ' + missVotesPctMAX[i].last_name);
        tdName.appendChild(link);

        var numMissVotes = document.createElement('td');
        numMissVotes.textContent = missVotesPctMAX[i].missed_votes;
        tr.appendChild(numMissVotes);

        var pctMissVotes = document.createElement('td');
        pctMissVotes.textContent = missVotesPctMAX[i].missed_votes_pct + String.fromCharCode(hex);
        tr.appendChild(pctMissVotes);


    }
}
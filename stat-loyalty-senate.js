////LOYALTY_SENATE//---->

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
    createTableBottomLoyalty();
    createTableTopToBottomLoyalty();

}

//// 0 --> 100 LOYALTY
function createTableBottomLoyalty() {

    data.results[0].members.sort(function(member1, member2) {
        return member1.votes_with_party_pct - member2.votes_with_party_pct;

    })

    var VotesPartyPct = [];
    for (var i = 0; i < 11; i++) {
        VotesPartyPct.push(data.results[0].members[i])
    }
    var tbody = document.getElementById("tbodyTopL");
    tbody.innerHTML = "";
    for (var i = 0; i < VotesPartyPct.length; i++) {
        var hex = '%'.charCodeAt().toString();

        var tr = document.createElement('tr');
        tbody.appendChild(tr);

        var tdName = document.createElement('td');
        tr.appendChild(tdName);

        var link = document.createElement('a');
        link.setAttribute('href', VotesPartyPct[i].url);
        link.textContent = (VotesPartyPct[i].first_name + ' ' + (VotesPartyPct[i].middle_name || "") + ' ' + VotesPartyPct[i].last_name);
        tdName.appendChild(link);

        var numMissVotes = document.createElement('td');
        numMissVotes.textContent = VotesPartyPct[i].total_votes;
        tr.appendChild(numMissVotes);

        var pctMissVotes = document.createElement('td');
        pctMissVotes.textContent = VotesPartyPct[i].votes_with_party_pct + String.fromCharCode(hex);
        tr.appendChild(pctMissVotes);

    }
}



//100 --> 0 LOYALTY
function createTableTopToBottomLoyalty() {
    data.results[0].members.sort(function(member1, member2) {
        return member2.votes_with_party_pct - member1.votes_with_party_pct;

    })

    var VotesPartyPctMAX = [];
    for (var i = 0; i < 11; i++) {
        VotesPartyPctMAX.push(data.results[0].members[i])
    }
    var tbody = document.getElementById("tbodyBottomL");
    tbody.innerHTML = "";
    for (var i = 0; i < VotesPartyPctMAX.length; i++) {
        var hex = '%'.charCodeAt().toString();

        var tr = document.createElement('tr');
        tbody.appendChild(tr);

        var tdName = document.createElement('td');
        tr.appendChild(tdName);

        var link = document.createElement('a');
        link.setAttribute('href', VotesPartyPctMAX[i].url);
        link.textContent = (VotesPartyPctMAX[i].first_name + ' ' + (VotesPartyPctMAX[i].middle_name || "") + ' ' + VotesPartyPctMAX[i].last_name);
        tdName.appendChild(link);

        var numMissVotes = document.createElement('td');
        numMissVotes.textContent = VotesPartyPctMAX[i].total_votes;
        tr.appendChild(numMissVotes);

        var pctMissVotes = document.createElement('td');
        pctMissVotes.textContent = VotesPartyPctMAX[i].votes_with_party_pct + String.fromCharCode(hex);
        tr.appendChild(pctMissVotes);

    }
}
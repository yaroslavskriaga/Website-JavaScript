//HOUSE_GLANCE//------------->


//JSON STATISTICS///
var statistics = {
    members_number_democrats: 0,
    members_number_republicans: 0,
    members_number_independents: 0,
    total_members: 0,
    total_voted_party: 0,
    avarage_democrats: 0,
    avarage_independents: 0,
    avarage_republicans: 0
};


fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
    init(data.results[0].members);


}).catch(function(error) {
    console.log('Request field: ' + error.message);
});


function init(members) {
    totalNumber(members);
    createTableNum(statistics);
}




function totalNumber(members) {
    var demNum = [];
    var repNum = [];
    var indNum = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == 'D') {
            demNum.push(members[i])
        } else if (members[i].party == 'R') {
            repNum.push(members[i])
        } else if (members[i].party == 'I') {
            indNum.push(members[i])
        }
    }
    if (indNum.length == 0) {
        statistics.members_number_independents = 0;
        statistics.total_voted_party = 0;
        statistics.avarage_independents = 0;
        statistics.total_voted_party = (((avarageAndSum(repNum)) + (avarageAndSum(demNum))) / 2);
    } else {
        statistics.members_number_independents = indNum.length
        statistics.total_voted_party = ((avarageAndSum(indNum) + avarageAndSum(repNum) + avarageAndSum(demNum)) / 3);
        statistics.avarage_independents = avarageAndSum(indNum);
    }

    statistics.members_number_democrats = demNum.length;
    statistics.members_number_republicans = repNum.length;
    statistics.total_members = members.length;
    statistics.avarage_democrats = avarageAndSum(demNum)
    statistics.avarage_republicans = avarageAndSum(repNum);
}

function avarageAndSum(members) {
    var sumMembers = 0;

    for (var i = 0; i < members.length; i++) {
        sumMembers = (members[i].votes_with_party_pct + sumMembers)
    }

    return (sumMembers / members.length);
}


//glance_table//

function createTableNum(statistics) {
    var tdDemocrats = document.getElementById("Dem");
    var tdRepublicans = document.getElementById("Rep");
    var tdIndependents = document.getElementById("Ind");
    var tdPartyDem = document.getElementById("Dem");
    var tdPartyRep = document.getElementById("Rep");
    var tdPartyInd = document.getElementById("Ind");
    var tdTotal = document.getElementById("Total");

    var hex = '%'.charCodeAt().toString();

    var tdNumDemocrats = document.createElement('td');
    var tdPartyNumDem = document.createElement('td');
    tdNumDemocrats.textContent = statistics.members_number_democrats
    tdPartyNumDem.textContent = statistics.avarage_democrats.toString().slice(0, 5) + String.fromCharCode(hex);
    tdDemocrats.appendChild(tdNumDemocrats);
    tdPartyDem.appendChild(tdPartyNumDem);


    var tdNumRepublicans = document.createElement('td');
    var tdPartyNumRep = document.createElement('td');
    tdNumRepublicans.textContent = statistics.members_number_republicans
    tdPartyNumRep.textContent = statistics.avarage_republicans.toString().slice(0, 5) + String.fromCharCode(hex);
    tdRepublicans.appendChild(tdNumRepublicans);
    tdPartyRep.appendChild(tdPartyNumRep);

    var tdNumIndependents = document.createElement('td');
    var tdPartyNumInd = document.createElement('td');
    tdNumIndependents.textContent = statistics.members_number_independents
    tdPartyNumInd.textContent = statistics.avarage_independents.toString().slice(0, 5) + String.fromCharCode(hex);
    tdIndependents.appendChild(tdNumIndependents);
    tdPartyInd.appendChild(tdPartyNumInd);


    var tdNumTotal = document.createElement('td');
    var tdVotedPct = document.createElement('td');
    tdVotedPct.textContent = statistics.total_members;
    tdTotal.appendChild(tdVotedPct);
    tdNumTotal.textContent = statistics.total_voted_party.toString().slice(0, 5) + String.fromCharCode(hex);
    tdTotal.appendChild(tdNumTotal);

}
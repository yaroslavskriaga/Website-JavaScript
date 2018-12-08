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
    init(data.results[0].members);


}).catch(function(error) {
    console.log('Request field: ' + error.message);
});


function init(members) {
    createTable(members);
    filterMembers(members);
    createFilterByState(members);
    filterByState(members);
}


function createTable(members) {
    var tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
    for (var i = 0; i < members.length; i++) {
        var hex = '%'.charCodeAt().toString();

        var tr = document.createElement('tr');

        var tdName = document.createElement('td');
        tr.appendChild(tdName);

        var link = document.createElement('a');
        link.setAttribute('href', members[i].url);
        link.textContent = (members[i].first_name + ' ' + (members[i].middle_name || "") + ' ' + members[i].last_name);
        tdName.appendChild(link);

        var tdParty = document.createElement('td');
        tdParty.textContent = members[i].party;
        tr.appendChild(tdParty);

        var tdState = document.createElement('td');
        tdState.textContent = members[i].state
        tr.appendChild(tdState);

        var tdOffice = document.createElement('td');
        tdOffice.textContent = members[i].seniority
        tr.appendChild(tdOffice);

        var tdVotes = document.createElement('td');
        tdVotes.textContent = members[i].votes_with_party_pct + String.fromCharCode(hex);
        tr.appendChild(tdVotes);

        tbody.appendChild(tr);

    }

}



function filterMembers(members) {

    var checkBoxR = document.getElementById('Republican');
    var checkBoxD = document.getElementById('Democrat');
    var checkBoxI = document.getElementById('Independent');
    var newArray = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == 'R' && checkBoxR.checked) {
            newArray.push(members[i]);
        } else if (members[i].party == 'D' && checkBoxD.checked) {
            newArray.push(members[i]);
        } else if (members[i].party == 'I' && checkBoxI.checked) {
            newArray.push(members[i]);
        } else if (!checkBoxR.checked && !checkBoxD.checked && !checkBoxI.checked) {
            newArray.push(members[i]);
        }
    }

    filterByState(newArray);

}

document.getElementById('Republican').addEventListener("click", function() {
    filterMembers(data.results[0].members);


});
document.getElementById('Democrat').addEventListener("click", function() {

    filterMembers(data.results[0].members);

});
document.getElementById('Independent').addEventListener("click", function() {

    filterMembers(data.results[0].members);

});








function createFilterByState(members) {
    var stateArray = [];
    var newStateArray = [];

    for (var i = 0; i < members.length; i++) {
        stateArray.push(members[i].state)

    }

    stateArray.sort()
    for (var i = 0; i < stateArray.length; i++) {
        if (stateArray[i] != stateArray[i + 1]) {
            newStateArray.push(stateArray[i]);
        }
    }
    for (var i = 0; i < newStateArray.length; i++) {
        var options = document.getElementById('dropDown');
        var createOptions = document.createElement('option');
        createOptions.innerHTML = newStateArray[i];
        options.appendChild(createOptions);
        createOptions.value = newStateArray[i];
    }
}





function filterByState(members) {

    var options = document.getElementById('dropDown').value;

    var filteredArray = [];
    for (var i = 0; i < members.length; i++) {
        if (members[i].state == options || options == 'All') {
            filteredArray.push(members[i])
        }
    }
    createTable(filteredArray);
}


document.getElementById('dropDown').addEventListener("change", function() {
    init(data.results[0].members);
});
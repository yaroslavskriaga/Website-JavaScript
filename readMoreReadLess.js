function myFunction(id) {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    var dots2 = document.getElementById("dots2");
    var moreText2 = document.getElementById("more2");
    var btnText2 = document.getElementById("myBtn2");


    if (id == "myBtn" && dots.style.display !== "none") {
        dots.style.display = "none";
        moreText.style.display = "inline";
        btnText.innerHTML = "Read Less";
    } else if (id == "myBtn" && dots.style.display == "none") {
        dots.style.display = "inline";
        moreText.style.display = "none";
        btnText.innerHTML = "Read More";
    } else if (id == "myBtn2" && dots2.style.display !== "none") {
        btnText2.innerHTML = "Read Less";
        dots2.style.display = "none";
        moreText2.style.display = "inline";
    } else if (id == "myBtn2" && dots2.style.display == "none") {
        dots2.style.display = "inline";
        btnText2.innerHTML = "Read More";
        moreText2.style.display = "none";
    }


}

document.getElementById('myBtn').addEventListener("click", function() {

    myFunction('myBtn');

});

document.getElementById('myBtn2').addEventListener("click", function() {

    myFunction('myBtn2');

});
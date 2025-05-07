function openFeatures() {
    let allElems = document.querySelectorAll(".elem");
    let allFullElems = document.querySelectorAll(".fullElem");
    let allElemsContainer = document.querySelector(".allElems");
    let allFullElemsBackBtn = document.querySelectorAll(".fullElem .back");

    allElems.forEach(function (elem, index) {
        elem.addEventListener("click", function () {
            // Hide grid cards
            allElemsContainer.style.display = "none";

            // Show the clicked fullElem section
            allFullElems[index].style.display = "flex";
        });
    });

    allFullElemsBackBtn.forEach(function (btn, index) {
        btn.addEventListener("click", function () {
            // Hide current fullElem section
            allFullElems[index].style.display = "none";

            // Show the cards container again
            allElemsContainer.style.display = "flex";
        });
    });

}
openFeatures();
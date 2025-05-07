let allElems = document.querySelectorAll(".elem");
let allFullElems = document.querySelectorAll(".fullElem");
let allElemsContainer = document.querySelector(".allElems");

allElems.forEach(function(elem) {
  elem.addEventListener("click", function() {
    // Hide all .fullElem sections first
    allFullElems.forEach(section => section.style.display = "none");

    allElemsContainer.style.display = "none";
    allFullElems[elem.id].style.display = "block";
  });
});

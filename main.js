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

const form = document.querySelector('.addTask form');
  const taskInput = form.querySelector('input');
  const taskDetails = form.querySelector('textarea');
  const taskContainer = document.querySelector('.allTask');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskInput.value.trim();
    const details = taskDetails.value.trim();

    if (title === '') return; // stop being lazy and name your task 🫵

    // 🧱 Create parent task block
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task flex flex-col gap-2 bg-[#F8F3ED] px-4 py-4 mb-3 rounded-lg shadow';

    // 🔠 Title + button row
    const topRow = document.createElement('div');
    topRow.className = 'flex justify-between items-center';

    const titleElem = document.createElement('h5');
    titleElem.className = 'text-[#7A6855] text-lg font-medium';
    titleElem.textContent = title;

    const button = document.createElement('button');
    button.className = 'bg-green-600 rounded-lg text-white px-4 py-2 text-sm sm:text-base shadow-md hover:bg-green-700 active:scale-[0.95] transition-all duration-200 ease-in-out';
    button.textContent = 'Mark as Completed';

    // 📜 Description block
    const descPara = document.createElement('p');
    descPara.className = 'text-[#A88B6B] text-sm sm:text-base';
    descPara.textContent = details || 'No extra details provided';

    // 🔧 Append them right
    topRow.appendChild(titleElem);
    topRow.appendChild(button);
    taskDiv.appendChild(topRow);
    taskDiv.appendChild(descPara);
    taskContainer.appendChild(taskDiv);

    // 🔄 Reset form
    taskInput.value = '';
    taskDetails.value = '';
  });
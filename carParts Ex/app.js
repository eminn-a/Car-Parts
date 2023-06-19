window.addEventListener("load", solve);

function solve() {
  //get elements
  let carModel = document.getElementById("car-model");
  let carYear = document.getElementById("car-year");
  let partName = document.getElementById("part-name");
  let partNumber = document.getElementById("part-number");
  let condition = document.getElementById("condition");
  //button
  document.getElementById("next-btn").addEventListener("click", getData);

  //get section
  let nextSection = document.querySelector("ul");

  let finalSection = document.getElementsByClassName("confirm-list")[0];

  function getData(e) {
    e.preventDefault();
    let carModelValue = carModel.value;
    let carYearValue = Number(carYear.value);
    let partNameValue = partName.value;
    let partNumberValue = partNumber.value;
    let conditionValue = condition.value;

    if (
      !carModelValue ||
      !carYearValue ||
      !partNameValue ||
      !partNumberValue ||
      !conditionValue
    ) {
      return;
    }

    if (carYearValue < 1980 || carYearValue > 2023) {
      return;
    }

    createElements(
      carModelValue,
      carYearValue,
      partNameValue,
      partNumberValue,
      conditionValue
    );
  }
  function createElements(
    carModelValue,
    carYearValue,
    partNameValue,
    partNumberValue,
    conditionValue
  ) {
    //create elements
    let li = document.createElement("li");
    li.classList.add("part-content");
    let article = document.createElement("article");

    let modelP = document.createElement("p");
    modelP.textContent = `Car Model: ${carModelValue}`;
    let yearP = document.createElement("p");
    yearP.textContent = `Car Year: ${carYearValue}`;
    let partNameP = document.createElement("p");
    partNameP.textContent = `Part Name: ${partNameValue}`;
    let partNumberP = document.createElement("p");
    partNumberP.textContent = `Part Number: ${partNumberValue}`;
    let conditionP = document.createElement("p");
    conditionP.textContent = `Condition: ${conditionValue}`;
    // create buttons
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    let continueBtn = document.createElement("button");
    continueBtn.classList.add("continue-btn");
    continueBtn.textContent = "Continue";
    //append childs
    article.appendChild(modelP);
    article.appendChild(yearP);
    article.appendChild(partNameP);
    article.appendChild(partNumberP);
    article.appendChild(conditionP);
    li.appendChild(article);
    li.appendChild(editBtn);
    li.appendChild(continueBtn);
    nextSection.appendChild(li);
    //needed parameters idk why

    document.getElementById("complete-img").style.visibility = "hidden";
    document.getElementById("complete-text").textContent = "";
    document.getElementById("next-btn").disabled = true;
    carModel.value = "";
    carYear.value = "";
    partName.value = "";
    partNumber.value = "";
    condition.value = "";

    editBtn.addEventListener("click", () => {
      carModel.value = carModelValue;
      carYear.value = carYearValue;
      partName.value = partNameValue;
      partNumber.value = partNumberValue;
      condition.value = conditionValue;
      document.getElementById("next-btn").disabled = false;
      li.remove();
    });

    continueBtn.addEventListener("click", () => {
      finalSection.appendChild(li);
      let buttons = document
        .getElementsByClassName("confirm-list")[0]
        .querySelectorAll("button");
      for (let btn of buttons) {
        btn.remove();
      }
      //create new buttons
      let confirmBtn = document.createElement("button");
      confirmBtn.classList.add("confirm-btn");
      confirmBtn.textContent = "Confirm";
      let cancleBtn = document.createElement("button");
      cancleBtn.classList.add("cancel-btn");
      cancleBtn.textContent = "Cancel";
      article.appendChild(confirmBtn);
      article.appendChild(cancleBtn);

      confirmBtn.addEventListener("click", () => {
        li.remove();
        document.getElementById("next-btn").disabled = false;
        document.getElementById("complete-img").style.visibility = "visible";
        document.getElementById("complete-text").textContent =
          "Part is Ordered!";
      });
      cancleBtn.addEventListener("click", () => {
        li.remove();
        document.getElementById("next-btn").disabled = false;
      });
    });
  }
}

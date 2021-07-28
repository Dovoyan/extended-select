

let selectNow;
const state = {};


function drawCard(name, select, selectId) {
    const body = document.querySelector("body");
    const card = document.createElement('div');
    const cardTop = document.createElement('div');
    const cardTopName = document.createElement('div');
    const cardTopSelected = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardBodyInput = document.createElement('input');

    card.classList.add('card');
    cardTop.classList.add('card-top');
    cardTopName.classList.add('card-top-name');
    cardTopSelected.classList.add('card-top-selected');
    cardBody.classList.add('card-body');
    cardBodyInput.classList.add("card-body-input");

    cardBodyInput.addEventListener('click', () => {
        toggleModal();
        setSelectInModal(select, selectId);
    });
    cardTopSelected.addEventListener('click', () => {
        toggleModal();
        setSelectInModal(select, selectId);
    });

    cardTopName.innerHTML = name;
    cardTopSelected.innerHTML = "Показать выбранное (0)";

    cardTop.append(cardTopName);
    cardTop.append(cardTopSelected);
    cardBody.append(cardBodyInput);
    card.append(cardTop);
    card.append(cardBody);
    body.append(card);
}






function selectInit() {
    const allSelect = document.querySelectorAll('.processed');

    allSelect.forEach((element, index) => {

        drawCard("Тендеры в роли Заказчика", element, index)
    });
}



selectInit()





drawModal();

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

function drawModal() {
    const body = document.querySelector("body");
    const modal = document.createElement('div');
    const modalHead = document.createElement('div');
    const modalHeadTitle = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalSearch = document.createElement('div');
    const modalFooter = document.createElement('div');
    const modalSearchInput = document.createElement('input');
    const modalFooterApply = document.createElement('button');
    const modalFooterDelete = document.createElement('button');
    const backArrow = document.createElement('div');

    backArrow.classList.add('backArrow')
    modal.classList.add("modal");
    modal.classList.add("visually-hidden");
    modalHead.classList.add("modal-head");
    modalSearch.classList.add("modal-search");
    modalContent.classList.add("modal-content");
    modalFooter.classList.add("modal-footer");
    modalFooterApply.classList.add("modal-footer-apply");
    modalFooterDelete.classList.add("modal-footer-delete");
    modalSearchInput.classList.add("modal-search-input");


    modalHeadTitle.innerHTML = "Реализуемые товары";
    modalHead.append(backArrow);
    modalHead.append(modalHeadTitle);
    modalFooterApply.innerHTML = "Применить";
    modalFooterDelete.innerHTML = "Очистить";

    backArrow.addEventListener('click', () => {
        toggleModal();
    });

    modalFooterApply.addEventListener('click', () => {
        toggleModal();
        saveChek();
    });

    modalFooterDelete.addEventListener('click', () => {
        deleteChek();
    });

    modalSearchInput.addEventListener('input', () => {
        searchChek(modalSearchInput.value);
    });

    body.append(modal)
    modal.append(modalHead);
    modal.append(modalSearch);
    modal.append(modalContent);
    modalSearch.append(modalSearchInput)
    modal.append(modalFooter);
    modalFooter.append(modalFooterApply);
    modalFooter.append(modalFooterDelete);

}

function toggleModal() {
    document.querySelector('.modal').classList.toggle("visually-hidden");
}

function setSelectInModal(select, selectId) {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = "";
    const toplevel = document.createElement('div');
    let count = 0;
    selectNow = selectId
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].dataset.level == undefined) {
            const newEl = document.createElement('div');
            const wrapEl = document.createElement('div');
            const newLabelEl = document.createElement('label');
            const newCheck = document.createElement('input');
            const hideEl = document.createElement('div');

            newLabelEl.innerHTML = select.options[i].innerHTML;
            newLabelEl.classList.add('modalLabel')

            newCheck.setAttribute("type", "checkbox");
            newCheck.id = `chec${count}`
            newCheck.classList.add('modalInput')
            newLabelEl.htmlFor = `chec${count}`

            hideEl.classList.add('hideChild');
            wrapEl.classList.add('wrapmodal');
            newEl.classList.add('level1');
            newEl.classList.add('levels');
            newLabelEl.style.marginLeft = `30px`
            modalContent.append(newEl);
            newEl.append(wrapEl)
            wrapEl.append(newCheck)
            wrapEl.append(hideEl)
            wrapEl.append(newLabelEl)
            count++
        } else {
            let level = select.options[i].dataset.level;
            levelNum = level;
            level = `level${level - 1}`;


            const pred = document.querySelectorAll(`.${level}`);
            const newEl = document.createElement('div');
            const wrapEl = document.createElement('div');
            const newLabelEl = document.createElement('label');
            const newCheck = document.createElement('input');
            const hideEl = document.createElement('div');

            newCheck.setAttribute("type", "checkbox");
            newCheck.id = `chec${count}`
            newCheck.classList.add('modalInput')
            newLabelEl.htmlFor = `chec${count}`

            hideEl.classList.add('hideChild');
            wrapEl.classList.add('wrapmodal');
            newLabelEl.innerHTML = select.options[i].innerHTML;
            newLabelEl.classList.add('modalLabel')
            newEl.classList.add(`level${select.options[i].dataset.level}`);
            newEl.classList.add(`levels`);
            newLabelEl.style.marginLeft = `${30 * levelNum}px`
            pred[pred.length - 1].append(newEl)
            newEl.append(wrapEl)
            wrapEl.append(newCheck)
            wrapEl.append(hideEl)
            wrapEl.append(newLabelEl)
            count++
        }

    }

    hideEl = document.querySelectorAll('.hideChild')
    hideEl.forEach(element => {
        parent = element.closest('.levels');
        if (parent.querySelector('.levels') == null) {
            element.classList.add('visually-hidden')
        } else {
            element.addEventListener('click', hideChild)
        }

    });


    if (state[selectNow] != undefined) {
        let allInput = document.querySelectorAll('.modalInput')

        allInput.forEach((element, index) => {
            element.checked = state[selectNow][index]
        });

    }
}


function selectInit() {
    const allSelect = document.querySelectorAll('.processed');

    allSelect.forEach((element, index) => {

        drawCard("Тендеры в роли Заказчика", element, index)
    });
}

function saveChek() {
    let countTrue = 0;
    let truearr = [];
    const inputs = document.querySelectorAll('.modalInput');
    let vibtstate = document.querySelectorAll('.card-top-selected');
    let mainOutput = document.querySelectorAll('.card-body-input');
    let allLabels = document.querySelectorAll('.modalLabel');

    let arr = [];
    inputs.forEach(element => {
        arr.push(element.checked)
        if (element.checked == true) {
            countTrue++
            allLabels.forEach(element1 => {
                if (element1.htmlFor == element.id)
                    truearr.push(element1.innerHTML)
            });
        }
    });
    vibtstate[selectNow].innerHTML = `Показать выбранное (${countTrue})`
    if (truearr[0] != undefined) {
        mainOutput[selectNow].value = truearr[0];
    } else {
        mainOutput[selectNow].value = "";
    }
    state[selectNow] = arr

}

function deleteChek() {
    const inputs = document.querySelectorAll('.modalInput');

    inputs.forEach(element => {
        element.checked = false;
    });
}

function searchChek(value) {
    const labels = document.querySelectorAll('.modalLabel');
    const modalContent = document.querySelector('.modal-content');
    if (value != "") {
        labels.forEach(element => {

            if (element.innerHTML.toLowerCase().indexOf(value.toLowerCase()) + 1) {

                element.parentNode.classList.remove('visually-hidden');
            } else {
                element.parentNode.classList.add('visually-hidden');
            }

        });
    } else {
        labels.forEach(element => {
            element.parentNode.classList.remove('visually-hidden');
        });
    }
}

function hideChild() {
    let parent = this.closest('.levels');
    this.classList.toggle('perevorot')
    parent.querySelectorAll('.levels').forEach(element => {
        element.classList.toggle('visually-hidden');

    });


}

selectInit()





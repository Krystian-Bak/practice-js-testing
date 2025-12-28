document.addEventListener('DOMContentLoaded', init);

const alertContainer = document.querySelector('.alert')
const alertMessage = document.querySelector('.alert__message')


alertContainer.addEventListener('click', function(e){
        if(e.target === alertContainer){
            alertContainer.classList.add('alert--hidden')
        }
    })

function showAlert(message){
    alertMessage.textContent = message
    alertContainer.classList.remove('alert--hidden')
}


function init() {

    const clickEl = document.querySelector('.error--click');
    const enterEl = document.querySelector('.error--enter');

    setRandomPosition(clickEl);
    setRandomPosition(enterEl);

    initEventWithError(clickEl, 'click', new RangeError('Błąd zakresu!'));
    initEventWithError(enterEl, 'mouseenter', new TypeError('Błąd typu!'));

}

function setRandomPosition(element, error = null) {
    element.style.top = Math.random() * 600 + 'px';
    element.style.left = Math.random() * 800 + 'px';

    if(error) {
        throw error;
    }
}

function initEventWithError(element, eventName, error) {
    element.addEventListener(eventName, () => {
        try{
            setRandomPosition(element, error)
        } catch(err){
            showAlert("Error: " + err.message)
        }
    })
}





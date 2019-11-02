const cards = document.querySelectorAll('.memory-card');

let hasFilppedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;

    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFilppedCard) {
        hasFilppedCard = true;
        firstCard = this;
        return;
    }    
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCard();
    }else {
        unflipCards();                  
    }
};

function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
};

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);  
};
 
function resetBoard() {
    [hasFilppedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

(function suffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
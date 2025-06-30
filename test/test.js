const button = document.querySelector(".btn");
button.addEventListener("click", result);

const show = document.querySelector(".par");

const greenWorld = document.querySelectorAll(".green");


function result(e) {
    e.preventDefault();

    let points = 0;

    if(document.querySelector("#answer1").checked) {
        points++;
    }
    
    if(document.querySelector("#answer2").checked) {
        points++;
    }
    
    if(document.querySelector("#answer3").checked) {
        points++;
    }
    
    if(document.querySelector("#answer4").checked) {
        points++;
    }
    
    if(document.querySelector("#answer5").checked) {
        points++;
    }
    
    if(document.querySelector("#answer6").checked) {
        points++;
    }
    
    if(document.querySelector("#answer7").checked) {
        points++;
    }
    
    if(document.querySelector("#answer8").checked) {
        points++;
    }
    
    if(document.querySelector("#answer9").checked) {
        points++;
    }
    
    if(document.querySelector("#answer10").checked) {
        points++;
    }

    show.textContent = "Your points: " + points;

    greenWorld.forEach(function(item){
        item.classList.add('greenColor');  
    })
  
    const btnAgain = document.querySelector('.btnAgain');
    btnAgain.addEventListener('click', () => {
        location.reload(); 
    })
    
}











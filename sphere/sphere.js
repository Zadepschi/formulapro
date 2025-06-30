const button = document.querySelector("#btn");
button.addEventListener("click", calculate);


function calculate(e) {
    
    e.preventDefault();

    const inputValue = document.querySelector("#inputValue").value;

    if(inputValue === "" ||  isNaN( inputValue) ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Please enter a value!',
            background: 'black',
            color: 'white'
          })
    }
    
    
    let valueSquare = 4 * Math.PI * Math.pow(inputValue, 2);
    let valueSphere = 4 / 3 * Math.PI * Math.pow(inputValue, 3);
    
    valueSquare = valueSquare.toFixed(2);
    valueSphere = valueSphere.toFixed(2);

    document.querySelector("#square").textContent = valueSquare;
    document.querySelector("#volume").textContent = valueSphere;


}
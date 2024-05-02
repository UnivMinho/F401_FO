//Function to increment/decrement value in the number of volunteers box
document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("volunteersInput");
    const incrementBtn = document.getElementById("incrementBtn");
    const decrementBtn = document.getElementById("decrementBtn");
    
    function incrementValue() {
        const value = parseInt(input.value, 10);
        input.value = value + 1;
    }

    function decrementValue() {
        const value = parseInt(input.value, 10);
        if (value > 1) {
            input.value = value - 1;
        }
    }

    input.value = 5;

    incrementBtn.addEventListener("click", incrementValue);
    decrementBtn.addEventListener("click", decrementValue);
});

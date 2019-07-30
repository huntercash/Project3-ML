// Update the Clock every .1 second.. 
var seconds = 0.1;
// 6/12/2017 1.46 trillion
var startAmount = 1460000000000;
// get todays date
var t1 = new Date();
// day data was pulled
var t2 = new Date(2017, 01, 01, 0, 0, 0, 0);
// subtract the seconds in difference
var dif = t1.getTime() - t2.getTime();

// divide it by 1000
var Seconds_from_T1_to_T2 = dif / 10000;
// get absolute value 
var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
currentDebt = startAmount + (Seconds_Between_Dates * 2853.88);
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
var debtNum = currentDebt.toFixed(2);
document.getElementById("studentDebtClock").innerHTML = `$ ${numberWithCommas(debtNum)}`;

// display the updated numbers
var getDebt = setInterval(function() {
    var startAmount = 1460000000000;
    var t1 = new Date();
    var t2 = new Date(2017, 01, 01, 0, 0, 0, 0);;
    var dif = t1.getTime() - t2.getTime();


    var Seconds_from_T1_to_T2 = dif / 10000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    currentDebt = startAmount + (Seconds_Between_Dates * 2853.88);
    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

var debtNum = currentDebt.toFixed(2);
document.getElementById("studentDebtClock")
    .innerHTML = `$${numberWithCommas(debtNum)}`;
}, seconds * 1000);

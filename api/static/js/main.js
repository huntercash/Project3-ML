// Select the expand symbol on a single generated element 
var expand = d3.select("#select1");

expand.on("click", function() {
    // Prevent Site from Reloading
    d3.event.preventDefault();
    console.log("You're click on a things")
});
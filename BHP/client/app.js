function getBathValue(){
    var uiBathrooms = document.getElementById('uiBathrooms');
    for(var i in uiBathrooms){
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBHKValues(){
    var uiBHK = document.getElementById('uiBHK');
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}
function onClickedEstimatePrice(){
    console.log("Estimate price button clcicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValues();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url ="http://127.0.0.1:5000/predict_home_price";
    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
        console.log(status);
    });
  
}

function onPageLoad(){
    console.log("Document Loaded")
    var url= "http://127.0.0.1:5000/get_location_names";
    $.get(url, function(data,status){
        console.log("Got response for get_location_names request");
        if(data){
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations){
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}



window.onload = onPageLoad;
// function onPageLoad() {
//     console.log( "document loaded" );
//     var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
//     // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
//     $.get(url,function(data, status) {
//         console.log("got response for get_location_names request");
//         if(data) {
//             var locations = data.locations;
//             var uiLocations = document.getElementById("uiLocations");
//             $('#uiLocations').empty();
//             for(var i in locations) {
//                 var opt = new Option(locations[i]);
//                 $('#uiLocations').append(opt);
//             }
//         }
//     });
//   }
  
//   window.onload = onPageLoad;

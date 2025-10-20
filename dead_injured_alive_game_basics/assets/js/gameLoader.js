import{navigation} from "./navigations/navigation.js"
import{toGameNavigation, toGame} from "./navigations/gamelogicNav.js"

// LOAD THE UI AND CALL STARTING FUNTIONS.
window.onload = function () {
    function get(url) {
        return new Promise(function (resolve,reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET",url, true);
            xhttp.onload = function(){
                if (xhttp.status == 200){resolve(xhttp.response);}
                else{reject(xhttp.statusText);}
            };
            xhttp.onerror = function () {
                reject(xhttp.statusText);
            };
            xhttp.send();
        });
    };


    var promise = get("assets/templates/ui.html");
    promise.then(function(ui){
        navigation(ui);
        toGameNavigation();
        return get("assets/templates/game.html")
    }).then(function(game) {
        toGame(game);
    }).catch(function(error) {
        console.log(error);
    });

};
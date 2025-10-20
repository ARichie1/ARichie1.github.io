import { Help_me } from "./functions.js"

let helper = new Help_me();

let user_layers_prev_components = []
let user_layers_current_component = ""
let get_element

let switch_user_layers_component = (display) => {
    helper.switch_component(
        user_layers_prev_components[user_layers_prev_components.length - 1], 
        user_layers_current_component, display)
}


let close_user_layers_component = (display) => {
    user_layers_prev_components.push(user_layers_current_component)
    user_layers_current_component = 
        user_layers_prev_components[user_layers_prev_components.length - 2]
    switch_user_layers_component(display)
}


let layers_to_delete_string = ""
    let msg = "", btns = "";
   
    if (layers_to_delete.length > 0) {
        layers_to_delete_string = helper.sentencize(layers_to_delete)
        msg = "You are about to delete the following layers :<br><p>" + layers_to_delete_string + "</p>"
        btns = [
            {text: "No", class:"notification_close n_clear", id:"##" + notification_screen.className},
            {text: "Yes", class:"notification_close", id: "deletes_something"}
        ]
    }else{
        msg = "You need to select a layer first"
        btns = [{text: "Ok", class:"notification_close n_clear", id:"##" + notification_screen.className}]
    }
    
    helper.notification_box(nft_art_generator, notification_screen,
        {type: "alert !!!", msg, btns}
    )
    if (notification_screen.querySelector("#deletes_something")) {
        notification_screen.querySelector("#deletes_something").addEventListener("click", () => {     
            delete_checked()
            on_select_cancel.click()
            setTimeout(() => {
                fetch_and_activate_dom_layers()
            }, 100);
        })
    } 
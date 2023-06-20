
export {Layer, get_layer, get_layers, delete_checked,
    get_checked_layers, append_layer}
import {Help_me} from "./functions.js"

let helper = new Help_me()

// Stores Each Layer Object
let layers = {}
// Stores deleted layers so we can omit(forcefully delete) them 
// when exporting the layers
let deleted_layers = []
// Stores a list of selected/checked layers in select mode
let checked_layers = []

// THE LAYERS OBJECT
class Layer{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.images = {};
        this.checked = false
        return this  
    }
    add_to_layers(){
        if(deleted_layers.includes(this.name)){
            deleted_layers = helper.remove_element(deleted_layers, this.name)
            layers[this.name] = {}
            layers[this.name] = this
        }else{
            layers[this.name] = this
        }
        this.update_layers()
    }
    rename(new_name){
        let old_name = this.name
        layers[new_name] = layers[old_name]
        layers[new_name].name = new_name;

        // delete old_layer in layers
        delete layers[old_name]
        // then forcefully delete using the delete_array
        deleted_layers.push(old_name)
    }
    delete_layer(){
        // delete layer in layers 
        delete layers[this.name]
        // then forcefully delete using the delete_array
        deleted_layers.push(this.name)
    }
    select(state){
        this.checked = state
        if (this.checked) {
            if (!checked_layers.includes(this.name)) {
                checked_layers.push(this.name)
                console.log("cl : ", checked_layers);
            }
        }else{
            if (checked_layers.includes(this.name)) {
                checked_layers = helper.remove_element(checked_layers, this.name)
                console.log("cl : ", checked_layers);
            }
        }
    }
    add_image(id, image){
        this.images[id] = image
    }
    delete_image(id){
        this.images = helper.remove_key(this.images, id)
    }
    update_layers() {
        setInterval (() => {
            layers[this.name] = this
        }, 1000)
    }
}

// Pass the checked layers into the delete_array for deletion
let delete_checked = () => {
    checked_layers.forEach(cl => {
        if (!deleted_layers.includes(cl)) {
            deleted_layers.push(cl)
        }
    });
}

// Helps in exporting  the checked layers
let get_checked_layers = () => {
    return checked_layers;
}

// Helps in exporting a single layer
let get_layer = (name) => {
    return layers[name]
}

// Helps in exporting all the layers
let get_layers = () => {
    if (deleted_layers.length > 0) {
        deleted_layers.forEach(del_l => {
            delete layers[del_l]
            console.log(deleted_layers);
            console.log(layers);
        });
        layers = layers
        return layers
    }else{return layers}
}

// Layer Frontend Design Template
let append_layer = ((new_layer, mode) => {
    let appearance = ""
    let layer_id, has_check_box, has_closer, has_layer_icon;
    if (mode == "all") {
        appearance = "layer"
        layer_id = `layer_${new_layer.id}`
        has_check_box = `<span class="check_box_container"><p class="check_box" id="${new_layer.name}_cb"></p></span>`;
        has_closer = `<span style="display:none;"></span>`
        has_layer_icon = `<i class="fa fa-layer-group"></i>`
    }
    else if (mode == "one") {
        appearance = "single_layer"
        layer_id = `slayer_${new_layer.id}`
        has_check_box = `<span style="display:none;"></span>`
        has_closer = `<span class="close_sl close many_icons" id="##user_layers"><i class="fa fa-layer-group"></i></span>`
        has_layer_icon = `<span style="display:none;"></span>`
    }
    let layer_blue_print = 
            `<div class="${appearance}" id="${layer_id}" name="${new_layer.name}">
                <div class="l_properties">
                    ${has_closer}
                    <span class="l_name_container">
                        ${has_layer_icon}
                        <h4 class="l_name clkb_link">${new_layer.name}</h4>
                    </span>
                    <span class="l_options">
                        <p class="l_rename clkb_link">Rename</p>
                        <span class="l_add_image clkb_link many_icons" >
                            <i class="fa fa-images"></i>
                            <input type="file" name="l_image_uploader" class="l_image_uploader">
                        </span>
                        <span class="l_delete clkb_link">
                            <i class="fa fa-trash-alt"></i>
                            <input type="hidden" name="l_deleter" class="l_deleter">
                        </span>
                    </span>
                   ${has_check_box} 

                    <span class="l_on_rename">
                        <span class="clkb_link close" id="##l_on_rename"><i class="fa fa-times"></i></span>
                        <input type="text" name="" class="l_rename_input">
                        <button class="l_change_name clkb_btn">Change</button>
                    </span>
                </div>
                <ul class="l_images scr scr-x">${image_loader(new_layer)}</ul>
            </div>`
        return layer_blue_print
})

// Layer Images Section Frontend Design Template
let image_loader = ((new_layer) => {
    let new_layer_images_blue_print = "";
    for (const image in new_layer.images) {
        if (Object.hasOwnProperty.call(new_layer.images, image)) {
            new_layer_images_blue_print += 
            `<li class="l_image" id="${new_layer.name + "_" + image}">
                <ul class="image_options">
                    <li class="clkb_link"><i class="fa fa-times"></i></li>
                    <li class="clkb_link"><i class="fa fa-edit"></i></li>
                    <li class="clkb_link"><i class="fa fa-trash-alt"></i></li>
                </ul>
                <img src="./assets/images/Layers/${new_layer.name}/${new_layer.images[image]}" alt="" srcset="">
            </li>`
        }
    }
    return new_layer_images_blue_print
})











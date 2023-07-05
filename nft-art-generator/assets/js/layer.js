
export {Layer, get_layer, get_layers, delete_checked,
    get_checked_layers, append_layer, empty_layers}
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
    constructor(name, id, canvas_dimension){
        this.name = name;
        this.id = id;
        this.images = {};
        this.checked = false
        this. canvas_width = canvas_dimension[0], 
        this.canvas_height = canvas_dimension[1]
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
            }
        }else{
            if (checked_layers.includes(this.name)) {
                checked_layers = helper.remove_element(checked_layers, this.name)
            }
        }
    }
    add_image(id, name, image){
        // Use Default Size 
        // this.images[id] = image

        // Or Resize To Collection Dimension
        image.onload = (e) => {
            let canvas = document.createElement("canvas")
            canvas.width = this.canvas_width
            canvas.height = this.canvas_height
            let context = canvas.getContext("2d")
            context.imageSmoothingQuality = "high"
            context.drawImage(image, 0, 0, canvas.width, canvas.height)
            
            let image_url = context.canvas.toDataURL("image/jpg");

            let collection_sized_image = document.createElement("img")
            collection_sized_image.src = image_url
            this.images[id] = {}
            this.images[id]["img"] = collection_sized_image
            this.images[id]["name"] = name
        }
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
        });
        layers = layers
        return layers
    }else{return layers}
}

// Completly Deletes All Layers and Collection
let empty_layers = () => {
    for (const l_key in layers) {
        if (Object.hasOwnProperty.call(layers, l_key)) {
            deleted_layers.push(layers[l_key].name)
            delete layers[l_key]
        }
    }
    get_layers()
}

// Layer Frontend Design Template
let append_layer = ((new_layer, mode) => {
    let appearance = ""
    let layer_id, has_check_box, has_closer, has_layer_icon, has_props_hider;
    if (mode == "all") {
        appearance = "layer"
        layer_id = `layer_${new_layer.id}`
        has_check_box = `<span class="check_box_container"><p class="check_box" id="${new_layer.name}_cb"></p></span>`;
        has_closer = `<span style="display:none;"></span>`
        has_layer_icon = `<i class="fa fa-layer-group"></i>`
        has_props_hider = `
            <span class="layer_properties_hider">
                ${has_layer_icon}
                <h4 class="">${new_layer.name}</h4>
            </span>
        `
    }
    else if (mode == "one") {
        appearance = "single_layer"
        layer_id = `slayer_${new_layer.id}`
        has_check_box = `<span style="display:none;"></span>`
        has_closer = `<span class="close_sl close many_icons" id="##user_layers"><i class="fa fa-layer-group"></i></span>`
        has_layer_icon = `<span style="display:none;"></span>`
        has_props_hider = `<span style="display:none;"></span>`
    }
    let new_layer_properties = 
            `<div class="l_properties">
                ${has_closer}
                <div class="l_name_container">
                    ${has_layer_icon}
                    <h4 class="l_name clkb_link">${new_layer.name}</h4>
                </div>
                <div class="l_options">
                    <p class="l_rename clkb_link">Rename</p>
                    <div class="l_add_image clkb_link" >
                        <span><i class="fa fa-plus"></i></span>
                        <input type="file" name="l_image_uploader" class="l_image_uploader"  multiple>
                    </div>
                    <div class="l_delete clkb_link">
                        <i class="fa fa-trash-alt"></i>
                        <input type="hidden" name="l_deleter" class="l_deleter">
                    </div>
                </div>
                ${has_check_box} 

                <div class="l_on_rename">
                    <span class="clkb_link close" id="##l_on_rename"><i class="fa fa-times"></i></span>
                    <input type="text" name="" class="l_rename_input" placeholder="Enter new name">
                    <button class="l_change_name clkb_btn">Change</button>
                </div>
                ${has_props_hider}
            </div>`


        let new_layer_container = document.createElement("div")
        new_layer_container.id = layer_id
        new_layer_container.className = appearance
        new_layer_container.setAttribute("name", new_layer.name)
        new_layer_container.innerHTML = new_layer_properties

        new_layer_container.appendChild(image_loader(new_layer))

        return new_layer_container
})

// Layer Images Section Frontend Design Template
let image_loader = ((new_layer) => {
    let new_image_options = 
    `<ul class="image_options">
        <li class="clkb_link"><i class="fa fa-eye"></i></li>
        <li class="clkb_link"><i class="fa fa-trash-alt"></i></li>
    </ul>`
    let layer_images_ul = document.createElement("ul")
    layer_images_ul.className = "l_images scr scr-x"
    for (const image_key in new_layer.images) {
        if (Object.hasOwnProperty.call(new_layer.images, image_key)) {
            const image = new_layer.images[image_key]
            let new_image_container = document.createElement("li")
            new_image_container.className = "l_image"
            new_image_container.id = `${new_layer.name + "_" + image_key}`
            new_image_container.setAttribute("name", image.name)
            new_image_container.innerHTML = new_image_options

            let new_image_check_box_container = document.createElement("span")
            new_image_check_box_container.className = "image_check_box"
            new_image_check_box_container.innerHTML = 
            ` <p class="check_box" id="${image_key}_cb"></p>`

            new_image_container.appendChild(new_image_check_box_container)
            new_image_container.appendChild(image.img)

            layer_images_ul.appendChild(new_image_container)
        }
    }
    return layer_images_ul
})












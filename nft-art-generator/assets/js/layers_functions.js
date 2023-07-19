
export {open_rename, close_rename, change_layer_name,
    delete_a_layer, add_images, add_image_options,
    get_checked_images, free_checked_images,
    select_test_images, unselect_test_images,
    build_test_resource, build_collection_resource,
    build_composite
}
import { Help_me } from "./functions.js"

let helper = new Help_me()
let CHECKED_IMAGES = []

// LAYER RENAME FUNCTIONALITY STARTS HERE
    // Open Renamer
    let open_rename = (open_btn, open_element, close_elements) => {
        open_btn.addEventListener("click", () => {
            helper.unhide(open_element, "flex")
            helper.hide(close_elements[0])
            helper.hide(close_elements[1])
        })
    }

    // Enter A New Name
    let change_layer_name = (change_btn, input_value, layers, layer_object, 
        nft_generator, notification_screen, close_rename, func_a, func_b) => {
        change_btn.addEventListener("click", () => {
            let name_exist_in_layers = helper.has_key(layers, input_value)
            
            if (input_value === layer_object.name){
                close_rename.click()
            }
            else if (name_exist_in_layers && input_value != layer_object.name ) {
                helper.fade(nft_generator)
                helper.notification_box(nft_generator, notification_screen, 
                    {
                        type: "alert !!!",
                        msg: "Another layer has that name, do you want to overwrite it?<br><p>" 
                            + input_value + "</p>",
                        btns : [
                            {text: "No", class:"notification_close n_clear", id:"##" + notification_screen.className},
                            {text: "Yes", class:"notification_close", id: "deletes_something"}
                        ]
                    })
        
            if (notification_screen.querySelector("#deletes_something")) {
                notification_screen.querySelector("#deletes_something").addEventListener("click", () => {
                    layer_object.rename(input_value)
                    if (func_b) func_b(layer_object.name)
                    func_a()
                })
            }
        }else{
            layer_object.rename(input_value)
            setTimeout(() => {
                if (func_b) func_b(layer_object.name)
                func_a()
            }, 100);
        }
        })
    }
    // Close Renamer
    let close_rename = (closer_btn, close_element, open_elements) => {
        closer_btn.addEventListener("click", () => {
            helper.unhide(open_elements[0], "flex")
            helper.unhide(open_elements[1], "flex")
            helper.hide(close_element)
        })
    }
// LAYER RENAME FUNCTIONALITY ENDS HERE

// LAYER DELETE FUNCTIONALITY STARTS HERE
let delete_a_layer = (delete_btn, layer_object, layers_container,
    nft_generator, notification_screen, 
    func_a, func_b, single_layer_container, LAYERS
    ) => {
        delete_btn.addEventListener("click", () => {
        helper.fade(nft_generator)
        helper.notification_box(nft_generator, notification_screen, 
            {
                type: "alert !!!",
                msg: "Are you sure you want to delete this layer?<br><br><p>" 
                    + layer_object.name + "</p>",
                btns : [
                    {text: "No", class:"notification_close n_clear", id:"##" + notification_screen.className},
                    {text: "Yes", class:"notification_close", id: "deletes_something"}
                ]
            })

        if (notification_screen.querySelector("#deletes_something")) {
            notification_screen.querySelector("#deletes_something").addEventListener("click", () => {     
                layer_object.delete_layer()
                layers_container.removeChild(document.querySelector(`#layer_${layer_object.id}`))
                setTimeout(() => {
                    // refresh/refetch the available layers
                    func_a()
                    // if in single layer page 
                    if (func_b && single_layer_container && LAYERS){
                        single_layer_container.innerHTML = ""
                        single_layer_container.style.opacity = "0"
                        single_layer_container.style.zIndex = "-3"
                        // if that is not the last layer just go back to multi-layer page
                        if(helper.count_keys(LAYERS) > 0) func_b()
                    }
                }, 100);
            })
        }
    })
}
// LAYER DELETE FUNCTIONALITY ENDS HERE

// LAYER IMAGES FUNCTIONALITY STARTS HERE
// Detect and Serve Uploads
// l_image_uploader.addEventListener("change", image_adder)
let add_images = (uploader_files, layer_object, func_a, func_b) => {
    for (const file_key in uploader_files) {
        const file = uploader_files[file_key];
        let blob_url = new Blob([file], {type: 'image/png'})
        let nft_reader = new FileReader()
        nft_reader.readAsDataURL(blob_url)
        nft_reader.onload = (event) => {
            let default_image_url = event.target.result
            let default_image = document.createElement("img")
            default_image.src = default_image_url
            let image_id = helper.unique_random_number();
            layer_object.add_image(image_id, file.name, default_image)
        }
    }
    // Wait 100ms For Image/Images To Load 
    // Then Refresh/Re-Fetch and Load LAYERS
    setTimeout(() => {
        if (func_b) func_b(layer_object.name)
        func_a()
    }, 100);
}

let add_image_options = (
    layers, layers_container,
    layer_images_containers, layer_object,
    collection_width, collection_height,
    func_a, func_b) => {

    let give_image_options = (layer_images_container) => {
        let split_id = layer_images_container.getAttribute("id").split("_")
        let lic_id = split_id[1]
        let lic_name = layer_images_container.getAttribute("name")
        let image_options_container = layer_images_container.querySelector(".image_options")
        let image_options = layer_images_container.querySelectorAll(".image_options li")
        
        let image_check_box_container = layer_images_container.querySelector(".image_check_box")
        let image_check_box = layer_images_container.querySelector(".image_check_box p")
        
        let image = layer_images_container.querySelector("img")
        image.addEventListener("click", () => {
            // Preview The Click Image
            const layer_image_preview_canvas = document.querySelector("#layer_image_canvas")
            const layer_image_info_items = document.querySelectorAll(".layer_image_info li")

            // Add The Image and Its Info To The Preview Box
            layer_image_preview_canvas.width = collection_width
            layer_image_preview_canvas.height = collection_height
            let context = layer_image_preview_canvas.getContext("2d")
            context.imageSmoothingQuality = "high"
            context.drawImage(image, 0, 0, 
                layer_image_preview_canvas.width, 
                layer_image_preview_canvas.height)
            
            layer_image_info_items[0].innerHTML =  layer_object.name
            layer_image_info_items[1].innerHTML =  lic_name
            layer_image_info_items[2].innerHTML =  `${collection_width} x ${collection_height}`

            let clear_layer_image_preview = () => {
                context.clearRect(0, 0, 
                    layer_image_preview_canvas.width, 
                    layer_image_preview_canvas.height)
                layer_image_info_items.forEach(item => {
                    item.innerHTML = ""
                });
            }

            // Toggles The Image Options
            helper.toggle_one_style_for_one(image_options_container, 
                "display", "flex", "none")

            if (image_options_container.style.display === "none") {
                clear_layer_image_preview()
            }
            // Edit Layer Image
            image_options[0].addEventListener("click", () => {
                if(window.innerWidth <= 900){
                    document.querySelector(".show_right_in_media_query_btn").click()
                }
            })
            // Delete Layer Image
            image_options[1].addEventListener("click", () => {
                layer_object.delete_image(lic_id)
                if (func_b) func_b(layer_object.name)
                func_a()

                clear_layer_image_preview()
            })
        })

        // Handle Images Check_Box
        image_check_box.addEventListener("click", () => {
            let state = helper.check_box_info(image_check_box)
            if (state && !CHECKED_IMAGES.includes(lic_id)) CHECKED_IMAGES.push(lic_id)
            else CHECKED_IMAGES = helper.remove_element(CHECKED_IMAGES, lic_id)
            console.log(CHECKED_IMAGES);

            document.querySelector(".selected_test_image_cnt").innerHTML 
                = `${CHECKED_IMAGES.length} / ${helper.count_keys(layers)}`
             
            // Only show the build test button when an image 
            // as been selected in each layer
            if (CHECKED_IMAGES.length == helper.count_keys(layers)) {
                helper.appear(document.querySelector(".build_test"), "7")
            }
            else helper.disappear(document.querySelector(".build_test"), "-7")

            // If User Tries To Generate A Test Art
            if (layers_container.getAttribute("select_mode") == "absolute") {
                layer_images_containers.forEach(a_lic => {
                    if (state) {
                        if (a_lic.id != layer_images_container.getAttribute("id")) {
                            helper.hide(a_lic)
                        }
                    } else helper.unhide(a_lic, "inline-block") 
                })
            }
        })
    }

    if (layer_images_containers.length > 0) {
        layer_images_containers.forEach(lic => {
            give_image_options(lic)
        })
        let l_add_image_btn = document.querySelector(`#layer_${layer_object.id} .l_add_image`)
        l_add_image_btn.classList.add("re_position_btn")
    }
}
// LAYER IMAGES FUNCTIONALITY ENDS HERE

// FETCHING, BUNDLING AND GENERATING LAYERS STARTS HERE
// Select test images to generate a test art
let select_test_images = (image_check_box_opener,
    layers_container, layers_options, layer_images_containers, func) => {
        image_check_box_opener.addEventListener("click", () => {
        layers_options.forEach(l_op => {
            helper.hide(l_op)
        })
        layer_images_containers.forEach(lic => {
            layers_container.setAttribute("select_mode", "absolute")
            let image_check_box_container = lic.querySelector(".image_check_box")
            helper.unhide(image_check_box_container, "flex")

            let image_options_container = lic.querySelector(".image_options")
            helper.hide(image_options_container);
        })
        func()
    })
}
let unselect_test_images = (image_check_box_closer,
    layers_container, layers_options, layer_images_containers, func) => {
    image_check_box_closer.addEventListener("click", () => {
        layers_options.forEach(l_op => {
            helper.unhide(l_op, "flex")
        })
        layer_images_containers.forEach(lic => {
            layers_container.setAttribute("select_mode", "relative")
            let image_check_box_container = lic.querySelector(".image_check_box")
            helper.hide(image_check_box_container)
        })
        func()
    })
}

// Builds an array of layer image key based on 
// the checked images and then add to resource array
let build_test_resource = (layers) => {
    let i = 0, resource = []
    let currently_checked_images = get_checked_images()
    for (const layer_key in layers) {
        if (Object.hasOwnProperty.call(layers, layer_key)) {
            const layer = layers[layer_key];
            if (currently_checked_images.length > 0) {
                if (layer.images[`${currently_checked_images[i]}`]){
                    resource.push(layer.images[`${currently_checked_images[i]}`]["img"])
                }
            }else{
                console.log("Go Check An Image");
            }
        }
        i++
    }
    return resource
}

// Builds an array for each layer image keys
// and then add to resource array
let build_collection_resource = (layers) => {
    let i = 0, j = 0
    let resource = []
    for (const layer_key in layers) {
        if (Object.hasOwnProperty.call(layers, layer_key)) {
            const layer = layers[layer_key];
            resource[i] = []
            if (helper.count_keys(layer.images) >= 1) {
                for (const image_key in layer.images) {
                    if (Object.hasOwnProperty.call(layer.images, image_key)) {
                        const image = layer.images[image_key]["img"];
                        resource[i].push(image)
                    }
                    j++
                }
            }  
        }
        i++
    }
    return resource
}

// Bundle and Generate art based on the resource provided
// then display to canvas
let build_composite = (resource, canvas_context, canvas_width, canvas_height) => {
    if (resource.length > 0) {
        for (let i = 0; i < resource.length; i++) {
            // Build Art By Getting A Random Image From Each Layer
            if (resource[i].length){
                if (resource[i].length > 0) {
                    let random_layer_image_index = Math.floor(Math.random() * resource[i].length)
                    let random_layer_image = resource[i][random_layer_image_index]
                    canvas_context.imageSmoothingQuality = "high"
                    canvas_context.drawImage(random_layer_image, 0, 0, canvas_width, canvas_height)
                }
            }
            // Build An Test Art Based On Checked Layers
            else{
                let layer_image = resource[i]
                canvas_context.imageSmoothingQuality = "high"
                canvas_context.drawImage(layer_image, 0, 0, canvas_width, canvas_height)
            }
        }
        return canvas_context
    }
}

// FETCHING, BUNDLING AND GENERATING LAYERS ENDS HERE

// Returns Currently Checked Layers
let get_checked_images = () => {
    return CHECKED_IMAGES
}
let free_checked_images = () => {
    CHECKED_IMAGES = []
}

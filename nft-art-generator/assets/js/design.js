
import { Help_me } from "./functions.js"
import { Layer, get_layer, get_layers, delete_checked, 
    get_checked_layers, append_layer, empty_layers} from "./layer.js";

import {open_rename, close_rename, change_layer_name,
    delete_a_layer, add_images, add_image_options,
    get_checked_images, free_checked_images,
    select_test_images, unselect_test_images,
    build_test_resource, build_collection_resource,
    build_composite
} from "./layers_functions.js"

let helper = new Help_me();
let LAYERS;

// GET WINDOW DIMENSION FOR MEDIA QUERING
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
window.addEventListener("resize", () => {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
})
const SMALL_SCREEN = 900

// =====APP STARTS HERE===== //
const app = document.querySelector(".app")

const app_left = document.querySelector(".app .left")
const app_middle = document.querySelector(".app .middle")
const app_right = document.querySelector(".app .right")

// =====APP LEFT STARTS HERE===== //
const minimize_space = document.querySelector(".minimize_space")
const mini_space_btn = document.querySelector(".minimize_space .mini_btn")
const maxi_space_btn = document.querySelector(".minimize_space .maxi_btn")

const main_nav = document.querySelector(".main_nav")
const main_links = document.querySelectorAll(".main_link")
const home_link = document.querySelector(".home")
const nft_art_generator_link = document.querySelector(".generator_link")
const nft_art_generator_setting_up = document.querySelector("#generator_setting_up")
const nft_art_generator_power_off_link = document.querySelector("#generator_power_off_link")

const searcher_link = document.querySelector(".searcher_link")
const theme_and_credits_link = document.querySelector(".theme_and_credits_link")

const link_icons = document.querySelectorAll(".link_icon")
const link_texts = document.querySelectorAll(".link_text")
// =====APP LEFT ENDS HERE===== //

// =====APP MIDDLE STARTS HERE===== //
const middle_components = document.querySelectorAll(".m_c");
const middle_components_links = document.querySelectorAll(".m_c_l");
const middle_close_component_links = document.querySelectorAll(".middle .close")

// Landing Page Elements Starts Here
const landing_page = document.querySelector(".landing_page")
const landing_page_btn = document.querySelector(".landing_page button")

// Theme and Credits Page Elements Starts Here
const theme_and_credits_container = document.querySelector(".theme_and_credits")
const theme_and_credits_close_btn = document.querySelector(".theme_and_credits .remove_component")
const theme_change_btn = document.querySelector(".theme_and_credits .theme_mode .clkb_btn")

// Searchbar Elements Starts Here
const searchbar = document.querySelector(".searchbar")
const search_form = document.querySelector(".searchbar form")
const search_form_cancel = document.querySelector(".searchbar form .form_cancel")
const search = document.querySelector(".searchbar #search")
const search_btn = document.querySelector(".searchbar button")
const search_small_screen_overlay = document.querySelector(".searchbar .search_small_screen_overlay")
const search_left_opener_btn = document.querySelector(".searchbar .search_small_screen_overlay .left_opener")
const search_opener_btn = document.querySelector(".searchbar .search_small_screen_overlay .search_opener")
// Searchbar Elements Endss Here

// ============================= //

//  NFT Art Generator Elements Starts Here
const nft_art_generator = document.querySelector(".nft_art_generator")
const nft_art_generator_component_opener = document.querySelector(".nft_art_generator .component_opener")
const nft_art_generator_close = document.querySelector(".nft_art_generator .component_opener .close")

// Create NFT Collection Component Elements Starts Here
const create_nft_collection = document.querySelector(".create_nft_collection")
const collection_name_preview = document.querySelector(".collection_name_preview")
const collection_size_preview = document.querySelector(".coll_size")
const reset_form_values_btn = document.querySelector(".reset_cnc_form_values")
const use_default_values_btn = document.querySelector(".use_default_values")
const collection_name_input = document.querySelector("#collection_name")
const collection_size_input = document.querySelector("#collection_size")
const collection_width_input = document.querySelector("#output_width")
const collection_height_input  = document.querySelector("#output_height")
const collection_output_format_input = document.querySelector("#output_format")
const create_nft_collection_button = document.querySelector(".create_nft_collection button")
// Create NFT Collection Component Elements Ends Here

// User Layers Component Elements Starts Here
const user_layers  = document.querySelector(".user_layers")

const layers_cnt_container = document.querySelector(".layers_cnt_container")
let layers_cnt  = document.querySelector(".layers_cnt")
const layers_container = document.querySelector(".layers")
let dom_layers = []

const art_generator_crud_tools_container = document.querySelector(".art_generator_crud_tools")
const art_generator_tools_container  = document.querySelector(".art_generator_tools")
const art_generator_tools_container_btn = document.querySelector(".art_generator_tools_opener")

const on_no_layers_container = document.querySelector(".on_no_layers")
const start_import_layer_link = document.querySelector(".start_import_layer")
const start_create_layer_link = document.querySelector(".start_create_layer")

const create_layer_link = document.querySelector(".create_layer")
const on_create_container  = document.querySelector(".on_create")
const on_create_close  = document.querySelector(".on_create_close")
const on_create_input  = document.querySelector(".on_create_input")
const on_create_error_container  = document.querySelector(".on_create form p")
const on_create_button  = document.querySelector(".on_create button")

const select_layer_link  = document.querySelector(".select_layer")
const on_select_container  = document.querySelector(".on_select")
const select_all  = document.querySelector(".select_all")
const unselect_all  = document.querySelector(".unselect_all")
let selected_cnt  = document.querySelector(".selected_cnt")
const on_select_cancel  = document.querySelector(".cancel_on_select")
const on_select_delete_btn = document.querySelector(".del_layers")

const import_layer_link  = document.querySelector(".import_layer")
const on_import_container = document.querySelector(".on_import")
const on_import_close = document.querySelector(".on_import .close")
const on_import_instruction = document.querySelector(".on_import .import_instruction")
const on_import_copy_btn = document.querySelector(".on_import .import_instruction .copy_btn")
const on_import_code_box = document.querySelector(".on_import .import_instruction .code_box")
const on_import_continue_btn = document.querySelector(".on_import .import_instruction .continue_to_import")
const on_import_options = document.querySelector(".on_import .on_import_form_options")
const on_import_view_format_btn = document.querySelector(".on_import .view_import_format")
const on_import_reset_btn = document.querySelector(".on_import .reset_import_form_btn")
const on_import_paste_btn = document.querySelector(".on_import .paste_btn")
const on_import_input  = document.querySelector(".on_import_input")
const on_import_button  = document.querySelector(".on_import button")
const export_layer_link  = document.querySelector(".export_layer")

const generate_art_link  = document.querySelector(".generate_art")
const disabled_generate_art_link  = document.querySelector(".disabled_generate_art_link")
const on_generate_container = document.querySelector(".on_generate")
const on_generate_close = document.querySelector(".on_generate .close")
const on_generate_options = document.querySelectorAll(".on_generate_options li")

const build_test_mode_indicator = document.querySelector(".build_test_mode_indicator")
const cancel_build_test_btn = document.querySelector(".cancel_build_test")
const selected_test_image_cnt = document.querySelector(".selected_test_image_cnt")
const build_test_btn = document.querySelector(".build_test")
// User Layers Editor Elements Ends Here

// Single Layer Editor Elements Starts Here
const single_layer_container = document.querySelector(".user_single_layer")
const single_layer_close_btn = document.querySelector(".user_single_layer .close_sl")
let single_layer;
let dom_single_layer;
// Single Layer Editor Elements Ends Here

// NFT Generator Elements starts here
// =====APP MIDDLE ENDS HERE===== //


// =====APP RIGHT STARTS HERE===== //
const right_components = document.querySelectorAll(".r_c");
const right_components_links = document.querySelectorAll(".r_c_l");
const right_close_component_links = document.querySelectorAll(".right .close")

// Default Right Home Component
const free_frame_container = document.querySelector(".free_frame")

// NFT Art Generator Previews
const generator_preview_container = document.querySelector(".generator_preview")
const generator_preview_frames_links = document.querySelectorAll(".generator_preview_frames li")
const gen_preview_containers = document.querySelectorAll(".gen_preview")

const layer_image_preview_container = document.querySelector(".layer_image_preview_frame")
const layer_image_preview_canvas = document.querySelector("#layer_image_canvas")
const layer_image_info_items = document.querySelectorAll(".layer_image_info li")

const test_art_preview_container = document.querySelector(".test_art_preview_frame")
const test_art_preview_canvas = document.querySelector("#test_art_canvas")
const test_art_downloader_items = document.querySelectorAll(".test_art_downloader li")

const collection_preview_container = document.querySelector(".collection_preview_frame")
const collection_image_generator_canvas = document.querySelector("#collection_image_generator_canvas")
const colletion_images_preview = document.querySelector(".collection_frame_image_cover img")
const show_prev_col_image_btn = document.querySelector(".show_prev_col_image")
const show_next_col_image_btn = document.querySelector(".show_next_col_image")
const generated_arts_container = document.querySelector("#generated_arts")
const collection_download_btn = document.querySelector(".collection_download_btn")
// =====APP RIGHT ENDS HERE===== //

// =====GENERALLY USED ELEMENTS STARTS HERE===== //
const close_component_links = document.querySelectorAll(".close")
const check_boxes = document.querySelectorAll(".check_box")
const vanish_point = document.querySelector("#vanish_point")
const notification_screen = document.querySelector(".notification_screen")
// =====GENERALLY USED ELEMENTS ENDS HERE===== //


// =====MEDIA QUERY ELEMENTS STARTS HERE===== //
const show_right_in_media_query_btn = document.querySelector(".show_right_in_media_query_btn")
// =====MEDIA QUERY ELEMENTS ENDS HERE===== //

// =====DESIGN LOGIC STARTS HERE===== //

// =====LEFT SIDE =====//
// Minimize Left
minimize_space.addEventListener('click', () => {
    helper.toggle_one_style_for_one(mini_space_btn, "display", "none", "flex")
    helper.toggle_one_style_for_one(maxi_space_btn, "display", "flex", "none")
    
    helper.toggle_one_style_for_one(app_left, "width", "5%", "15%")
    helper.toggle_one_style_for_one(app_middle, "width", "50%", "45%")
    helper.toggle_one_style_for_one(app_right, "width", "45%", "40%")

    helper.toggle_one_style_for_many(link_texts, "display", "none", "flex")
    helper.toggle_one_style_for_many(link_icons, "width", "100%", "25%")
})

// TOGGLE SEARCH ON BIG SCREENS
searcher_link.addEventListener("click", () => {
    helper.toggle_style_many([
        {name: searchbar, props: [
                ["opacity", "1", "0"],
                ["z-index", "7", "-7"]]},
        {name: nft_art_generator_component_opener,
            props: [
                ["opacity", "0", "1"],
                ["z-index", "-5", "5"]]}
    ])
})

if (WINDOW_WIDTH <= SMALL_SCREEN) {
    // Search Elements Functionalities
    search_opener_btn.addEventListener("click", () => {
        helper.disappear(search_small_screen_overlay, -5)
        helper.unhide(search_form, "flex")
        helper.unhide(search_form_cancel, "flex")
    })
    search_form_cancel.addEventListener("click", () => {
        helper.appear(search_small_screen_overlay, 5)
        helper.hide(search_form)
    })
    search_btn.addEventListener("click", (e) => {
        e.preventDefault()
    })
    search_left_opener_btn.addEventListener("click", () => {
        helper.toggle_many_style_for_one(app_left, [
            ["left", "0%", "-70%"],
            ["z-index", "4", "-4"]
        ])
    })

    // Elements That Closes Left Menu
    helper.many_actions("click", 
    [app_right, main_links, landing_page, nft_art_generator, 
        search_opener_btn], 
    () => {
        helper.style_many_for_one(app_left, [
            ["left", "-70%"],
            ["z-index", "-4"]
        ])
    })
}
// =====LEFT SIDE ENDS HERE=====//

// ================================================ //

// =====MIDDLE SIDE STARTS HERE=====//

// Open Generator Starts Here
helper.many_actions("click", [landing_page_btn, nft_art_generator_link], () => {
    helper.hide(nft_art_generator_link)
    helper.unhide(nft_art_generator_setting_up, "flex")
    helper.hide_many([nft_art_generator_link, nft_art_generator_power_off_link])

    helper.elements_state_swap("landing_page", "closed")
    helper.elements_state_swap("nft_art_generator", "opened")

    if (WINDOW_WIDTH <= 900) helper.disappear(nft_art_generator_component_opener)
})
// Open Generator Ends Here

// Open Theme Setting and Credits Starts Here
theme_and_credits_link.addEventListener("click", () => {
    helper.appear(theme_and_credits_container, "8")
})
theme_and_credits_close_btn.addEventListener("click", () => {
    helper.disappear(theme_and_credits_container, "-8")
})
// Open Theme Setting and Credits Ends Here

// =====Toggle middle to left starts here===== //
show_right_in_media_query_btn.onclick = () => {
    helper.toggle_style_many([
        {name : app_middle,
            props: [["opacity", "0.5", "1"]]},
        {name : app_right,
            props: [["left", "0%", "100%"], 
            ["z-index", "5", "-5"]]},
        {name : search_small_screen_overlay,
            props: [["display", "none", "flex"]]},
    ])
    show_right_in_media_query_btn.style.zIndex = "8"

    // Toggle Icon
    let srimq_btn_svg_container = show_right_in_media_query_btn
        .querySelector("span")
    helper.toggleIcon(srimq_btn_svg_container,
         srimq_btn_svg_container.innerHTML,
          "fa fa-desktop", "fa fa-angle-left")
}
// =====Toggle middle to left ends here=====//

// NFT ART GENERATOR FUNCTIONALITIES STARTS HERE
let collection_name = "no_name", collection_size = 10,
    collection_width = 500, collection_height = 500, collection_format = "png"

// Clear The Inputs
reset_form_values_btn.addEventListener("click", () => {
    collection_name_input.value = ""
    collection_size_input.value = ""
    collection_width_input.value = ""
    collection_height_input.value = ""
})
// Fill The Inputs With Default Values
use_default_values_btn.addEventListener("click", () => {
    collection_name_input.value = "My New Arts"
    collection_size_input.value = 20
    collection_width_input.value = 500
    collection_height_input.value = 500
})
// Get Collection Details
create_nft_collection_button.addEventListener('click', (e) => {
    e.preventDefault()

    //  Get Collecton Inputs With Error Display Container
    let collection_inputs = [collection_name_input, collection_size_input, 
        collection_width_input, collection_height_input]

     //  Check if input is empty if empty add input to (invalid_input) 
     // else cleans error
    let invalid_inputs = helper.check_or_clean_error_msg(collection_inputs);

    // Check if ther are invalid inputs firts
    if (invalid_inputs.length > 0) {
        helper.render_error_msg(invalid_inputs)
    }
    // else continue with collection creation
    else{
        collection_name = collection_name_input.value
        collection_name_preview.innerHTML = collection_name
        collection_size = parseInt(collection_size_input.value)
        collection_size_preview.innerHTML = ` [${collection_size}]`
        collection_width = parseInt(collection_width_input.value)
        collection_height = parseInt(collection_height_input.value)
        collection_format = collection_output_format_input.value
        
        // Clear On Import Form
        on_import_input.value = ""
        // Clear On Create Form
        on_create_input.value = ""

        // app left tools to show/hide
        helper.unhide(nft_art_generator_power_off_link, "flex")
        helper.hide_many([nft_art_generator_setting_up, nft_art_generator_link])
        
        // app middle tools to show/hide
        create_nft_collection.setAttribute("state", "closed")
        helper.hide(create_nft_collection)
        user_layers.setAttribute("state", "opened")
        helper.unhide(user_layers, "block")
        helper.unhide(nft_art_generator_close, "flex")
        // app right tools to show/hide
        helper.hide(free_frame_container)
        helper.unhide(generator_preview_container, "block")
        fetch_and_activate_dom_layers()
    } 
})

// User Layers Functionalities Starts Here
// user layers navigation variables/functions
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

// Stores each DOM Layer As Element
let dls = []
// Stores each layer options container as element
let layers_options = []
// Stores each layer check box as element
let layers_check_boxes = []

// VERY VERY VITAL BLOCK OF CODE
// FETCHES THE NEWLY UPDATED LAYERS FROM THE DOM START HERE
let fetch_and_activate_dom_layers = (() => {
    dls = load_layers_container()
    layers_cnt.innerHTML = helper.count_keys(LAYERS)
    layers_counter()

    // LAYER FUNCTIONALITIES STARTS HERE
    dls.forEach(layer => {
        let layer_id = layer.getAttribute("id")
        let layer_obj = LAYERS[layer.getAttribute("name")]
        let layer_properties = layer.querySelector(".l_properties");
        let layer_images_containers = layer.querySelectorAll(".l_image");

        let l_name_container = layer_properties.querySelector(".l_name_container")
        let l_name = layer_properties.querySelector("l_name_container .l_name")
        
        let l_options = layer_properties.querySelector(".l_options")  
        layers_options.push(l_options);
        const l_rename_btn = layer_properties.querySelector(".l_options .l_rename")
        const l_add_image_btn = layer_properties.querySelector(".l_options .l_add_image")
        let l_image_uploader = layer_properties.querySelector(".l_options .l_add_image .l_image_uploader")
        const l_delete_btn = layer_properties.querySelector(".l_options .l_delete")
        let l_check_box = layer_properties.querySelector(".check_box")
        layers_check_boxes.push(l_check_box)
        let l_properties_hider = layer_properties.querySelector(".layer_properties_hider")

        let l_on_rename_container = layer_properties.querySelector(".l_on_rename")
        let l_on_rename_container_close = layer_properties.querySelector(".l_on_rename .close")
        let l_rename_input = layer_properties.querySelector(".l_on_rename input")
        let l_change_name_btn = layer_properties.querySelector(".l_on_rename .l_change_name")

        // LAYER SINGLE PAGE OPENER FUNCTIONALITY STARTS HERE  
            l_name_container.addEventListener("click", () => {
                fetch_and_activate_dom_single_layer(layer_obj.name)
                user_layers_prev_components.push(["art_generator_crud_tools", "layers"])
                user_layers_current_component = "user_single_layer"
                switch_user_layers_component()
            })
        // LAYER SINGLE PAGE OPEl_rename_inputNER FUNCTIONALITY ENDS HERE 

        // LAYER RENAME FUNCTIONALITY STARTS HERE 
            open_rename(l_rename_btn, l_on_rename_container, [l_name_container, l_options]) 
            l_rename_input.addEventListener("change", () => {
                change_layer_name(l_change_name_btn, l_rename_input.value, LAYERS, layer_obj,
                    nft_art_generator, notification_screen, l_on_rename_container_close, fetch_and_activate_dom_layers)
            })
            close_rename(l_on_rename_container_close, l_on_rename_container, [l_name_container, l_options])
        // LAYER RENAME FUNCTIONALITY ENDS HERE

        // LAYER DELETE FUNCTIONALITY STARTS HERE
            delete_a_layer(l_delete_btn, layer_obj, layers_container, 
                nft_art_generator, notification_screen, fetch_and_activate_dom_layers)
        // LAYER DELETE FUNCTIONALITY ENDS HERE

        // LAYER CHECKBOX FUNCTIONALITY ENDS HERE
            l_check_box.addEventListener("click", () => {
                let state = helper.check_box_info(l_check_box, selected_cnt)
                layer_obj.select(state)
            })
        // LAYER CHECKBOX FUNCTIONALITY ENDS HERE

        // LAYER IMAGES FUNCTIONALITY STARTS HERE
            // Ui Add Image Btn Triggers File Input
            l_add_image_btn.addEventListener("click", () => {
                fetch_and_activate_dom_layers()
                l_image_uploader.click();
            })

            // Detect and Serve Uploads
            l_image_uploader.addEventListener("change", () => {
                add_images(l_image_uploader.files, 
                layer_obj, fetch_and_activate_dom_layers)
            })

            // Enable Image Options
            // add_image_options(
            //     layers_container, layer_images_containers, layer_obj, 
            //     500, 500, fetch_and_activate_dom_layers)
            add_image_options(LAYERS,
                layers_container, layer_images_containers, layer_obj, 
                collection_width, collection_height,
                fetch_and_activate_dom_layers)

            // Enter Generating Test Art Mode and Select Images
            select_test_images(on_generate_options[0],
                layers_container, layers_options, 
                layer_images_containers, () => {
                    user_layers_prev_components.push(["on_generate", "art_generator_crud_tools"])
                    user_layers_current_component = ["build_test_mode_indicator", "layers"]
                    switch_user_layers_component()
                    
                    helper.appear(l_properties_hider)
                    // helper.elements_state_swap("build_test", "opened")
                    // helper.appear(build_test_btn, "7")
                })

            // Unselect Images and Exit Generating Test Art Mode
            unselect_test_images(cancel_build_test_btn,
                layers_container, layers_options, 
                layer_images_containers, () => {
                    user_layers_prev_components.push(["on_generate", "build_test_mode_indicator"])
                    user_layers_current_component = ["art_generator_crud_tools", "layers"]
                    switch_user_layers_component()
                    
                    helper.disappear(l_properties_hider)
                    // helper.elements_state_swap("build_test", "closed")
                    helper.disappear(build_test_btn, "-7")
                })
        // LAYER IMAGES FUNCTIONALITY ENDS HERE
    })
    // LAYER FUNCTIONALITIES ENDS HERE
})
// FETCHES THE NEWLY UPDATED LAYERS FROM THE DOM ENDS HERE

// SELECT MODE FUNCTIONALITIES STARTS HERE
// Enters Into Select Mode
select_layer_link.addEventListener("click", () => {
    select_counter()
    user_layers_prev_components.push("art_generator_crud_tools")
    user_layers_current_component = "on_select"
    switch_user_layers_component()
    
    layers_check_boxes.forEach(c_box => {
        helper.unhide(c_box.parentElement, "flex")
    });
    layers_options.forEach(lop => {helper.hide(lop)});
})
select_all.addEventListener("click", () => {
    for (const l_key in LAYERS) {
        if (Object.hasOwnProperty.call(LAYERS, l_key)) {
            const layer = LAYERS[l_key];
            layer.select(true)
            helper.select_check_box(layer.name)
        }
    }
    helper.hide(select_all)
    helper.unhide(unselect_all, "flex")
    setTimeout(() => {select_counter()}, 10);
})
unselect_all.addEventListener("click", () => {
    for (const l_key in LAYERS) {
        if (Object.hasOwnProperty.call(LAYERS, l_key)) {
            const layer = LAYERS[l_key];
            layer.select(false)
            helper.unselect_check_box(layer.name)
        }
    }
    helper.hide(unselect_all)
    helper.unhide(select_all, "flex")
    setTimeout(() => {select_counter()}, 10);
})
on_select_delete_btn.addEventListener("click", (e) => {
    let layers_to_delete = get_checked_layers()
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
})

// Exit Select Mode
on_select_cancel.addEventListener("click", () => {
    unselect_all.click()
    user_layers_prev_components.push("on_select")
    user_layers_current_component = "art_generator_crud_tools"
    switch_user_layers_component()

    layers_check_boxes.forEach(c_box => {
        helper.hide(c_box.parentElement, "flex")
    });
    layers_options.forEach(lop => {helper.unhide(lop, "flex")});
})
// Resets the Selected Count Display
let select_counter = (() => {
    let currently_checked_layers = get_checked_layers()
    selected_cnt.innerHTML = currently_checked_layers.length;
});
// SELECT MODE FUNCTIONALITIES ENDS HERE

// Keeps track of how many LAYERS are available and displayed
// and what to do with the count
let layers_counter = (() => {
    if (helper.count_keys(LAYERS) == 0) {
        user_layers_prev_components.push(["art_generator_crud_tools", "layers"])
        user_layers_current_component = "on_no_layers"
        switch_user_layers_component()
        on_create_container.id = "box_mode"
    }else{
        if (WINDOW_WIDTH <= 900) helper.appear(search_opener_btn, "2")
        else helper.unhide(searcher_link, "flex")
      
        // detect if the user can generate art
        let generate_state;
        // check if each avalible layer has at least one image
        for (const layer_key in LAYERS) {
            if (Object.hasOwnProperty.call(LAYERS, layer_key)) {
                const lyer = LAYERS[layer_key];
                let layer_images_cnt = helper.count_keys(lyer.images)
                if (layer_images_cnt > 0) generate_state = true
                else if (layer_images_cnt == 0) {
                    generate_state = false
                    return
                }
            }
        }
        // if layers are more than one and each layers has at least
        // one image then enable the generate button else disable the button
        if (helper.count_keys(LAYERS) > 1 && generate_state) {
            helper.hide(disabled_generate_art_link)
            helper.unhide(generate_art_link, "flex")
        }else{
            helper.hide(generate_art_link)
            helper.unhide(disabled_generate_art_link, "flex")
        }
    }
});

// VERY VERY VITAL BLOCK OF CODE
// Fectches the updated LAYERS
// and converts them to html dom elements
let load_layers_container = (() => {
    LAYERS = get_layers()
    layers_container.innerHTML = ""
    for (const layer_key in LAYERS) {
        if (Object.hasOwnProperty.call(LAYERS, layer_key)) {
            let fetched_layer = append_layer(LAYERS[layer_key], "all")
            layers_container.appendChild(fetched_layer)
        }
    }

    dom_layers = layers_container.querySelectorAll(".layer")
    return dom_layers
})

let load_single_layer_container = ((sl_name) => {
    single_layer = get_layer(sl_name)

    single_layer_container.innerHTML = ""
    single_layer_container.appendChild(append_layer(single_layer, "one"))

    dom_single_layer = single_layer_container.querySelector(".single_layer")

    return dom_single_layer
})

// FETCHES THE NEWLY UPDATED LAYER FROM THE DOM ENDS HERE
let fetch_and_activate_dom_single_layer = ((sl_name) => {
    let dom_sl = load_single_layer_container(sl_name)

// SINGLE_LAYER FUNCTIONALITIES STARTS HERE
    let layer_id = dom_sl.getAttribute("id")
    let layer_obj = LAYERS[dom_sl.getAttribute("name")]
    let layer_properties = dom_sl.querySelector(".l_properties");
    let layer_images_containers = dom_sl.querySelector(".l_image");

    let l_closer_btn = layer_properties.querySelector(".close_sl")
    
    let l_name_container = layer_properties.querySelector(".l_name_container")
    let l_name = layer_properties.querySelector("l_name_container .l_name")
    
    let l_options = layer_properties.querySelector(".l_options")  
    let l_rename_btn = layer_properties.querySelector(".l_options .l_rename")
    let l_add_image_btn = layer_properties.querySelector(".l_options .l_add_image")
    let l_image_uploader = layer_properties.querySelector(".l_options .l_add_image .l_image_uploader")
    let l_delete_btn = layer_properties.querySelector(".l_options .l_delete")

    let l_on_rename_container = layer_properties.querySelector(".l_on_rename")
    let l_on_rename_container_close = layer_properties.querySelector(".l_on_rename .close")
    let l_rename_input = layer_properties.querySelector(".l_on_rename input")
    let l_change_name_btn = layer_properties.querySelector(".l_on_rename .l_change_name") 

    // CLOSE SINGLE LAYER PAGE FUNCTIONALITY STARTS HERE  
    helper.many_actions("click", [l_name_container, l_closer_btn],
    () => {
        fetch_and_activate_dom_layers()
        close_user_layers_component()
    })
    // CLOSE SINGLE LAYER PAGE FUNCTIONALITY ENDS HERE 

    // LAYER RENAME FUNCTIONALITY STARTS HERE 
        open_rename(l_rename_btn, l_on_rename_container, [l_name_container, l_options])    
        l_rename_input.addEventListener("change", () => {
            change_layer_name(l_change_name_btn, l_rename_input.value, LAYERS, layer_obj,
                nft_art_generator, notification_screen, l_on_rename_container_close, 
                fetch_and_activate_dom_layers, fetch_and_activate_dom_single_layer)
        })
        close_rename(l_on_rename_container_close, l_on_rename_container, [l_name_container, l_options])
    // LAYER RENAME FUNCTIONALITY ENDS HERE
   
    // LAYER DELETE FUNCTIONALITY STARTS HERE
        delete_a_layer(l_delete_btn, layer_obj, layers_container, 
            nft_art_generator, notification_screen, fetch_and_activate_dom_layers, 
            close_user_layers_component, single_layer_container, LAYERS)
    // LAYER DELETE FUNCTIONALITY ENDS HERE

    // LAYER IMAGES FUNCTIONALITY STARTS HERE
        // Ui Add Image Btn Triggers File Input
        l_add_image_btn.addEventListener("click", () => {
            fetch_and_activate_dom_layers()
            l_image_uploader.click();
        })

        // Detect and Serve Uploads
        l_image_uploader.addEventListener("change", () => {
            add_images(l_image_uploader.files, 
            layer_obj, fetch_and_activate_dom_layers, 
            fetch_and_activate_dom_single_layer)
        })
        // Enable Image Options
        // add_image_options(layer_images_containers, layer_obj, 500, 500,
        //     fetch_and_activate_dom_layers, fetch_and_activate_dom_single_layer)
        add_image_options(layer_images_containers, layer_obj,
            collection_width, collection_height,
            fetch_and_activate_dom_layers, fetch_and_activate_dom_single_layer)
    // LAYER IMAGES FUNCTIONALITY ENDS HERE
})
// FETCHES THE NEWLY UPDATED LAYER FROM THE DOM ENDS HERE
// SINGLE LAYER FUNCTIONALTIES ENDS HERE

// Import Layers Start Here
// open import component to import layers when there ain't no layers
start_import_layer_link.addEventListener("click", () => {
    user_layers_prev_components.push("on_no_layers")
    user_layers_current_component = "on_import"
    switch_user_layers_component()
})

// open import component to import layers more layers
import_layer_link.addEventListener("click", () => {
    user_layers_prev_components.push(["art_generator_crud_tools", "layers"])
    user_layers_current_component = "on_import"
    switch_user_layers_component()

    helper.disappear(art_generator_tools_container)
    art_generator_tools_container.style.left = "-40%"
})

// Control Import Copy/Paste
on_import_copy_btn.addEventListener("click", () => {
    let text = on_import_code_box.innerText;
    helper.copy_content(text)
})
on_import_paste_btn.addEventListener("click", () => {
    helper.paste_content(on_import_input)
})

helper.many_actions("click", 
    [on_import_copy_btn, on_import_continue_btn], () => {
    helper.disappear(on_import_instruction)
    helper.unhide(on_import_options, "flex")
    helper.appear(on_import_button, "2")
})

on_import_view_format_btn.addEventListener("click", () => {
    helper.appear(on_import_instruction)
    helper.hide(on_import_options)
    helper.disappear(on_import_button, "-2")
})
on_import_reset_btn.addEventListener("click", () => {
    on_import_input.value = ""
})

// import the layers in the import component text area
on_import_button.addEventListener("click", (e) => {
    e.preventDefault()

    let invalid_layer_names = [
        "", " ", "\t", "\n", 
        "~", "`", "!", "@", "#",
        "$", "%", "^", "&", "*", 
        "(", ")", "_",  "+", "[",
        "]", "{", "}", ";", ":", 
        '"', "'", "\\", "|", "<", 
        ",", ">", ".", "?", "/",
    ]
    if (invalid_layer_names.includes(on_import_input.value)) {
        let msg = "Please Add ONE or More Layer Names"
        let btns = [{text: "Ok", class:"notification_close n_clear",
                id:"##" + notification_screen.className}]
        helper.notification_box(nft_art_generator, notification_screen,
            {type: "alert !!!", msg, btns}
        )
    }else{
        let new_multi_layers = on_import_input.value.split("\n")
        new_multi_layers.forEach(nml => {
            let cleaned_nml = helper.remove_special_chars(nml)
            if (!invalid_layer_names.includes(cleaned_nml)) {
                let nl_id = (helper.count_keys(LAYERS) + 1).toString()
                let nl = new Layer(cleaned_nml, nl_id, 
                    [collection_width, collection_height])
            
                nl.add_to_layers()
                fetch_and_activate_dom_layers()
            }
        });

        user_layers_prev_components.push("on_import")
        user_layers_current_component = ["art_generator_crud_tools", "layers"]
        switch_user_layers_component()

        helper.appear(show_right_in_media_query_btn, "8")

        on_create_container.id = "quick_mode"
        on_import_input.value = ""
    }
})
on_import_close.addEventListener("click", () => {
    if (on_create_container.id == "box_mode") {
        close_user_layers_component("block")
    }else {
        close_user_layers_component("flex")
        layers_container.style.display = "block"
    }
})
// Import Layers Ends Here

// Create New Layers Starts Here 
start_create_layer_link.addEventListener("click", () => {
    user_layers_prev_components.push("on_no_layers")
    user_layers_current_component = "on_create"
    switch_user_layers_component()
})
create_layer_link.addEventListener("click", () => {
    user_layers_prev_components.push(["art_generator_crud_tools"])
    user_layers_current_component = "on_create"
    switch_user_layers_component()
})
on_create_button.addEventListener("click", (e) => {
    e.preventDefault()
    if (on_create_input.value == "") {
        helper.unhide(on_create_error_container, "block")
    } else {
        let new_layer_name = on_create_input.value.toString().toLowerCase()
        let new_layer_id = (helper.count_keys(LAYERS) + 1).toString()
        let new_layer = new Layer(new_layer_name, 
            new_layer_id, [collection_width, collection_height])
        new_layer.add_to_layers()
        fetch_and_activate_dom_layers()

        user_layers_prev_components.push("on_create")
        user_layers_current_component = ["art_generator_crud_tools", "layers"]
        switch_user_layers_component()

        helper.appear(show_right_in_media_query_btn, "8")

        on_create_input.value = ""
        helper.hide(on_create_error_container)
        on_create_container.id = "quick_mode"
    }
})
on_create_close.addEventListener("click", () => {
    if (on_create_container.id == "box_mode") {
        close_user_layers_component("block")
    }else close_user_layers_component("flex")
})
// Create New Layers Ends Here 

// Show art gen tools starts Here 
art_generator_tools_container_btn.addEventListener("click", () => {
    helper.toggle_many_style_for_one(art_generator_tools_container, [
        ["opacity", "1", "0"],
        ["z-index", "5", "-5"],
        ["left", "0%", "-40%"]   
    ])
}) 

// Generate NFT Art Functionalities Starts Here
generate_art_link.addEventListener('click', () => {
    user_layers_prev_components.push(["art_generator_crud_tools", "layers"])
    user_layers_current_component = "on_generate"
    switch_user_layers_component()

    helper.disappear(art_generator_tools_container)
    art_generator_tools_container.style.left = "-40%"
})
disabled_generate_art_link.addEventListener('click', () => {
    let msg = "Add at least two(2) layers and one(1) image to each layer"
    let btns = [{text: "Ok", class:"notification_close n_clear",
            id:"##" + notification_screen.className}]
    helper.notification_box(nft_art_generator, notification_screen,
        {type: "alert !!!", msg, btns}
    )
})
on_generate_close.addEventListener('click', () => {
    close_user_layers_component("flex")
    layers_container.style.display = "block"
})

// Generate a Test Art
let test_art_url;
build_test_btn.addEventListener("click", () => { 
    test_art_preview_canvas.width = collection_width
    test_art_preview_canvas.height = collection_height
    let test_art_preview_canvas_context = test_art_preview_canvas.getContext("2d")

    let test_resource = build_test_resource(get_layers())
    test_art_preview_canvas_context.clearRect(0, 0,
        test_art_preview_canvas.width,
        test_art_preview_canvas.height)
    build_composite(test_resource, 
        test_art_preview_canvas_context,
        test_art_preview_canvas.width,
        test_art_preview_canvas.height)
    
    test_art_url = 
    test_art_preview_canvas_context["canvas"]
        .toDataURL("image/png")

    layers_container.setAttribute("select_mode", "relative")
    let all_images_check_box = layers_container.querySelectorAll(".layer .image_check_box .check_box")    
    helper.unselect_check_boxes(all_images_check_box)
    free_checked_images()
    fetch_and_activate_dom_layers()
    
    // Hide Test Mode Elements
    cancel_build_test_btn.click()
    helper.disappear(build_test_btn, "-7")

    // Display The Test Art Preview and Image Info
    test_art_downloader_items[0].innerHTML = `${collection_width} x ${collection_height}`
    test_art_downloader_items[1].innerHTML = `test_art.${collection_format}`
    generator_preview_frames_links[1].click()
    if (WINDOW_WIDTH <= 900) {
        show_right_in_media_query_btn.click()
    }

    // DOWNLOAD GENERATED TEST ART STARTS HERE
    test_art_downloader_items[2].onclick = () => {
        let a = document.createElement("a")
        a.href = test_art_url
        // Set The Output Image Name
        a.download = `test_art.${collection_format}`
        // a.download = `test_art.png`
        // Initiate The Download
        a.click()
    }
    // DOWNLOAD GENERATED TEST ART ENDS HERE
})
// Generate a Test Art Ends Here

// Generate a random collection
let collection_art_urls = []
on_generate_options[1].addEventListener("click", (e) => {
    collection_image_generator_canvas.width = collection_width
    collection_image_generator_canvas.height = collection_height
    let collection_image_generator_canvas_context = collection_image_generator_canvas.getContext("2d")

    let collection_resource = build_collection_resource(get_layers())

    // Empty Previously Generated Content
    generated_arts_container.innerHTML = ""

    for (let i = 0; i < collection_size; i++) {
        collection_image_generator_canvas_context.clearRect(0, 0,
            collection_image_generator_canvas.width,
            collection_image_generator_canvas.height)
        build_composite(collection_resource, 
            collection_image_generator_canvas_context,
            collection_image_generator_canvas.width,
            collection_image_generator_canvas.height)

        let new_art_url = collection_image_generator_canvas_context["canvas"].toDataURL("image/png")
        let new_art = document.createElement("img")
        new_art.src = new_art_url
        new_art.id = `coll_${i}`

        let new_art_container = document.createElement("li")
        new_art_container.appendChild(new_art)

        generated_arts_container.appendChild(new_art_container)
        colletion_images_preview.src = new_art_url
        collection_art_urls.push(new_art_url)
    }

    // Display The Collection Preview
    generator_preview_frames_links[2].click()
    if (WINDOW_WIDTH <= 900) {
        show_right_in_media_query_btn.click()
    }
    
    // Display Image In The Preview Box Onclick
    let current_image_cnt = 0;
    let prev_image_cnt, next_image_cnt;
    let collection_images = generated_arts_container.querySelectorAll("img")
    collection_images.forEach(coll_image => {
        coll_image .addEventListener("click", () => {
            current_image_cnt = parseInt((coll_image.id).split("_")[1])
            coll_image.style.border = "5px solid var(--tc2)"
            collection_images.forEach(c_img => {
                if (c_img.id != coll_image.id) c_img.style.border = "none"
            })
            colletion_images_preview.src = coll_image.src
        })
    });

    show_prev_col_image_btn.addEventListener("click", () => {
        let current_image = generated_arts_container.querySelector(`#coll_${current_image_cnt}`)
        current_image.style.border = "none"

        if (current_image_cnt == 0) prev_image_cnt = collection_size - 1
        else prev_image_cnt = current_image_cnt - 1

        current_image_cnt = prev_image_cnt
        let prev_image = generated_arts_container.querySelector(`#coll_${prev_image_cnt}`)
        prev_image.style.border = "5px solid var(--tc2)"
        colletion_images_preview.src = prev_image.src
    })
    show_next_col_image_btn.addEventListener("click", () => {
        let current_image = generated_arts_container.querySelector(`#coll_${current_image_cnt}`)
        current_image.style.border = "none"

        if (current_image_cnt == (collection_size - 1)) next_image_cnt = 0
        else next_image_cnt = current_image_cnt + 1

        current_image_cnt = next_image_cnt
        let next_image = generated_arts_container.querySelector(`#coll_${next_image_cnt}`)
        next_image.style.border = "5px solid var(--tc2)"
        colletion_images_preview.src = next_image.src
    })

    // DOWNLOAD GENERATED COLLECTION STARTS HERE
    collection_download_btn.onclick = () => {
        let cnt = 0
        collection_art_urls.forEach( url => {
            let a = document.createElement("a")
            a.href = url
            // Set The Output Image Name
            a.download = `${collection_name}_${cnt}.${collection_format}`
            // a.download = `z_${cnt}.png`
            // Initiate The Download
            a.click()
            cnt++
        });
    }
    // DOWNLOAD GENERATED COLLECTION ENDS HERE

    // Exit on_generate
    on_generate_close.click()
})
// Generate a random collection ends here

// Generator Preview Controllers
generator_preview_frames_links[0].addEventListener("click", () => {
    helper.elements_state_swap(
        ["layer_image_preview_frame"], "opened", "flex", "0%")    
    helper.elements_state_swap(
        ["test_art_preview_frame", "collection_preview_frame"],
         "closed", "none", "100%")
})
generator_preview_frames_links[1].addEventListener("click", () => {
    helper.elements_state_swap(
        ["test_art_preview_frame"], "opened", "flex", "0%")    
    helper.elements_state_swap(
        ["layer_image_preview_frame", "collection_preview_frame"],
         "closed", "none", "100%")
})
generator_preview_frames_links[2].addEventListener("click", () => {
    helper.elements_state_swap(
        ["collection_preview_frame"], "opened", "flex", "0%")    
    helper.elements_state_swap(
        ["layer_image_preview_frame", "test_art_preview_frame"],
         "closed", "none", "100%")
})

// Generate NFT Art Functionalities Starts Here

// Complete Shutdown/Deletion Of The Current 
// Collection and NFT Art Generator Itself
let shutdown_nft_art_generator = () => {
    layers_container.innerHTML = ""
    empty_layers()

    setTimeout(() => {
        fetch_and_activate_dom_layers
        get_layers();
    }, 5000);
    
    user_layers.setAttribute("state", "closed")
    create_nft_collection.setAttribute("state", "opened")
    helper.hide_many([test_art_preview_container, 
        collection_preview_container,
        user_layers, nft_art_generator_close])
    helper.unhide_many([create_nft_collection,
        free_frame_container], "flex")

    helper.unhide(nft_art_generator_link, "flex")
    helper.hide_many([nft_art_generator_setting_up, nft_art_generator_power_off_link])
    
    helper.disappear(show_right_in_media_query_btn, "-8")
    
    helper.hide(searcher_link)
    helper.disappear(search_opener_btn, "-2")

    // This ensures that the import and create form closes
    helper.elements_state_swap(["on_import", "on_create"], "closed")
    
    // Reset the create collection form values
    reset_form_values_btn.click()
    
    helper.elements_state_swap("nft_art_generator", "closed")
    helper.elements_state_swap("landing_page", "opened")
}

helper.many_actions("click", 
[nft_art_generator_power_off_link, nft_art_generator_close], () => {
    let msg = `You are about poweroff the art generator <br>
    <p>${collection_name} will be deleted !!</p>`
    let btns = [
        {text: "No", class:"notification_close n_clear", id:"##" + notification_screen.className},
        {text: "Yes", class:"notification_close", id: "deletes_something"}
    ]
    helper.notification_box(nft_art_generator, notification_screen,
        {type: "alert !!!", msg, btns}
    )
    if (notification_screen.querySelector("#deletes_something")) {
        notification_screen.querySelector("#deletes_something").addEventListener("click", () => {     
            shutdown_nft_art_generator()
        })
    }
})

home_link.addEventListener("click", () => {
    if(user_layers.getAttribute("state") == "closed"){
        helper.elements_state_swap("nft_art_generator", "closed")
        helper.elements_state_swap("landing_page", "opened")

        helper.unhide(nft_art_generator_link, "flex")
        helper.hide_many([nft_art_generator_setting_up, nft_art_generator_power_off_link])
    }
    else{
        nft_art_generator_power_off_link.click()
    }
})

// =====NFT ART GENERATOR FUNCTIONALITIES ENDS HERE===== //
// =====MIDDLE SIDE ENDS HERE=====//

// ================================================ //

// =====RIGHT SIDE STARTS HERE=====//

// =====RIGHT SIDE ENDS HERE=====//

// =====DESIGN LOGIC ENDS HERE===== //










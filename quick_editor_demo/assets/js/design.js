
import { Help_me } from "./functions.js"
import { Layer, get_layer, get_layers, delete_checked, 
    get_checked_layers, append_layer, empty_layers} from "./layer.js";

import {open_rename, close_rename, change_layer_name,
    delete_a_layer, add_images, add_image_options,
    get_checked_images, free_checked_images,
    select_test_images,
    build_test_resource, build_collection_resource,
    build_composite
} from "./layers_functions.js"

let helper = new Help_me();
let LAYERS;
let USER_MODE = "SINGLE" // OR MULTIPLE, GENERATOR
let CURRENT_EDIT_TOOL = "CROP" // OR RESIZE, FILTER

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

const components = document.querySelectorAll(".component");


// =====APP LEFT STARTS HERE===== //
const left_components_links = document.querySelectorAll(".l_c_l");
const left_components = document.querySelectorAll(".l_c");

const minimize_space = document.querySelector(".minimize_space")
const mini_space_btn = document.querySelector(".minimize_space .mini_btn")
const maxi_space_btn = document.querySelector(".minimize_space .maxi_btn")

const main_nav = document.querySelector(".main_nav")
const main_links = document.querySelectorAll(".main_link")
const main_nav_links_to_components = main_nav.querySelectorAll(".ltc")
const main_link_ul = document.querySelector(".main_link ul")
const edit_single_link = document.querySelector(".main_link ul .edit_single_link")
const edit_multiple_link = document.querySelector(".main_link ul .edit_multiple_link")
const nft_generator_link = document.querySelector(".main_link ul .nft_generator_link")

const link_icons = document.querySelectorAll(".link_icon")
const link_texts = document.querySelectorAll(".link_text")
const main_link_ul_link_texts = document.querySelectorAll(".main_link ul .link_text")
const main_link_ul_link_icons = document.querySelectorAll(".main_link ul .link_icon")
// =====APP LEFT ENDS HERE===== //

// =====APP MIDDLE STARTS HERE===== //
const middle_components = document.querySelectorAll(".m_c");
const middle_components_links = document.querySelectorAll(".m_c_l");
const middle_close_component_links = document.querySelectorAll(".middle .close")

// Searchbar Elements Starts Here
const searchbar = document.querySelector(".searchbar")
const search_form = document.querySelector(".searchbar form")
const search_form_cancel = document.querySelector(".searchbar form .form_cancel")
const search = document.querySelector(".searchbar #search")
const search_btn = document.querySelector(".searchbar button")
const search_small_screen_overlay = document.querySelector(".searchbar .search_small_screen_overlay")
const search_left_opener = document.querySelector(".searchbar .search_small_screen_overlay .left_opener")
const search_opener = document.querySelector(".searchbar .search_small_screen_overlay .search_opener")
// Searchbar Elements Endss Here

// Image_uploader Elements Starts Here
const image_uploader_container = document.querySelector(".image_uploader")
const image_uploader = document.querySelector("#upload_image")
const clear_uploads_btn = document.querySelector("#clear_uploads")
// Image_uploader Elements Starts Here

// Create Multiple Edits Elements Starts Here
const create_multiple_edits_container = document.querySelector(".create_multiple_edits")
const cme_output_name = document.querySelector(".create_multiple_edits #output_name")
const cme_btn = document.querySelector(".create_multiple_edits button")
// Create Multiple Edits Elements Ends Here

// Editor Elements Starts Here
const editor = document.querySelector(".editor")
const image_frame = document.querySelector(".image_frame")
const image_screen_container = document.querySelector(".image_frame .image_screen")
const image_screen = document.querySelector(".image_frame .image_screen img")
const filter_canvas_frame = document.querySelector(".filter_canvas_frame")
const filter_canvas_screen = document.querySelector(".filter_canvas_frame #filter_canvas_screen")

const switch_images = document.querySelector(".switch_images")
const tool_links = document.querySelectorAll(".tool_link")
const tools = document.querySelectorAll(".tool")
const crop_tool  = document.querySelector(".crop_tool ")
const rotate_tool = document.querySelector(".rotate_tool")
const resize_tool = document.querySelector(".resize_tool")
const filter_tool = document.querySelector(".filter_tool")
const change_edit_image = document.querySelector(".change_edit_image")
const save_edit = document.querySelector(".save_edit")

// Crop Tool
const clear_crop = document.querySelectorAll("#crop #clear_crop li")
const draw_drag = document.querySelectorAll("#crop #draw_drag li")
const lock_unlock = document.querySelectorAll("#crop #lock_unlock li")
const reset_poweroff = document.querySelectorAll("#crop #reset_poweroff li")

// Resize Tool
const resize_tool_what_to_edit_container = document.querySelector("#resize .what_to_edit")
const resize_tool_what_to_edit = document.querySelectorAll("#resize .what_to_edit li")
const original_dimensions = document.querySelectorAll("#resize #original_dimension span")
const crop_area_dimensions_container = document.querySelector("#resize #crop_area_dimension")
const crop_area_dimensions = document.querySelectorAll("#resize #crop_area_dimension span")
const resize_width = document.querySelector("#resize #resize_width input")
const resize_height = document.querySelector("#resize #resize_height input")
const resize_minusers = document.querySelectorAll("#resize .minuser")
const resize_adders = document.querySelectorAll("#resize .adder")
const resize_maintain_aspect_ratio = document.querySelector("#resize #maintain_aspect_ratio")


// Rotate Tool
const rotate_cw_acw = document.querySelectorAll("#rotate #rotate_cw_acw li")
const flip_x_y = document.querySelectorAll("#rotate #flip_x_y li")
const rotate_deg_warning = document.querySelector("#rotate #straighten #rotate_deg_warning")
const rotate_deg_display = document.querySelector("#rotate #straighten #rotate_deg_display")
const rotate_slider = document.querySelector("#rotate #straighten #straighten_slider")

// Filter Tool
const filter_tool_container = document.querySelector(".filter")
const filter_tools_link_container = document.querySelector(".filter .filter_tools")
const filter_tool_what_to_edit_container = document.querySelector(".filter .what_to_edit")
const filter_tool_what_to_edit = document.querySelectorAll(".filter .what_to_edit li")
const filter_tool_container_sliders = document.querySelectorAll(".filter .range_slider")
const filter_tool_links = document.querySelectorAll(".ft_tool_link")
const filter_tools = document.querySelectorAll(".ft_tool")
const reset_filter_sliders_btn = document.querySelector("#filter #reset_filters")
const brightness_slider = document.querySelector("#filter #brightness #brightness_slider")
const contrast_slider = document.querySelector("#filter #contrast #contrast_slider")
const grayscale_slider = document.querySelector("#filter #grayscale #grayscale_slider")
const saturation_slider = document.querySelector("#filter #saturation #saturation_slider")
const blur_slider = document.querySelector("#filter #blur #blur_slider")
const sepia_slider = document.querySelector("#filter #sepia #sepia_slider")
const hue_slider = document.querySelector("#filter #hue #hue_slider")
const tint_slider = document.querySelector("#filter #tint #tint_slider")
// Editor Elements Ends Here

// NFT Generator Elements starts here
const nft_generator = document.querySelector(".nft_generator")
const nft_generator_close = document.querySelector(".nft_generator .component_opener .close")

const nft_edit_layers_components  = document.querySelectorAll(".nft_edit_layers_c")
const nft_edit_layers_component_links = document.querySelectorAll(".middle .edit_layers .nft_edit_layers_c_l")
const nft_edit_layers_close_component_links = document.querySelectorAll(".middle .edit_layers .close")

// Create NFT Collection Component Elements Starts Here
const create_nft_collection = document.querySelector(".create_nft_collection")
const collection_name_input = document.querySelector("#collection_name")
const collection_description_input = document.querySelector("#collection_description")
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

const instruction_container  = document.querySelector(".instruction")

const import_export_container  = document.querySelector(".import_export")
const import_btn  = document.querySelector(".import_layers")
const export_btn  = document.querySelector(".export_layers")
const start_import_btn = document.querySelector(".start_import")
const on_import = document.querySelector(".on_import")
const on_import_close = document.querySelector(".on_import .close")
const on_import_input  = document.querySelector(".on_import_input")
const on_import_button  = document.querySelector(".on_import button")
const on_export = document.querySelector(".on_export")

const generate_art_btn = document.querySelector(".generate_art")
const on_generate = document.querySelector(".on_generate")
const on_generate_close = document.querySelector(".on_generate .close")
const on_generate_options = document.querySelectorAll(".on_generate_options li")
const build_test_btn = document.querySelector(".build_test")


const edit_layers_container  = document.querySelector(".edit_layers")
const no_layer_text  = document.querySelector(".edit_layers .no_layer")
const create_select_container  = document.querySelector(".edit_layers .create_select")

const create_layer  = document.querySelector(".create_layer")
const on_create  = document.querySelector(".on_create")
const on_create_close  = document.querySelector(".on_create_close")
const on_create_expand  = document.querySelector(".on_create_expand")
const on_create_input  = document.querySelector(".on_create_input")
const on_create_button  = document.querySelector(".on_create button")

const select_layer  = document.querySelector(".select_layer")
const on_select  = document.querySelector(".on_select")
const select_all  = document.querySelector(".select_all")
const unselect_all  = document.querySelector(".unselect_all")
let selected_cnt  = document.querySelector(".selected_cnt")
const on_select_cancel  = document.querySelector(".cancel_on_select")
const on_select_delete_btn = document.querySelector(".del_layers")
// User Layers Editor Elements Ends Here

// Single Layer Editor Elements Starts Here
// const user_single_layer = document.querySelector(".user_single_layer")
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
const test_art_preview_container = document.querySelector(".test_art_preview_frame")
const test_art_preview_canvas = document.querySelector("#test_art_canvas")
const test_art_downloader_items = document.querySelectorAll(".test_art_downloader li")

const collection_preview_container = document.querySelector(".collection_preview_frame")
const collection_image_generator_canvas = document.querySelector("#collection_image_generator_canvas")
const colletion_images_preview = document.querySelector(".collection_frame_image_cover img")
const generated_arts_container = document.querySelector("#generated_arts")
const collection_download_btn = document.querySelector(".collection_download_btn")

// Editor Previews
const cropper_preview_container = document.querySelector(".cropper_preview")
const cropper_preview = document.querySelector(".cropper_preview .image_preview")

const resizer_preview_container = document.querySelector(".resizer_preview")
const resizer_preview_canvas = document.querySelector(".resizer_preview #resizer_preview_canvas")

const filter_preview_container = document.querySelector(".filter_preview")
const filter_preview_canvas = document.querySelector(".filter_preview #filter_preview_canvas")

// Download Component Elements
const download_frame = document.querySelector(".download_frame")
const download_single_image_frame = document.querySelector(".download_frame .single_image")
const download_multiple_image_frame = document.querySelector(".download_frame multiple_image")
const download_image_box = document.querySelector(".download_frame .single_image .image_box")
const download_file_name = document.querySelector(".download_frame .send_to_user .file_name .f_name")
const download_file_type = document.querySelector(".download_frame .send_to_user .file_type")
const download_extension = document.querySelector(".download_frame .send_to_user .save_as select")
const download_spinner= document.querySelector(".download_frame .download_links .load_download")
const download_btn = document.querySelector(".download_frame .download_links .download_btn")
const cancel_download_btn = document.querySelector(".download_frame .cancel_download")

// Extra Tool Element Starts Here
const extra_tools = document.querySelector(".extra_tools")
let extra_tools_middle_lis = document.querySelectorAll(".extra_tools .ext_2 li")
const zoom_control = document.querySelectorAll(".extra_tools #zoom_control li")
const reset_zoom = document.querySelector(".extra_tools #reset_zoom")
const move_control = document.querySelectorAll(".extra_tools #move_control li")
const crop_aspect_ratios = document.querySelectorAll(".extra_tools #crop_aspect_ratios li")
const crop_top = document.querySelector(".extra_tools #crop_top input")
const crop_left = document.querySelector(".extra_tools #crop_left input")
const crop_width= document.querySelector(".extra_tools #crop_width input")
const crop_height = document.querySelector(".extra_tools #crop_height input")

const color_picker = document.querySelector(".extra_tools #color_picker")
const recent_colors = document.querySelectorAll(".extra_tools #recent_colors li")
const frequently_used_colors = document.querySelectorAll(".extra_tools #frequently_used li")

const insert_tools_container = document.querySelector(".extra_tools .insert_tools")
const preset_filters = document.querySelectorAll(".extra_tools #preset_filters li")
const filter_custom_color = document.querySelectorAll(".extra_tools .filter_custom_color input")
const save_custom_properties = document.querySelector(".extra_tools .save_custom_properties")

// Extra Tool Element Ends Here
// =====APP RIGHT ENDS HERE===== //

// =====GENERALLY USED ELEMENTS STARTS HERE===== //
const close_component_links = document.querySelectorAll(".close")
const check_boxes = document.querySelectorAll(".check_box")
const vanish_point = document.querySelector("#vanish_point")
const notification_screen = document.querySelector(".notification_screen")
// =====GENERALLY USED ELEMENTS ENDS HERE===== //


// =====MEDIA QUERY ELEMENTS STARTS HERE===== //
const right_tools_in_media_query_container = document.querySelector(".right_tools_in_media_query")
const right_tools_in_media_query_openers = document.querySelectorAll(".right_tools_in_media_query li")
// =====MEDIA QUERY ELEMENTS ENDS HERE===== //




// =====DESIGN LOGIC STARTS HERE===== //


// SET USER_MODE STARTS HERE
edit_single_link.onclick = () => USER_MODE = "SINGLE"
edit_multiple_link.onclick = () => USER_MODE = "MULTIPLE"
nft_generator_link.onclick = ()  => USER_MODE = "GENERATOR"
// SET USER_MODE ENDS HERE

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
    
    helper.toggle_style_many([
        {name: main_link_ul,
            props: [["width", "500%", "100%"],
            ["right", "-500%", "-100%"]]}
    ])

    helper.style_one_for_many(main_link_ul_link_texts, "display", "flex");
    helper.style_one_for_many(main_link_ul_link_icons, "width", "25%");

})

// Add Interactivity To Nav Links With Child Nav (ul)
let link_to_child_icon = [`fa fa-angle-right`, `fa fa-angle-left`]
if (WINDOW_WIDTH <= SMALL_SCREEN) link_to_child_icon = [`fa fa-angle-down`, `fa fa-angle-up`]
main_links.forEach(link => {
    if (link.querySelector(".link_to_child")){
        let link_to_child_elements = link.querySelectorAll(".link_to_child p")
        link_to_child_elements
        link_to_child_elements[1].innerHTML = `<i class="${link_to_child_icon[0]}"></i>`
        let link_ul = link.querySelector("ul")
    
        link.addEventListener("click", () => {
            helper.toggleIcon(link_to_child_elements[1],
                link_to_child_elements[1].innerHTML,
                link_to_child_icon[1], 
                link_to_child_icon[0])
            helper.toggle_many_style_for_one(link_ul, [
                ["display", "block", "none"],
                ["opacity", "1", "0"],
                ["z-index", "6", "-6"]
            ])
        })
    }
});

if (WINDOW_WIDTH <= SMALL_SCREEN) {
    // Search Elements Functionalities
    search_opener.addEventListener("click", () => {
        console.log("clicked");
        helper.disappear(search_small_screen_overlay, -5)
        helper.unhide(search_form, "flex")
        helper.unhide(search_form_cancel, "flex")
    })
    search_form_cancel.addEventListener("click", () => {
        console.log("clicked");
        helper.appear(search_small_screen_overlay, 5)
        helper.hide(search_form)
    })
    search_btn.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("Searching...");
    })
    search_left_opener.addEventListener("click", () => {
        helper.toggle_many_style_for_one(app_left, [
            ["left", "0%", "-70%"],
            ["z-index", "4", "-4"]
        ])
    })

    // Elements That Closes Left Menu
    helper.many_actions("click", 
    [app_right, editor, nft_generator,
         main_nav_links_to_components, search_opener], 
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
// Components Navigations Starts Here
// switches app middle components
helper.navigate(middle_components_links, middle_components, "block")
// helper.close(middle_close_component_links, middle_components, "block")

// =====EDITOR FUNCTIONALITIES STARTS HERE===== //
// switch editing tools components
helper.navigate(tool_links, tools, "block", "enable")
helper.navigate(filter_tool_links, filter_tools, "block", "enable")

// SET ACTIVE ELEMENTS STARTS HERE
helper.set_active(extra_tools_middle_lis, "active_btn")
helper.set_active(filter_tool_links, "active_link")
// SET ACTIVE ELEMENTS ENDS HERE

// Tools Navigation Functionalities Starts Here
let show_on_tools_click = ["cropper_preview", "extra_tools"]
let hide_on_tools_click = ["free_frame", "download_frame"]
let cropper_extra_tools =["cropper_extra_tools"]
let resize_extra_tools = ["resizer_preview"]
let filter_extra_tools = ["filter_preview", "filter_extra_tools"]

helper.many_actions("click", [crop_tool, rotate_tool], () => {
    CURRENT_EDIT_TOOL = "CROP"
    helper.elements_state_swap(
        show_on_tools_click.concat(cropper_extra_tools), "opened", "flex")
    helper.elements_state_swap(
        hide_on_tools_click.concat(filter_extra_tools).concat(resize_extra_tools), "closed")

    if (WINDOW_WIDTH <= SMALL_SCREEN){
        helper.unhide(right_tools_in_media_query_openers[1], "flex")
        helper.unhide(image_frame, "flex")
        helper.hide(filter_canvas_frame)
    }
})
resize_tool.addEventListener("click", () => {
    CURRENT_EDIT_TOOL = "RESIZE"
    helper.elements_state_swap(resize_extra_tools, "opened", "flex")
    helper.elements_state_swap(
         show_on_tools_click.concat(hide_on_tools_click)
         .concat(cropper_extra_tools)
         .concat(filter_extra_tools), "closed")
    helper.hide(right_tools_in_media_query_openers[1])
    if (WINDOW_WIDTH < SMALL_SCREEN) {
        helper.hide(right_tools_in_media_query_openers[1])
        helper.unhide(image_frame, "flex")
        helper.hide(filter_canvas_frame)
    }
})
filter_tool.addEventListener("click", () => {
    CURRENT_EDIT_TOOL = "FILTER"
    helper.elements_state_swap(["extra_tools"].concat(filter_extra_tools), "opened", "flex")
    helper.elements_state_swap(["cropper_preview"].concat(hide_on_tools_click)
        .concat(cropper_extra_tools)
        .concat(resize_extra_tools),"closed")
    if (WINDOW_WIDTH < SMALL_SCREEN) {
        helper.unhide(right_tools_in_media_query_openers[1], "flex")
        filter_tools_link_container.classList.add("scr", "scr-x")
    }
})
let reset_editor = () => {
    crop_tool.click()
    helper.appear(resize_tool_what_to_edit_container)
    helper.appear(filter_tool_what_to_edit_container)
}
// Tools Navigation Functionalities Ends Here

// ==== WORKING WITH FILE/FILES INFO STARTS HERE===== //
// Store All File Properties
let file_props = {
    name: "",type: "",
    type_icon: "",extension: "",
}

// Multiple Editor Starts Here
cme_btn.addEventListener("click", (e) => {
    e.preventDefault()
    USER_MODE = "MULTIPLE"
    file_props.name = cme_output_name.value
    image_uploader.setAttribute("multiple", "")

    helper.hide(create_multiple_edits_container)
    helper.unhide(image_uploader_container, "flex")
})
// Multiple Editor Ends Here

// Handle Uploads Starts Here
clear_uploads_btn.addEventListener("click", (e) => {
    image_uploader.value = ""
})

// Set The Output File Info Based On The user MODE Starts Here
let GET_USER_MODE = () => {
    if (USER_MODE == "SINGLE"){
        file_props.type = "image"
        file_props.type_icon = `<i class="fa fa-image"></i>`
    }
    else if(USER_MODE == "MULTIPLE"){
        console.log(USER_MODE);
        file_props.type = "zip"
        file_props.type_icon = `<i class="fa fa-archive"></i>`
        helper.unhide(switch_images, "block")
    }
    else if(USER_MODE == "GENERATOR"){
        console.log(USER_MODE);
    }
    return USER_MODE
}
// Set The Output File Info Based On The user MODE Ends Here

// Store The Download Url Of The Edited Image/File
let edited_image_url;

// Store The Url Of The Edited Image For Re-useabilty 
// e.g appending the image to container
let output_image_url;



// =====WORKING WITH FILE/FILES INFO STARTS HERE===== //

// =====HANDLING UPLOADS STARTS HERE===== //
image_uploader.addEventListener("change", (e) => {
    GET_USER_MODE()
    helper.elements_state_swap(["free_frame", "image_uploader"], "closed")
    helper.elements_state_swap(hide_on_tools_click.concat(filter_extra_tools), "closed")
    helper.elements_state_swap(["editor"], "opened", "block")
    helper.elements_state_swap(["cropper_preview", "extra_tools"], "opened", "flex")


    // APP MIDDLE TO LEFT TOGGLE FOR MEDIA QUERY STARTS HERE
    // Switch To Right Side Of App
    helper.many_actions('click', 
    [right_tools_in_media_query_openers[0], right_tools_in_media_query_openers[1]],
    () => {
        app_right.style.left = "0%"
        helper.hide_many([
            search_small_screen_overlay,
            right_tools_in_media_query_openers[0],
             right_tools_in_media_query_openers[1]])
        helper.unhide(right_tools_in_media_query_openers[2], "flex")
    })
    // Adjust Some CSS Styles
    right_tools_in_media_query_openers[1].onclick = () => {
        if (WINDOW_WIDTH <= SMALL_SCREEN){
            if (CURRENT_EDIT_TOOL == "FILTER") insert_tools_container.style.height = "90% !important";
            else insert_tools_container.style.height = "100% !important";
        }
    }
    // Hide Some Extra Tools MQuery Buttons Depending On The Edit Tool Mode
    right_tools_in_media_query_openers[2].onclick = () => {
        app_right.style.left = "100%"
        helper.unhide(search_small_screen_overlay, "flex")
        helper.hide(right_tools_in_media_query_openers[2], "flex")

        if (CURRENT_EDIT_TOOL == "RESIZE") {
            helper.unhide(right_tools_in_media_query_openers[0], "flex")
        }else{
            helper.unhide_many([right_tools_in_media_query_openers[0], 
                right_tools_in_media_query_openers[1]], "flex")
        }
    }
    // APP MIDDLE TO LEFT TOGGLE FOR MEDIA QUERY ENDS HERE

    // FILE CONTROLLERS STARTS HERE
    let file = image_uploader.files[0]
    let url = window.URL.createObjectURL(new Blob([file], {type: 'image/jpg'}))
    image_screen.src = url

    let options = {
        dragMode : 'move',
        preview : cropper_preview,
        viewMode : 2,
        modal : false,
        background : true,
        ready : function () {
            console.log('cropper ready')

            // Get The Image Original Dimensions
            const ORIGINAL_WIDTH = cropper.getImageData().naturalWidth
            const ORIGINAL_HEIGHT = cropper.getImageData().naturalHeight

            // Store The Uploaded Image Data As URL
            let ORIGINAL_IMAGE_DATA_URL = "";

            // This Will Get The Context From Each Edit Tool Canvas
            let canvas_context;

            // change image
            change_edit_image.onclick = () => {
                image_uploader.click()
                image_uploader.addEventListener("change", () => {
                    file = image_uploader.files[0]
                    let new_url = window.URL.createObjectURL(new Blob([file], {type: 'image/jpg'}))
                    cropper.replace(new_url)
                    reset_editor()
                })
            }

            // =====IMAGE CROPPER STARTS HERE===== //
            // Crop Box and Custom Input Configuration
            let crop_data = {
                top : Math.floor(cropper.getCropBoxData().top),
                left : Math.floor(cropper.getCropBoxData().left),
                height : Math.floor(cropper.getCropBoxData().height),
                width : Math.floor(cropper.getCropBoxData().width)
            }
            
            // Get The Crop Box From The DOM
            let crop_box_container = document.querySelector(".cropper-crop-box")
            
            // This will set the value of each crop custom input
            let set_crop_custom_input_values = () => {
                crop_top.value = Math.floor(cropper.getCropBoxData().top)
                crop_left.value = Math.floor(cropper.getCropBoxData().left)
                crop_height.value = Math.floor(cropper.getCropBoxData().height)
                crop_width.value = Math.floor(cropper.getCropBoxData().width)
            }
            // Set The Initial Values
            set_crop_custom_input_values()

            // This Will Set Live Crop Box Values From Crop Custom Input
            let custom_input_change = (elements) => {
                elements.forEach(element => {
                    element.onchange = () => {
                        crop_data[element.name] = parseInt(element.value)
                        cropper.setCropBoxData(crop_data)
                    } 
                });
            }
            // Initiate The Live Update From Crop Custom Input
            custom_input_change([crop_top, crop_left, crop_height, crop_width])
            
             // Set The Values Of The Crop Custom Input When The Crop Box Is Moved
            image_screen.addEventListener('cropmove', (event) => {
                set_crop_custom_input_values()
            })

            // Set Crop Box Data If The Save Button Is Click Instead
            save_custom_properties.onclick = () => {
                crop_data.top = Math.floor(parseInt(crop_top.value)),
                crop_data.left = Math.floor(parseInt(crop_left.value)),
                crop_data.height = Math.floor(parseInt(crop_height.value)),
                crop_data.width = Math.floor(parseInt(crop_width.value))
                cropper.setCropBoxData(crop_data)
            }

            // clear-crop
            clear_crop[0].onclick = () => cropper.clear()
            clear_crop[1].onclick = () => 
            {
                cropper.crop()
                console.log(cropper);
                console.log(cropper.getData());
            }

            // draw-drag mode
            draw_drag[0].onclick = () => cropper.setDragMode("crop")
            draw_drag[1].onclick = () => cropper.setDragMode("move")
            
            // lock cropper
            lock_unlock[0].onclick = () => cropper.disable()
            lock_unlock[1].onclick = () => cropper.enable()

            reset_poweroff[0].onclick = () => {
                cropper.reset()
                set_crop_custom_input_values()
            }
            reset_poweroff[1].onclick = () => {
                cropper.destroy()
            }

            let display_rotate_value = (fecth_func) => {
                let cropper_data = fecth_func
                console.log(cropper_data);
                if (cropper_data["rotate"] < 0) {
                    cropper_data["rotate"] = 360 + cropper_data["rotate"]
                }
                rotate_deg_display.value = cropper_data["rotate"]
                rotate_slider.value = cropper_data["rotate"]
            }
            rotate_cw_acw[0].onclick = () => {
                cropper.rotate(5)
                display_rotate_value(cropper.getData())
            }
            rotate_cw_acw[1].onclick = () => {
                cropper.rotate(-5)
                display_rotate_value(cropper.getData())
            }
            rotate_deg_display.onchange = (e) => {
                if (rotate_deg_display.value > 360) {
                    rotate_deg_display.value = 0
                    helper.unhide(rotate_deg_warning, "flex")
                }else{
                    helper.hide(rotate_deg_warning)
                }
                cropper.rotateTo(rotate_deg_display.value)
                display_rotate_value(cropper.getData())
            }
            rotate_slider.onchange = (e) => {
                cropper.rotateTo(rotate_slider.value)
                rotate_deg_display.value = cropper.getData().rotate
            }

            let flip_x = -1
            let flip_y = -1
            flip_x_y[0].onclick = () => {
                cropper.scale(flip_x, 1), 
                flip_x = -flip_x
            }
            flip_x_y[1].onclick = () => {
                cropper.scale(1, flip_y)
                flip_y = -flip_y
            }

            zoom_control[0].onclick = () => cropper.zoom(0.1)
            zoom_control[1].onclick = () => cropper.zoom(-0.1)
            reset_zoom.onclick = () => cropper.reset()

            move_control[0].onclick = () => cropper.move(0, -1)
            move_control[1].onclick = () => cropper.move(-1, 0)
            move_control[2].onclick = () => cropper.move(1, 0)
            move_control[3].onclick = () => cropper.move(0, 1)

            // set aspect ratio
            crop_aspect_ratios[0].onclick = () => cropper.setAspectRatio(1.7777777777777777) // 16 : 9
            crop_aspect_ratios[1].onclick = () => cropper.setAspectRatio(1.3333333333333333) // 4 : 3
            crop_aspect_ratios[2].onclick = () => cropper.setAspectRatio(1) // 1
            crop_aspect_ratios[3].onclick = () => cropper.setAspectRatio(0.6666666666666666) // 3 : 2
            crop_aspect_ratios[4].onclick = () => cropper.setAspectRatio(0) // Free
            // =====IMAGE CROPPER ENDS HERE===== //

            // =====GET THE ORIGINAL IMAGE DATA URL STARTS HERE===== //
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener("load", (event) => {
                ORIGINAL_IMAGE_DATA_URL = event.target.result;
            });
            // =====GET THE ORIGINAL IMAGE DATA URL ENDS HERE===== //

            // =====IMAGE RESIZER STARTS HERE===== //
            resize_tool.onclick = () => {
                // Display The Image Original Dimensions
                original_dimensions[0].innerHTML = ORIGINAL_WIDTH
                original_dimensions[1].innerHTML = ORIGINAL_HEIGHT

                // Activate Adder and Minuser Buttons
                helper.add_or_minus_value(resize_width, resize_minusers[0], resize_adders[0], 10, 10000)
                helper.add_or_minus_value(resize_height, resize_minusers[1], resize_adders[1], 10, 10000)

                // Activate Aspect Ratio Check Box
                helper.activate_check_box([resize_maintain_aspect_ratio], vanish_point);

                // Stores The Resize Preview Image Data URL
                let resize_start_image_url;
                // Stores The Resize Preview Image
                let resize_start_image;
                // Store Start Image originalWidthToHeightRatio
                let originalWidthToHeightRatio;

                // Allow User Decide Which Image To Resize
                // Cropped Area Image
                resize_tool_what_to_edit[0].onclick = () => {
                    resize_start_image_url = cropper.getCroppedCanvas().toDataURL("image/png")
                    
                    // Display The Cropped Area Dimensions
                    crop_area_dimensions[0].innerHTML = Math.floor(cropper.getCropBoxData().width)
                    crop_area_dimensions[1].innerHTML = Math.floor(cropper.getCropBoxData().height)

                    // Set Default Value For Resize Inputs
                    resize_width.value = Math.floor(cropper.getCropBoxData().width)
                    resize_height.value = Math.floor(cropper.getCropBoxData().height)

                    helper.disappear(resize_tool_what_to_edit_container)
                    activate_resizer()
                }
                // Or The Original Image
                resize_tool_what_to_edit[1].onclick = () => {
                    resize_start_image_url = ORIGINAL_IMAGE_DATA_URL

                    // Set Default Value For Resize Inputs
                    resize_width.value = ORIGINAL_WIDTH
                    resize_height.value = ORIGINAL_HEIGHT

                    helper.hide(crop_area_dimensions_container)
                    helper.disappear(resize_tool_what_to_edit_container)
                    activate_resizer()
                }


                // Activate Resizer Functionalities
                let activate_resizer = () => {
                    // Create, Load and Insert Image Into Resizer Preview Canvas
                    // With The Specified IMAGE DATA URL
                    let openImage = (image_src) => {
                        resize_start_image = new Image();
                        resize_start_image.addEventListener("load", () => {
                        originalWidthToHeightRatio = resize_start_image.width / resize_start_image.height;
                        canvas_context = helper.resize(resize_start_image, resizer_preview_canvas, resize_start_image.width, resize_start_image.height, resize_width, resize_height);
                        });
                        resize_start_image.src = image_src;
                    }  
                    openImage(resize_start_image_url)

                    // Adjust Image Dimension Based On Aspect Ratio
                    let adjust_aspect_ratio_from_width = () => {
                        if (!resize_start_image) return;
                        const asp_resize_height_value = helper.check_box_state(resize_maintain_aspect_ratio)
                            ? resize_width.value / originalWidthToHeightRatio
                            : resize_height.value;
                        canvas_context = helper.resize(resize_start_image, resizer_preview_canvas, resize_width.value, asp_resize_height_value, resize_width, resize_height);
                    }
                    let adjust_aspect_ratio_from_height = () => {
                        if (!resize_start_image) return;
                        const asp_resize_width_value = helper.check_box_state(resize_maintain_aspect_ratio)
                            ? resize_height.value * originalWidthToHeightRatio
                            : resize_width.value;
                        canvas_context = helper.resize(resize_start_image, resizer_preview_canvas, resize_width.value, asp_resize_width_value, resize_width, resize_height);
                    }
                    resize_width.addEventListener("change", adjust_aspect_ratio_from_width);
                    resize_height.addEventListener("change", adjust_aspect_ratio_from_height);
                }
            }
            // =====IMAGE RESIZER ENDS HERE===== //

            // =====FILTER IMAGE STARTS HERE===== //
            filter_tool.onclick = () => {
                // Set Default Values For Sliders
                let default_filter_values = [100, 100, 0, 100, 0, 0, 0, 0]
                helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                
                // Create An Object To Store All Filter Sliders Value
                let filter_data = {}
                let set_filter_data = () => {
                    filter_tool_container_sliders.forEach(f_slider => {
                        filter_data[f_slider.name] = f_slider.value
                    });
                }
                set_filter_data()

                // Get Filter Display Canvases
                let filter_display_canvases;
                if (WINDOW_WIDTH <= SMALL_SCREEN) filter_display_canvases = {filter_canvas_screen, filter_preview_canvas}
                else filter_display_canvases = {filter_preview_canvas}

                // Stores The Filter Preview Image Data URL
                let filter_start_image_url;
                // Stores The Filter Preview Image
                let filter_start_image;

                // Allow User Decide Which Image To Filter
                // Cropped Area Image
                let start_filtering = () => {
                    helper.disappear(filter_tool_what_to_edit_container)
                    if (WINDOW_WIDTH <= SMALL_SCREEN){
                        helper.unhide(filter_canvas_frame, "flex")
                        helper.hide(image_frame)
                    }
                    activate_filter()
                }
                filter_tool_what_to_edit[0].onclick = () => {
                    filter_start_image_url = cropper.getCroppedCanvas().toDataURL("image/png")
                    start_filtering()
                }
                // Or The Original Image
                filter_tool_what_to_edit[1].onclick = () => {
                    filter_start_image_url = ORIGINAL_IMAGE_DATA_URL
                    start_filtering()
                }
                
                // Allow Filter Functionality Once User Decides On Image To Filter
                let activate_filter = () => {
                    filter_start_image = document.createElement("img")
                    filter_start_image.src = filter_start_image_url
                    filter_start_image.onload = () => {
                        for (const canvas_key in filter_display_canvases) {
                            if (Object.hasOwnProperty.call(filter_display_canvases, canvas_key)) {
                                const canvas = filter_display_canvases[canvas_key];
                                canvas.width = filter_start_image.width;
                                canvas.height = filter_start_image.height;
                                canvas.crossOrigin = "anonymous";
                            }
                        }
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    }
                    // This Will Set Live Crop Box Values From Crop Custom Input
                    let custom_slider_change = (elements) => {
                        elements.forEach(element => {
                            element.onchange = () => {
                                filter_data[element.name] = element.value
                                canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                                console.log(canvas_context);
                            } 
                        });
                    }
                    // Initiate The Live Update From Filter Sliders
                    custom_slider_change([brightness_slider, contrast_slider, grayscale_slider, saturation_slider,
                        blur_slider, sepia_slider, hue_slider, tint_slider])
    
                    // Reset Filter Canvas Back To Default Values
                    reset_filter_sliders_btn.onclick = () => {
                        helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                        set_filter_data()
                        console.log(filter_data);
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    }
    
                    // Create Preset Filters
                    let brighten = () => {
                        helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                        reset_filter_sliders_btn.click()
                        brightness_slider.value = 130;
                        contrast_slider.value = 120;
                        saturation_slider.value = 120;
                        set_filter_data()
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    }
                    let black_and_white = () => {
                        helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                        grayscale_slider.value = 100;
                        brightness_slider.value = 120;
                        contrast_slider.value = 120;
                        set_filter_data()
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    } 
                    let funky = () => {
                        helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                        // Set a random hue rotation everytime
                        hue_slider.value = Math.floor(Math.random() * 360) + 1;
                        contrast_slider.value = 120;
                        set_filter_data()
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    } 
                    let vintage = () => {
                        helper.reset_sliders(default_filter_values, filter_tool_container_sliders)
                        brightness_slider.value = 120;
                        saturation_slider.value = 120;
                        sepia_slider.value = 150;
                        set_filter_data()
                        canvas_context = helper.filter(filter_start_image, filter_display_canvases, filter_data);
                    }
    
                    // Activate Preset Filters With Buttons
                    preset_filters[0].onclick = () => brighten()
                    preset_filters[1].onclick = () => black_and_white()
                    preset_filters[2].onclick = () => funky()
                    preset_filters[3].onclick = () => vintage()
                }
              
            }
            // =====FILTER IMAGE ENDS HERE===== //
            
            // =====SAVE EDIT STARTS HERE===== //
            save_edit.onclick = async () => {
                helper.elements_state_swap(["free_frame", "extra_tools", "cropper_preview",
                 "resizer_preview", "filter_preview"], "closed")
                helper.elements_state_swap("download_frame", "opened", "block")
                if (WINDOW_WIDTH <= SMALL_SCREEN) app_right.style.left = "0%"

                // Set The Download Info
                download_file_name.innerHTML = file_props.name
                download_file_type.innerHTML = `
                <div class="f_type">
                    ${file_props.type_icon}
                    <p class="type_name">${file_props.type}</p>
                </div>`

                // Get The Image Extension From User
                download_extension.onchange = () => {
                    file_props.extension = download_extension.value
                }

                if (CURRENT_EDIT_TOOL == "CROP") {
                    // Set The File Name
                    file_props.name = "cropped"
                    download_file_name.innerHTML = file_props.name
                    // Set The Download URL
                    cropper.getCroppedCanvas().toBlob((blob) => {
                        edited_image_url = window.URL.createObjectURL(blob)
                    })
                    // Set The Download Preview Url
                    output_image_url = cropper.getCroppedCanvas().toDataURL(file_props.type + "/" + file_props.extension)
                    // Adjust (download_image_box) to fit the crop_box image
                    download_image_box.style.width = crop_box_container.style.width
                    download_image_box.style.height = crop_box_container.style.height
                }
                else if (CURRENT_EDIT_TOOL == "RESIZE") {
                    // Set The File Name
                    file_props.name = "resized"
                    download_file_name.innerHTML = file_props.name 
                    // Get The Resized Image URL
                    output_image_url  = canvas_context.toDataURL(file_props.type + "/" + file_props.extension)
                    // Set The Download URL
                    edited_image_url = output_image_url
                    download_image_box.style.width = resize_width.value / 20 + "px"
                    download_image_box.style.height = resize_height.value / 20 + "px"
                } 
                else if (CURRENT_EDIT_TOOL == "FILTER") {
                    // Set The File Name
                    file_props.name = "filtered"
                    download_file_name.innerHTML = file_props.name
                    // Get The Resized Image URL
                    output_image_url  = canvas_context.toDataURL(file_props.type + "/" + file_props.extension)
                    // Set The Download URL
                    edited_image_url = output_image_url
                    
                    let new_file = helper.url_to_file(output_image_url)
                    let new_work_url = window.URL.createObjectURL(new Blob([new_file], {type: 'image/jpg'}))
                    console.log(new_work_url);

                    // download_image_box.style.width = resize_width.value / 20 + "px"
                    // download_image_box.style.height = resize_height.value / 20 + "px"
                }
                
                // Create Download Preview img element
                let download_preview_image = document.createElement("img")
                download_preview_image.src = output_image_url
                download_preview_image.style.width = "100% !important"
                download_preview_image.style.height = "100% !important"

                // Reset (download_image_box)
                download_image_box.innerHTML = ""

                // Add Image To (download_image_box)
                download_image_box.appendChild(download_preview_image)
                
            }
            // =====SAVE EDIT ENDS HERE===== //

            // =====DOWNLOAD EDITED STARTS HERE===== //
            download_btn.onclick = () => {
                // Get Download Url
                let download_url = edited_image_url
                let a = document.createElement("a")
                a.href = download_url
                // Set The Output Image Name
                a.download = file_props.name + "." + file_props.extension
                // a.download = file_props.name + "." + "zip"
                // Initiate The Download
                a.click()
            }
            // =====DOWNLOAD EDITED ENDS HERE===== //

            // =====CANCEL DOWNLOAD CONTAINER STARTS HERE===== //
            cancel_download_btn.onclick = () => {
                helper.elements_state_swap(["free_frame"], "closed")
                if (WINDOW_WIDTH <= SMALL_SCREEN) app_right.style.left = "100%"
                
                if (CURRENT_EDIT_TOOL == "CROP") {
                    helper.elements_state_swap(resize_extra_tools.concat(filter_extra_tools), "closed") 
                    helper.elements_state_swap(["cropper_preview","extra_tools"].concat(cropper_extra_tools), "opened", "flex")
                }
                else if (CURRENT_EDIT_TOOL == "RESIZE") {
                    helper.elements_state_swap(["extra_tools"]
                    .concat(filter_extra_tools)
                    .concat(cropper_extra_tools), "closed")
                    helper.elements_state_swap(resize_extra_tools, "opened", "flex")
                }
                else if (CURRENT_EDIT_TOOL == "FILTER") {
                    helper.elements_state_swap(cropper_extra_tools.concat(resize_extra_tools), "closed") 
                    helper.elements_state_swap(["extra_tools"].concat(filter_extra_tools), "opened", "flex")
                }            
            }
            // =====CANCEL DOWNLOAD CONTAINER ENDS HERE===== //
        }
    }
    // FILE CONTROLLERS STARTS HERE

    // INSTANTIATE THE CROPPER
    let cropper = new Cropper(image_screen, options)
})
// =====HANDLING UPLOADS STARTS HERE===== //

// ===== THE EDITOR FUNCTIONALITIES ENDS HERE===== //


































// NFT Generator Navigation Functionalities Ends Here
// switch nft edit layers components 
helper.navigate(nft_edit_layers_component_links, nft_edit_layers_components, "flex")
helper.close(nft_edit_layers_close_component_links, nft_edit_layers_components, "flex", "disabled")

let collection_name, collection_description, collection_size,
    collection_width, collection_height, collection_format

create_nft_collection_button.addEventListener('click', (e) => {
    e.preventDefault()
    collection_name = collection_name_input.value
    collection_description = collection_description_input.value
    collection_size = parseInt(collection_size_input.value)
    collection_width = parseInt(collection_width_input.value)
    collection_height = parseInt(collection_height_input.value)
    collection_format = collection_output_format_input.value
    
    helper.hide(create_nft_collection)
    helper.hide(free_frame_container)
    helper.unhide(user_layers, "block")
    helper.unhide(nft_generator_close, "flex")
    helper.unhide(generator_preview_container, "block")

    fetch_and_activate_dom_layers()
})

// IMPORT LAYERS FUNCTIONALITIES STARTS HERE
import_btn.addEventListener('click', () => {
    helper.style_many_for_one(on_import, [
            ["display", "flex"],
            ["z-index", "3"]
    ])
    helper.hide(import_export_container)
})
on_import_button.addEventListener("click", (e) => {
    e.preventDefault()
    let new_json_layers = JSON.parse(on_import_input.value)
    new_json_layers.forEach(njl => {
        let nl_id = (helper.count_keys(LAYERS) + 1).toString()
        let nl = new Layer(njl.name, nl_id, [500, 500])
        // let nl = new Layer(njl.name, nl_id, 
        //     [collection_width, collection_height])
    
        nl.add_to_layers()
        fetch_and_activate_dom_layers()
    });
    
    helper.hide(on_import)
    // helper.hide(start_import_btn)
    helper.unhide(import_export_container, "flex")
    helper.unhide(create_select_container, "flex")
})
// IMPORT LAYERS FUNCTIONALITIES ENDS HERE

// CREATE NEW LAYERS FUNCTIONALITIES STARTS HERE
on_create_button.addEventListener("click", (e) => {
    e.preventDefault()
    let new_layer_name = on_create_input.value.toString().toLowerCase()
    let new_layer_id = (helper.count_keys(LAYERS) + 1).toString()
    let new_layer = new Layer(new_layer_name, 
        new_layer_id, [500, 500])
    // let new_layer = new Layer(new_layer_name, 
    //     new_layer_id, [collection_width, collection_height])
    new_layer.add_to_layers()
    fetch_and_activate_dom_layers()
    
    helper.hide(on_create)
    helper.hide(start_import_btn)
    helper.unhide(import_export_container, "flex")
    helper.unhide(create_select_container, "flex")
    on_create_input.value = ""
})
on_create_expand.addEventListener("click", () => {
    helper.toggleIcon(on_create_expand,
        on_create_expand.innerHTML, "fa fa-compress", "fa fa-expand")
    helper.toggleAttribute(on_create, "id", "box_mode", "quick_mode")

    on_create_close.addEventListener("click", () => {
        edit_layers_container.style.height = "20px"
    })
})
create_layer.addEventListener("click", () => {
    helper.appear(on_create)  
})
// CREATE NEW LAYERS FUNCTIONALITIES ENDS HERE

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
        let l_rename_btn = layer_properties.querySelector(".l_options .l_rename")
        let l_add_image_btn = layer_properties.querySelector(".l_options .l_add_image")
        let l_image_uploader = layer_properties.querySelector(".l_options .l_add_image .l_image_uploader")
        let l_delete_btn = layer_properties.querySelector(".l_options .l_delete")
        let l_spinner = layer_properties.querySelector(".l_options .l_spinner")
        let l_check_box = layer_properties.querySelector(".check_box")
        layers_check_boxes.push(l_check_box)

        let l_on_rename_container = layer_properties.querySelector(".l_on_rename")
        let l_on_rename_container_close = layer_properties.querySelector(".l_on_rename .close")
        let l_rename_input = layer_properties.querySelector(".l_on_rename input")
        let l_change_name_btn = layer_properties.querySelector(".l_on_rename .l_change_name")

        // LAYER SINGLE PAGE OPENER FUNCTIONALITY STARTS HERE  
            l_name_container.addEventListener("click", () => {
                fetch_and_activate_dom_single_layer(layer_obj.name)
                helper.hide(user_layers)
                helper.unhide(single_layer_container, "flex")
            })
        // LAYER SINGLE PAGE OPEl_rename_inputNER FUNCTIONALITY ENDS HERE 

        // LAYER RENAME FUNCTIONALITY STARTS HERE 
            open_rename(l_rename_btn, l_on_rename_container, [l_name_container, l_options]) 
            l_rename_input.addEventListener("change", () => {
                change_layer_name(l_change_name_btn, l_rename_input.value, LAYERS, layer_obj,
                    nft_generator, notification_screen, l_on_rename_container_close, fetch_and_activate_dom_layers)
            })
            close_rename(l_on_rename_container_close, l_on_rename_container, [l_name_container, l_options])
        // LAYER RENAME FUNCTIONALITY ENDS HERE

        // LAYER DELETE FUNCTIONALITY STARTS HERE
            delete_a_layer(l_delete_btn, layer_obj, layers_container, 
                nft_generator, notification_screen, fetch_and_activate_dom_layers)
        // LAYER DELETE FUNCTIONALITY ENDS HERE

        // LAYER CHECKBOX FUNCTIONALITY ENDS HERE
            l_check_box.addEventListener("click", () => {
                let state = helper.check_box_info(l_check_box, selected_cnt)
                layer_obj.select(state)
                console.log(layer_obj)
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
            add_image_options(
                layers_container,
                layer_images_containers, layer_obj,
                fetch_and_activate_dom_layers)

            // Select Images For Generating Test Art
            select_test_images(on_generate_options[0],
                layers_container, 
                layer_images_containers, () => {
                    helper.hide(on_generate)
                    helper.unhide(import_export_container, "flex")
                    helper.unhide(create_select_container, "flex")
                    helper.unhide(build_test_btn, "flex")
                })
        // LAYER IMAGES FUNCTIONALITY ENDS HERE
    })
    // LAYER FUNCTIONALITIES ENDS HERE
})
// FETCHES THE NEWLY UPDATED LAYERS FROM THE DOM ENDS HERE

// SELECT MODE FUNCTIONALITIES STARTS HERE
// Enters Into Select Mode
select_layer.addEventListener("click", () => {
    select_counter()
    helper.unhide(on_select, "flex")
    layers_check_boxes.forEach(c_box => {
        helper.unhide(c_box.parentElement, "flex")
    });
    layers_options.forEach(lop=> {
        helper.hide(lop)
    });
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
    
    helper.notification_box(nft_generator, notification_screen,
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
    layers_check_boxes.forEach(lcb => {
        helper.hide(lcb)
    });
    layers_options.forEach(lop=> {
        helper.unhide(lop, "flex")
    });
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
        helper.unhide(no_layer_text, "flex")
        helper.unhide(start_import_btn, "flex")
        helper.hide(import_export_container)
        on_create.id = "box_mode"
        helper.hide(on_create_expand)
        on_create_close.addEventListener("click", () => {
            edit_layers_container.style.height = "70%"
        })
        edit_layers_container.id = "edit_layers_has_no_layers"
        create_select_container.id = "create_select_has_no_layers"
        helper.hide_many([instruction_container, select_layer, layers_cnt_container])
    }else{
        helper.hide(no_layer_text)
        helper.unhide(import_export_container, "flex")
        helper.hide(start_import_btn)
        on_create.id = "quick_mode"
        helper.unhide(on_create_expand, "flex")
        on_create_close.addEventListener("click", () => {
            edit_layers_container.style.height = "5%"
        })
        on_import_close.addEventListener('click', () => {
            helper.unhide(import_export_container, "flex")
        })
        edit_layers_container.id = "edit_layers_has_layers"
        create_select_container.id = "create_select_has_layers"
        helper.unhide_many([instruction_container, select_layer, layers_cnt_container], "flex")
    }
});

// VERY VERY VITAL BLOCK OF CODE
// Fectches the updated LAYERS
// and converts them to html dom elements
let load_layers_container = (() => {
    LAYERS = get_layers()
    console.log(LAYERS);
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
    console.log(single_layer);

    single_layer_container.innerHTML = ""
    single_layer_container.appendChild(append_layer(single_layer, "one"))

    dom_single_layer = single_layer_container.querySelector(".single_layer")
    console.log(dom_single_layer);

    return dom_single_layer
})

// FETCHES THE NEWLY UPDATED LAYER FROM THE DOM ENDS HERE
let fetch_and_activate_dom_single_layer = ((sl_name) => {
    let dom_sl = load_single_layer_container(sl_name)

// SINGLE_LAYER FUNCTIONALITIES STARTS HERE
    let layer_id = dom_sl.getAttribute("id")
    let layer_obj = LAYERS[dom_sl.getAttribute("name")]
    let layer_properties = dom_sl.querySelector(".l_properties");
    let layer_images_containers = dom_sl.querySelectorAll(".l_image");

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
        l_closer_btn.addEventListener("click", () => {
            fetch_and_activate_dom_layers()
            helper.hide(single_layer_container)
            helper.unhide(user_layers, "flex")
        })
    // CLOSE SINGLE LAYER PAGE FUNCTIONALITY ENDS HERE 

    // LAYER RENAME FUNCTIONALITY STARTS HERE 
        open_rename(l_rename_btn, l_on_rename_container, [l_name_container, l_options])    
        l_rename_input.addEventListener("change", () => {
            change_layer_name(l_change_name_btn, l_rename_input.value, LAYERS, layer_obj,
                nft_generator, notification_screen, l_on_rename_container_close, 
                fetch_and_activate_dom_layers, fetch_and_activate_dom_single_layer)
        })
        close_rename(l_on_rename_container_close, l_on_rename_container, [l_name_container, l_options])
    // LAYER RENAME FUNCTIONALITY ENDS HERE
   
    // LAYER DELETE FUNCTIONALITY STARTS HERE
        delete_a_layer(l_delete_btn, layer_obj, layers_container, 
            nft_generator, notification_screen, fetch_and_activate_dom_layers, 
            single_layer_container, user_layers)
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
        add_image_options(layer_images_containers, layer_obj,
            fetch_and_activate_dom_layers, fetch_and_activate_dom_single_layer)
    // LAYER IMAGES FUNCTIONALITY ENDS HERE
})
// FETCHES THE NEWLY UPDATED LAYER FROM THE DOM ENDS HERE
// SINGLE LAYER FUNCTIONALTIES ENDS HERE

// GENERATE NFT ART FUNCTIONALITIES STARTS HERE
generate_art_btn.addEventListener('click', () => {
    helper.style_many_for_one(on_generate, [
            ["display", "flex"],
            ["z-index", "3"]
    ])
    helper.hide(import_export_container)
    helper.hide(create_select_container)
})
on_generate_close.addEventListener('click', () => {
    helper.unhide(import_export_container, "flex")
    helper.unhide(create_select_container, "flex")
})


// GENERATE A TEST ART STARTS HERE
test_art_preview_canvas.width = 500
test_art_preview_canvas.height = 500
let test_art_url;
let test_art_preview_canvas_context = test_art_preview_canvas.getContext("2d")
build_test_btn.addEventListener("click", () => {
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
    
    helper.hide(build_test_btn)
    // Hide Collection Preview
    helper.hide(collection_preview_container)
    // Display The Test Art Preview
    test_art_downloader_items[0].innerHTML = "500 x 500"
    test_art_downloader_items[1].innerHTML = "test_art.png"
    helper.unhide(test_art_preview_container, "block")
})
// GENERATE A TEST ART ENDS HERE

// GENERATE COLLECTION STARTS HERE
collection_image_generator_canvas.width = 500
collection_image_generator_canvas.height = 500
let collection_image_generator_canvas_context = collection_image_generator_canvas.getContext("2d")
let collection_art_urls = []
on_generate_options[1].addEventListener("click", (e) => {
    let collection_resource = build_collection_resource(get_layers())
    
    // Empty Previously Generated Content
    generated_arts_container.innerHTML = ""

    // for (let i = 0; i < collection_size; i++) {
    for (let i = 0; i < 10; i++) {
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
        let new_art_id = helper.unique_random_number();

        let new_art_container = document.createElement("li")
        new_art_container.appendChild(new_art)

        generated_arts_container.appendChild(new_art_container)
        colletion_images_preview.src = new_art_url
        collection_art_urls.push(new_art_url)
    }

    // Clear and Hide Test Art Preview
    test_art_preview_canvas_context.clearRect(0, 0,
        test_art_preview_canvas.width,
        test_art_preview_canvas.height)
    helper.hide(test_art_preview_container)
    // Display The Collection Preview
    helper.unhide(collection_preview_container, "block")
    
    // Switch Some Elements Display
    helper.hide(on_generate)
    helper.unhide(import_export_container, "flex")
    helper.unhide(create_select_container, "flex")
})
// GENERATE COLLECTION STARTS HERE

// DOWNLOAD GENERATED TEST ART STARTS HERE
test_art_downloader_items[2].onclick = () => {
    let a = document.createElement("a")
    a.href = test_art_url
    // Set The Output Image Name
    // a.download = `test_art.${collection_format}`
    a.download = `test_art.png`
    // Initiate The Download
    a.click()
}
// DOWNLOAD GENERATED TEST ART ENDS HERE

// DOWNLOAD GENERATED COLLECTION STARTS HERE
collection_download_btn.onclick = () => {
    console.log(collection_art_urls);
    let cnt = 0
    collection_art_urls.forEach( url => {
        let a = document.createElement("a")
        a.href = url
        // Set The Output Image Name
        // a.download = `${collection_name}_${cnt}.${collection_format}`
        a.download = `z_${cnt}.png`
        // Initiate The Download
        a.click()
        cnt++
    });
}
// DOWNLOAD GENERATED COLLECTION ENDS HERE

// Complete Shutdown/Deletion Of The Current 
// Collection and NFT Art Generator Itself
let shutdown_nft_art_generator = () => {
    layers_container.innerHTML = ""
    empty_layers()

    setTimeout(() => {
        fetch_and_activate_dom_layers
        get_layers();
    }, 5000);

    helper.hide_many([test_art_preview_container, 
        collection_preview_container,
        user_layers, nft_generator_close])
    helper.unhide_many([create_nft_collection,
        free_frame_container], "flex")
}
nft_generator_close.addEventListener("click", () => {
    let msg = `You are about poweroff the art generator <br>
    <p> !!ALL LAYERS AND THE COLLECTION ITSELF WILL BE DELETED !!</p>`
    let btns = [
        {text: "No", class:"notification_close n_clear", id:"##" + notification_screen.className},
        {text: "Yes", class:"notification_close", id: "deletes_something"}
    ]
    helper.notification_box(nft_generator, notification_screen,
        {type: "alert !!!", msg, btns}
    )
    if (notification_screen.querySelector("#deletes_something")) {
        notification_screen.querySelector("#deletes_something").addEventListener("click", () => {     
            shutdown_nft_art_generator()
        })
    }
})
// GENERATE NFT ART FUNCTIONALITIES ENDS HERE

// =====NFT ART GENERATOR FUNCTIONALITIES ENDS HERE===== //
// =====MIDDLE SIDE ENDS HERE=====//

// ================================================ //

// =====RIGHT SIDE STARTS HERE=====//
// close right components with closers
helper.close(right_close_component_links, right_components, "block")

// =====RIGHT SIDE ENDS HERE=====//

// =====DESIGN LOGIC ENDS HERE===== //










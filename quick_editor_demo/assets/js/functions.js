export {Help_me}

// =====CLASS (Help_me) STARTS HERE===== //
let Help_me = function () {
// HIDE AND SHOW START==================//
    this.hide = function (element) {
        element.style.display = "none";
    }
    this.unhide = function (element, display_type) {
        element.style.display = display_type}
// HIDE AND SHOW END==================//

// HIDE AND SHOW MANY START==================//
    this.hide_many = function (elements) {
        elements.forEach(element => {
            element.style.display = "none";
        });
    }
    this.unhide_many = function (elements, display_type) {
        elements.forEach(element => {
            element.style.display = display_type;
        });
    }
// HIDE AND SHOW MANY END==================//

// APPEAR, FADE OR DISAPPEAR START==================//
    this.disappear = function (elements, z_index = -5) {
        if (elements.length) {
            elements.forEach(elem => {
                elem.style.opacity = "0";
                elem.style.zIndex = `${z_index}`;
            });
        }else{
            elements.style.opacity = "0";
            elements.style.zIndex = `${z_index}`;
        }
    }
    this.fade = function (elements, z_index = -5) {
        if (elements.length) {
            elements.forEach(elem => {
                elem.style.opacity = "0.3";
                elem.style.zIndex = `${z_index}`;
            });
        }else{
            elements.style.opacity = "0.3";
            elements.style.zIndex = `${z_index}`;
        }
    }
    this.appear = function (elements, z_index = 5) {
        if (elements.length) {
            elements.forEach(elem => {
                elem.style.opacity = "1";
                elem.style.zIndex = `${z_index}`;
            });
        }else{
            elements.style.opacity = "1";
            elements.style.zIndex = `${z_index}`;
        }
    }

    this.magic = (action, elements) => {
        let opacity, z_index
        if (action == "appear") {opacity = "1"; z_index = "5"}
        else if (action == "fade") {opacity = "0.3"; z_index = "5"}
        if (action == "disappear") {opacity = "0"; z_index = "-5"}

        if (elements.length) {
            elements.forEach(elem => {
                elem.style.opacity = opacity;
                elem.style.zIndex = z_index;
            });
        }else{
            elements.style.opacity = opacity;
            elements.style.zIndex = z_index;
        }
    }
// APPEAR, FADE OR DISAPPEAR END==================//

// STYLERS START==================//

// will style several properties for an element
    this.style_many_for_one = function (element, props = []) {
        props.forEach(prop => {
            for (let i = 0; i < prop.length; i++) {
                element.style[prop[0]] = prop[1];
            }
        });
    }
// will style a property for an array/group of elements
    this.style_one_for_many = function (elements, prop, style1) {
        elements.forEach(element => {
            element.style[prop] = style1;
        });
    }

// will style several properties for several elements
    this.style_many = function (elements = []) {
        elements.forEach(element => {
            if (element.name.length) {
                element.name.forEach(e => {
                    this.style_many_for_one(e, element.props)
                })
            }
            else{
                this.style_many_for_one(element.name, element.props)
            }
        });
    }
// STYLER END==================//

// =====TOGGLE FUNCTIONALITY START=====//

//Style Toggler
    // will toggle a style of an element
    this.toggle_one_style_for_one = function (el, prop, style1, style2) {
        el.style[prop] = el.style[prop] === style1 ? style2 : style1;
    }
    // will toggle a style of an array/group of elements
    this.toggle_one_style_for_many = function (elements, prop, style1, style2) {
        elements.forEach(element => {
            this.toggle_one_style_for_one(element, prop, style1, style2)
        });
    }
    // will toggle several styles for an element
    this.toggle_many_style_for_one = function (element, props = []) {
        props.forEach(prop => {
            for (let i = 0; i < prop.length; i++) {
                this.toggle_one_style_for_one(element, prop[0], prop[1], prop[2])
            }
        });
    }
    // will perform the action of all 3 funtions above
    this.toggle_style_many = function (elements = []) {
        elements.forEach(element => {
            if (element.name.length) {
                element.name.forEach(e => {
                    this.toggle_many_style_for_one(e, element.props)
                })
            }
            else{
                this.toggle_many_style_for_one(element.name, element.props)
            }
        });
    }

// Attribue Toggler
    this.toggleAttribute = function (el, attrib, value1, value2) {
        if(el.hasAttribute(attrib)){
            if (el.getAttribute(attrib) === value1) {
                el.setAttribute(attrib, value2)
            }else {
                el.setAttribute(attrib, value1)
            }
        }else {
            el.setAttribute(attrib, value1)
        }
    }
// Attribue Remove Toggler
    this.toggleRemoveAttribute = function (el, attrib) {
        if(el.hasAttribute(attrib)){
            el.removeAttribute(attrib)
        }else {
            el.setAttribute(attrib, "")
        }
    }

//Class Toggler
    this.toggleClassname = function (el, class1, class2) {
        el.className = el.className === class1 ? class2 : class1;
    }

    this.toggleClass = function (el, class1, class2) {
        el.className = el.className === class1 ? class2 : class1;
    }

    //Content Toggler
    this.toggleContent = function (el, content1, content2) {
        el.innerHTML = el.innerHTML === content1 ? content2 : content1;
    }
    
    this.extract_icon_class = (icon_svg) => {
        let splitted = icon_svg.split(`<!-- `)
        let isolated = splitted[1].split(`"`)
        let icon_class = isolated[1]
        return icon_class
    }
    this.toggleIcon = function (el, el_content, old_icon_class, new_icon_class) {
        let default_icon_class = this.extract_icon_class(el_content)
        if (default_icon_class === old_icon_class) {
            el.innerHTML = `<i class="${new_icon_class}"></i>`
        } else if (default_icon_class === new_icon_class){
            el.innerHTML = `<i class="${old_icon_class}"></i>`
        }
    }

// =====TOGGLE FUNCTIONALITY END=====//

// =====STRING CLEANER/PUTIFIER STARTS HERE===== //
// CLEANS UP ID FROM ###e_example -> e_example
this.clean = ((id) => {
    let cleaned_id = id.replace(/[^\w]/g, "")
    return cleaned_id
})

// CLEANS UP ID PROPERLY FROM ###e_example -> example
this.purify = ((id) => {
    let purified_id = this.clean(id).slice(2)
    return purified_id
})
// =====STRING CLEANER/PUTIFIER ENDS HERE===== //

// SENTENCIZE (CONVERTS AN ARRAY INTO A PROPER SENTENCE) STARTS HERE
    this.sentencize = (main_array) => {
        let output_string = "";
        if (main_array.length == 1) output_string = main_array[0]     
        else if(main_array.length == 2){
            output_string = main_array[0] 
            output_string += " and " + main_array[1] 
        }
        else{
            main_array.forEach(element => {
                if (main_array.indexOf(element) == 0) output_string += element + ","
                else if (main_array.indexOf(element) == (main_array.length - 1)) output_string += " and " + element
                else if (main_array.indexOf(element) == (main_array.length - 2)) output_string += " " + element
                else output_string += " " + element + ","
            });
        }
        return output_string;
    }
// SENTENCIZE (CONVERTS AN ARRAY INTO A PROPER SENTENCE) ENDS HERE

    this.remove_element = (main_array, element_to_remove) => {
        let temp_array = []
        main_array.forEach(element => {
            if (element != element_to_remove) {
                temp_array.push(element)
            }
        })
        return temp_array
    }

// OBJECT HELPERS STARTS HERE
    this.remove_key = (object, key_to_remove) => {
        let temp_obj = {}
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                if (key != key_to_remove) {
                    temp_obj[key] = object[key]
                }
            }
        }
        return temp_obj;
    }
    this.count_keys = (object) => {
        let cnt = 0;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                cnt++
            }
        } 
        return cnt;
    }

    this.has_key = (object, key_to_check) => {
        let exist;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key_to_check)) {
                exist = true
            }else{
                exist = false
            }
        }
        return exist;
    }
// OBJECT HELPERS ENDS HERE

// ===== MANY ACTIONS STARTS HERE ===== //
// ASSIGNS EVENT HANDLER ON ONE/MULTIPLE ELEMENTS
// SO AS TO CALL A FUNCTION 
this.many_actions = function (event, elem, func) {   
    if (typeof(elem) == "object") {
        elem.forEach(el => {
            if (el.length) {
                el.forEach(e => {
                    e.addEventListener(event, () => {func()})
                });
            }else{
                el.addEventListener(event, () => {func()})
            }
        })
    }else elem.addEventListener(event, () => {func();})
}
// =====MANY ACTIONS ENDS HERE===== //

// =====DELETE SECLECTED CHILD/CHILDREN FROM PARENT ELEMENT FROM FOREIGN BUTTON START===== //
this.init_item_deletion = (btn_id, item_array, item_container, add_action) => {
    let del_btn = document.querySelector("#" + btn_id)
    del_btn.addEventListener("click", () => {
        item_array.forEach(item => {
            let item_to_delete = document.querySelector("#" + item)
            item_container.removeChild(item_to_delete)
        })
        add_action()
    })
}
// =====DELETE SECLECTED CHILD/CHILDREN FROM PARENT ELEMENT FROM FOREIGN BUTTON END===== //

// =====INCREMENT OR DECREMENT AN INPUT ELEMENT VALUE STARTS HERE===== //
this.add_or_minus_value = (input_element, minuser, adder, min, max ) => {
    minuser.addEventListener("click", () => {
        if (input_element.value == min) {
            minuser.style.opacity = "0.3"
            input_element.value = min
        }
        else {
            input_element.value--
            this.appear(adder)
            adder.style.opacity = "1";
        }
    })
    adder.addEventListener("click", () => {
        if (input_element.value == max) {
            adder.style.opacity = "0.3"
            input_element.value = max
        }
        else {
            input_element.value++
            minuser.style.opacity = "1";
        }
    })
}
// =====INCREMENT OR DECREMENT AN INPUT ELEMENT VALUE ENDS HERE===== //

// =====SWAP THE STATE OF AN ELEMENT STARTS HERE===== //
this.elements_state_swap = function (elements_class, state, display) {
    let elem, elems;
    let opacity = "1";
    let z_index = "3";
    if (state === "closed") {opacity = "0"; z_index = "-3"; }
    let set_state = (e) => {
        e.style.opacity = opacity;
        e.style.zIndex = z_index
        e.setAttribute("state", state)
        if (display) e.style.display = display
    }
    if (typeof(elements_class) == "object") {
        elements_class.forEach(ele_class => {
            if (document.querySelectorAll("." + ele_class)) {
                elems = document.querySelectorAll("." + ele_class)
                elems.forEach(el => {
                    set_state(el)
                });
            }else{
                elem = document.querySelector("." + ele_class)
                set_state(elem)
            }
        });
    }else{
        elem = document.querySelector("." + elements_class)
        set_state(elem)
    }
}
// =====SWAP THE STATE OF AN ELEMENT ENDS HERE===== //

// =====SWITCH COMPONENT STARTS HERE===== //
this.switch_component = (prev_comp, curr_comp, display) => {
    // Previous Component
    if (typeof(prev_comp) == "object") {
        prev_comp.forEach(p_c_class => {
            this.elements_state_swap(p_c_class, "closed")
        });
    } else this.elements_state_swap(prev_comp, "closed")

    // Current Component
    if (typeof(curr_comp) == "object") {
        curr_comp.forEach(c_c_class => {
            this.elements_state_swap(c_c_class, "opened", display)
        });
    } else this.elements_state_swap(curr_comp, "opened", display)
}
// =====SWITCH COMPONENT ENDS HERE===== //

// =====SET ACTIVE STATE OF AN ELEMENT IN A LIST OF ELEMENTS STARTS HERE===== //
this.set_active = (elements, active_class) => {
    elements.forEach(element => {
        element.addEventListener("click", () => {
            element.classList.add(active_class)
            elements.forEach(el => {
                if (el.id != element.id) {
                    el.classList.remove(active_class)
                }
            })
        })
    })
}
// =====SET ACTIVE STATE OF AN ELEMENT IN A LIST OF ELEMENTS ENDS HERE===== //

// =====NAVIGATION FUNCTIONS STARTS HERE=====//
    this.navigate = function (component_links, components, display_type, active) {
        component_links.forEach(component_link => {
            component_link.addEventListener("click", () => {
                let component_link_id = component_link.id;
                let cleaned_component_link_id = this.clean(component_link_id);

                console.log(cleaned_component_link_id);
                if (active == "enable") {
                    component_link.classList.add("active_link");
                    component_links.forEach(clk => {
                        if(clk.id !== component_link_id){
                            clk.classList.remove("active_link");
                        }
                    })
                }
                
                components.forEach(cmp => {
                    if(cmp.id !== cleaned_component_link_id){
                        console.log(cmp.id);
                        cmp.setAttribute("state", "closed");
                        this.elements_state_swap(cmp.id, "closed")
                        cmp.style.left = "100%"
                    }
                })

                let component = document.querySelector("." + cleaned_component_link_id);
                // component.setAttribute("state", "opened");
                // this.unhide(component)
                // this.unhide(component, display_type)
                this.elements_state_swap(cleaned_component_link_id, "opened")
                component.style.left = "0%"
            })
        })
    }
// =====NAVIGATION FUNCTIONS ENDS HERE=====//

// =====COMPONENT CLOSER STARTS HERE===== //
    this.close = function (components_close_links, components, display_type) {
        components_close_links.forEach(ccl => {
            ccl.addEventListener("click", () => {
                let ccl_id = ccl.id;
                let cleaned_ccl_id = this.clean(ccl_id)

                let component = document.querySelector("." + cleaned_ccl_id);
                component.setAttribute("state", "closed")
                this.hide(component)

                let all_closed = 1;
                let home_component;
                components.forEach(cmp => {
                    let cmp_state = cmp.getAttribute("state")
                    if(cmp_state !== "closed") all_closed = 0;
                    if (cmp.classList.contains("h_c")) home_component = cmp
                })
                if (all_closed) this.unhide(home_component, display_type)
            })
        })
    }
// =====COMPONENT CLOSER ENDS HERE===== //

// =====CHECKBOXES CONTROLLERS===== //
// Activate checkbox functionality for checkboxes in a component
    this.activate_check_box = ((elements_checkboxes, counter_screen) => {
        elements_checkboxes.forEach(c_box => {
            c_box.addEventListener("click", () => {
                if (c_box.hasAttribute("checked")) {
                    counter_screen.innerHTML = parseInt(counter_screen.innerHTML) - 1;
                    c_box.removeAttribute("checked")
                    c_box.innerHTML = ""
                }
                else{
                    counter_screen.innerHTML = parseInt(counter_screen.innerHTML) + 1;
                    c_box.setAttribute("checked", "")
                    c_box.innerHTML = "<i class='fa fa-check'></i>"
                }
            })
        });
    })

    this.check_box_info = ((check_box, counter_screen) => {
        let check_state;
        if (check_box.hasAttribute("checked")) {
            if (counter_screen) {
                counter_screen.innerHTML = parseInt(counter_screen.innerHTML) - 1;
            }
            check_box.removeAttribute("checked")
            check_box.innerHTML = ""
            check_state = false
        }
        else{
            if (counter_screen) {
                counter_screen.innerHTML = parseInt(counter_screen.innerHTML) + 1;
            }
            check_box.setAttribute("checked", "")
            check_box.innerHTML = "<i class='fa fa-check'></i>"
            check_state = true
        }
        return check_state
    })
    this.check_box_state = ((check_box) => {
        let check_state;
        if (check_box.hasAttribute("checked")) check_state = false
        else check_state = true
        return check_state
    })
// Resets checkboxes in a component to default mode (unchecked)
    this.reset_check_box = (elements_checkboxes, display) => {
        elements_checkboxes.forEach(c_box => {
            if (display) this.hide(c_box)
            c_box.removeAttribute("checked")
            c_box.innerHTML = ""
        });
    }
    this.select_check_box = (check_box_layer) => {
        let check_box = document.querySelector(`#${check_box_layer}_cb`)
        check_box.setAttribute("checked", "")
        check_box.innerHTML = "<i class='fa fa-check'></i>"
    }
    this.unselect_check_box = (check_box_layer, display) => {
        let check_box = document.querySelector(`#${check_box_layer}_cb`)
        check_box.removeAttribute("checked")
        check_box.innerHTML = ""
        if (display) this.hide(check_box)
    }
    this.select_check_boxes = (check_boxes, display) => {
        check_boxes.forEach(check_box => {
            check_box.setAttribute("checked", "")
            check_box.innerHTML = "<i class='fa fa-check'></i>"
        })
    }
    this.unselect_check_boxes = (check_boxes, display) => {
        check_boxes.forEach(check_box => {
            check_box.removeAttribute("checked")
            check_box.innerHTML = ""
            if (display) this.hide(check_box)
        })
    }
// =====CHECKBOXES CONTROLLERS===== //

// =====RANGE SLIDER CONTROLLERS===== //
this.reset_sliders = (default_values, sliders) => {
    let n = 0;
    sliders.forEach(slider => {
        slider.value = default_values[n]
        n++;
    });
}
// =====RANGE SLIDER CONTROLLERS===== //

// =====NOTIFICATION_BOX FUNCTIONS ENDS HERE=====//
    this.notification_box = ((bg_element, element, props = {}, action) => {
        element.querySelector(".notification_type").innerHTML = props.type;
        let notification_info_container = element.querySelector(".notification_info")
        let new_msg = document.createElement("div");
        new_msg.innerHTML = props.msg;
        new_msg.className = "notification_msg";
        notification_info_container.appendChild(new_msg)

        if (props.btns) {
            let new_div = document.createElement("div");
            new_div.className = "notification_btns";
            props.btns.forEach(btn_props => {
                let new_btn = document.createElement("button");
                new_btn.className = btn_props.class + " clkb_btn";
                new_btn.id = btn_props.id || "";
                new_btn.innerHTML = btn_props.text;
                new_div.appendChild(new_btn)
            });
            notification_info_container.appendChild(new_div)
        }
        this.appear(element);
        let n_close_btns = element.querySelectorAll(".notification_close")
        n_close_btns.forEach(ncbs => {
            ncbs.addEventListener("click", () => {
                element.querySelector(".notification_type").innerHTML = "";
                element.querySelector(".notification_info").innerHTML = "";
                this.disappear(element)
                this.appear(bg_element)
            })
        });

        if (action) action()
    })
// =====NOTIFICATION_BOX FUNCTIONS ENDS HERE=====//


this.draw_image_on_canvas = (canvas, image, width, height) => {
    if (!canvas) canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    let context = canvas.getContext("2d")
    context.imageSmoothingQuality = "high"
    context.drawImage(image, 0, 0, width, height)
}


// =====IMAGE RESIZER STARTS HERE===== //
this.resize = (active_image, image_canvas, width, height, width_input, height_input) => {
    const context = image_canvas.getContext("2d")

    image_canvas.width = Math.floor(width);
    image_canvas.height = Math.floor(height);
    width_input.value = Math.floor(width);
    height_input.value = Math.floor(height);
  
    // Draw The Resized Image On The Resizer Preview Canvas
    context.drawImage(active_image, 0, 0, Math.floor(width), Math.floor(height));

    // Generate a New Image URL To Append The Resized Image 
    let resized_image_url = context.canvas.toDataURL("image/jpg")

    // Append The Resized Image To The Resizer Preview Canvas
    let new_image = document.createElement("img")
    new_image.src = resized_image_url
    image_canvas.appendChild(new_image)

    // Return The Context So We Can Generate The
    // Download and Display URL
    return context.canvas
}
// =====IMAGE RESIZER ENDS HERE===== //

// =====IMAGE FILTERER STARTS HERE===== //
this.filter = (image, image_canvases, filter_data) => {
    let context;

    let filter_canvas = (canvas) => {
        const local_context = canvas.getContext("2d")
        // Create A String That Will Contain All The Filters
        // To Be Used For The Image
        let filter_string =
            "brightness(" + filter_data.brightness + "%" +
            ") contrast(" + filter_data.contrast + "%" +
            ") grayscale(" + filter_data.grayscale + "%" +
            ") saturate(" + filter_data.saturation + "%" +
            ") sepia(" + filter_data.sepia + "%" +
            ") hue-rotate(" + filter_data.hue + "deg" + ")";
    
        // Apply the filter to the image
        local_context.filter = filter_string;
    
        // Draw The Filtered Image On The Filter Preview Canvas
        local_context.drawImage(image, 0, 0);

        return local_context
    }  

    for (const canvas_key in image_canvases) {
        if (Object.hasOwnProperty.call(image_canvases, canvas_key)) {
            const canvas = image_canvases[canvas_key];
            context = filter_canvas(canvas)
        }
    }

    // context = filter_canvas(image_canvas)
    // filter_canvas(image_canvas_2)

    // Return The Context So We Can Generate The
    // Download and Display URL
    return context.canvas
}
// =====IMAGE FILTERER ENDS HERE===== //

// =====WORKING WITH FILES STARTS HERE===== //
this.url_to_file = (url) => {
    let arr = url.split(",")

    let mime = arr[0].match(/:(.*?);/)[1]
    let data = arr[1]

    let data_str = atob(data)
    let n = data_str.length
    let data_arr = new Uint8Array(n)

    while(n--){
        data_arr[n] = data_str.charCodeAt(n)
    }
    let new_file = new File([data_arr], 'file.jpg', {type: mime})

    return new_file
}
// =====WORKING WITH FILES ENDS HERE===== //

// =====DRAW IMAGE ON CANVAS STARTS HERE===== //
this.fill_canvas = (img_canvas, file, posx, posy, width, height) => {
    let context;
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
        let img_url = event.target.result
        let image = document.createElement("img")
        image.src = img_url
        
        image.onload = (e) => {
            context = img_canvas.getContext("2d")
            // canvas_context.imageSmoothingQuality = "high"
            // canvas_context.width = e.target.width
            // canvas_context.height = e.target.height
            context.drawImage(image, posx, posy, width, height)
        }
    }
    console.log(context);
    return context.canvas
}
// =====DRAW IMAGE ON CANVAS ENDS HERE===== //

let random_array = []
this.unique_random_number = () => {
    let random = Math.floor(Math.random() * 10000)
    if (!random_array.includes(random)) {
        random_array.push(random)
        return random
    }else{
        this.unique_random_number()
    }
}

this.file_to_url = (file, file_property) => {
    let new_image_url;
    let active_image;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
        openImage(event.target.result);
    });

    let openImage = (image_src) => {
        active_image = new Image();
        active_image.addEventListener("load", () => {
            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")

            canvas.width = Math.floor(file_property.width);
            canvas.height = Math.floor(file_property.height);
          
            // Draw The Resized Image On The Resizer Preview Canvas
            context.drawImage(active_image, 0, 0, Math.floor(file_property.width), Math.floor(file_property.height));
        
            // Generate a New Image URL To Append The Resized Image 
            new_image_url = context.canvas.toDataURL("image/jpg")
        });
        active_image.src = image_src;
    }
    return new_image_url;
}

}
// =====CLASS (Help_me) ENDS HERE===== //




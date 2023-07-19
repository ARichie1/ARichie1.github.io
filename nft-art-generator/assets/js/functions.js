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

// GET UNIQUE RANDOM NUMBER WITHINN A GIVEN RANGE STARTS HERE
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
// GET UNIQUE RANDOM NUMBER WITHINN A GIVEN RANGE ENDS HERE

// =====STRING CLEANER/PUTIFIER STARTS HERE===== //
// CLEANS UP ID FROM ###e_example -> e_example
this.clean = (id) => {
    let cleaned_id = id.replace(/[^\w]/g, "")
    return cleaned_id
}

// CLEANS UP ID PROPERLY FROM ###e_example -> example
this.purify = (id) => {
    let purified_id = this.clean(id).slice(2)
    return purified_id
}

this.remove_special_chars = (str) => {
    let cleaned_str = str.replace(/[^a-zA-Z0-9 ]/g, "")
    return cleaned_str
}
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

// REMOVES AN ELEMENT FROM AN ARRAY
this.remove_element = (main_array, element_to_remove) => {
        let temp_array = []
        main_array.forEach(element => {
            if (element != element_to_remove) temp_array.push(element)
        }) 
        return temp_array
    }

// OBJECT HELPERS STARTS HERE
    this.remove_key = (object, key_to_remove) => {
        let temp_obj = {}
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) {
                if (key != key_to_remove) temp_obj[key] = object[key]
            }
        } return temp_obj;
    }
    this.count_keys = (object) => {
        let cnt = 0;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key)) cnt++
        } return cnt;
    }

    this.has_key = (object, key_to_check) => {
        let exist;
        for (const key in object) {
            if (Object.hasOwnProperty.call(object, key_to_check)) exist = true
            else exist = false
        } return exist;
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

// =====SWAP THE STATE OF AN ELEMENT STARTS HERE===== //
this.elements_state_swap = function (elements_class, state, display, slide_to) {
    let elem, elems;
    let opacity = "1";
    let z_index = "3";
    if (state === "closed") {opacity = "0"; z_index = "-3"; }
    let set_state = (e) => {
        e.style.opacity = opacity;
        e.style.zIndex = z_index
        e.setAttribute("state", state)
        if (display) e.style.display = display
        if (slide_to) e.style.left = slide_to;
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
        this.appear(element, "9");
        let n_close_btns = element.querySelectorAll(".notification_close")
        n_close_btns.forEach(ncbs => {
            ncbs.addEventListener("click", () => {
                element.querySelector(".notification_type").innerHTML = "";
                element.querySelector(".notification_info").innerHTML = "";
                this.disappear(element, "-9")
                this.appear(bg_element, "5")
            })
        });

        if (action) action()
    })
// =====NOTIFICATION_BOX FUNCTIONS ENDS HERE=====//

// =====CLIPBOARD COPY AND PASTE STARTS HERE===== //
    this.copy_content = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy content : ', err);
            let msg = "Failed to copy content"
            let btns = [{text: "Ok", class:"notification_close n_clear",
                 id:"##" + notification_screen.className}]
            this.notification_box(nft_art_generator, notification_screen,
                {type: "alert !!!", msg, btns}
            )
        }
    }
    this.paste_content = async (destination) => {
        try {
            let clip_text = await navigator.clipboard.readText();
            destination.innerHTML = clip_text
            if (destination.hasAttribute("type")) {
                destination.value = clip_text
            }
        } catch (err) {
            console.error('Failed to paste content : ', err);

            let msg = "Failed to paste content"
            let btns = [{text: "Ok", class:"notification_close n_clear",
                 id:"##" + notification_screen.className}]
            this.notification_box(nft_art_generator, notification_screen,
                {type: "alert !!!", msg, btns}
            )
        }
    }
// =====CLIPBOARD COPY AND PASTE ENDS HERE===== //

// =====FORM FUNCTIONS STARTS HERE===== //
    // DISPLAYS INPUT FIELD ERROR MESSAGE
    this.render_error_msg = (inputs) => {
        let input_error_printer = (input) => {
            let error_msg_container = document.querySelector(`.${input.id}_container p`)
            error_msg_container.innerHTML = `Please enter a ${input.id.split("_")[1]}`
        }
        if (inputs.length) {
            inputs.forEach(input => {
                input_error_printer(input)
            }); 
        }else{
            input_error_printer(inputs)
        }
    }

    // CHECKS IF AN INPUT THAT IS EMPTY
    // IF EMPTY INPUT BECOMES INVALID ELSE VALID
    this.check_or_clean_error_msg = (inputs) => {
        let invalid_inputs = [];
        let verify_error = (input) => {
            if (input.value == "") {
                if (!invalid_inputs.includes(input)) invalid_inputs.push(input)
            }else{
                let error_msg_container = document.querySelector(`.${input.id}_container p`)
                error_msg_container.innerHTML = ``
            }
        }
        if (inputs.length) {
            inputs.forEach(input => {verify_error(input)})
        }else verify_error(inputs)

        return invalid_inputs
    }

    this.is_valid_json = (string) => {
        try {
            JSON.parse(string)
        } catch (error) {
            return false
        }
        return true
    }
// =====FORM FUNCTIONS ENDS HERE===== //
}
// =====CLASS (Help_me) ENDS HERE===== //
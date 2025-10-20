import { Help_me } from "./functions.js"

let helper = new Help_me();

let app = document.querySelector(".app")
let app_name = document.querySelectorAll(".app_name")
let logo = document.querySelector(".logo")
let header = document.querySelectorAll("header")
let footer = document.querySelectorAll("footer")
let pages = document.querySelectorAll(".page")
let page_nav_links = document.querySelectorAll(".page_nav_link")
let responsive_bars = document.querySelector(".responsive_bars")
let landing_page_nav_container = document.querySelector("nav")
let landing_page_nav_links = document.querySelectorAll("nav ul li")
let landing_page_nav_links_before_test = document.querySelectorAll("nav .page_nav_link")
let landing_page_nav_links_during_test = document.querySelectorAll("nav .started_test_nav_links")
let start_test_btns = document.querySelectorAll(".start_test")

let retake_test_btn = document.querySelector(".retake_test")
let save_info_btns = document.querySelectorAll(".save_info")
let info_to_save;
const notification_screen = document.querySelector(".notification_screen")

let MSG, BTNS;

let WINDOW_WIDTH = window.innerWidth
let WINDOW_HEIGHT = window.innerHeight

window.addEventListener("resize", () => {
    WINDOW_WIDTH = window.innerWidth
    WINDOW_HEIGHT = window.innerHeight
})

// ===== Set App Name ===== //
app_name.forEach(apn => {
    apn.textContent = "Career Finder";
});

// ===== Page Navigation Start Here =====//
let prev_page = ""
let current_page = "landing_page"
page_nav_links.forEach(link => {
    link.addEventListener("click", () => {
        let target_page = link.getAttribute("target")

        prev_page = current_page
        current_page = target_page
        let prev_page_container = document.querySelector(`.${prev_page}`)
        let current_page_container = document.querySelector(`.${current_page}`)

        helper.disappear(prev_page_container, -3)
        helper.appear(current_page_container, 3)
    })
});

// retake_test_btn.addEventListener("click", () => {
//     window.location.reload()
// })
start_test_btns.forEach(start_test_btn => {
    start_test_btn.addEventListener("click", () => {
        helper.hide_many(landing_page_nav_links_before_test)
        helper.unhide_many(landing_page_nav_links_during_test, "flex")
    }) 
});

helper.many_actions("click", [retake_test_btn, landing_page_nav_links_during_test], () => {
    window.location.reload()   
})
//===== Page Navigation End Here =====//

//==== Mobile Menu Display Start Here=====//
responsive_bars.addEventListener("click", () => {
    helper.toggle_many_style_for_one(
        landing_page_nav_container,
        [["opacity", "1", "0"],
        ["z-index", "7", "-7"],
        ["left", "0%", "-50%"]
    ])
    helper.toggle_many_style_for_one(
        responsive_bars,
        [["transform", "rotateY(180deg)", "rotateY(0deg)"]
    ])
})

// Close The Menu When Some Elements Are Clicked
helper.many_actions("click", [footer, landing_page_nav_links, pages], () => {
    if (WINDOW_WIDTH <= 900) {
        helper.style_many([
            {name : landing_page_nav_container,
            props: [["opacity", "0"], ["z-index", "-7"], ["left", "-50%"]]},
            {name : responsive_bars,
            props: [["transform", "rotateY(0deg)"]]}
        ]) 
    }
})
// ===== Mobile Menu Display End Here ===== //

// GENERATE THE INDEXES (from 0 to 29) AND STORE THE GENERATED ARRAY 
// OF RANDOM NUMBERS(INDEXES)
let gen_trait_index = helper.unique_range_generator(30, 0, 29);

// ===== AJAX CALL START HERE ===== //
var http = new XMLHttpRequest();
http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200){
        var response = http.responseText;
        let data = JSON.parse(response);
        // GET AND STORE THE ARRAY OF TRAITS.
        const trait = data.personalities;
        // GET AND STORE THE CARRERS OF THE PERSONALITIES.
        const career_array = data.careerArray;
        // GET AND HOLD THE WORDS MEANING FROM THE DICTIONARY
        const meanings = data.dictionary;

        // TRAIT SELECTION MODULE FUNCTIONALITIES START
        // GET THE NECCESSARY DOM ELEMENTS.
        let words_count_container = document.querySelector('.words_count');

        let trait_container = document.querySelectorAll('.trait_container');
        let trait_boxes = document.querySelectorAll('.trait_box');

        let trait_box1 = document.querySelector('#trait_box1 .trait_word');
        let trait_box2 = document.querySelector('#trait_box2 .trait_word');
        let trait_box3 = document.querySelector('#trait_box3 .trait_word');
        let trait_box4 = document.querySelector('#trait_box4 .trait_word');

        let trait_box1_img = document.querySelector('#trait_box1 .img_frame img');
        let trait_box2_img = document.querySelector('#trait_box2 .img_frame img');
        let trait_box3_img = document.querySelector('#trait_box3 .img_frame img');
        let trait_box4_img = document.querySelector('#trait_box4 .img_frame img');

        let prev_traits_btn = document.querySelector('.prev_traits');
        let next_traits_btn = document.querySelector('.next_traits');
        let current_progress = 0;
        let progress_bar = document.querySelector('.range_slider');
        let submit_traits_btn = document.querySelector('.submit_traits');

        // HOLDS THE SELECTED WORD/WORDS TEMPORARILY
        let selected_words = [];
        // STORES THE SELECTED WORD/WORDS AND MAKES THEM THE CHOSEN WORD/WORDS
        let chosen_words = [];
        // HELPS CYCLE BACK AND FRONT THE genIndex ARRAY
        // TO LOAD NEW WORDS OR GET THE PREVIOUS WORDS.
        let personaity_inc = 0;


        let get_traits = (progress) => {
            trait_box1.innerHTML = trait['p1'][gen_trait_index[progress]];
            trait_box2.innerHTML = trait['p3'][gen_trait_index[progress]];
            trait_box3.innerHTML = trait['p0'][gen_trait_index[progress]];
            trait_box4.innerHTML = trait['p2'][gen_trait_index[progress]];

            trait_box1_img.src = `./asset/images/trait_images/${trait['p1'][gen_trait_index[progress]]}.jpeg`;
            trait_box2_img.src = `./asset/images/trait_images/${trait['p3'][gen_trait_index[progress]]}.jpeg`;
            trait_box3_img.src = `./asset/images/trait_images/${trait['p0'][gen_trait_index[progress]]}.jpeg`;
            trait_box4_img.src = `./asset/images/trait_images/${trait['p2'][gen_trait_index[progress]]}.jpeg`;
        }

        // ON MODULE LOAD ADD THE FIRST WORDS TO THE traitBoxes
        get_traits(personaity_inc)

        // ON MODULE LOAD HIDE THE PREVIOUS BUTTON
        helper.hide(prev_traits_btn)

        // PERFORM ACTION EACH traitBox START ===== //
        trait_boxes.forEach(tb => {
            // Set all the traitBoxes state to unselected.
            tb.setAttribute('state', 'unselected');
            // If a traitBox is clicked
            tb.addEventListener('click', () => {
            // Get the word in each traitBox 
                let trait_box_word = tb.querySelector('.trait_word').textContent;
                if (tb.getAttribute('state') == 'unselected'){
                    tb.setAttribute('state', 'selected');
            // Get the background color to signify selection
                    tb.style.background = 'var(--tc2)';
                    tb.querySelector('.trait_word').style.color = 'var(--tc3)';
            // If the word has not been selected before
                    if (selected_words.includes(trait_box_word) == false) {
            // Add the selected traitbox word  temporarily
            // to the selected_words array
                        selected_words.push(trait_box_word);
                    }

            // Check If the selected word/words has been chosen
            // before adding it to the chosen_words array
                    for (let i = 0; i < selected_words.length; i++) {
                        if (chosen_words.includes(selected_words[i]) == false) {
                            chosen_words.push(selected_words[i]);
                        }    
                    }
                }
            // END IF (for selected state).
             
            // else if the state is already selected
                else if (tb.getAttribute('state') == 'selected') {
            // Change the state to unselected (state and background)
                    tb.setAttribute('state', 'unselected');
                    tb.style.background = 'transparent';
            // Remove the trait_box word from
            // the selected_words AND chosen_words array.
                    selected_words = helper.remove_element(selected_words, trait_box_word);
                    chosen_words = helper.remove_element(chosen_words, trait_box_word);
                }
            // END IF (for unselected state).
            });
            // End trait_box click event function.
        });
        // PERFORM ACTION EACH traitBox END=====================//


        // IF THE NEXT BUTTON IS CLICKED START=================//
        next_traits_btn.addEventListener('click', () => {
            // INCREMENT THE personaityInc TO ADD NEW WORDS 
            personaity_inc++;
            // SET ALL THE traitBoxes state TO unselected.
            trait_boxes.forEach(tb => {
                tb.setAttribute('state', 'unselected');
                let trait_meaning = tb.querySelector('.trait_meaning');
                helper.disappear(trait_meaning)
            });
            // CHECK IF ANY OF THE NEXT WORDS AS BEEN CHOSEN BEFORE
            // AND EXIST IN THE chosen_words ARRAY.
            // SET TIMOUT TO WAIT FOR THE NEXT WORDS TO LOAD.
            setTimeout(() => {
                trait_boxes.forEach(tb => {
                    tb.setAttribute('state', 'unselected');
                    let trait_box_word = tb.querySelector('.trait_word').textContent;
            // CHECK IF A traitBox word IS IN THE CHOSEN WORD ARRAY
            // (i.e has been chosen before).        
                    if (chosen_words.includes(trait_box_word)) {
            // CHANGE THE BACKGROUND COLOR TO SIGNIFY SELECTION
                        tb.style.background = 'var(--tc2)';
                        tb.querySelector('.trait_word').style.color = 'var(--tc3)';
                    }
                    else{
                        tb.style.background = 'transparent';
                        tb.querySelector('.trait_word').style.color = 'var(--tc1)';
                    }
            // END ELSE
                });
            // END triatBox FOR EACH        
            }, 10);
            // END SET TIMEOUT.
            
            // ADD NEW WORDS TO THE traitBox
            get_traits(personaity_inc)

            // IF THE LAST SET OF WORDS ARE DISPLAY(i.e at the ending)
                if (personaity_inc == 29) {
            // HIDE THE NEXT BUTTON
                    helper.hide(next_traits_btn);
            // DISPLAY THE SUBMIY BUTTON
                    if (chosen_words.length > 4) {
                        helper.unhide(submit_traits_btn, "flex")
                    }  
                    else{
                        MSG = "SELECT AT LEAST FIVE WORDS TO CONTINUE."
                        BTNS = [{text: "Ok", class:"notification_close n_clear", id:"##" + notification_screen.className}]
                        let trait_selection_page_container = document.querySelector(".trait_selection_page")
                        // console.log("SELECT AT LEAST FIVE WORDS TO CONTINUE.");
                        helper.notification_box(trait_selection_page_container, notification_screen,
                            {type: "alert !!!", msg: MSG, btns: BTNS}
                        )
                    }
                }
            // END IF
            
            // DISPLAY THE PREVIOUS BUTTON
            helper.unhide(prev_traits_btn, "flex")
            // ADJUST THE PROGRESS BAR THUMB WIDTH BACKWARDS
            progress_bar.value++
            current_progress = progress_bar.value;
        });
        // IF THE NEXT BUTTON IS CLICKED END========================//
        
        // DISPLAY THE AMOUNT OF WORDS CHOSEN START=======================//
        setInterval(() => {
            words_count_container.innerHTML = chosen_words.length;
        }, 1000);
        // DISPLAY THE AMOUNT OF WORDS CHOSEN END========================//

        // ALLOWS PROGRESS BAR TO NAVIGATE ACCROSS TRAITS
        progress_bar.addEventListener("change", () => {
            personaity_inc = progress_bar.value
            get_traits(progress_bar.value)

            // DISPLAY THE PREVIOUS BUTTON
            if (personaity_inc == 0) {
                helper.hide(prev_traits_btn)
                helper.unhide(next_traits_btn, "flex")
            }else if(personaity_inc == 29) {
                helper.unhide(prev_traits_btn, "flex")
                helper.hide(next_traits_btn)

                // DISPLAY THE SUBMIY BUTTON
                if (chosen_words.length > 4) {
                    helper.unhide(submit_traits_btn, "flex")
                }  
                else{
                    MSG = "SELECT AT LEAST FIVE WORDS TO CONTINUE."
                    BTNS = [{text: "Ok", 
                        class:"notification_close n_clear", 
                        id:"##" + notification_screen.className}]
                    let trait_selection_page_container = document.querySelector(".trait_selection_page")
                    helper.notification_box(trait_selection_page_container, notification_screen,
                        {type: "alert !!!", msg: MSG, btns: BTNS}
                    )
                }
            }else{
                helper.unhide(prev_traits_btn, "flex")
                helper.unhide(next_traits_btn, "flex")  
            }
        })
        
        // ============================================================//
        
        // IF THE PREVIOUS BUTTON IS CLICKED START=================//
        prev_traits_btn.addEventListener('click', () => {
            // DECREMENT THE personaityInc TO GET THE PREVIOUS WORDS 
            personaity_inc--;
            // HIDE trait_boxes word meaning container
            trait_boxes.forEach(tb => {
                let trait_meaning = tb.querySelector('.trait_meaning');
                helper.disappear(trait_meaning)
            });
            // CHECK IF ANY OF THE PREVOIUS WORDS AS BEEN CHOSEN BEFORE
            // AND EXIT IN THE chosenWords ARRAY.
            // SET TIMOUT TO WAIT FOR THE PREVIOUS WORDS TO LOAD.
            setTimeout(() => {
            // FOR EACH traitBox
            trait_boxes.forEach(tb => {
                // GET THE trait_box word
                    tb.style.background = 'transparent';
                    let trait_box_word = tb.querySelector('.trait_word').textContent;
                    // CHECK IF A traitBox word IS IN THE CHOSEN WORD ARRAY
                    // (i.e has been chosen before).
                    if (chosen_words.includes(trait_box_word)) {
                        // CHANGE THE STATE AND BACKGROUND COLOR TO SIGNIFY SELECTION
                        tb.setAttribute('state', 'selected');
                        tb.style.background = 'var(--tc2)';
                        tb.querySelector('.trait_word').style.color = 'var(--tc3)';
                        // ELSE IF THE WORD HAS NOT BEEN CHOSEN
                    }else if (chosen_words.includes(trait_box_word)){
                        // CHANGE THE BACKGROUND COLOR TO SIGNIFY UNSELECTION
                        tb.style.background = 'transparent';
                        tb.querySelector('.trait_word').style.color = 'var(--tc1)';
                    }
                    // END ELSE IF
                });
                // END triatBox FOR EACH        
            }, 10);
            // END SET TIMEOUT.
        
            // LOAD THE PREVIOUS WORDS.
            get_traits(personaity_inc)
            
            // IF WORDS ARE DISPLAY(i.e user is at the beginning)
            if (personaity_inc == 0) {
            // HIDE THE PREVIOUS BUTTON
                helper.hide(prev_traits_btn)
            }
            // END IF
        
            // DISPLAY THE NEXT BUTTON
            helper.unhide(next_traits_btn, "flex")
            // HIDE THE SUBMIT BUTTON
            helper.hide(submit_traits_btn)
            // HIDE THE alertBox IF DISPLAYED BUTTON
            // alertBox.style.opacity = "0";
            // alertBox.style.zIndex = "-1";
        
            // ADJUST THE PROGRESS BAR THUMB WIDTH BACKWARDS
            progress_bar.value--
            current_progress = progress_bar.value;

        });
        // ===== IF THE PREVIOUS BUTTON IS CLICKED END ===== //
        
        // ===== FETCH THE MEANING OF THE WORDS FROM THE DICTIONARY START ===== //
        function fecth_meanings() {
            trait_container.forEach(tc => {
                let trait_word = tc.querySelector('.trait_word').textContent;
                let trait_meaning = tc.querySelector('.trait_meaning');
        // (triat_word_key) WILL BE USED TO GET 
        // THE triat_word MEANING FROM THE DICTIONARY
                let trait_word_key;
        // CHECK IF THE trait_word has a space 
        // i.e if it is a sentence or multiple words.
            if (trait_word.includes(" ")) {
        // (camalize) WILL TURN IT TO CAMEL CASE 
                    trait_word_key = helper.camalize(trait_word);
                }
                else{
                    trait_word_key = trait_word;
                }

        // INSERT THE MEANING TO THE MEANING DISPLAY DIV
                trait_meaning.innerHTML = "<h5 class='meaning'>" 
                                            + meanings[trait_word_key] + "</h5>";
            });
        }
        // FETCH THE MEANING OF THE WORDS FROM THE DICTIONARY END=====//

        // HIDE AND SHOW THE MEANING IF THE MEANING BUTTON IS CLICKED START=====//
        trait_container.forEach(tc => {
            let trait_meaning = tc.querySelector('.trait_meaning');
            let trait_meaning_btn = tc.querySelector('.trait_meaning_btn');

            trait_meaning_btn.addEventListener('click', () => {
                helper.toggle_many_style_for_one(trait_meaning, [
                    ['opacity', '1', '0'], ['zIndex', '1', '-1']
                ])  

        // RE-SCAN FOR NEW WORDS AND FECTH THE MEANINGS INSTANTLY.
                function display_meaning() {
                    if (trait_meaning.style.opacity == "1") {
                        fecth_meanings();
                    }else{ return; }
                }
        // DISPLAY THE MEANING IF HIDDEN
                display_meaning();
            });
        });
        // ===== FETCH THE MEANING OF THE WORDS FROM THE DICTIONARY END ===== //

        // ===== RESULTS MODULE FUNCTIONALITIES START ===== //
        // CREATE THE PERSONALITY HOLDERS AND TYPE.
        let personalities = [[],[],[],[]];
        let personality_type = [
            "Accomodating Harmonious",
            "Engaging Spontaneous",
            "Directive Objective",
            "Methodical Objective"
        ];
        // RE-ARRANGE THE (pLengthArray) FROM HIGHEST TO LOWEST NUMBER
        // THIS WILL HELP TO IDENTIFY DOMINANCE IN EACH PERSONALITY.
        let p_sorted_length_array = [];

        // GET THE RESULTS DIVS
        // let result_stats = document.querySelector('.result_stats');
        // let personality_stats_box = document.querySelectorAll('.personality_stats');
        let p_box0 = document.querySelector('.personalities');
        let p_box1 = document.querySelector('.sTwo');
        let p_box2 = document.querySelector('.sThree');
        let p_box3 = document.querySelector('.sFour');

        let personality_container = document.querySelectorAll(".personalities .personality")
        let dominance_value_container = document.querySelectorAll(".dominance_stats .dominance")


        // IF THE SUBMIT BUTTON IS CLICKED START=====//
        submit_traits_btn.addEventListener('click', () => {
        // RESET THE chosenWords By removing duplicates
            chosen_words = helper.remove_duplicates(chosen_words);

        // CLEAR ALL THE PERSONALITY ARRAY(personalities)
        // SO THAT WHEN WE CYCLE THROUGH THE chosen_words ARRAY
        // THE PERSONALITY ARRAY(personalities) WON'T HAVE 
        // DUPLICATES ELEMENTS(traits)
            for (let i = 0; i < personalities.length; i++) {
                personalities[i] = [];
            }  
            
        // THEN AFTER FEW SECONDS CYCLE THROUGH THE chosen_words ARRAY
        // AND DISPLAY THE RESULT.
        setTimeout(() => {
        // CHECK IF THE SELECTED WORD/WORDS HAS BEEN CHOSEN 
        // BEFORE ADDING THE LAST WORD TO THE chosenWord ARRAY.
            for (let i = 0; i < selected_words.length; i++) {
                if (chosen_words.includes(selected_words[i]) == false) {
                    chosen_words.push(selected_words[i]);
                }    
            }

        // CYCLE TROUGH chosen_words ARRAY TO CHECK WHICH 
        // PERSONALITY THE CHOSEN TRAIT REPRESENTS OR FALL UNDER. 
            for (let i = 0; i < chosen_words.length; i++) {
                for (let j = 0; j < 4; j++) {
                    if (trait["p" + j].includes(chosen_words[i])) {
                        personalities[j].push(chosen_words[i]);
                    }            
                }
            }

        // STORE THE LENGTH OF EACH personalities ARRAY
        // subArray(each personality).
            let p_length_array = [];
            for (let i = 0; i < personalities.length; i++) {
                let p_length = personalities[i].length;
                p_length_array.push(p_length);
            }

        // RE-ARRANGE THE (p_length_array) FROM HIGHEST TO LOWEST NUMBER
        // THIS WILL HELP TO IDENTIFY DOMINANCE IN EACH PERSONALITY.
            p_sorted_length_array = p_length_array.sort((a, b) => b - a);

        // LET (p_names) HOLD THE PERSONALITY TYPES 
        // FROM HIGHEST TO LOWEST DOMINANCE.
            let p_names = ["", "", "", ""];

        // ARRANGE THE (p_names) ARRAY 
        // FROM HIGHEST TO LOWEST DOMINANCE.
            for (let i = 0; i < personalities.length; i++) {
        // GET THE INDEX OF EACH PERSONALITY
                let p_index = personalities.indexOf(personalities[i]);

        // IF THE PERSONALITY HAS THE HIGHEST LENGTH(MOST DOMINANT)
        // MAKE IT THE FIRST ELEMENT IN THE (p_names) ARRAY.
                if (personalities[i].length == p_sorted_length_array[0]) {
        // POSITION LOGIC {IF THERE ARE OTHER PERSONALITY WITH THE SAME LENGTH
        // SET THEM AS THE NEXT ELEMENTS OF THE (p_names) ARRAY}
                    if (p_names.includes(personality_type[p_index]) == false) {
                        if (p_names[0] == "") {
                            p_names[0] = personality_type[p_index];   
                        }
                        else if (p_names[1] == "") {
                            p_names[1] = personality_type[p_index];   
                        }
                        else if (p_names[2] == "") {
                            p_names[2] = personality_type[p_index];   
                        }
                        else if (p_names[3] == "") {
                            p_names[3] = personality_type[p_index];   
                        }
                    }
                }
        // IF THE PERSONALITY HAS THE 2ND HIGHEST LENGTH(2ND DOMINANT)
        // MAKE IT THE 2ND ELEMENT IN THE (p_names) ARRAY.
                if (personalities[i].length == p_sorted_length_array[1]) {
        // POSITION LOGIC
                    if (p_names.includes(personality_type[p_index]) == false) {
                        if (p_names[1] == "") {
                            p_names[1] = personality_type[p_index];   
                        }
                        else if (p_names[2] == "") {
                            p_names[2] = personality_type[p_index];   
                        }
                        else if (p_names[3] == "") {
                            p_names[3] = personality_type[p_index];   
                        }
                    }
                } 
        // IF THE PERSONALITY HAS THE 3RD HIGHEST LENGTH(3RD DOMINANT)
        // MAKE IT THE 3RD ELEMENT IN THE (p_names) ARRAY.
                if (personalities[i].length == p_sorted_length_array[2]) {
        // POSITION LOGIC
                    if (p_names.includes(personality_type[p_index]) == false) {
                        if (p_names[2] == "") {
                            p_names[2] = personality_type[p_index];   
                        }
                        else if (p_names[3] == "") {
                            p_names[3] = personality_type[p_index];   
                        }
                    }
                } 
            // IF THE PERSONALITY HAS THE 4TH HIGHEST LENGTH(4TH DOMINANT)
            // MAKE IT THE 4TH ELEMENT IN THE (p_names) ARRAY.
                if (personalities[i].length == p_sorted_length_array[3]) {
            // POSITION LOGIC
                    if (p_names.includes(personality_type[p_index]) == false) {
                        if (p_names[3] == "") {
                            p_names[3] = personality_type[p_index];   
                        }
                    }
                } 
            }

            // DISPLAY THE PERSONALITIES FROM THE 
            // MOST DOMINANT TO THE LEAST DOMINANT.
            // ~LOGIC { FOR EACH OF THE PERSONALITY BOXES,
            // SET THE PERSONALITY IN ORDER OF THE (p_names) ARRAY
            // THEN GET THE INDEX OF EACH OF THE PERSONALITY
            // IN THEIR ORDER IN THE (personality_type) ARRAY,
            // THEN SET THE DOMINANCE AMOUNT TO THE 
            // LENGTH OF THAT PERSONALITY}
                for (let i = 0; i < personality_container.length; i++) {
                    let dominant_lvl = personality_type.indexOf(p_names[i]);

                    let link_to_most_dom_page_1 = document.createElement("a")
                    let link_to_most_dom_page_2 = document.createElement("a")
                       
                    link_to_most_dom_page_1.href = "#" + helper.camalize(p_names[i].toLowerCase())
                    link_to_most_dom_page_1.innerHTML = p_names[i]

                    link_to_most_dom_page_2.href = "#" + helper.camalize(p_names[i].toLowerCase())
                    link_to_most_dom_page_2.innerHTML = personalities[dominant_lvl].length

                    // ADD THE TARGET ATTRIBUTE TO SPECIFY PAGE TO LINK TO
                    if (personalities[dominant_lvl].length == p_sorted_length_array[0]) {
                        personality_container[i].setAttribute("target", "most_dom_personality_career_page")
                        dominance_value_container[i].setAttribute("target", "most_dom_personality_career_page")
                    }else{
                        personality_container[i].setAttribute("target", "less_dom_personality_career_page")
                        dominance_value_container[i].setAttribute("target", "less_dom_personality_career_page")
                    }

                    // APPEND THE ELEMENTS TO THEIR RESPECTIVE CONTAINERS
                    personality_container[i].appendChild(link_to_most_dom_page_1)
                    dominance_value_container[i].appendChild(link_to_most_dom_page_2)
                }

            }, 10);
            // END SET TIMEOUT
        
        // =============================================== //

        // ===== RESULTS  PAGE FUNCTIONALITIES END =====//

        // ===== RESULTS OUTPUT PAGE FUNCTIONALITIES START =====//

        // (most_dominant_output_array) will store every most dominant personality
        let most_dominant_output_array = []
        let most_dominant_description_output_array = []
        let eventual_personality = document.querySelector('.eventual_personality')
        let eventual_personality_description = document.querySelector('.eventual_personality_description')
        // let eventual_dom_score = document.querySelector('.dom_score')
        let eventual_careers_to_export = ""

    // GET THE CAREER DIV ELEMENTS
        let most_dominant_list_container = 
            document.querySelector('.most_dom_personality_career_page .available_personalities')
        let most_dominant_careers_container = 
            document.querySelector('.most_dom_personality_career_page .available_personalities_careers')

        let less_dominant_list_container = 
            document.querySelector('.less_dom_personality_career_page .available_personalities')
        let less_dominant_careers_container = 
            document.querySelector('.less_dom_personality_career_page .available_personalities_careers')

        // USE (most_dom_id ) AND (less_dom_id) 
        // TO GIVE EACH PERSONALITY A UNIQUE CLASS
        // i.e ld1, ld2, ... or md1, md2, ...
        let most_dom_id = 1;
        let less_dom_id = 1;

            // THEN QUICKLY ADD THE CAREERS
            setTimeout(() => {
                // CYCLE THROUGH THE RESULTS GOTTEN        
                for (let i = 0; i < personalities.length; i++) {
                    // CREATE A NEW ELEMENTS TO DISPLAY THE PERSONALITY DETAILS
                    let title_li = document.createElement('li');
                    title_li.className = "clkb_btn"
                    let title_link = document.createElement('a')

                    let avail_pers_careers_container_li = document.createElement('li');
                    avail_pers_careers_container_li.className = "available_personalities_careers_container"
                    let career_description_p = document.createElement('p');
                    career_description_p.className = "career_description"
                    let careers_container_ul = document.createElement('ul');
                    careers_container_ul.className = "careers"
                
                    // CONVERT EACH OF THE PERSONALITY NAMES TO UPPERCASE
                    // TO BE DISPLAY AS THE TITLE.
                    let the_title = personality_type[i].toUpperCase();
                
                    // CONVERT EACH OF THE PERSONALITY NAMES TO LOWERCASE 
                    // SO THAT THEY CAN BE CONVERTED EASILY TO CAMEL CASE 
                    let personality_lower_case = personality_type[i].toLowerCase();
                    
                    // CONVERT TO CAMELCASE SO WE CAN CYCLE THROUGH THE carrer_array 
                    let personality_camel_case = helper.camalize(personality_lower_case);
                
                    // LET (the_description) HOLD THE GENERAL OVERVIEW OF EACH PERSONALITY
                    let the_description = career_array[personality_camel_case][0];

                    // **Vital Code ~ COMPARE THE DOMINANCE SCORE BY 
                    // TESTING FOR PERSONALITIES THE HAVE DOM SCORE EQUAL TO THE 
                    // FIRST(HIGHEST) SCORE(element) IN THE (p_sorted_length_array)
                    // ADD THE PERSONALITY TO THE MDP PAGE IF IT PASSES THE CONDITION
                    if (personalities[i].length == p_sorted_length_array[0]) {
                        // Push the most dom personalities to (most_dominant_output_array)
                        most_dominant_output_array.push(the_title)
                        most_dominant_description_output_array.push(the_description)

                        title_link.href = `#${personality_camel_case}`
                        title_link.innerHTML = the_title
                        title_li.classList.add(`md${most_dom_id}`)
                        title_li.appendChild(title_link)
                        most_dominant_list_container.appendChild(title_li)

                        career_description_p.innerHTML = the_description
                        avail_pers_careers_container_li.classList.add(`md${most_dom_id}`)
                        avail_pers_careers_container_li.id = personality_camel_case
                        avail_pers_careers_container_li.appendChild(career_description_p)

                        // CREATE NEW LIST ELEMENTS AND LET THE HOLD THE CAREERS
                        // RELATED TO THAT PERSONALITY
                        // REMEMBER THE CAREERS START FROM 
                        for (let j = 1; j < career_array[personality_camel_case].length; j++) {
                            let new_li = document.createElement('li');

                            // Add Each Most Dom Career So They Can Be Added To The Exported File
                            eventual_careers_to_export += `${(career_array[personality_camel_case][j]).toUpperCase()}\n\n\t\t\t` 

                            // Check for careers with mulltiple words
                            let double_words = career_array[personality_camel_case][j].split(" and ")
                            if (double_words[1]) {
                                // format the string so it doesn't overflow when displayed
                                let format_string = double_words[0] + "<br> and <br>" + double_words[1]
                                new_li.innerHTML = `
                                <span class="career_name">${format_string}</span>
                                <img src="./asset/images/career_images/${personality_camel_case}/${career_array[personality_camel_case][j]}.JPEG" alt="">
                            `
                            }else{
                                new_li.innerHTML = `
                                <span class="career_name">${career_array[personality_camel_case][j]}</span>
                                <img src="./asset/images/career_images/${personality_camel_case}/${career_array[personality_camel_case][j]}.JPEG" alt="">
                            `
                            }
                        // ADD THE LIST TO THE PERSONALITY UL
                            careers_container_ul.appendChild(new_li);
                        }
                        avail_pers_careers_container_li.appendChild(careers_container_ul)
                        most_dominant_careers_container.appendChild(avail_pers_careers_container_li)
                        most_dom_id++;
                    }
                    // ELSE ADD TO THE LESS DOMIMANT DIV 
                    else{
                        title_link.href = `#${personality_camel_case}`
                        title_link.innerHTML = the_title
                        title_li.classList.add(`ld${less_dom_id}`)
                        title_li.appendChild(title_link)
                        less_dominant_list_container.appendChild(title_li)

                        career_description_p.innerHTML = the_description
                        avail_pers_careers_container_li.classList.add(`ld${less_dom_id}`)
                        avail_pers_careers_container_li.id = personality_camel_case
                        avail_pers_careers_container_li.appendChild(career_description_p)

                        // CREATE NEW LIST ELEMENTS AND LET THE HOLD THE CAREERS
                        // RELATED TO THAT PERSONALITY
                        // REMEMBER THE CAREERS START FROM 
                        for (let j = 1; j < career_array[personality_camel_case].length; j++) {
                            let new_li = document.createElement('li');
                            let double_words = career_array[personality_camel_case][j].split(" and ")
                            if (double_words[1]) {
                                let format_string = double_words[0] + "<br> and <br>" + double_words[1]
                                new_li.innerHTML = `
                                <span class="career_name">${format_string}</span>
                                <img src="./asset/images/career_images/${personality_camel_case}/${career_array[personality_camel_case][j]}.JPEG" alt="">
                            `
                            }else{
                                new_li.innerHTML = `
                                <span class="career_name">${career_array[personality_camel_case][j]}</span>
                                <img src="./asset/images/career_images/${personality_camel_case}/${career_array[personality_camel_case][j]}.JPEG" alt="">
                            `
                            }
                        // ADD THE LIST TO THE PERSONALITY UL
                            careers_container_ul.appendChild(new_li);
                        }
                        avail_pers_careers_container_li.appendChild(careers_container_ul)
                        less_dominant_careers_container.appendChild(avail_pers_careers_container_li)
                        less_dom_id++;
                    }
                }
                // DISPLAY THE EVENTUAL RESULT OF THE SELECTION
                eventual_personality.innerHTML = helper.sentencize(most_dominant_output_array)
                eventual_personality_description.innerHTML = helper.sentencize(most_dominant_description_output_array)
                // eventual_dom_score.innerHTML = p_sorted_length_array[0]
            
                info_to_save = `
                    CHANGE IMPACT RESOURCES INTERNATIONAL \n
                    ==================================================

                    The Result OF Your Selections Are Out And From That We Deduce That You Are \n
                    ${eventual_personality.innerHTML}

                    You Will Excel In \n
                    ${eventual_personality_description.innerHTML.toUpperCase()}

                    Below Are Careers That Matches Your Personalities \n
                    ${eventual_careers_to_export}
                    ==================================================\n
                    Thanks For Taking The Test, We Hope This Has Been Of Great Help To You. \n

                    We Also hope You Can Recommend Us To Your Family and Friends.\n

                    For More Info -> Visit arichie1.github.io/career_finder/#about_us
                `
                save_info_btns.forEach(save_info_btn => {
                    save_info_btn.addEventListener("click", () => {
                        helper.export_file("career_finder.txt", info_to_save)
                    })
                });
            
            }, 10);
            // END SET TIMEOUT
            // ===== RESULTS OUTPUT PAGE FUNCTIONALITIES END =====//
        });
        // ===== IF THE SUBMIT BUTTON IS CLICKED END ===== //
    }
    // ===== READY STATE STATUS CHECK END ===== //
}
// ===== ONREADYSTATE FUNCTION END. ===== //
http.open('GET','asset/js/traits.json', true);
http.send();
// ===== AJAX CALL END ===== //
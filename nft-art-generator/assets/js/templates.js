let new_art_canvas = document.createElement("img")
new_art_canvas.width = 500
new_art_canvas.height = 500
let new_art_canvas_context = new_art_canvas.getContext("2d")
new_art_canvas_context.drawImage(new_art, 0, 0, 
    new_art_canvas.width, new_art_canvas.height)
new_art_container.appendChild(new_art_canvas)


.app .middle .user_layers 
.import_export{
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 5%; width: 100%;
    font-size: 12px;
    display: none;
}
.app .middle .user_layers 
.import_export .many_icons{
    position: relative;
}
.app .middle .user_layers 
.import_export .import_layers .many_icons::before{
    content: "\f309";
    font-family: FontAwesome;
    right: 37%;
}
.app .middle .user_layers 
.import_export .export_layers .many_icons::before{
    content: "\f30c";
    font-family: FontAwesome;
    right: 37%;
}
.app .middle .user_layers 
.edit_layers{
    position: relative;
    display: flex;
    height: 5%; width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
}
.app .middle .user_layers 
#edit_layers_has_layers{
    height: 5%;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
}
.app .middle .user_layers 
#edit_layers_has_no_layers{
    height: 70%;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;
}

.app .middle .user_layers 
.edit_layers .no_layer{
    display: none;
}
.app .middle .user_layers 
.create_select{
    height: 100%; width: 100%;
    display: flex;
    align-items: center;
}
.app .middle .user_layers 
#create_select_has_layers{
    height: 100%;
    justify-content: space-between;
    margin-top: 0%;
    border: none;
}
.app .middle .user_layers 
#create_select_has_no_layers{
    height: 20%;
    justify-content: space-evenly;
    padding-left: 2%;
    padding-right: 2%;
    margin-top: 10%;
}
.app .middle .user_layers 
#create_select_has_no_layers .start_import,
.app .middle .user_layers 
#create_select_has_no_layers .create_layer{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3%;
    border: 1px dashed #000;
}
.app .middle .user_layers 
#create_select_has_no_layers .start_import .many_icons::before{
    content: "\f309";
    font-family: FontAwesome;
}
.app .middle .user_layers 
.create_select .select_layer .many_icons::before{
    content: "\f00c";
    font-family: FontAwesome;
}
/* =====ON POP_UP STYLE STARTS HERE===== */
.app .middle .user_layers 
.on_pop_up{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--fsl);
    background: var(--bg);
    border-radius: 5px;
    border: var(--line);
}
.app .middle .user_layers
.on_pop_up .on_pop_up_inner{
    position: relative;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}
.app .middle .user_layers
.on_pop_up ul:nth-child(1){
    width: 90%; height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: right;
    border-bottom: var(--line);
}
.app .middle .user_layers
.on_pop_up ul:nth-child(1) li{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app .middle .user_layers
.on_pop_up ul:nth-child(1) li:nth-child(1){width: 10%;}

.app .middle .user_layers
.on_pop_up ul:nth-child(1) li:nth-child(2){width: 80%;}

/* =====ON POP_UP STYLE ENDS HERE===== */

/* =====ON IMPORT STYLE STARTS HERE===== */
.app .middle .user_layers 
.on_import{
    top: 10%; left: 50%;
    transform: translateX(-50%) ;
    height: 400px; width: 100%;
    display: none;
}
.app .middle .user_layers 
.on_import form{
    width: 95%; height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
}
.app .middle .user_layers 
.on_import form textarea{
    width: 95%; height: 80%;
    background: var(--fcw);
    padding-top: 2%;
    display: flex;
    justify-content: flex-start;
}
.app .middle .user_layers 
.on_import form button{
    width: 70%; height: 25px;
}
/* =====ON IMPORT STYLE ENDS HERE===== */

/* ON GENERATE STYLES STARTS HERE */
.app .middle .user_layers
.on_generate{
    top: 100%; left: 15%;
    /* transform: translate(-50%, -50%) ; */
    height: 200px; width: 70%;
    font-size: 100% ;
    display: none;
}
.app .middle .user_layers
.on_generate .on_generate_options{
    width: 95%; height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
}
.app .middle .user_layers
.on_generate .on_generate_options li{
    width: 70%; height: 25px;
}
.app .middle .build_test{
    position: absolute;
    bottom: 10%; right: 7%;
    width: 50px; height: 50px;
    border-radius: 100%;
    display: none;
}
/* ON GENERATE STYLES ENDS HERE */

/* =====ON CREATE STYLE STARTS HERE===== */

/* Quick Mode Starts Here */
.app .middle .user_layers 
#quick_mode{
    position: absolute;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    display: none;
}
.app .middle .user_layers 
#quick_mode .on_create_inner{
    position: relative;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.app .middle .user_layers 
#quick_mode ul {width: 5%;}
.app .middle .user_layers 
#quick_mode ul li:nth-child(1){width: 100%;}
.app .middle .user_layers 
#quick_mode ul li:nth-child(2){display: none;}
.app .middle .user_layers 
#quick_mode .cancel_on_create{
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app .middle .user_layers 
#quick_mode form{
    width: 90%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
}
.app .middle .user_layers 
#quick_mode form input{
    width: 70%; height: 20px;
}
.app .middle .user_layers 
#quick_mode form button{
    width: 28%; height: 20px;
}
.app .middle .user_layers 
#quick_mode .on_create_expand{
    width: 5%; height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* Quick Mode Ends Here */

/* Box Mode Starts Here */
.app .middle .user_layers 
#box_mode{
    position: absolute;
    /* top: 300%; left: 50%; */
    top: 30%; left: 50%;
    transform: translateX(-50%) ;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 150px; width: 200px;
    font-size: var(--fsl);
    background: var(--bg);
    border-radius: 5px;
    border: var(--line);
    /* opacity: 0;
    z-index: -1; */
    display: none;
}
.app .middle .user_layers 
#box_mode .on_create_inner{
    position: relative;
    width: 100%; height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
}
.app .middle .user_layers 
#box_mode .on_create_header{
    width: 90%; height: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: right;
}
.app .middle .user_layers 
#box_mode .on_create_header li{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.app .middle .user_layers 
#box_mode .on_create_header li:nth-child(1){width: 10%;}
.app .middle .user_layers 
#box_mode .on_create_header li:nth-child(2){width: 80%;}
.app .middle .user_layers 
#box_mode form{
    width: 95%; height: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 5px;
}
.app .middle .user_layers 
#box_mode form input{
    width: 70%; height: 25px;
}
.app .middle .user_layers 
#box_mode form button{
    width: 70%; height: 25px;
}
.app .middle .user_layers 
#box_mode .on_create_expand{
    position: absolute;
    right: 3%; top: 2.5%;
    width: 10%; height: 20px;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}
/* Box Mode Starts Here */
/* =====ON CREATE STYLES ENDS HERE===== */

/* =====ON SELECT STYLES STARTS HERE===== */
.app .middle .user_layers 
.on_select{
    position: absolute;
    width: 100%; height: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0% 2%;
    display: none;
}
.app .middle .user_layers 
.on_select .unselect_all{
    display: none;
}
/* =====ON SELECT STYLES ENDS HERE===== */
/* LAYERS SETTINGS STYLES ENDS HERE*/
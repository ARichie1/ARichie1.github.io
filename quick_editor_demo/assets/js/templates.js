let new_art_canvas = document.createElement("img")
new_art_canvas.width = 500
new_art_canvas.height = 500
let new_art_canvas_context = new_art_canvas.getContext("2d")
new_art_canvas_context.drawImage(new_art, 0, 0, 
    new_art_canvas.width, new_art_canvas.height)
new_art_container.appendChild(new_art_canvas)

var cssId = 'myCss';  // you could encode the css path itself to generate id..

const left = document.querySelector('.leftbtn'); 
const center = document.querySelector('.centerbtn');
const right = document.querySelector('.rightbtn');

let linkstring = "";

if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '';
    link.media = 'all';
}

left.addEventListener('click',() =>{
    head.appendChild(link);
    link.href = 'assets/camera/left.css';
    
});

center.addEventListener('click',() =>{
    head.appendChild(link);
    link.href = 'assets/camera/center.css';
});

right.addEventListener('click',() =>{
    head.appendChild(link);
    link.href = 'assets/camera/right.css';
});

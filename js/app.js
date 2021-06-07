/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 * Edit by Ahmed Fawzy Elragal for UDACITY project 
 * Email: mailto:elragal30@gmail.com
*/

/**
 * Define Global Variables
 * 
*/
let sectionsAr = document.getElementsByTagName("section");
let Fragment = document.createDocumentFragment();
const ulElm = document.getElementById("navbar__list");

document.addEventListener('DOMContentLoaded', buildlinks);
document.addEventListener('scroll', ActiveSection);
ulElm.addEventListener('click', scrollToSection);
document.getElementById("btnAdd").addEventListener('click', addSection);
document.getElementsByTagName("main")[0].addEventListener('click',collapseSection);
/**
 * End Global Variables
 * Start Helper Functions
 * 
 * get sections and build links in fragment
 * 
*/
/**
* @description get sections and build links into faragment
*   then append them to dom
*/
function buildlinks()
{
  ulElm.innerHTML = "";
   
    for (var i=0;i< sectionsAr.length;i++)
    {
        var liElm = document.createElement('li');
        liElm.className = "navbar__menu menu__link";
        
        var aElm =document.createElement('a');
        aElm.href = "index.html#"+sectionsAr[i].getAttribute("id");
        aElm.innerText = sectionsAr[i].getAttribute("data-nav");
        aElm.setAttribute('data-nav', sectionsAr[i].getAttribute("data-nav"));
        liElm.appendChild (aElm);
    
        Fragment.appendChild(liElm);
    }
    
    ulElm.appendChild(Fragment);
}

/**
* @description get the active section and change its class.
* also change style of active link bounded with this section
* then remove active class from other sections/links.
*/

function ActiveSection()
{
    
    const linksEl = document.getElementsByTagName("a");
    for (var i=0;i< sectionsAr.length;i++)
    {
        if(linksEl.length < sectionsAr.length){break;}
        const rec = sectionsAr[i].getBoundingClientRect();
                if(rec.top >= -150 && rec.top <= 400 )
        {
            if(!sectionsAr[i].classList.contains("your-active-class")){
                 sectionsAr[i].classList.add("your-active-class");
                 linksEl[i].className = "navbar__menu activeLink";
            }
        }
        else
        {
            sectionsAr[i].classList.remove("your-active-class");
            linksEl[i].className = "navbar__menu menu__link";
        }
    }
    
}
/**
* @description function to scroll to specified section bounded with link.
* performance boosted by make one event listner and then confirm that is a link 
* then get target to know which link pressed
* also prevented the default action of link
* scrolling with smooth effect
*/
function scrollToSection(obj)
{
    
    if(obj.target.nodeName === "A" ){
        obj.preventDefault();
        //console.log(obj.target.getAttribute('data-nav'));
        
        const secNumber = obj.target.getAttribute('data-nav').match(/\d/g);
        //console.log(secNumber + " X " +sectionsAr[secNumber-1 ].offsetTop+" y "+sectionsAr[secNumber -1].left);        
        window.scrollTo(0,sectionsAr[secNumber -1].offsetTop);
    }
}
/**
* @description function to add sections dynamically through button in navbar 
* edit : max sections set to 9 
*/
function addSection()
{
    console.log(document.getElementsByTagName('li')[0].firstChild);
    if (sectionsAr.length < 9) {

        const sElm = sectionsAr[sectionsAr.length - 1];
        const mainElm = document.getElementsByTagName("main");
        const newSection = document.createElement('section');
        newSection.innerHTML = sElm.innerHTML;
        const secNumber = Number.parseInt(sElm.getAttribute("data-nav").match(/\d/g)) + 1;
        console.log(secNumber);
        newSection.setAttribute("data-nav", "section " + secNumber);
        newSection.id = "section" + secNumber;
        // console.log(newSection.childNodes[3].nodeName);
        newSection.childNodes[3].innerText = "section " + secNumber;
        mainElm[0].appendChild(newSection);
        sectionsAr = document.getElementsByTagName("section");
        buildlinks();
    }
    else {
        alert("لايمكن اضافة المزيد من الاقسام");
    }

}

/**
* @description function to scroll to top of page through fixed button
*/
function scrollToTop()
{
    window.scrollTo(0,10);
}

function collapseSection(obj){
    console.log("Clicked on : " +obj.target.nodeName.toLowerCase ());
    if(obj.target.nodeName.toLowerCase() === "button"  ){
        const collapsedElm = obj.target.parentElement.children[2];
     
        collapsedElm.classList.toggle('coll');
        //collapsedElm.style.maxHeight ='10px';
        
        // document.getElementById('section1').style.minHeight = '100px';
        // document.getElementById('section1').clientHeight= '100px';

        console.log("height : " +collapsedElm.clientHeight + " Class: " + collapsedElm.nodeName);
    }
}

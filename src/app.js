import * as d3 from "d3";
import map from './map';
import pca from './pca';

const DATA_PERIODS = [
    "1990-1992",
    "1993-1995",
    "1996-1998",
    "1999-2001",
    "2002-2004",
    "2005-2007",
    "2008-2010",
    "2011-2013",
    "2014-2016"
];

let currentYear = 0;
let currentTab = "Map";

function changeTab(event) {
    let tabs = document.getElementsByClassName("tabs__tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace("tabs__tab--active", "");
    }
    tabs_content.innerHTML = "";
    if(event.currentTarget.innerHTML === "Map"){ // <== TODO change
        map.initMap(DATA_PERIODS[currentYear]);
        currentTab = "Map";
    } else if (event.currentTarget.innerHTML === "PCA") {
        pca.initPCA(DATA_PERIODS[currentYear]);
        currentTab = "PCA";
    }
    event.currentTarget.classList.add("tabs__tab--active");
}

function updateYear() {
    year_range.value = currentYear;

    if(currentYear === DATA_PERIODS.length - 1){
        //TODO year_right.classList.toggle()
        year_right.classList.add("tabs__year-button--hidden");
    } else {
        year_right.classList.remove("tabs__year-button--hidden");
    }

    if(currentTab === "Map"){
        map.drawMap(DATA_PERIODS[currentYear]);
    } else if (currentTab === "PCA"){
        pca.drawPCA(DATA_PERIODS[currentYear]);
    }

    year.innerHTML = DATA_PERIODS[currentYear]
}

function changeYearOnButton(event) {
    if(event.currentTarget === year_left && currentYear > 0){
        currentYear--;
    } else if (event.currentTarget === year_right && currentYear < DATA_PERIODS.length - 1) {
        currentYear++;
    }

    if(currentYear === 0){
        year_left.classList.add("tabs__year-button--hidden");
    } else {
        year_left.classList.remove("tabs__year-button--hidden");
    }

    updateYear();
}

function changeYearOnRange(event) {
    currentYear = year_range.value;
    updateYear();
}
// create tabs container

let tabs = document.createElement("div");
tabs.classList.add("tabs");
document.body.appendChild(tabs);

// create add tabs

let info_tab = document.createElement("div");
info_tab.classList.add("tabs__tab");
info_tab.classList.add("tabs__tab--active");
info_tab.innerText = "Info";
info_tab.addEventListener("click", changeTab);
tabs.appendChild(info_tab);

let map_tab = document.createElement("div");
map_tab.classList.add("tabs__tab");
map_tab.classList.add("tabs__tab--plot");
map_tab.innerText = "Map";
tabs.appendChild(map_tab);
map_tab.addEventListener("click", changeTab);

let pca_tab = document.createElement("div");
pca_tab.classList.add("tabs__tab");
pca_tab.classList.add("tabs__tab--plot");
pca_tab.innerText = "PCA";
pca_tab.addEventListener("click", changeTab);
tabs.appendChild(pca_tab);

// create add year menu

let year_nav = document.createElement("div");
year_nav.classList.add("tabs__years-nav");
year_nav.innerHTML = "";
tabs.appendChild(year_nav);

let year_range = document.createElement("input");
year_range.classList.add("tabs__year-range");
year_range.type = "range";
year_range.min = 0;
year_range.max = DATA_PERIODS.length - 1;
year_range.value = currentYear;
year_range.addEventListener("change", changeYearOnRange);
year_nav.appendChild(year_range);

let year_left = document.createElement("div");
year_left.classList.add("tabs__year-button-left");
year_left.classList.add("tabs__year-button--hidden");
year_left.innerHTML = "&lt;";
year_left.addEventListener("click", changeYearOnButton);
year_nav.appendChild(year_left);

let year = document.createElement("div");
year.classList.add("tabs__year");
year.innerHTML = DATA_PERIODS[currentYear];
year_nav.appendChild(year);

let year_right = document.createElement("div");
year_right
    .classList
    .add("tabs__year-button-right");
year_right.innerHTML = "&gt;";
year_right.addEventListener("click", changeYearOnButton);
year_nav.appendChild(year_right);

// add container for plots

let tabs_content = document.createElement("div");
tabs_content.classList.add("tabs__content");
tabs.appendChild(tabs_content);

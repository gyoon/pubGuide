var dataMenu = {
    menuList: [{
        name: 'line Chart',
        link: 'build/index.html',
        dep: 'guide',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3'
    }, {
        name: 'table Grid',
        link: 'build/guide/table.html',
        dep: 'guide',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, grid'
    }, {
        name: 'Dashboard',
        link: 'build/view/dashboard.html',
        dep: 'index',
        due: '2016.11.11',
        check: 'ready',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Rule',
        link: 'build/view/dashboard.html',
        dep: 'sub',
        due: '2016.11.11',
        check: 'ready',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Alert',
        link: 'build/view/dashboard.html',
        dep: 'sub',
        due: '2016.11.11',
        check: 'ready',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Search',
        link: 'build/view/dashboard.html',
        dep: 'sub',
        due: '2016.11.11',
        check: 'ready',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'member',
        link: 'view/dashboard.html',
        dep: 'sub',
        due: '2016.11.11',
        check: 'progress',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'admin',
        link: 'view/dashboard.html',
        dep: 'admin',
        due: '2016.11.11',
        check: 'done',
        comp: 'angularjs, nvD3, grid'
    }]
};




var guideComp = idBind('guideComp'), indexComp = idBind('indexComp'), subComp = idBind('subComp'), adminComp = idBind('adminComp'), guideContainer = idBind('guideContainer');
var guildeEle = [], indexEle = [], subEle = [], adminEle = [];


function idBind(id) {
    return document.getElementById(id);
}

for(var i=0;i < dataMenu.menuList.length;i++) {
    switch (dataMenu.menuList[i].dep) {
        case 'guide' : guildeEle.push(dataMenu.menuList[i]); break;
        case 'index' : indexEle.push(dataMenu.menuList[i]); break;
        case 'sub' : subEle.push(dataMenu.menuList[i]); break;
        case 'admin' : adminEle.push(dataMenu.menuList[i]); break;
        default : guildeEle.push(dataMenu.menuList[i]); break;
    }
}


guildeEle.map(function(element, index){

    guideComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

indexEle.map(function(element, index){
    indexComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

subEle.map(function(element, index){
    subComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});


adminEle.map(function(element, index){
    adminComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

function addClass(element, className) {
    element.className += " " + className;
};

window.onload = function () {
    addClass(guideContainer, 'ani')
}
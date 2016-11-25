var dataMenu = {
    menuList: [{
        name: 'line Chart',
        link: 'build/guide/lineChart/lineChart.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'done',
        comp: 'angularjs, angular-nvd3'
    }, {
        name: 'pie Chart',
        link: 'build/guide/pieChart/pieChart.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'done',
        comp: 'angularjs, angular-nvd3'
    }, {
        name: 'Datatables',
        link: 'build/guide/datatables/datatables.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-datatables'
    }, {
        name: 'inputText',
        link: 'build/guide/inputText/inputText.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, bootstrap'
    }, {
        name: 'button',
        link: 'build/guide/button/button.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, bootstrap'
    }, {
        name: 'UI Select',
        link: 'build/guide/uiSelect/uiSelect.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, ui-select'
    }, {
        name: 'Datepicker',
        link: 'build/guide/datepicker/datepicker.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-bootstrap'
    }, {
        name: 'bootstrapDaterangepicker',
        link: 'build/guide/bootstrapDaterangepicker/bootstrapDaterangepicker.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-bootstrap'
    }, {
        name: 'Timepicker',
        link: 'build/guide/timepicker/timepicker.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-bootstrap'
    }, {
        name: 'Modal',
        link: 'build/guide/modal/modal.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-bootstrap'
    }, {
        name: 'Progressbar',
        link: 'build/guide/progressbar/progressbar.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'backlog',
        comp: 'angularjs, angular-bootstrap'
    }, {
        name: 'ProgressChart',
        link: 'build/guide/progressbarchart/progressbarchart.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'done',
        comp: 'angularjs, directive'
    }, {
        name: 'Mini table',
        link: 'build/guide/minitable/minitable.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'done',
        comp: 'angularjs, directive'
    }, {
        name: 'Information Chart',
        link: 'build/guide/inforChart/inforchart.html',
        dep: 'guide',
        due: '2016.11.18',
        check: 'done',
        comp: 'angularjs, directive'
    }, {
        name: 'Dashboard',
        link: 'build/',
        dep: 'index',
        due: '2016.11.11',
        check: 'progress',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Rule',
        link: 'build/#/Rule',
        dep: 'rule',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Alert',
        link: 'build/#/Alert',
        dep: 'alert',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'Search',
        link: 'build/#/Search',
        dep: 'search',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'member',
        link: 'build/#/member',
        dep: 'member',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3, grid'
    }, {
        name: 'admin',
        link: 'build/#/admin',
        dep: 'admin',
        due: '2016.11.11',
        check: 'backlog',
        comp: 'angularjs, nvD3, grid'
    }]
};




var guideComp = idBind('guideComp'),
    indexComp = idBind('indexComp'),
    adminComp = idBind('adminComp'),
    ruleComp = idBind('ruleComp'),
    alertComp = idBind('alertComp'),
    searchComp = idBind('searchComp'),
    memberComp = idBind('memberComp'),
    guideContainer = idBind('guideContainer');
var guildeEle = [],
    indexEle = [],
    adminEle = [],
    ruleEle = [],
    alertEle = [],
    searchEle = [],
    memberEle = [];


function idBind(id) {
    return document.getElementById(id);
}

for(var i=0;i < dataMenu.menuList.length;i++) {
    switch (dataMenu.menuList[i].dep) {
        case 'guide' : guildeEle.push(dataMenu.menuList[i]); break;
        case 'index' : indexEle.push(dataMenu.menuList[i]); break;
        case 'rule' : ruleEle.push(dataMenu.menuList[i]); break;
        case 'alert' : alertEle.push(dataMenu.menuList[i]); break;
        case 'search' : searchEle.push(dataMenu.menuList[i]); break;
        case 'member' : memberEle.push(dataMenu.menuList[i]); break;
        case 'admin' : adminEle.push(dataMenu.menuList[i]); break;
        default : guildeEle.push(dataMenu.menuList[i]); break;
    }
}

memberEle.map(function(element, index){
    memberComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

searchEle.map(function(element, index){
    searchComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

alertEle.map(function(element, index){
    alertComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

ruleEle.map(function(element, index){
    ruleComp.insertAdjacentHTML('beforeend',
        '<div class="guideCard">' +
        '<div class="check"><span class="'+ element.check +'">'+ element.check +'</span></div>' +
        '<div class="name"><a href='+ element.link +' target=_blank>'+ element.name +'</a><div class="due">'+ element.due +'</div></div>' +
        '<div class="comp">'+ element.comp +'</div>' +
        '</div>');
});

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
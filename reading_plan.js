var readingPlans = {
    "1" : { "name": "Temptation (5 days)", "description": "TTT", "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]},
    "2" : { "name": "The power of being thankful (7 days)", "description": "TTTTT", "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]},
    "3" : { "name": "AAAAA (5 days)", "description": "TTT", "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]},
    "4" : { "name": "BBBBB (7 days)", "description": "TTTTT", "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]}

}

var userData;

var userData2 =
{
    "plans":
        {
            "1" : ["2-6-2015", "2-7-2015"],
            "2" : ["2-6-2015", "2-7-2015"]
        },

    "user_id": "31224567568543"
}

function dayCompleted(planId){
    var daysCompleted = userData["plans"][planId].length;
    userData["plans"][planId][daysCompleted] = formatDate(new Date());
}

function formatDate(date){
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
}


// new Date('2-25-2014');
function nextVerse(){
    var today = "2-10-2015"; // formatDate(new Date());
    for(var planId in userData["plans"]){
        var plan = userData["plans"][planId];
        if(plan.length < readingPlans[planId]["days"].length){
            var daysFinished = plan.length;
            var lastDate = plan[daysFinished - 1];
            if(lastDate != today){
                showVerse(planId, daysFinished+1);
                readingPlans[planId]["days"][daysFinished - 1];
                console.log(readingPlans[planId]["days"][daysFinished - 1]);
            }
        }
    };
}

function renderAddedPlans(){
    if (userData === undefined || userData["plans"] === undefined) {
        return;
    }

    $addedPlans = $('#added-plans');
    for(var planId in userData["plans"]){
        $addedPlans.append(readingPlans[planId].name + "<br>");
    };
}

function dayClicked(event){
    var planId = event.data.param1;
    var day = event.data.param2;
    showVerse(planId, day);
}

function showVerse(planId, day){
    $.get('http://localhost:3000/verses', { plan_id: planId, day: day }, function(data){
        $('#passages').html(data);
    });
}

function addPlan(event){
    var planId = event.data.param1;

    if (userData === undefined){
        userData = {
            "plans" : {}
        }
    }

    var plan = userData["plans"][planId];
    if(plan === undefined){
        userData["plans"][planId] = [];
    }

    chrome.storage.sync.set(userData);

    renderAddedPlans();
}

function renderAllPlans(){
    $plan = $('#plans');

    for(var planId in readingPlans){
        var readingPlan = readingPlans[planId];
        var addPlanLink = $('<a />').attr({ class: 'planName', href: '#' }).text(readingPlan.name);
        addPlanLink.click({ param1: planId }, addPlan)
        $plan.append(addPlanLink);

        $plan.append("<div class='planDescription'>" + readingPlan.description + "</div>");

        var days = readingPlan.days;
        for(var day=0; day<days.length; day++){
            var dayLink = $('<a />').attr({ class: 'planDay', href: '#' });
            dayLink.text(day);
            dayLink.click({param1: readingPlan.id, param2: day}, dayClicked);
            $plan.append(dayLink);
        }

        $plan.append('<br><br><br>')
    }
}

function renderCalender(){
    var calendarPicker1 = $("#dsel1").calendarPicker({
        monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months:1,
        callback:function(cal) {
            $("#wtf").html("Selected date: " + cal.currentDate);
        }});

    calendarPicker1.addHtml('2-6-2015', 'AABBCC');
}

$( document ).ready(function() {
    renderAllPlans();
    renderCalender();

    chrome.storage.sync.get(null, function (data) {
        userData = data;
        renderAddedPlans();
        console.info(data);
    });
});



//document.getElementById("abutton").addEventListener("click",test);

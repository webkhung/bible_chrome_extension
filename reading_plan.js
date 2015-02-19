var readingPlans = {
    "1" : {
        "name": "Temptation (5 days)",
        "description": "Temptation comes in so many forms. And it is easy to excuse our decisions and justify ourselves. This seven-day plan shows you that you can overcome temptation, through the Spirit of God. Take time to quiet your mind, let God speak into your life, and you will find strength to overcome the greatest temptations.",
        "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]},
    "2" : {
        "name": "The power of being thankful (7 days)",
        "description": "giving thanks to God daily will positively impact our lives. When we pause to acknowledge His blessings it restores us to a state of spiritual peace. In this reading plan you'll find fourteen inspiring messages that will spark an attitude of gratitude in our hearts. Through uplifting Scripture, she illustrates God's never-ending love, inexhaustible grace, and always-accessible presence in our lives.",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10","1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]},
    "3" : { "name": "AAAAA (5 days)", "description": "TTTTT", "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]},
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
//    var today = "2-10-2015"; // formatDate(new Date());
    var today = formatDate(new Date());
    for(var planId in userData["plans"]){
        var plan = userData["plans"][planId];
        if(plan.length < readingPlans[planId]["days"].length){
            var daysFinished = plan.length;
            var lastDate = plan[daysFinished - 1];
            if(lastDate != today){
                showVerse(planId, daysFinished+1);
                $('#finishButton').data('planId', planId);
                $('#finishButton').data('day', daysFinished+1);
                $('#finishButton').click(function(e){

                })
//                readingPlans[planId]["days"][daysFinished - 1];
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
        var addPlanLink = $('<a />').attr({ class: 'plan-name', href: '#' }).text(readingPlan.name);
        addPlanLink.click({ param1: planId }, addPlan)
        $plan.append(addPlanLink);

        $plan.append("<div class='plan-description'>" + readingPlan.description + "</div>");

        var days = readingPlan.days;
        for(var day=0; day<days.length; day++){
            var dayLink = $('<a />').attr({ class: 'plan-day', href: '#' });
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
        nextVerse();
        console.info(data);
    });
});



//document.getElementById("abutton").addEventListener("click",test);

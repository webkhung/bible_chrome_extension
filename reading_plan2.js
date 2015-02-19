var today = formatDate(new Date());
var objPlans = {};
var htmlRender = new HTMLRender();

var readingPlans = [
    {
        "id": "1",
        "name": "Temptation",
        "badge": "images/greenstyle_08_badge.png",
        "description": "Temptation comes in so many forms. And it is easy to excuse our decisions and justify ourselves. This seven-day plan shows you that you can overcome temptation, through the Spirit of God. Take time to quiet your mind, let God speak into your life, and you will find strength to overcome the greatest temptations.",
        "days": ["James.1:14", "Hebrews.2.18"]//, "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]
    },
    {
        "id": "2",
        "name": "The power of being thankful",
        "badge": "images/greystyle_08_badge.png",
        "description": "giving thanks to God daily will positively impact our lives. When we pause to acknowledge His blessings it restores us to a state of spiritual peace. In this reading plan you'll find fourteen inspiring messages that will spark an attitude of gratitude in our hearts. Through uplifting Scripture, she illustrates God's never-ending love, inexhaustible grace, and always-accessible presence in our lives.",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10"]//,"1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]
    },
    {
        "id": "3",
        "name": "Learning Jesue",
        "badge": "images/redstyle_08_badge.png",
        "description": "giving thanks to God daily will positively impact our lives. When we pause to acknowledge His blessings it restores us to a state of spiritual peace. In this reading plan you'll find fourteen inspiring messages that will spark an attitude of gratitude in our hearts. Through uplifting Scripture, she illustrates God's never-ending love, inexhaustible grace, and always-accessible presence in our lives.",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10"]//,"1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]
    },
    {
        "id": "4",
        "name": "Love Your Neighbors",
        "badge": "images/whitestyle_08_badge.png",
        "description": "giving thanks to God daily will positively impact our lives. When we pause to acknowledge His blessings it restores us to a state of spiritual peace. In this reading plan you'll find fourteen inspiring messages that will spark an attitude of gratitude in our hearts. Through uplifting Scripture, she illustrates God's never-ending love, inexhaustible grace, and always-accessible presence in our lives.",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10"]//,"1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]
    }
]

//var userData2 =
//{
//    "plans":
//    {
//        "1" : ["2-6-2015", "2-7-2015"],
//        "2" : ["2-6-2015", "2-7-2015"]
//    },
//
//    "user_id": "31224567568543"
//}

function Plan(json){
    this.json = json;
    this.id = json["id"];
    this.name = json["name"];
    this.description = json["description"];
    this.days = json["days"];
    this.badge = json["badge"];
    this.added = false;
    this.completedOn = [];
    this.numOfDays = this.days.length;
    this.daysFinished = function() { return this.completedOn.length; }
    this.lastCompletedDate = function() { return this.completedOn[this.completedOn.length - 1]; }
    this.dayCompleted = function(){
        this.completedOn[this.completedOn.length] = today; // formatDate(new Date());
    }
    this.nextVerse = function(){
        if(this.allDone()){
            return "It is finished!";
        }
        else {
            return this.days[this.daysFinished()];
        }
    }
    this.allDone = function(){
        return this.daysFinished() == this.numOfDays;
    }
}

function saveData(){
    var userData = { "plans" : {} }
    for(var planId in objPlans){
        var plan = objPlans[planId];
        if(plan.added){
            userData["plans"][plan.id.toString()] = plan.completedOn;
        }
    }
    chrome.storage.sync.set(userData);
}

function formatDate(date){
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
}

function HTMLRender(){

    this.renderNextVerse = function(){
//        $('.plan-current').removeClass('plan-current');
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.allDone()){
                if(plan.lastCompletedDate() != today) { // Current
                    fetchVerses(planId, plan.daysFinished()+1);
                    $('#current-verses').html(plan.nextVerse());
                    $('#finish-button').data('planId', planId);
                    return;
                }
                else {
                    $('#added-plan-' + plan.id).addClass('plan-done-today');
                    $('#added-plan-' + plan.id + ' .today-done-icon').show();
                }
            }
        }

        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added){
                $('#passages').text("Nice Job! You have finished all the verses for today!");
                return
            }
        }

        $('#passages').text("Please select a plan");
    }

    this.renderAddedPlans = function(){
        $plan = $('#added-plans');
        $plan.empty();
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.allDone()){
                $container = $("<div class='plan-container'>")
                $container.attr('id', 'added-plan-' + plan.id);
                $container.append("<div class='plan-badge'><img src='" + plan.badge+ "'><img class='today-done-icon overlay-icon' src='images/check.png'></div>");
                $rightCol = $("<div class='plan-right'>");

                $addedPlan = $('<div>');
                $addedPlan.text(plan.name);
                $addedPlan.attr('class', 'added-plan');
                $rightCol.append($addedPlan);

                $jqmeter = $("<div id='jmeter" + plan.id + "'>");
                $jqmeter.jQMeter({
                    goal : plan.days.length.toString(),
                    raised : plan.completedOn.length.toString(),
                    width : '220px',
                    height : '16px',
                    bgColor : '#aaaaaa',
                    barColor : '#44c767'
                });
                $rightCol.append($jqmeter);

                $container.append($rightCol);
                $plan.append($container);
            }
        }
    }

    this.renderAllPlans = function(){
        $plan = $('#plans-container');
        $plan.empty();

        for(var planId in objPlans){
            var plan = objPlans[planId];

            $container = $("<div class='plan-container'>")
            $container.append("<div class='plan-badge'><img src='" + plan.badge+ "'><img src='images/check.png' class='overlay-icon'></div>");
            $rightCol = $("<div class='plan-right'>");
            $rightCol.append("<div class='plan-name'>" + plan.name + "</div>");
            $rightCol.append("<div class='plan-description'>" + plan.description + "</div>");

            $meta = $("<div class='plan-meta'>");
            $meta.append(plan.days.length + " days - ");
            if(plan.added){
                $meta.append(' Added');
            }
            else {
                var addPlanLink = $('<a />').attr({ class: '', href: '#' }).text('Add');
                addPlanLink.click({ param1: planId }, addPlan)
                $meta.append(addPlanLink);
            }
            $rightCol.append($meta);
            $container.append($rightCol);
            $plan.append($container);
        }
        $plan.append("<div style='text-align: center'><a id='plans-close' class='myButton' href='#'>Close</a></div>");
    }

    this.renderCalender = function(){
        var calendarPicker1 = $("#dsel1").calendarPicker({
            monthNames:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            months:1,
            callback:function(cal) {
                $("#wtf").html("Selected date: " + cal.currentDate);
            }});

        calendarPicker1.addHtml('2-6-2015', 'AABBCC');
    }
}

function fetchVerses(planId, day){
    // nameless-taiga-4427.herokuapp.com
    $.get('http://localhost:3000/verses', { plan_id: planId, day: day }, function(data){
        var $passage = $('#passages');
        $passage
            .empty()
            .append("<div id='passage-plan-name'>" + objPlans[planId].name + '</div>')
            .append(data);
        $('#finish-button').show();
    });
    $('#passages').html('Loading');
}

function addPlan(event){
    var planId = event.data.param1;
    objPlans[planId].added = true;

    htmlRender.renderAddedPlans();
    htmlRender.renderNextVerse();
    saveData();
}


$( document ).ready(function() {
    readingPlans.forEach(function(jsonPlan){
        var objPlan = new Plan(jsonPlan);
        objPlans[objPlan.id] = objPlan;
    });

//    htmlRender.renderCalender();

    chrome.storage.sync.get(null, function (userData) {
        console.log(userData);

        if (userData === undefined){
            return;
        }

        for(var planId in userData["plans"]){
            objPlans[planId].added = true;
            objPlans[planId].completedOn = userData["plans"][planId];
        };

        htmlRender.renderAddedPlans();
        htmlRender.renderNextVerse();

        $('#finish-button').click(function(){
            $(this).hide();
            var plan = objPlans[$(this).data('planId')]
            plan.dayCompleted();
            htmlRender.renderAddedPlans(); // TODO: show only update the current plan instead of updating all the bars
//            $('#added-plan-' + plan.id + ' .today-done-icon').show();
            saveData();

            htmlRender.renderNextVerse();
        });
    });

    $('#clean-storage').click(function(){
        chrome.storage.sync.clear();
    });

    $('#show-storage').click(function(){
        chrome.storage.sync.get(null, function(data){
            console.log(data);
        })
    });

    $('#plans-show').click(function(){
        htmlRender.renderAllPlans();
        $('#plans-container').show();
    });

    $('#help-need').click(function(){
        $('#helps-container').show();
    });

    $('#plans-container').on('click', '#plans-close', function(){
        $('#plans-container').hide();
    });

    $('#helps-container').on('click', '#helps-close', function(){
        $('#helps-container').hide();
    });

    $('#add-day').click(function(){
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
        today = formatDate(tomorrow);
        htmlRender.renderAddedPlans();
        htmlRender.renderNextVerse();
    });

    $('#plans-show, #help-need').hover(
        function(){
            $(this).find('span').show();
        },
        function(){
            $(this).find('span').hide();
        }
    )

    $('#jqmeter-horizontal').jQMeter({goal:'$10,000',raised:'$6,600',width:'300px'});
    $('#jqmeter-horizontal2').jQMeter({goal:'$10,000',raised:'$3000',width:'270px',height:'20px',bgColor:'#dadada',barColor:'#f09246',animationSpeed:1000,displayTotal:false});
    $('#jqmeter-horizontal3').jQMeter({goal:'$10,000',raised:'$8000',width:'160px',height:'40px',bgColor:'#bfb345',barColor:'#f3e45b',animationSpeed:600});
    $('#jqmeter-vertical').jQMeter({goal:'10,000',raised:'9,000',orientation:'vertical',width:'50px',height:'200px',barColor:'#d9235c'});
    $('#jqmeter-vertical2').jQMeter({goal:'10,000',raised:'4,000',orientation:'vertical',width:'30px',height:'150px',barColor:'#93d5c7',bgColor:'#e1e1e1',displayTotal:false,animationSpeed:400});

});

//document.getElementById("abutton").addEventListener("click",test);

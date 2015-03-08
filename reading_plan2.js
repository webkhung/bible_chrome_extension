var today = formatDate(new Date());
var objPlans = {};
var htmlRender = new HTMLRender();
//http://www.biblestudytools.com/topical-verses/
var readingPlans = [
    {
        "id": "1",
        "name": "7 Days on Temptation",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["James.1:14", "Hebrews.2.18"]//, "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]
    },
    {
        "id": "2",
        "name": "14 Days on The Power Of Being Thankful",
        "badge": "images/greystyle_08_badge.png",
        "description": "",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10"]//,"1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]
    },
    {
        "id": "3",
        "name": "14 Days on Love Part 1",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["Luke.6:31","Luke.6:35","John.8:13","Romans.12:9","Mark.12:31","Romans.13:10","1Corinthians.13:4-8","1Corinthians.13:13","Ephesians.4:2","1Peter.4:8","1John.4:7","1John.4:18-19","John.15:13","Ephesians.5:25"]
    },
    {
        "id": "4",
        "name": "14 Days on Love Part 2",
        "badge": "",
        "description": "",
        "days": ["Ephesians.5:33","Colossians.3:14","Proverbs.10:12","Proverbs.17:17","1John.3:16-18","1John.4:8","John.3:16","Psalm.18:1","Matthew.22:27-29","Deuteronomy.10:12-19","Song of Solomon.8:4-8","Matthew.6:24","Matthew.22:37-39","Matthew.23:6-8"]
    },
    {
        "id": "5",
        "name": "12 Days on Worry",
        "badge": "",
        "description": "",
        "days": ["Proverbs.3:5-6", "Philippians.4:6-7", "Matthew.11:28-30", "John.14:27", "Jeremiah.17:5-8", "Colossians.3:15", "2Thessalonians.3:16", "Psalm.55:22", "Proverbs.12:25", "1Peter.5:6-8", "Psalm.23:4", "Hebrews.13:5-6"]
    },

    {
        "id": "6",
        "name": "16 Days on Forgiveness",
        "badge": "",
        "description": "",
        "days": ["Matthew.6:14-15","1John.1:9","Isaiah.43:25-26","Acts.3:19","Isaiah.1:18","2.Corinthians.5:17","Ephesians.1:7","Hebrews.10:17","Daniel.9:9","Colossians.1:13-14","Psalm.103:12","Numbers.14:19-21","Micah.7:18-19","Matthew.6:9-15","Mark.11:25","Matthew.26:28"]
    },

    {
        "id": "7",
        "name": "17 Days on Encouragement",
        "badge": "",
        "description": "",
        "days": ["Proverbs.18:10","Proverbs.3:5-6","Isaiah.41:10","John.14:27","John.16:33","Psalm.46:1-3","2Timothy.1:7","Psalm.16:8","Psalm.55:22","1Peter.5:7","Isaiah.26:3","Psalm.118:14-16","Psalm.119:114-115","Psalm.119:25","Psalm.119:50","Psalm.119:71","Psalm.120:1"]
    },

    {
        "id": "8",
        "name": "17 Days on Anger",
        "badge": "",
        "description": "",
        "days": ["James.1:19-20","Proverbs.29:11","James.1:20","Proverbs.19:11","Ecclesiastes.7:9","Proverbs.15:1","Proverbs.15:18","Colossians.3:8","James.4:1-2","Proverbs.16:32","Proverbs.22:24","Matthew.5:22","Psalm.37:8-9","Psalm.7:11","2 Kings.11:9-10","2 Kings.17:18","Proverbs.14:29"]
    },
    {
        "id": "9",
        "name": "12 Days on Success",
        "badge": "",
        "description": "",
        "days": ["Philippians.4:13","Psalm.37:4","Psalm.1:1-3","Proverbs.16:3","1.Kings 2:3","Matthew.16:26-27","Luke.16:10-11","Romans.12:2","Isaiah.41:10","Philippians.4:6","Deuteronomy.8:18","Jeremiah.17:7"]
    },
    {
        "id": "10",
        "name": "12 Days on Your Body",
        "badge": "",
        "description": "",
        "days": ["1Corinthians.6:19-20", "1Corinthians.3:16-17","Romans.12:1-2","1Corinthians.10:31","1Timothy.4:8","1Timothy.5:23","Matthew.6:22-23","1Corinthians.15:44","Philippians.1:20","1Corinthians.12:27","Psalm.100:3","Romans.12:4"]
    },
    {
        "id": "11",
        "name": "28 Days on Money",
        "badge": "",
        "description": "",
        "days": ["Matthew.6:21","Malachi.3:10","Ecclesiastes.5:10","Romans.13:8","Psalm.37:16-17","Proverbs.13:11","Hebrews.13:5","Matthew.19:21","Proverbs.17:16","Matthew.6:24","Luke.3:14","Exodus.22:25","1Timothy.6:10","Deuteronomy.23:19","Matthew.21:12-13","1Timothy.6:17-19","Luke.12:33","Deuteronomy.15:7","Matthew.6:1-4","Mark.12:41-44","Proverbs.10:4","Revelation.3:17","Luke.16:13","Matthew.13:22","2Chronicles.1:11-12","1Peter.5:2-3","1Samuel.2:7","Proverbs.3:9"]
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

// $('#passages .p').contents().eq(1)

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
    this.numDaysFinished = function() { return this.completedOn.length; }
    this.lastCompletedDate = function() { return this.completedOn[this.completedOn.length - 1]; }
    this.dayCompleted = function(){
        this.completedOn[this.completedOn.length] = today; // formatDate(new Date());
    }
    this.nextVerse = function(){
        if(this.completed()){
            return "It is finished!";
        }
        else {
            return this.days[this.numDaysFinished()];
        }
    }
    this.todayVerse = function(){
        if(this.lastCompletedDate() == today) {
            return this.days[this.numDaysFinished() - 1];
        }
        else {
            return '';
        }
    }
    this.completed = function(){
        return this.added && this.numDaysFinished() == this.numOfDays;
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

function randomAddedPlan(){
    var allPlanIds = [];
    for(var planId in objPlans){
        if(objPlans[planId].added && objPlans[planId].lastCompletedDate() == today) {
            allPlanIds[allPlanIds.length] = planId;
        }
    }

    var randomPlanId = allPlanIds[(Math.floor(Math.random() * allPlanIds.length) + 1) - 1];
    return objPlans[randomPlanId];
}

function HTMLRender(){

    this.renderNextVerse = function(lastPlanId){

        // Update UI of last finished plan
        if (lastPlanId) {
            var lastPlan = objPlans[lastPlanId];
            $('#added-plan-' + lastPlanId).addClass('plan-done-today');
            $('#added-plan-' + lastPlanId + ' .circle').removeClass('circle' + lastPlan.id).addClass('circle-solid-' + lastPlan.id);
            $("#jmeter" + lastPlanId).jQMeter({
                goal : lastPlan.days.length.toString(),
                raised : lastPlan.completedOn.length.toString(),
                width : '220px',
                height : '16px',
                bgColor : '#bbb',
                barColor : '#666',
                displayTotal: false
            });
        }

        // Fetch the verse of the current plan
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.completed() && plan.lastCompletedDate() != today) {
                fetchVerses(planId, plan.numDaysFinished()+1);
                $('#finish-button').data('planId', planId);
                $('#message').hide();
                return;
            }
        }

        // At this point, there is no more today's verse.
        var bFinishedToday = false;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added){
                bFinishedToday = true;
            }
        }

        if(bFinishedToday){
            $('#message').addClass('large').html("Memorize verses fix God's words in your heart and mind.").show();
            var plan = randomAddedPlan();
            fetchVerses(plan.id, plan.numDaysFinished(), true);
            return;
        }

        // To fix God's words in your heart and mind, it means to be continually conscious of the Bible’s teachings as you go through your daily routine.
        // one practical way to make sure that God’s words are always close at hand is to memorize verses and passages from the Bible.

        htmlRender.renderAllPlans();
    }

    this.renderAddedPlans = function(){
        $plan = $('#added-plans');
        $plan.empty();
        var numAddedPlans = 0;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added){
                numAddedPlans++;
            }
            if(plan.added && !plan.completed()){
                $container = $("<div class='plan-container'>")
                $container.attr('id', 'added-plan-' + plan.id);

                if(plan.lastCompletedDate() != today) {
                    $container.append("<div class='plan-badge'><span class='circle circle" + planId + "'></span></div>");
                }
                else {
                    $container.append("<div class='plan-badge'><span class='circle circle-solid-" + planId + "'></span></div>");
                    $container.addClass('plan-done-today');
                }

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
                    bgColor : '#bbb',
                    barColor : '#666',
                    displayTotal: false
                });
                $rightCol.append($jqmeter);

                $container.append($rightCol);
                $plan.append($container);
            }
        }

        var addedMoreHtml = '';
        if(numAddedPlans < 3){
            addedMoreHtml = '<span>Add ' + (3 - numAddedPlans) + ' More Plans</span>';
        }

        $container = $("<div class='plan-container'>");
        $addPlans = $("<a id='add-new-plan' href='#'><img src='images/add.png' style='vertical-align:middle'>" + addedMoreHtml +"</a>");
        $container.append($addPlans);
        $plan.append($container);
    }

    this.renderAllPlans = function(){
        $plan = $('#plans-container');
        $plan.empty();
        $plan.append('<h1>Bible Reading Plans - Make God\'s Word part of your day!</h1>');

        for(var planId in objPlans){
            var plan = objPlans[planId];
            $container = $("<div class='plan-container'>")


//            if(plan.added && plan.completed){
//                $container.append("<div class='plan-badge'><div class='circle circle-solid-" + planId + "'><div class='circle-inner'>Done!</div></div></div>");
//                $container.addClass('plan-done-today');
//            }
//            else {
//                if(plan.lastCompletedDate() != today) {
//                    $container.append("<div class='plan-badge'><div class='circle circle" + planId + "'></div></div>");
//                }
//                else {
//                    $container.append("<div class='plan-badge'><div class='circle circle-solid-" + planId + "'></div></div>");
//                    $container.addClass('plan-done-today');
//                }
//            }

            $rightCol = $("<div class='plan-right'>");
            $rightCol.append("<span class='plan-name'>" + plan.name + "</span>");
//            $rightCol.append("<div class='plan-description'>" + plan.description + "</div>");

            $meta = $("<span class='plan-meta'>");
            if(plan.added){
                if(plan.completed()){
                    $meta.append(" Completed <img src='images/trophy.png'>");
                }
                else {
                    $meta.append(' Added');
                }
            }
            else {
                var addPlanLink = $('<a />').attr({ class: 'myButtonSmallLink', href: '#' }).text('Add');
                addPlanLink.click({ param1: planId }, addPlan)
                $meta.append(addPlanLink);
            }

            $rightCol.append($meta);
            $container.append($rightCol);
            $plan.append($container);
        }
        $plan.append("<div style='text-align: center'><a id='plans-close' class='myButton' href='#'>Close</a></div>");
        $plan.show();
    }
}


function replaceVerses2(data){
    $p = $(data);
    $p.text();
    var verse = $p.text()
        ,txttmp = verse.split(/\s+/)
        ,rand = Math.floor(Math.random()*txttmp.length);
    txttmp[rand] = ' <span class="text-hidden">' + txttmp[rand] + '</span> '
    return txttmp.join(' ');
}

function replaceVerses(data){
    $p = $(data);
    var final = '';
    $p.contents().each(function(){
        if(this.nodeType == 3 && $(this).parent().prop('className') != 'scripture') {
            var verse = $(this).text()
                ,txttmp = verse.split(/\s+/)
                ,rand = Math.floor(Math.random()*txttmp.length);

            txttmp[rand] = ' <span class=text-hidden>' + txttmp[rand] + '</span> '

            final += txttmp.join(' ');
        }
        else {
            if ($(this).parent().prop('className') == 'scripture'){
                final +=$(this).parent().prop('outerHTML');
            }
            else if($(this).prop('className') == 'v'){
                final +=$(this).prop('outerHTML');
            }
            else {

                var verse = $(this).text()
                    ,txttmp = verse.split(/\s+/)
                    ,rand = Math.floor(Math.random()*txttmp.length);

                txttmp[rand] = ' <span class=text-hidden>' + txttmp[rand] + '</span> '

                final += txttmp.join(' ');
            }
        }
    });
    return final;
}

function fetchVerses(planId, day, hideWords){
    // nameless-taiga-4427.herokuapp.com
    $.get('http://localhost:3001/verses', { plan_id: planId, day: day }, function(data){
        var $passage = $('#passages');
        $passage.removeClass('large');
        $passage.empty();

        var verses;
        if(hideWords) {
            verses  = replaceVerses(data);
            $('#finish-button').hide();
            $('#reveal-button').show();
        }
        else {
            verses = data
            $('#finish-button').show();
            $('#reveal-button').hide();
        }
        $passage
            .empty()
            .append("<div id='passage-plan-name'>" + objPlans[planId].name + '</div>')
            .append(verses);
    });
    $('#passages').html('Loading');
}

function addPlan(event){
    var planId = event.data.param1;
    objPlans[planId].added = true;
    htmlRender.renderAddedPlans();
    htmlRender.renderNextVerse();
    $('#plans-container').hide();
    $('#passages-container').show();
    saveData();
}

function rollBg() {
    $('.bg.hidden').css('background', newGradient());
    $('.bg').toggleClass('hidden');
}

function newGradient() {
    var c1 = {
        r: Math.floor(Math.random()*255),
        g: Math.floor(Math.random()*255),
        b: Math.floor(Math.random()*255)
    };
    var c2 = {
        r: Math.floor(Math.random()*255),
        g: Math.floor(Math.random()*255),
        b: Math.floor(Math.random()*255)
    };
    c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
    c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
    return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
}

$( document ).ready(function() {
    var bgImage = "bg" + (Math.floor(Math.random() * 15) + 1) + ".jpg";
    $('body').css('background-image', "url('images/" + bgImage + "')");

    readingPlans.forEach(function(jsonPlan){
        var objPlan = new Plan(jsonPlan);
        objPlans[objPlan.id] = objPlan;
    });

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
            var lastPlanId = $(this).data('planId');
            var plan = objPlans[lastPlanId];
            plan.dayCompleted();
            saveData();

            htmlRender.renderNextVerse(lastPlanId);
        });
    });

    $('#reveal-button').click(function(){
        $('.text-hidden').removeClass('text-hidden');
    });

    $('#clean-storage').click(function(){
        chrome.storage.sync.clear();
    });

    $('#show-storage').click(function(){
        chrome.storage.sync.get(null, function(data){
            console.log(data);
        })
    });

    $('.maincontainer').on('click', '#add-new-plan', function(){
        htmlRender.renderAllPlans();
        $('#passages-container').hide();
    });

    $('#plans-container').on('click', '#plans-close', function(){
        $('#plans-container').hide();
        $('#passages-container').show();
    });

    $('#add-day').click(function(){
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
        today = formatDate(tomorrow);
        htmlRender.renderAddedPlans();
        htmlRender.renderNextVerse();
    });

    $('#add-new-plan').hover(
        function(){
            $(this).find('span').show();
        },
        function(){
            $(this).find('span').hide();
        }
    )

    $('#helps-container a').click(function(){
        fetchVerses($(this).attr('id'), 1);
    });

    rollBg();
    setTimeout(rollBg, 0.5);
});




//$('#jqmeter-horizontal').jQMeter({goal:'$10,000',raised:'$6,600',width:'300px'});
//$('#jqmeter-horizontal2').jQMeter({goal:'$10,000',raised:'$3000',width:'270px',height:'20px',bgColor:'#dadada',barColor:'#f09246',animationSpeed:1000,displayTotal:false});
//$('#jqmeter-horizontal3').jQMeter({goal:'$10,000',raised:'$8000',width:'160px',height:'40px',bgColor:'#bfb345',barColor:'#f3e45b',animationSpeed:600});
//$('#jqmeter-vertical').jQMeter({goal:'10,000',raised:'9,000',orientation:'vertical',width:'50px',height:'200px',barColor:'#d9235c'});
//$('#jqmeter-vertical2').jQMeter({goal:'10,000',raised:'4,000',orientation:'vertical',width:'30px',height:'150px',barColor:'#93d5c7',bgColor:'#e1e1e1',displayTotal:false,animationSpeed:400});
//document.getElementById("abutton").addEventListener("click",test);


//{
//    "id": "5",
//    "name": "12 Days on Worry",
//    "badge": "",
//    "description": "",
//    "days": ["Deuteronomy.28:58-68","Psalm.94:1-23","Jeremiah.17:5-8","Ezekiel.12:1-20","Matthew.6:25-34","Mark.4:35-41","Luke.8:11-15","Luke.10:38-42","John.14:1-14","Philippians.4:4-9"]
//},
//{
//    "id": "6",
//    "name": "10 Days on Freedom",
//    "badge": "",
//    "description": "",
//    "days": ["Exodus.12:31-42","Leviticus.25:38-55,Deuteronomy.15:12-18","Isaiah.58:1-12","Jeremiah.34:8-22","John.8:31-38","Romans.6:15-23","1Corinthians.7:17-24","1Corinthians.9:1-23","1Peter.2:11-17","Galatians.5:1-15"]
//},
//{
//    "id": "7",
//    "name": "10 Days on Wisdom",
//    "badge": "",
//    "description": "",
//    "days": ["1Kings.3:3-15","1Kings.3:16-28","Proverbs.8:1-21","Proverbs.8:22-36","Proverbs.9:1-18","Ecclesiastes.1:12-18,Ecclesiastes.2:12-17","Matthew.12:38-42","1Corinthians.1:18-31","1Corinthians.2:1-13","James.1:5-8,James.3:13-18"]
//},
//{
//    "id": "8",
//    "name": "10 Days on Friendship",
//    "badge": "",
//    "description": "",
//    "days": ["Exodus.33:7-11,2Chronicles.20:7","Ruth.1:6-22","1Samuel.18:1-4,.1Samuel.19:1-7,1Samuel.20:1-42","2Samuel.15:32-37,.2Samuel.16:15-19,2Samuel.17:1-16","Job.2:11-13,Job.19:13-22","Psalm.55","Proverbs.13:20,Proverbs.14:20,Proverbs.16:28","Mark.2:1-12","John.11:1-44","John.15:1-17"]
//}
//,
//{
//    "id": "9",
//    "name": "30 Days with Jesus",
//    "badge": "",
//    "description": "",
//    "days": ["Isaiah.52:13-53:12","Matthew.1:18-25,Luke.2:1-21","Luke.3:1-22,Luke.4:1-13","John.2:1-11,John.3:1-21","John.4:1-42","Luke.4:14-44","Matthew.9:9-13,Luke 5:1-11,John.1:35-51","Luke.6:17-49","Luke.11:1-13,Luke.18:1-14","Matthew.13:1-52","Luke.11:14-53","Mark.4:35-5:20","Mark.5:21-43","Matthew.9:35-10:42","Matthew.14:13-36","Luke.15:1-32","Mark.8:1-30","Mark.9:1-29","Luke.10:25-42","John.7:1-52","John.9:1-41","John.11:1-44","Matthew.19:13-30","Matthew.21:1-27","Luke.21:5-38","Matthew.26:17-56","Mark.14:53-15:15","Matthew.27:32-66","Luke.24:1-35,John.20:1-31","Matthew.28:16-20,Luke.24:50-53,Acts.1:3-11"]
//}
//,
//{
//    "id": "10",
//    "name": "Luke 1 Month",
//    "badge": "",
//    "description": "",
//    "days": ["Luke 1:1-38","Luke 1:39-80","Luke 2","Luke 3","Luke 4","Luke 5","Luke 6","Luke 7","Luke 8:1-25","Luke 8:26-56","Luke 9:1-36","Luke 9:37-62","Luke 10","Luke 11","Luke 12:1-34","Luke 12:35-59","Luke 13","Luke 14","Luke 15","Luke 16","Luke 17","Luke 18","Luke 19","Luke 20","Luke 21","Luke 22:1-38","Luke 22:39-71","Luke 23:1-25","Luke 23:26-56","Luke 24"]
//}

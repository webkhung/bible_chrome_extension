var today = formatDate(new Date());
var objPlans = {};
var userId = '';
var htmlRender = new HTMLRender();
var DAILY_MEMORIZED_GOAL = 10;
var memorizedCount = 0;
var HOST = 'biblereadingplans.herokuapp.com';
//var HOST = 'localhost:3001';
var questions = [
    'How Does This Passage Apply To Your Life Today?',
    'What Does This Passage Mean To You?'
]

var quotes = [
    'Like This App? <a href=\'https://chrome.google.com/webstore/detail/bible-reading-plans/jogajkcgclkfedbhdcopmpmeeophkkji?authuser=1\' target=\'_blank\'>Rate It On Chrome Store</a>',
    'I Appreciate Your Feedback! Leave a Feedback on Chrome Store',
    'How Does This Passage Apply To Your life Today?',
    'What Does This Passage Mean To You?',
    'Read it out loud help you memorize the verses',
    'Memorize verses fix God\'s words in your heart and mind',
    'Hello, Nice To See You Again!',
    'You Are Doing A Good Job!',
    'You Are Doing A Nice Work!',
    'Great Effort!',
    'Add More Bible Reading Plans',
    'Keep Up The Good Work!',
    'Smile . It Looks Good On You',
    'Say Hi to a stranger. It will brighten both your day and theirs',
    'Be mindful of your posture. You\'ll look and feel more confident!']

//http://www.biblestudytools.com/topical-verses/
var readingPlans = [
    {
        "id": "1",
        "name": "14 Days on Being Thankful",
        "badge": "images/greystyle_08_badge.png",
        "description": "",
        "days": ["1Chronicles.23:30","John.14:27","2 Corinthians.12:10","1 Timothy.6:12","Luke.4:32","Philippians.2:14","Romans.5:5","Isaiah.43:19","Titus.2:12","2Corinthians.5:21","2Corinthians.10:5","Matthew.6:26","1Samuel.17:45","Isaiah.61:3"]
    },
    {
        "id": "2",
        "name": "14 Days on Love Part 1",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["Luke.6:31","Luke.6:35","John.8:13","Romans.12:9","Mark.12:31","Romans.13:10","1Corinthians.13:4-8","1Corinthians.13:13","Ephesians.4:2","1Peter.4:8","1John.4:7","1John.4:18-19","John.15:13","Ephesians.5:25"]
    },
    {
        "id": "3",
        "name": "14 Days on Love Part 2",
        "badge": "",
        "description": "",
        "days": ["Ephesians.5:33","Colossians.3:14","Proverbs.10:12","Proverbs.17:17","1John.3:16-18","1John.4:8","John.3:16","Psalm.18:1","Matthew.22:27-29","Deuteronomy.10:12-19","Song of Solomon.8:4-8","Matthew.6:24","Matthew.22:37-39","Matthew.23:6-8"]
    },
    {
        "id": "4",
        "name": "7 Days on Temptation",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]
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
    userData['userId'] =  userId;
    chrome.storage.sync.set(userData);
}

function drawPlansCircle(){
    numPlansAdded()
    $('#plans-circle').circleProgress({
        value: Math.min(1,numPlansAdded() / 7),
        size: 70,
        thickness: 7,
        fill: { gradient: ['#FFCC03', '#FFF702'], gradientAngle: Math.PI / 4 }
    }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').text(numPlansAdded());
        });
}

function drawMemorizedCircle(increment){
    var dailyGoal = numUnfinishedPlans() * DAILY_MEMORIZED_GOAL;
    var key = 'memorized' + today;
    chrome.storage.sync.get(key, function (data) {
        if (data !== undefined && data[key] !== undefined){
            memorizedCount = parseInt(data[key]);
        }
        if(increment ==  true) {
            memorizedCount = memorizedCount + 1;
        }
        var data = {};
        data[key] = memorizedCount;
        chrome.storage.sync.set(data);

        $('#memorized-circle').circleProgress({
            value: Math.min(1,memorizedCount / DAILY_MEMORIZED_GOAL),
            size: 70,
            thickness: 7,
            fill: { gradient: ['#f65bf0','#f68a16'], gradientAngle: Math.PI / 4 }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
                // $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
                $(this).find('strong').text(memorizedCount);
            });
    });
}

function drawVersesCircle(increment){
    chrome.storage.sync.get("verses", function (data) {
        var count = 0;
        if (data !== undefined && data['verses'] !== undefined){
            count = parseInt(data['verses']);
        }

        if(increment !==  undefined) {
            count = count + increment;
        }
        var data = { "verses" : count }
        chrome.storage.sync.set(data);

        $('#verses-circle').circleProgress({
            value: Math.min(1,count / 50),
            size: 70,
            thickness: 7,
            fill: { gradient: ['#88eeff','#59ff5b'], gradientAngle: Math.PI / 4 }
        }).on('circle-animation-progress', function(event, progress, stepValue) {
                $(this).find('strong').text(count);
            });
    });
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

function hasFinishedToday(){

    var bFinishedToday = false;
    for(var planId in objPlans){
        var plan = objPlans[planId];
        if(plan.added){
            bFinishedToday = true;
        }
    }
    return bFinishedToday;
}

function HTMLRender(){

    this.updatePlanProgressMeter = function(lastPlanId){
        // Update UI of last finished plan
        if (lastPlanId) {
            var lastPlan = objPlans[lastPlanId];
            $('#added-plan-' + lastPlanId).addClass('plan-done-today');
            $('#added-plan-' + lastPlanId + ' .circle').removeClass('circle' + lastPlan.id).addClass('circle-solid-' + lastPlan.id).append("<span class='tick'>&#10004;</span>");
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
    }

    this.showNextVerse = function(fromNextPlay){
        // Fetch the verse of the current plan
        var bHasNextVerse = false;
        var bHasMoreVerseAfterNext = false;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.completed() && plan.lastCompletedDate() != today) {
                if(!bHasNextVerse) {
                    var day = plan.numDaysFinished()+1;
                    bHasNextVerse = true;
                    fetchVerses(planId, day);
                    $('#finish-button').data('planId', planId).data('day', day);
                }
                else {
                    bHasMoreVerseAfterNext = true;
                }
            }
        }

        if(bHasMoreVerseAfterNext){
            $('#finish-button').text('Show Next Verse');
            return;
        }
        else if(bHasNextVerse) {
            $('#finish-button').text('Done! Try a Memorization Game');
            return;
        }

        // There is today's verse and they are done, so randomly fetch a verse to play the game.
        if(hasFinishedToday()){
            var plan = randomAddedPlan();
            fetchVerses(plan.id, plan.numDaysFinished(), true);
            return;
        }

        // To fix God's words in your heart and mind, it means to be continually conscious of the Bible’s teachings as you go through your daily routine.
        // one practical way to make sure that God’s words are always close at hand is to memorize verses and passages from the Bible.

        htmlRender.showPlansSelector();
    }

    this.showAddedPlans = function(){
        $plan = $('#added-plans');
        $plan.empty();
        var numAddedPlans = 0;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added){
                numAddedPlans++;
            }
            if(plan.added){ //  && !plan.completed()
                $container = $("<div class='plan-container'>")
                $container.attr('id', 'added-plan-' + plan.id);

                if(plan.completed()) {
                    $container.append("<div class='plan-badge'><span class='circle circle-solid-" + planId + "'><img src='images/trophy.png'></span></div>");
                    $container.addClass('plan-done-today');
                }
                else if(plan.lastCompletedDate() != today) {
                    $container.append("<div class='plan-badge'><span class='circle circle" + planId + "'></span></div>");
                }
                else {
                    $container.append("<div class='plan-badge'><span class='circle circle-solid-" + planId + "'><span class='tick'>&#10004;</span></span></div>");
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

        $container = $("<div class='plan-container'>");
        $addPlans = $("<a id='add-new-plan' href='#'><img src='images/add.png' style='vertical-align:middle'>Add More Plans</a>");
        $container.append($addPlans);
        $plan.append($container);
    }

    this.showPlansSelector = function(){
        $('#passages-container').hide();

        $planSelector = $('#plans-selector');
        $planSelector.empty();
        $planSelector.append('<div id="plansSelectorHeader"></div>');

        var numPlansAdded = 0;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            $container = $("<div class='plan-container'>")
            $rightCol = $("<div class='plan-right'>");
            $rightCol.append("<span class='plan-name'>" + plan.name + "</span>");
            $meta = $("<span class='plan-meta'>");
            if(plan.added){
                numPlansAdded++;
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
            $planSelector.append($container);
        }
        var addPlansText = '';
        if(numPlansAdded == 0){
            addPlansText = '<h1>Make God\'s Word Part Of Your Day! Add Your 1st Plan Now!</h1><h2>(You can add additional plans later)</h2>';
        }
        else if(numPlansAdded == 1){
            addPlansText = '<h1>Add Your 2nd Plan Now!</h1>';
        }
        else if(numPlansAdded == 2){
            addPlansText = '<h1>Add Your 3rd Plan Now!</h1>';
        }
        else {
            addPlansText = '<h1>Great Job! You Can Add Even More Plans!';
        }
        $planSelector.find('#plansSelectorHeader').html(addPlansText);
        $planSelector.append("<div style='text-align: center'><a id='plans-close' class='myButton' href='#'>Close</a></div>");
        $planSelector.show();
    }
}

// max is based of '1'
function getRandom(pick, max) {
    var arr = []
    while(arr.length < pick){
        var randomnumber=Math.ceil(Math.random()*max)
        var found=false;
        for(var i=0;i<arr.length;i++){
            if(arr[i]==randomnumber){found=true;break}
        }
        if(!found)arr[arr.length]=randomnumber;
    }
    return arr;
}

function hideWords(text){
    // DAILY_MEMORIZED_GOAL is 10
    // if memorizedCount = 0,1, ratio = 5
    // if memorizedCount = 2,3, ratio = 4
    // if memorizedCount = 9,10, ratio = 1
    var ratio = Math.max(1,(DAILY_MEMORIZED_GOAL-memorizedCount)/2);
    var txttmp = text.split(/\s+/);
    var randoms = getRandom(txttmp.length, txttmp.length);
    var toPick = Math.floor(txttmp.length/ratio);
    console.log('text ' + text);
    console.log('txttmp.length' + txttmp.length);
    console.log('ratio' + ratio);
    console.log('toPick' + toPick);
    var picked = 0;
    var i=0;
    while(picked < toPick && i < randoms.length){
        var currWord = txttmp[randoms[i]-1]
        if(txttmp[randoms[i]-1].length >= 4){
            // txttmp[randoms[i]-1] = ' <span class=text-hidden>' + txttmp[randoms[i]-1] + '</span> '
            txttmp[randoms[i]-1] = ' <input class=missingWord type=text data-answer=\'' + currWord + '\' placeholder=\'' + maskWord(currWord, 7-ratio) + '\'>';
            picked++;
        }
        i++;
    }
    return txttmp.join(' ');
}

function replaceOneCharacter(word, index, character) {
    return word.substr(0, index) + character + word.substr(index+character.length);
}

function maskWord(word, every_n_chars_1_char_reveals){
    var wordLen = word.length;
    var maskedWord = Array(wordLen+1).join("*")
    var ran = getRandom(Math.floor(wordLen/every_n_chars_1_char_reveals), wordLen);
    for(var i=0; i<ran.length; i++){
        maskedWord = replaceOneCharacter(maskedWord, ran[i]-1, word.charAt(ran[i]-1))
    }
    return maskedWord;
}

function replaceVerses(data){
    $p = $(data);
    var final = '';
    $p.contents().each(function(){
        if(this.nodeType == 3 && $(this).parent().prop('className') != 'scripture') {
            final += hideWords($(this).text());
        }
        else {
            if ($(this).parent().prop('className') == 'scripture'){
                final +=$(this).parent().prop('outerHTML');
            }
            else if($(this).prop('className') == 'v'){
                final +=$(this).prop('outerHTML');
            }
            else {
                final += hideWords($(this).text());
            }
        }
    });
    return final;
}

function processVerses(data, planId, day, hideWords){
    var $passage = $('#passages');
    var verses;
    if(hideWords) {
        verses  = replaceVerses(data);
        $('#finish-button, #message').hide();
    }
    else {
        verses = data
        $('#reveal-button').hide();
        $('#reveal-button').data('planId', planId).data('day', day);
    }
    $passage
        .hide()
        .empty()
        .append("<div id='passage-plan-name'>" + objPlans[planId].name + '</div>')
        .append(verses).fadeIn('slow');

    if(hideWords) {
        var message = '';
        var memorized = parseInt($('#memorized-circle strong').text());
        if(memorized < 1){
            message = "Memorize verses fix God's words in your heart and mind";
        }
        else if(memorized < 2){
            message = "Read it out loud help you memorize the verses";
        }
        else if(numPlansAdded() == 1){
            message = 'You Can Add Another Bible Reading Plan Below';
        }
        else {
            message= quotes[getRandom(1,quotes.length)[0] -1];
        }
        $('#message').empty().append(message).fadeIn('slow');
        $('#reveal-button-container, #reveal-button').fadeIn('slow');
    }
    else {
        var message= questions[getRandom(1,questions.length)[0] -1];
        $('#message').empty().append(message).fadeIn('slow');
        $('#finish-button').show('slow');
    }
}

function fetchVerses(planId, day, hideWords){
    var key = 'planId' + planId + '-' + today;
    chrome.storage.sync.get(key, function (data) {
        if (data !== undefined && data[key] !== undefined){
            processVerses(data[key], planId, day, hideWords);
        }
        else {
            $.get('http://' + HOST + '/verses', { plan_id: planId, day: day, user_id: userId }, function(verses){
                var data = {}
                data[key] = verses;
                chrome.storage.sync.set(data);
                processVerses(verses, planId, day, hideWords);
            });
        }
    });
    $('#passages').html('Loading');
}

function addPlan(event){
    var planId = event.data.param1;
    objPlans[planId].added = true;
    htmlRender.showAddedPlans();
    htmlRender.showNextVerse();
    $('#plans-selector').hide();
    $('#passages-container').show();
    drawPlansCircle();
    saveData();
}

function rollBg() {
    var bgImage = "bg" + (Math.floor(Math.random() * 33) + 1) + ".jpg";
    $('body').css('background-image', "url('images/" + bgImage + "')");
    $('.bg.hidden').css('background', newGradient());
    $('.bg').toggleClass('hidden');
}

function newGradient() {
    var c1 = {
        r: Math.floor(Math.random()*155) + 100,
        g: Math.floor(Math.random()*155) + 100,
        b: Math.floor(Math.random()*155) + 100
    };
    var c2 = {
        r: Math.floor(Math.random()*255) + 0,
        g: Math.floor(Math.random()*255) + 0,
        b: Math.floor(Math.random()*255) + 0
    };
    c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
    c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
    return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
}

function newGradient2() {
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

function numPlansAdded(){
    var numPlansAdded = 0;
    for(var planId in objPlans){
        var plan = objPlans[planId];
        if(plan.added){
            numPlansAdded++;
        }
    }
    return numPlansAdded;
}

function numUnfinishedPlans(){
    var numPlansAdded = 0;
    for(var planId in objPlans){
        var plan = objPlans[planId];
        if(plan.added && !plan.completed()){
            numPlansAdded++;
        }
    }
    return numPlansAdded;
}

function finishClicked(){
    drawVersesCircle($('#passages').find('sup').length);
    $(this).hide();
    $('#message').hide();
    var lastPlanId = $(this).data('planId');
    var day = $(this).data('day');
    var plan = objPlans[lastPlanId];
    plan.dayCompleted();
    saveData();

    htmlRender.updatePlanProgressMeter(lastPlanId);
    htmlRender.showNextVerse();
    rollBg();

    $.get('http://' + HOST + '/finished', { plan_id: lastPlanId, day: day, user_id: userId }, function(data){});
}

String.prototype.removePunctuation = function(){
    return this.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
}

function revealClicked(){
    $('#reveal-button, #message').fadeOut();

    var bAllCorrect = true;
    $('.missingWord').each(function(e){
        if($(this).val().toLowerCase().removePunctuation() == $(this).data('answer').toLowerCase().removePunctuation()){
            $(this).addClass('correct');
        }
        else {
            bAllCorrect = false;
            $(this).val($(this).data('answer'));
            $(this).addClass('wrong');
        }
    });

    if(bAllCorrect){
        $('#message').empty().append('Good Job! You Got It Right!').fadeIn('slow');
        drawMemorizedCircle(true);
    }
    else {
        $('#message').empty().append('No Worries! You Will Only Get Better!').fadeIn('slow');
    }

//    $('.text-hidden').css('transition', 'background-color 2s').css('background-color', 'transparent');
    rollBg();

    $.get('http://' + HOST + '/answered', { plan_id: $(this).data('planId'), day: $(this).data('day'), user_id: userId }, function(data){});

    setTimeout(function(){
        htmlRender.showNextVerse(true);
    }, 6000);
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function generateUserId(){
    return randomString(30, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}

$( document ).ready(function() {
    readingPlans.forEach(function(jsonPlan){
        var objPlan = new Plan(jsonPlan);
        objPlans[objPlan.id] = objPlan;
    });

    chrome.storage.sync.get(null, function (userData) {
        console.log(userData);

        if (userData === undefined){
            return;
        }

        if(userData['userId'] === undefined) {
            userId = generateUserId();
        }
        else {
            userId = userData['userId'];
        }

        for(var planId in userData["plans"]){
            objPlans[planId].added = true;
            objPlans[planId].completedOn = userData["plans"][planId];
        };

        $('#finish-button').click(finishClicked);

        drawPlansCircle();
        drawMemorizedCircle();
        drawVersesCircle();

        htmlRender.showAddedPlans();
        htmlRender.showNextVerse();
    });

    $('#reveal-button').click(revealClicked);

    $('#clean-storage').click(function(){
        chrome.storage.sync.clear();
    });

    $('#show-storage').click(function(){
        chrome.storage.sync.get(null, function(data){
            console.log(data);
        })
    });

    $('.maincontainer').on('click', '#add-new-plan', function(){
        htmlRender.showPlansSelector();
        $('#passages-container').hide();
    });

    $('#plans-selector').on('click', '#plans-close', function(){
        $('#plans-selector').hide();
        $('#passages-container').show();
    });

    $('#add-day').click(function(){
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
        today = formatDate(tomorrow);
        htmlRender.showAddedPlans();
        htmlRender.showNextVerse();
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

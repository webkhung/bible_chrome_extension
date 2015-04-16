var today = formatDate(new Date());
var objPlans = {};
var userId = '';
var userName = '';
var htmlRender = new HTMLRender();
var DAILY_MEMORIZED_GOAL = 4;
var HOST = 'biblereadingplans.herokuapp.com';
//var HOST = 'localhost:3001';

//var questions = [
//    'How Does This Passage Apply To Your Life Today?',
//    'What Does This Passage Mean To You?'
//]
//
//var quotes = [
//    'Like This App? <a href=\'https://chrome.google.com/webstore/detail/bible-reading-plans/jogajkcgclkfedbhdcopmpmeeophkkji?authuser=1\' target=\'_blank\'>Rate It On Chrome Store</a>',
//    'I Appreciate Your Feedback! Leave a Feedback on Chrome Store',
//    'How Does This Passage Apply To Your life Today?',
//    'What Does This Passage Mean To You?',
//    'Read it out loud help you memorize the verses',
//    'Memorize verses fix God\'s words in your heart and mind',
//    'Hello, Nice To See You Again!',
//    'You Are Doing A Good Job!',
//    'You Are Doing A Nice Work!',
//    'Great Effort!',
//    'Add More Bible Reading Plans',
//    'Keep Up The Good Work!',
//    'Smile, It Looks Good On You',
//    'Say Hi to a stranger. It will brighten both your day and theirs',
//    'Be mindful of your posture. You\'ll look and feel more confident!']

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
    this.completedOn = []; // index is day-1, value is the date
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
    userData['userName'] =  userName;
    chrome.storage.sync.set(userData);
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

//function hasFinishedToday(){
//    var bFinishedToday = false;
//    for(var planId in objPlans){
//        var plan = objPlans[planId];
//        if(plan.added){
//            bFinishedToday = true;
//        }
//    }
//    return bFinishedToday;
//}

function HTMLRender(){

    this.fetchUsers = function(){
        $.get('http://' + HOST + '/users', function(data){
            $('#users').html(data);
        });
    }

    this.updatePlanProgressMeter = function(lastPlanId){
        // Update UI of last finished plan
        if (lastPlanId) {
            var lastPlan = objPlans[lastPlanId];
            $('#added-plan-' + lastPlanId).addClass('plan-done-today');
            $('#added-plan-' + lastPlanId + ' .circle').removeClass('blink_me').removeClass('circle' + lastPlan.id).addClass('circle-solid-' + lastPlan.id).append("<span class='tick'>&#10004;</span>");
            $("#jmeter" + lastPlanId).jQMeter({
                goal : lastPlan.days.length.toString(),
                raised : lastPlan.completedOn.length.toString(),
                width : '150px',
                height : '26px',
                bgColor : '#dadada',
                barColor : '#f09246',
                displayTotal: false
            });
        }
    }

    this.showNextVerse = function(){
        console.log('showNextVerse');
        // Fetch the verse of the current plan
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.completed() && plan.lastCompletedDate() != today) {
                var day = plan.numDaysFinished()+1;
                fetchVerses(planId, day);
                return;
            }
        }

        // Today's verses are done. Randomly fetch a verse to read.
        var randomPlan = randomAddedPlan();
        if(randomPlan){
            var randomDay = getRandom(1,randomPlan.completedOn.length);
            fetchVerses(randomPlan.id, randomDay, true);
        }
        else {
            htmlRender.showPlansSelector();
        }

        // To fix God's words in your heart and mind, it means to be continually conscious of the Bible’s teachings as you go through your daily routine.
        // one practical way to make sure that God’s words are always close at hand is to memorize verses and passages from the Bible.
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

                $jqmeter = $("<div id='jmeter" + plan.id + "' class='jmeter'>");
                $jqmeter.jQMeter({
                    goal : plan.days.length.toString(),
                    raised : plan.completedOn.length.toString(),
                    width : '150px',
                    height : '26px',
                    bgColor : '#dadada',
                    barColor : '#f09246',
                    displayTotal: false
                });
                $rightCol.append($jqmeter);

                $container.append($rightCol);
                $plan.append($container);
            }
        }
    }

    this.showUserNameContainer = function() {
        $('#add-new-plan').hide();
        $('#user-name-container').show();
    }

    this.showPlansSelector = function(){
        $('#passages-container, #add-new-plan').hide();

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
        var addPlansText = '<h1><span class=username>' + userName + ',</span> Make God\'s Word Part Of Your Day!</h1><h2>Select a Plan Below</h2>';
        $planSelector.find('#plansSelectorHeader').html(addPlansText);
        $planSelector.append("<div style='text-align: center'><a id='plans-close' class='myButton' href='#'>Close</a></div>");
        $planSelector.show();
    }

    this.drawMemorizedCircle = function(planId, day){
        var key = memorizedKey(planId, day);
        chrome.storage.sync.get(key, function (data) {
            var memorizedCount = 0;
            if (data !== undefined && data[key] !== undefined){
                memorizedCount = parseInt(data[key]);
            }

            showTicks(memorizedCount);

            $('#memorized-circle').circleProgress({
                value: Math.min(1,memorizedCount / DAILY_MEMORIZED_GOAL) + 0.1,
                size: 170,
                thickness: 17,
                fill: { gradient: ['#f65bf0','#f68a16'], gradientAngle: Math.PI / 4 }
            })
        });
    }

    this.newGradient = function() {
        var c1 = {
            r: Math.floor(Math.random()*0) + 100,
            g: Math.floor(Math.random()*155) + 100,
            b: Math.floor(Math.random()*155) + 100
        };
        var c2 = {
            r: Math.floor(Math.random()*0) + 0,
            g: Math.floor(Math.random()*255) + 0,
            b: Math.floor(Math.random()*255) + 0
        };
        c1.rgb = 'rgb('+c1.r+','+c1.g+','+c1.b+')';
        c2.rgb = 'rgb('+c2.r+','+c2.g+','+c2.b+')';
        return 'radial-gradient(at top left, '+c1.rgb+', '+c2.rgb+')';
    }

    this.newGradient2 = function() {
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
}

function memorizedKey(planId, day){
    return 'memorized-' +  planId + '-' + day + '-' + today;
}

function getDifficulty(memorizedCount){
    return memorizedCount;
//    if(memorizedCount == 0){
//        return 0;
//    }
//    else {
//        var difficulty = Math.min(5, memorizedCount);
//        return difficulty;
//    }
}

function hideWords(text, difficulty, memorizedCount){
//    var ratio = Math.max(1,(DAILY_MEMORIZED_GOAL-memorizedCount)/2);
    var txttmp = text.split(/\s+/);
    var randoms = getRandom(txttmp.length, txttmp.length);
    var toPick = 3; // Math.floor(txttmp.length/ Math.min(txttmp.length,ratio+1));
    var minCharsCount = 3;
//    if(difficulty > 3){
//        minCharsCount = 3;
//    }

    console.log('difficulty ' + difficulty);
    console.log('memorizedCount ' + memorizedCount);
    console.log('text ' + text);
    console.log('txttmp.length ' + txttmp.length);
//    console.log('ratio ' + ratio);
    console.log('toPick ' + toPick);
    console.log('difficulty' + difficulty) ;
    console.log('--------------') ;

    var picked = 0;
    var i=0;
    while(picked < toPick && i < randoms.length){
        var currWord = txttmp[randoms[i]-1]
        if(txttmp[randoms[i]-1].length >= minCharsCount){
            txttmp[randoms[i]-1] = ' <input style=\'width:' + (currWord.length * 18) + 'px\' class=missingWord type=text data-answer=\'' + currWord + '\' placeholder=\'' + maskWord(currWord, difficulty) + '\'>';
            picked++;
        }
        i++;
    }
    return txttmp.join(' ');
}

function replaceOneCharacter(word, index, character) {
    return word.substr(0, index) + character + word.substr(index+character.length);
}

function maskWord(word, difficulty){
    var wordLen = word.length;
    var maskedWord = Array(wordLen+1).join("*")

    var every_n_chars_1_char_reveals = 1;
    if(difficulty == 5){
        every_n_chars_1_char_reveals = wordLen;
    }
    else if(difficulty == 4){
        every_n_chars_1_char_reveals = 4;
        maskedWord = replaceOneCharacter(maskedWord, 0, word.charAt(0))
    }
    else if(difficulty == 3){
        every_n_chars_1_char_reveals = 3;
        maskedWord = replaceOneCharacter(maskedWord, 0, word.charAt(0))
    }
    else if(difficulty == 2){
        every_n_chars_1_char_reveals = 3;
        maskedWord = replaceOneCharacter(maskedWord, 0, word.charAt(0))
    }
    else if(difficulty == 1){
        every_n_chars_1_char_reveals = 2;
        maskedWord = replaceOneCharacter(maskedWord, 0, word.charAt(0))
    }

    var ran = getRandom(Math.floor(wordLen/every_n_chars_1_char_reveals), wordLen);

    for(var i=0; i<ran.length; i++){
        maskedWord = replaceOneCharacter(maskedWord, ran[i]-1, word.charAt(ran[i]-1))
    }
    return maskedWord;
}

function replaceVerses(data, planId, day, memorizedCount){
    $p = $(data);
    var final = '';

    var totalSentence = 0;
    $p.contents().each(function(){
        if(this.nodeType == 3 && $(this).parent().prop('className') != 'scripture') {
            totalSentence++;
        }
        else {
            if ($(this).parent().prop('className') == 'scripture'){
            }
            else if($(this).prop('className') == 'v'){
            }
            else {
                totalSentence++;
            }
        }
    });

    var hideSentence = 0;
    var difficulty = getDifficulty(memorizedCount);
    if(difficulty == 0){
        hideSentence = 0;
    }
    else if(difficulty == 1){
        hideSentence = Math.min(1, totalSentence);
    }
    else if(difficulty == 2){
        hideSentence = Math.min(1, totalSentence);
    }
    else if(difficulty == 3){
        hideSentence = Math.min(2, totalSentence);
    }
    else if(difficulty == 4){
        hideSentence = Math.max(1, totalSentence-1);
    }
    else if(difficulty == 5){
        hideSentence = totalSentence;
    }

    var ran = getRandom(hideSentence, totalSentence)

    var sentenceCounter = 0;
    $p.contents().each(function(){
        if($(this).parent() && ($(this).parent().prop("tagName").toLowerCase() == 'h2' || $(this).parent().prop("tagName").toLowerCase() == 'h3')){

        }
        else if(this.nodeType == 3 && $(this).parent().prop('className') != 'scripture') {
            sentenceCounter++;
            if(numInArray(sentenceCounter, ran)){
                final += hideWords($(this).text(), difficulty, memorizedCount);
            }
            else {
                final += $(this).text();
            }
        }
        else {
            if ($(this).parent().prop('className') == 'scripture'){
                final +=$(this).parent().prop('outerHTML');
            }
            else if($(this).prop('className') == 'v'){
                final +=$(this).prop('outerHTML');
            }
            else {
                sentenceCounter++;
                if(numInArray(sentenceCounter, ran)){
                    final += hideWords($(this).text(), difficulty, memorizedCount);
                }
                else {
                    final += $(this).text();
                }
            }
        }
        final = final + ' ';
    });
    return final;
}

function processVerses(data, planId, day, review){
    console.log('processVerses ' + ',' + data  + ',' + planId  + ',' + day  + ',' + review);
    var key = memorizedKey(planId, day);
    chrome.storage.sync.get(key, function (userData) {
        if(review !== undefined && review){
            var verses = replaceVerses(data, planId, day, 0);
            $('#add-new-plan').addClass('blink_me');
            $('#memorized-circle').hide();
            $('#reveal-button').css('visibility','hidden');
            $('#hint-button').hide();
            $('#ticks').hide();
            $('#passages')
                .hide()
                .empty()
                .append("<div id='passage-plan-name'>Day " + day + " of " + objPlans[planId].name + '</div>')
                .append(verses).fadeIn('slow');
            $('#message').html("<p>You completed this passage on " + objPlans[planId].completedOn[day-1] + "</p><p>Let's review God's words again!</p>");
        }
        else{
            $('#add-new-plan').removeClass('blink_me');
            $('#added-plan-' + planId + ' .circle').addClass('circle-solid-' + planId).addClass('blink_me');
            $('#memorized-circle').show();
            $('#reveal-button').css('visibility','visible').data('disable',false).removeClass('no-link').data('planId', planId).data('day', day);

            var memorizedCount = 0;
            if (userData !== undefined && userData[key] !== undefined){
                memorizedCount = parseInt(userData[key]);
            }

            var verses = replaceVerses(data, planId, day, memorizedCount);
            $('#passages')
                .hide()
                .empty()
                .append("<div id='passage-plan-name'>Day " + day + " of " + objPlans[planId].name + '</div>')
                .append(verses).fadeIn('slow', function(){
                });

            htmlRender.drawMemorizedCircle(planId, day);

            // READ SCREEN
            if(memorizedCount == 0){
                $('#reveal-button').text('Next');
                $('#hint-button, #ticks').hide();
                $('#message').html('Hello <span class=username>' + userName + '</span>, Memorize the verse');
            }
            // TEST SCREEN
            else {
                $('#reveal-button').text('Done');
                $('#hint-button').show().data('disable',false).removeClass('no-link').data('planId', planId).data('day', day);

                $('#ticks').show();
                showTicks(memorizedCount);

                if(memorizedCount == DAILY_MEMORIZED_GOAL - 1){
                    $('#message').text('Last Question!');
                }
                else {
                    $('#message').html("Fill in the blank spaces with the memorized verse");
//                    $('#message').html("Memorize verses fixes God's word in your heart");
                }
            }
        }
    });
}

function showTicks(memorizedCount){
    // Reset
    $('#ticks .tick-circle').removeClass('filled').find('span').hide();

    if(memorizedCount > 0){
        for(var i=0; i < memorizedCount-1; i++){
            $('#ticks .tick-circle').eq(i).addClass('filled').find('span').show();
        }
    }
}

function fetchVerses(planId, day, review){
    console.log('fetchVerses ' + planId + ',' + day + ',' + review);
    var key = 'planId' + planId + '-' + today;
    chrome.storage.sync.get(key, function (data) {
        if (data !== undefined && data[key] !== undefined){
            console.log('fetchVerses from cache');
            processVerses(data[key], planId, day, review);
        }
        else {
            console.log('fetchVerses from server');
            $.get('http://' + HOST + '/verses', { plan_id: planId, day: day, user_id: userId, user_name: userName }, function(verses){
                console.log('fetchVerses from server returned');
                var data = {}
                data[key] = verses;
                chrome.storage.sync.set(data);
                processVerses(verses, planId, day, review);
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
    $('#passages-container, #add-new-plan').show();
    saveData();
}

function rollBg() {
    var bgImage = "bg" + (Math.floor(Math.random() * 33) + 1) + ".jpg";
    $('body').css('background-image', "url('images/" + bgImage + "')");
    $('.bg.hidden').css('background', htmlRender.newGradient());
    $('.bg').toggleClass('hidden');
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

function todayVersesCompleted(planId, day){
    objPlans[planId].dayCompleted();
    saveData();

    $('#message').text('Great Job! You Should Have Memorized The Passage By Now!');

    htmlRender.drawMemorizedCircle(planId, day);
    htmlRender.updatePlanProgressMeter(planId);

    $.get('http://' + HOST + '/finished', { plan_id: planId, day: day, user_id: userId, user_name: userName }, function(data){});
}

function incrementMemorizedCount(planId, day){
    var key = memorizedKey(planId, day);
    chrome.storage.sync.get(key, function (data) {
        var memorizedCount = 0;
        if (data !== undefined && data[key] !== undefined){
            memorizedCount = parseInt(data[key]);
        }
        memorizedCount = memorizedCount + 1;

        var data = {};
        data[key] = memorizedCount;
        chrome.storage.sync.set(data);

        htmlRender.drawMemorizedCircle(planId, day);

        if(memorizedCount == DAILY_MEMORIZED_GOAL){
            todayVersesCompleted(planId, day);
        }
    });
}

function userNameSubmitClicked(){
    var name = $('#user-name').val().trim();

    if(name.length < 3) {
        alert('Your name is too short');
    }
    else {
        userName = name;
        saveData();
        $('#user-name-container').fadeOut('slow', function(){
            htmlRender.showNextVerse();
            $('#add-new-plan').show();
        });
    }
}

function clearInput(){
    $('.missingWord').each(function(){
        $(this).val('');
    });
}

function revealClicked(){
    var bHint = $(this).attr('id') == 'hint-button';
    if(bHint) {
        $('.missingWord').each(function(){
            $(this).val($(this).data('answer'));
        });
        setTimeout(clearInput, 1000);
        return;
    }

    if($(this).data('disable')){
        return false;
    }
    $('#reveal-button').data('disable', true).css('visibility', 'hidden');
    $('#hint-button').data('disable', true).hide();


    // This part only applies if there are fill-in-the-blank
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
        $('#message').empty().append('Good Job!').fadeIn('slow');
        incrementMemorizedCount($(this).data('planId'), $(this).data('day'));
    }
    else {
        if($(this).attr('id') == 'hint-button'){
            $('#message').empty().append('There you go').fadeIn('slow');
        }
        else {
            $('#message').empty().append('Try Again!').fadeIn('slow');
        }
//        incrementMemorizedCount($(this).data('planId'), $(this).data('day'));
    }

    rollBg();

    if(!$(this).data('review')){
        $.get('http://' + HOST + '/answered', { plan_id: $(this).data('planId'), day: $(this).data('day'), user_id: userId, user_name: userName }, function(data){});
    }

    timeoutVar = setTimeout(function(){
        htmlRender.showNextVerse();
    }, 5000);
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


        if(userData['userName'] === undefined || userData['userName'] == '') {
            htmlRender.showUserNameContainer();
        }
        else {
            userName = userData['userName'];
            htmlRender.showNextVerse();
        }

        htmlRender.showAddedPlans();
    });

    $('#reveal-button, #hint-button').click(revealClicked);

    $('.maincontainer').on('click', '#add-new-plan', function(){
        htmlRender.showPlansSelector();
        $('#passages-container').hide();
    });

    $('#plans-selector').on('click', '#plans-close', function(){
        $('#plans-selector').hide();
        $('#passages-container, #add-new-plan').show();
    });

    $('#user-name-submit').click(userNameSubmitClicked);

    htmlRender.fetchUsers();

    // Debug stuffs
    $('#clean-storage').click(function(){
        chrome.storage.sync.clear();
    });

    $('#show-storage').click(function(){
        chrome.storage.sync.get(null, function(data){
            console.log(data);
        })
    });

    $('#add-day').click(function(){
        var tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);
        today = formatDate(tomorrow);
        htmlRender.showAddedPlans();
        htmlRender.showNextVerse();
    });

    $('#helps-container a').click(function(){
        fetchVerses($(this).attr('id'), 1);
    });

    rollBg();
    setTimeout(rollBg, 0.5);
});

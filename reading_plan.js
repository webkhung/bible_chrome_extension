var today = formatDate(new Date());
var objPlans = {};
var userId = '';
var userName = '';
var htmlRender = new HTMLRender();
var DAILY_MEMORIZED_GOAL = 4;
var HOST = 'biblereadingplans.herokuapp.com';
//var HOST = 'localhost:3001';
var memorizedCount = 0;
var game = new Game();
var textAnimations = ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'fadeIn', 'fadeInUp', 'fadeInDown',
    'fadeInLeft', 'fadeInRight', 'fadeInDownBig', 'bounceIn', 'bounceInDown']; // pulse, flip, 'fadeInLeftBig', 'fadeInRightBig'
var rated = false;
var bgImage;
var lastReadDate;
var lastSite;

var readingPlans = [
    {
        "id": "1",
        "name": "Being Thankful",
        "badge": "images/greystyle_08_badge.png",
        "description": "",
        "days": ["1Chronicles.23:30","John.14:27","Romans.5:5","Matthew.6:26","Psalm.20:4","Colossians.3:17","1Thessalonians.5:18","James.1:17","Philippians.4:6"]
    },
    {
        "id": "2",
        "name": "Love Part 1",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["Luke.6:31","Luke.6:35","John.8:13","Romans.12:9","Mark.12:31","Romans.13:10","1Corinthians.13:4-8","1Corinthians.13:13","Ephesians.4:2","1Peter.4:8","1John.4:7","1John.4:18-19","John.15:13","Ephesians.5:25"]
    },
    {
        "id": "3",
        "name": "Love Part 2",
        "badge": "",
        "description": "",
        "days": ["Ephesians.5:33","Colossians.3:14","Proverbs.10:12","Proverbs.17:17","1John.3:16-18","1John.4:8","John.3:16","Psalm.18:1","Matthew.22:27-29","Deuteronomy.10:12-19","Song of Solomon.8:4-8","Matthew.6:24","Matthew.22:37-39","Matthew.23:6-8"]
    },
    {
        "id": "4",
        "name": "Temptation",
        "badge": "images/greenstyle_08_badge.png",
        "description": "",
        "days": ["James.1:14", "Hebrews.2.18", "Hebrews.4.15", "James.4.7", "Romans.6.6-13", "Ephesians6.10-11", "1Peter.5:8-9"]
    },
    {
        "id": "5",
        "name": "Do Not Worry",
        "badge": "",
        "description": "",
        "days": ["Proverbs.3:5-6", "Philippians.4:6-7", "Matthew.11:28-30", "John.14:27", "Jeremiah.17:5-8", "Colossians.3:15", "2Thessalonians.3:16", "Psalm.55:22", "Proverbs.12:25", "1Peter.5:6-8", "Psalm.23:4", "Hebrews.13:5-6"]
    },
    {
        "id": "6",
        "name": "Forgiveness",
        "badge": "",
        "description": "",
        "days": ["Matthew.6:14-15","1John.1:9","Isaiah.43:25-26","Acts.3:19","Isaiah.1:18","2.Corinthians.5:17","Ephesians.1:7","Hebrews.10:17","Daniel.9:9","Colossians.1:13-14","Psalm.103:12","Numbers.14:19-21","Micah.7:18-19","Matthew.6:9-15","Mark.11:25","Matthew.26:28"]
    },
    {
        "id": "7",
        "name": "Encouragement",
        "badge": "",
        "description": "",
        "days": ["Proverbs.18:10","Proverbs.3:5-6","Isaiah.41:10","John.14:27","John.16:33","Psalm.46:1-3","2Timothy.1:7","Psalm.16:8","Psalm.55:22","1Peter.5:7","Isaiah.26:3","Psalm.118:14-16","Psalm.119:114-115","Psalm.119:25","Psalm.119:50","Psalm.119:71","Psalm.120:1"]
    },
    {
        "id": "8",
        "name": "Do Not Anger",
        "badge": "",
        "description": "",
        "days": ["James.1:19-20","Proverbs.29:11","James.1:20","Proverbs.19:11","Ecclesiastes.7:9","Proverbs.15:1","Proverbs.15:18","Colossians.3:8","James.4:1-2","Proverbs.16:32","Proverbs.22:24","Matthew.5:22","Psalm.37:8-9","Psalm.7:11","2 Kings.11:9-10","2 Kings.17:18","Proverbs.14:29"]
    },
    {
        "id": "9",
        "name": "Success",
        "badge": "",
        "description": "",
        "days": ["Philippians.4:13","Psalm.37:4","Psalm.1:1-3","Proverbs.16:3","1.Kings 2:3","Matthew.16:26-27","Luke.16:10-11","Romans.12:2","Isaiah.41:10","Philippians.4:6","Deuteronomy.8:18","Jeremiah.17:7"]
    },
    {
        "id": "10",
        "name": "Your Body",
        "badge": "",
        "description": "",
        "days": ["1Corinthians.6:19-20", "1Corinthians.3:16-17","Romans.12:1-2","1Corinthians.10:31","1Timothy.4:8","1Timothy.5:23","Matthew.6:22-23","1Corinthians.15:44","Philippians.1:20","1Corinthians.12:27","Psalm.100:3","Romans.12:4"]
    },
    {
        "id": "11",
        "name": "Money",
        "badge": "",
        "description": "",
        "days": ["Matthew.6:21","Malachi.3:10","Ecclesiastes.5:10","Romans.13:8","Psalm.37:16-17","Proverbs.13:11","Hebrews.13:5","Matthew.19:21","Proverbs.17:16","Matthew.6:24","Luke.3:14","Exodus.22:25","1Timothy.6:10","Deuteronomy.23:19","Matthew.21:12-13","1Timothy.6:17-19","Luke.12:33","Deuteronomy.15:7","Matthew.6:1-4","Mark.12:41-44","Proverbs.10:4","Revelation.3:17","Luke.16:13","Matthew.13:22","2Chronicles.1:11-12","1Peter.5:2-3","1Samuel.2:7","Proverbs.3:9"]
    },
    {
        "id": "12",
        "name": "Do Not Stress",
        "badge": "",
        "description": "",
        "days": ["1Timothy.6:17","Matthew.6:8","Psalm.56:6","Psalm.23:4","Exodus.34:21"]
    },
    {
        "id": "13",
        "name": "Finances",
        "badge": "",
        "description": "",
        "days": ["Galatians.6:9","3John.1:8","Ecclesiastes.11:1-2","1Timothy.6:18","Proverbs.21:5","Deuteronomy.8:18","Matthew.6:24"]
    },
    {
        "id": "100",
        "name": "Genesis",
        "badge": "",
        "description": "",
        "type" : "book",
        "days": ["Genesis.1-2", "Genesis.3-5", "Genesis.6-8", "Genesis.9-11", "Genesis.12-14", "Genesis.15-17", "Genesis.18-19", "Genesis.20-22", "Genesis.23-24", "Genesis.25-26", "Genesis.27-28", "Genesis.29-30", "Genesis.31-32", "Genesis.33-35", "Genesis.36-37", "Genesis.38-40", "Genesis.41", "Genesis.42-43", "Genesis.44-45", "Genesis.46-48", "Genesis.49-50"]
    },
    {
        "id": "101",
        "name": "John",
        "badge": "",
        "description": "",
        "type" : "book",
        "days": ["John.1:1-28", "John.1:29-51", "John.2:1-25" , "John.3:1-21", "John.3:22-36" , "John.4:1-26" , "John.4:27-54", "John.5:1-30", "John.5:31-6:14", "John.6:15-50" , "John.6:60-7:9", "John.7:10-44", "John.7:45-8:20", "John.8:21-47", "John.8:48-9:12", "John.9:13-41", "John.10:1-21", "John.10:22-11:16", "John.11:17-44", "John.11:45-12:19", "John.12:20-50", "John.13:1-30", "John.13:31-14:18", "John.14:19-15:17", "John.15:18-16:24", "John.16:25-17:19", "John.17:20-18:11", "John.18:12-40", "John.19:1-30", "John.19:31-20:18", "John.20:19-21:25"]
    },
    {
        "id": "102",
        "name": "Luke",
        "badge": "",
        "description": "",
        "type" : "book",
        "days": ["Luke.1", "Luke.2", "Luke.3", "Luke.4", "Luke.5", "Luke.6", "Luke.7", "Luke.8", "Luke.9", "Luke.10", "Luke.11", "Luke.12", "Luke.13", "Luke.14", "Luke.15", "Luke.16", "Luke.17", "Luke.18", "Luke.19", "Luke.20", "Luke.21", "Luke.22", "Luke.23", "Luke.24"]
    },
    {
        "id": "103",
        "name": "Matthew",
        "badge": "",
        "description": "",
        "type" : "book",
        "days": ["Matthew.1", "Matthew.2", "Matthew.3", "Matthew.4", "Matthew.5", "Matthew.6", "Matthew.7", "Matthew.8", "Matthew.9", "Matthew.10", "Matthew.11", "Matthew.12", "Matthew.13", "Matthew.14", "Matthew.15", "Matthew.16", "Matthew.17", "Matthew.18", "Matthew.19", "Matthew.20", "Matthew.21", "Matthew.22", "Matthew.23", "Matthew.24", "Matthew.25", "Matthew.26", "Matthew.27"]
    },
    {
        "id": "104",
        "name": "Mark",
        "badge": "",
        "description": "",
        "type" : "book",
        "days": ["Mark.1", "Mark.2", "Mark.3", "Mark.4", "Mark.5", "Mark.6", "Mark.7", "Mark.8", "Mark.9", "Mark.10", "Mark.11", "Mark.12", "Mark.13", "Mark.14", "Mark.15", "Mark.16"]
    }




    // Remember to add circle css (styles.css line 490)
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
        this.completedOn[this.completedOn.length] = today;
    }
    this.nextVerse = function(){
        if(this.completed()){
            return "It is finished!";
        }
        else {
            return this.days[this.numDaysFinished()];
        }
    }
    this.completed = function(){
        return this.added && this.numDaysFinished() >= this.numOfDays;
    }
    this.todayCompleted = function(){
        return this.completedOn[this.completedOn.length-1] == today;
    }
    this.type = json["type"];
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

function Game(){
    this.hideWords = function(text, memorizedCount){
        var txttmp = text.split(/\s+/);
        var randoms = getRandom(txttmp.length, txttmp.length);
        var toPick;
        var minCharsCount = 3;

        if(memorizedCount == 1){
            toPick = 3;
        }
        else if(memorizedCount == 2){
            toPick = 4;
        }
        else {
            toPick = txttmp.length / 3;
        }

        var picked = 0;
        var i=0;
        while(picked < toPick && i < randoms.length){
            var currWord = txttmp[randoms[i]-1]
            if(txttmp[randoms[i]-1].length >= minCharsCount){
                txttmp[randoms[i]-1] = ' <input style=\'width:' + (currWord.length * 18) + 'px\' class=missingWord type=text data-answer=\'' + currWord + '\' placeholder=\'' + game.maskWord(currWord, memorizedCount) + '\'>';
                picked++;
            }
            i++;
        }
        return txttmp.join(' ');
    }

    this.replaceOneCharacter = function(word, index, character) {
        return word.substr(0, index) + character + word.substr(index+character.length);
    }

    this.maskWord = function(word, memorizedCount){
        var wordLen = word.length;
        var maskedWord = Array(wordLen+1).join("*")

        var every_n_chars_1_char_reveals = 1;
        if(memorizedCount == 3){
            every_n_chars_1_char_reveals = wordLen;
        }
        else if(memorizedCount == 2){
            every_n_chars_1_char_reveals = 3;
            maskedWord = game.replaceOneCharacter(maskedWord, 0, word.charAt(0))
        }
        else if(memorizedCount == 1){
            every_n_chars_1_char_reveals = 2;
            maskedWord = game.replaceOneCharacter(maskedWord, 0, word.charAt(0))
        }

        var ran = getRandom(Math.floor(wordLen/every_n_chars_1_char_reveals), wordLen);

        for(var i=0; i<ran.length; i++){
            maskedWord = game.replaceOneCharacter(maskedWord, ran[i]-1, word.charAt(ran[i]-1))
        }
        return maskedWord;
    }

    this.replaceVerses = function(data, memorizedCount){
        $p = $('<div>' + data + '</div>');
        $p.find('.v').remove();
        $p.find('.s1').remove();

        if(memorizedCount == 0){
            final = $p.text().replace(/\s+/g,' ');
        }
        else {
            $p.find('.scripture').remove();
            final = game.hideWords($p.text(), memorizedCount);
        }

        console.log('memorizedCount ' + memorizedCount);
        console.log('verse ' + final);
        return final;
    }
}

function showTicks(memorizedCount){
    $('#ticks .tick-circle').removeClass('filled').find('span').hide();
    if(memorizedCount > 0){
        for(var i=0; i < memorizedCount-1; i++){
            $('#ticks .tick-circle').eq(i).addClass('filled').find('span').show();
        }
    }
}

function HTMLRender(){

    this.fetchMemorizedStatsWeekly = function() {
        $.get('http://' + HOST + '/memorized_stats_weekly', { user_id: userId }, function(data){
            var json = JSON.parse(data);

            $ulPast = $('#memorized-stats-past-weekly ul').empty().addClass('text-right');
            $ulPast.append('<li class=list-header>PAST\'S LEADERS:</li>');

            for(var i=0; i < json['weeks'].length; i++){
                var week = json['weeks'][i];
                if (week != json['current_week_of']){
                    var name = json[week][0];
                    var count = json[week][1];
                    var li = $('<li />');
                    li.html('<span>' + week +  ' </span>' + '<span>' + name + ' ' + count + ' </span>');
                    $ulPast.append(li);
                }
            }

            var current_week = json['current_week_of'];
            if(json[current_week] === undefined) {
                return;
            }
            $ulWeekly = $('#memorized-stats-weekly').empty();
            $names = $('<p />');
            $names.append('<span>People memorize bible verses this week:</span>')

            for(var i=0; i < json[current_week].length; i++){
                var name = json[current_week][i][0];
                var count = json[current_week][i][1];
                var li = $('<span />');
                li.text(name + ' ' + count);
                $names.append(li);
            }
            $ulWeekly.append($names);
        });
    }

    // Render the top right memorized count and the popup
    this.fetchMemorized = function(){
        $.get('http://' + HOST + '/memorized_verses_with_count', { user_id: userId }, function(data){
            var json = JSON.parse(data);
            if(json.length == 0) return;

            $ulMemorizedVerses = $('#memorized-verses-container ul');
            $ulMemorizedVerses.empty();
            $ulMemorizedVerses.append('<li class=list-header>YOUR VERSES (click to memorize again)</li>');
            var last = '';
            var versesCount = 0;
            for(var i=0; i<json.length; i++){
                var key = json[i][0] + '-' + json[i][1];
                if (last != key) {
                    last = key;
                    versesCount++;
                    $verse = $('<a />').attr({
                        href: '#',
                        class: 'popup-text'
                    }).text(objPlans[json[i][0]].name + ' - Day ' + json[i][1] + ' (' + json[i][2] + ') Answered Correctly: '  + json[i][3] + ' Times');
                    $verse.attr('data-plan-id', json[i][0]);
                    $verse.attr('data-plan-day', json[i][1]);
                    $verse.click(memorizedVersesClicked);
                    var li = $('<li />').append($verse);
                    $ulMemorizedVerses.append(li);
                }
            }
        });
    }

    this.fetchStartupData = function(){
        $.get('http://' + HOST + '/menu', function(data){
            $('.responsive-menu').append(data);

            var latestNewsDate = $('.responsive-menu').find('#news').data('latest-news-update')

            if(lastReadDate === undefined || (new Date(lastReadDate)) < (new Date(latestNewsDate))){
                $('#news').addClass('has-news');
                $('#menu-notification').show();
            }
        });
    }

    this.showAddedPlans = function(selectedPlanId){
        $plan = $('#added-plans');
        $plan.empty();
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added){
                $container = $("<div class='plan-container'>")
                $container.attr('id', 'added-plan-' + plan.id);

                if(plan.completed()) {
                    $container.append("<div class='plan-badge'><span class='circle circle-solid-" + planId + "'><img src='images/star.png'></span></div>");
                }
                else {
                    var days = plan.completedOn.length;
                    if (plan.type == 'book' && !plan.todayCompleted())
                        days++;
                    $container.append("<div class='plan-badge'><span class='circle circle-solid-" + planId + "'><span class='currentDay'>Day " + days + "</span></span></div>");
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
                    height : '22px',
                    bgColor : '#dadada',
                    barColor : '#f09246',
                    displayTotal: false
                });
                $rightCol.append($jqmeter);

                $container.append($rightCol);
                $plan.append($container);
            }
        }

        if(selectedPlanId !== undefined){
            $('#added-plan-' + selectedPlanId + ' .circle').addClass('blink_me');
            var fadeInTime = objPlans[selectedPlanId].type == 'book' ? 0 : 2000;
            $('#passage-header').hide().text(objPlans[selectedPlanId].name).fadeIn(fadeInTime);
        }
    }

    this.screenUserName = function() {
        $('#new-plan-link').hide();
        $('#user-name-container').show();
    }

    this.screenPlanSelector = function(){
        $('#passages-container, #new-plan-link').hide();

        $planSelector = $('#plans-selector');
        $planSelector.empty();
        $planSelector.append('<div id="plansSelectorHeader"></div>');

        var numPlansAdded = 0;
        var bFirstBook = false;
        for(var planId in objPlans){
            var plan = objPlans[planId];
            $container = $("<div class='plan-container'>")
            $rightCol = $("<div class='plan-right'>");
            $rightCol.append("<div class='plan-name'>" + plan.name + "</div>");
            // $rightCol.append("<div class='plan-subtext'>" + plan.numOfDays + ' Days ' + "</div>");
            $meta = $("<span class='plan-meta'>");
            if(plan.added){
                numPlansAdded++;
                if(plan.completed()){
                    $meta.append(" Completed <img src='images/star22.png'>");
                }
                else {
                    $meta.append(' Added');
                }
            }
            else {
                var addPlanLink = $('<a />').attr({ class: 'myButtonSmallLink', href: '#' }).text('Add');
                addPlanLink.click({ param1: planId }, addPlanLinkClicked)
                $meta.append(addPlanLink);
            }

            if(plan.type == 'book'){
                $rightCol.append("<div class='plan-subtext'>(" + plan.numOfDays + ' Days ' + ")</div>");
            }

            $rightCol.append($meta);
            $container.append($rightCol);

            if(plan.type == 'book' && !bFirstBook){
                bFirstBook = true;
                $planSelector.append("<div style='text-align: center; clear: both'><h2>Add a Plan By Book <span style='font-style: italic;'>(Beta)</span></h2><div class='by-book-sub-text'>We want to help make reading God’s Word easier, so we included full books to our reading plans!  Give it a try, and let us know what you think.</div></div>");
            }

            $planSelector.append($container);
        }
        var addPlansText = '<h2>Add a Plan By Topic:</h2>';
//        var addPlansText = '<h1><span class=username>' + userName + ',</span> Make God\'s Word Part Of Your Day!</h1><h2>By Topic:</h2>';
        $planSelector.find('#plansSelectorHeader').html(addPlansText);
        $planSelector.append("<div style='text-align: center; clear: both'><a id='plans-close' class='myButton' href='#'>Close</a></div>");
        $planSelector.show();
    }

    this.newGradient = function() {
        var inside = ['ff0000', '70e1f5', '185a9d', 'BB377D'];
        var outside = ['4776E6', 'C9FFBF', '43cea2', 'FBD3E9'];

        var rand = getRandom(1, inside.length);

        // rand[0] = 4;

        var c1 = inside[rand[0]-1];
        var c2 = outside[rand[0]-1];

        var R = hexToR("#" + c1);
        var G = hexToG("#" + c1);
        var B = hexToB("#" + c1);
        var _c1 = 'rgba('+R+','+G+','+B+',0.2)';

        R = hexToR("#" + c2);
        G = hexToG("#" + c2);
        B = hexToB("#" + c2);
        var _c2 = 'rgba('+R+','+G+','+B+',1)';

        return 'radial-gradient('+_c1+', '+_c2+')';
    }

    this.screenTodayVerses = function(verses, planId, day){
        console.log('screenTodayVerses ' + planId + ',' + day);
        $('#reveal-button').removeClass('no-link').data('planId', planId).data('day', day);

        if(objPlans[planId].type == 'book'){
            var dayFinished = objPlans[planId].numDaysFinished();
            var key = planId + '_' + (dayFinished + 1);
            chrome.storage.sync.get(key, function (data) {
                var partFinished = 0;
                if (data !== undefined && data[key] !== undefined){
                    partFinished = data[key];
                }
                $p = $('<div>' + verses + '</div>');

                var $pNew = $('<div></div>');
                var $pTemp;
                var b_q1 = false;
                $p.find('.p, .q1, .q2, .m').each(function(){
                    if($(this).hasClass('p') || $(this).hasClass('m')){
                        if($pTemp !== undefined){
                            $pNew.append($pTemp);
                            $pTemp = undefined;
                            b_q1 = false;
                        }
                        $pNew.append($(this));
                    }
                    else if($(this).hasClass('q1')){
                        if(!b_q1) {
                            b_q1 = true;
                            $pTemp = $('<p class=p></p>');
                        }
                        $pTemp.append($(this).html());
                    }
                    else if($(this).hasClass('q2')){
                        $pTemp.append($(this).html());
                    }
                });
                if($pTemp !== undefined){
                    $pNew.append($pTemp);
                }

                $paragraphies = $pNew.find('.p, .m');

                verses = $paragraphies[partFinished];
                $('#passages').empty().append(verses).show();
                var msgText = 'Today ' + (partFinished + 1) + ' / ' + $paragraphies.length;
//                $('#message').html(msgText).show();
                var animation = textAnimations[getRandom(1, textAnimations.length)[0]-1];
//                $('#message').empty().hide();
                $('#message').html(msgText).show().textillate({ in: { effect: animation, delay: 30, shuffle: false}});
                $('#reveal-button').hide().css('visibility','visible').text('Next').fadeIn('slow')
                    .data('total-parts', $paragraphies.length).data('part', partFinished + 1)
                    .data('read-book', true);
            });
        }
        else {
            verses = game.replaceVerses(verses, memorizedCount);
            $('#passages').empty().append(verses);

            // READ SCREEN
            if(memorizedCount == 0){
                var animation = textAnimations[getRandom(1, textAnimations.length)[0]-1];
    //            $('#passages').show();
    //            $('#reveal-button').hide().css('visibility','visible').text('Memorize').data('start-memorize', true).fadeIn('slow');

                $('#passages').textillate({ in: { effect: animation, delay: 30, shuffle: false, callback: function(){
                    bgClear();
                    $('#reveal-button').hide().css('visibility','visible').text('Memorize').data('start-memorize', true).fadeIn('slow');
                    $('#memorized-stats-weekly').fadeIn();
                    usageType = 'VIEWED-LIKE';
                    $.get('http://' + HOST + '/usage', { usage_type: usageType, plan_id: planId, day: day, user_id: userId, user_name: userName, details: verses.length });
                }}});

                $('#hint-button, #ticks').hide();
            }
            // GAME SCREEN
            else {
                htmlRender.fetchMemorized();
                htmlRender.fetchMemorizedStatsWeekly();
                $('#memorized-verses-container, #memorized-stats-past-weekly').slideDown(2000);
                $('#reveal-button').css('visibility','visible').text('Done').data('start-memorize', false);
                $('#hint-button').show().removeClass('no-link').data('planId', planId).data('day', day);
                $('#ticks').show();
                $('.hide-in-memorize').fadeOut();
                $('#message').html('Fill in the blank spaces');
                showTicks(memorizedCount);
            }
        }
    }
}

function versesProcess(data, planId, day){
    console.log('versesProcess ' + planId  + ',' + day);
    htmlRender.screenTodayVerses(data, planId, day);
}

function versesNext(planId, day){
    console.log('versesNext ' + planId + ' ' + day);
    if(planId !== undefined && day !== undefined){
        versesFetch(planId, day);
        return;
    }
    else {
        // Fetch a verse that is not shown today first.
        for(var planId in objPlans){
            var plan = objPlans[planId];
            if(plan.added && !plan.completed() && plan.lastCompletedDate() != today) {
                if(objPlans[planId].type == 'book'){
                    var day = plan.numDaysFinished() + 1;
                    versesFetch(planId, day);
                }
                else {
                    versesTodayCompleted(planId);
                    var day = plan.numDaysFinished();
                    versesFetch(planId, day);
                }
                return;
            }
        }

        var randomPlan = randomAddedPlan();
        if(randomPlan){
            console.log('versesNext from random plan');
            versesFetch(randomPlan.id, getRandom(1, randomPlan.numDaysFinished())[0]);
            return;
        }
    }

    htmlRender.screenPlanSelector();
}

function versesFetch(planId, day){
    console.log('versesFetch ' + planId + ',' + day);

    $('#passages-container').show();
    $('#message, #reveal-button').hide();

    var key = 'planId' + planId + '-' + day;
    chrome.storage.sync.get(key, function (data) {
        if (data !== undefined && data[key] !== undefined){
            versesProcess(data[key], planId, day);
            $.get('http://' + HOST + '/usage', { usage_type: 'OPEN', plan_id: planId, day: day, user_id: userId, user_name: userName }, function(){
            });
        }
        else {
            $.get('http://' + HOST + '/verses', { plan_id: planId, day: day, user_id: userId, user_name: userName }, function(verses){
                var data = {}
                data[key] = verses;
                if(objPlans[planId].type != 'book'){
                    chrome.storage.sync.set(data);
                }
                versesProcess(verses, planId, day);
            });
        }
    });
    htmlRender.showAddedPlans(planId);
    $('#rate-background').fadeIn('slow');
    $('#passages').html('Loading');
}

function bgBlock(){
    $('.bg.hidden').css('background', '').css('background-color', 'rgb(47,154,231)');
    $('.bg').removeClass('bgClear').addClass('bgBlock');
}

function bgClear(){
    $('.bg').addClass('bgClear').toggleClass('hidden');
}

function rollBg() {
    bgImage = "bg" + (Math.floor(Math.random() * 31) + 1) + ".jpg";
    $('body').css('background-image', "url('images/" + bgImage + "')");
    $('.bg.hidden').css('background', htmlRender.newGradient());
    $('.bg').toggleClass('hidden');
}

function versesTodayCompleted(planId){
    objPlans[planId].dayCompleted();
    saveData();
    var day = objPlans[planId].numDaysFinished();
    $.get('http://' + HOST + '/finished', { plan_id: planId, day: day, user_id: userId, user_name: userName }, function(data){});
}

function incrementMemorizedCount(){
    memorizedCount++;
    if(memorizedCount == DAILY_MEMORIZED_GOAL){
        $('#message').text('Great Job! You Should Have Memorized The Passage By Now!');
        $('#hint-button, #ticks').hide();
        showTicks(memorizedCount);
        memorizedCount = 0;

    }
}

function clearInput(){
    $('.missingWord').each(function(){
        $(this).val('');
    });
}

function addPlanLinkClicked(event){
    var planId = event.data.param1;
    objPlans[planId].added = true;
    htmlRender.showAddedPlans();
    versesNext();
    $('#plans-selector').hide();
    $('.hide-in-select-plans').show();
    saveData();
}

function userNameSubmitClicked(){
    var name = $('#user-name').val().trim();
    if(name.length < 3) {
        alert('Your name is too short');
    }
    else if(name.length > 30) {
        alert('Your name is too long');
    }
    else {
        userName = name;
        saveData();
        $('#user-name-container').fadeOut('slow', function(){
            versesNext();
            $('#new-plan-link').show();
            htmlRender.fetchStartupData();
        });
    }
}

function revealClicked(){
    var usageType = '';
    var details = '';
    var timeoutLength = 0;

    var planId, day;
    planId = parseInt($(this).data('planId'));
    day = parseInt($(this).data('day'));

    if($(this).data('start-memorize')) {
        usageType = 'START_MEMORIZE';
        timeoutLength = 0;
        $('#message').empty();
        incrementMemorizedCount();
    }
    else if($(this).data('read-book')) {
        $('#reveal-button').hide();
        var part = parseInt($(this).data('part'));
        var totalParts = parseInt($(this).data('total-parts'));
        var dayFinished = objPlans[planId].numDaysFinished();
        var key = planId + '_' + (dayFinished + 1);
        var data = {};
        data[key] = part;
        chrome.storage.sync.set(data, function(){
            if(part == totalParts){
                versesTodayCompleted(planId);
                $('#message').text('Good Job!  You have finished today\'s verse!').fadeIn('slow');
            }
            else {
                $('#message').empty();
                versesNext(planId, day);
            }
        });

        var details = part + '/' + totalParts;
        $.get('http://' + HOST + '/usage', { usage_type: 'BOOK', plan_id: $(this).data('planId'), day: $(this).data('day'), user_id: userId, user_name: userName, details: details }, function(data){});

        return;
    }
    else {
        var bHint = $(this).attr('id') == 'hint-button';
        if(bHint) {
            $('.missingWord').each(function(){
                $(this).val($(this).data('answer'));
            });
            setTimeout(clearInput, 3000);
            $.get('http://' + HOST + '/usage', { usage_type: 'HINT', plan_id: $(this).data('planId'), day: $(this).data('day'), user_id: userId, user_name: userName }, function(data){});
            return;
        }

        $('#reveal-button').css('visibility', 'hidden');
        $('#hint-button').hide();

        // This part only applies if there are fill-in-the-blank
        var bAllCorrect = true;
        var correct = 0, wrong = 0;
        $('.missingWord').each(function(e){
            if($(this).val().toLowerCase().removePunctuation() == $(this).data('answer').toLowerCase().removePunctuation()){
                $(this).addClass('correct');
                correct++;
            }
            else {
                bAllCorrect = false;
                $(this).val($(this).data('answer'));
                $(this).addClass('wrong');
                wrong++;
            }
        });

        if(bAllCorrect){
            usageType = 'ANSWERED_CORRECT';
            timeoutLength = 2000;
            $('#message').empty().append('Good Job!').fadeIn('slow');
            incrementMemorizedCount();
        }
        else {
            usageType = 'ANSWERED_WRONG'
            timeoutLength = 5000;
            details = correct +'/' + wrong;
            $('#message').empty().append('Try Again in 5 Seconds!').fadeIn('slow');
//            incrementMemorizedCount();
        }
    }

    bgBlock();

    $.get('http://' + HOST + '/usage', { usage_type: usageType, details: details, plan_id: $(this).data('planId'), day: $(this).data('day'), user_id: userId, user_name: userName }, function(data){});

    timeoutVar = setTimeout(function(){
        versesNext(planId, day);
    }, timeoutLength);
}

function memorizedVersesClicked(){
    $('#memorized-verses-container').hide();
    versesFetch($(this).data('plan-id'), $(this).data('plan-day'));
    $.get('http://' + HOST + '/usage', { usage_type: 'MEMORIZED-VERSES-CLICKED', user_id: userId, user_name: userName, plan_id: $(this).data('plan-id'), day: $(this).data('plan-day')});
}

function trackClicked(usage_type, details) {
    $.get('http://' + HOST + '/usage', { usage_type: usage_type, user_id: userId, user_name: userName, details: details});
}

//function greeting(){
//    var myDate = new Date();
//    var hrs = myDate.getHours();
//
//    var greet;
//
//    if (hrs >= 4 && hrs < 12)
//        greet = 'Good Morning';
//    else if (hrs >= 12 && hrs <= 18)
//        greet = 'Good Afternoon';
//    else
//        greet = 'Good Evening';
//
//    $('#home span').text(greet + ', ' + userName.substring(0,30) + '!')
//}

function menuClicked(){
    trackClicked('menu-clicked');
    $('.responsive-menu').toggleClass('expand')
}

function menuItemClicked(){
    var linkId = $(this).attr('id');
    trackClicked(linkId + '-clicked');

    if(linkId == 'news'){
        $('#menu-notification').hide();
        var data = {};
        data['lastReadDate'] = $(this).data('latest-news-update');
        chrome.storage.sync.set(data);
    }
    else if(linkId == 'site'){
        var data = {};
        data['lastSite'] = $(this).attr('href');
        chrome.storage.sync.set(data);
    }
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
            htmlRender.screenUserName();
        }
        else {
            userName = userData['userName'];
            versesNext();
            htmlRender.fetchStartupData();
        }

        $('.username').text(userData['userName']);

        lastReadDate = userData['lastReadDate'];
        lastSite = userData['lastSite'];
        rated = userData['rated'];
    });

    $('#reveal-button, #hint-button').click(revealClicked);
    $('#user-name-submit').click(userNameSubmitClicked);
    $('.responsive-menu').on('click', 'a', menuItemClicked);
    $('.menu-btn').click(menuClicked)

    $('.maincontainer').on('click', '#new-plan-link', function(){
        htmlRender.screenPlanSelector();
        $('.hide-in-select-plans').hide();
    });

    $('#plans-selector').on('click', '#plans-close', function(){
        $('.popup').hide();
        $('.hide-in-select-plans').show();
    });

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
        versesNext();
    });

    rollBg();
});

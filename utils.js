function formatDate(date){
    return (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
}

function numInArray(num, array){
    for(var i=0; i<array.length; i++){
        if(array[i] == num){
            return true;
        }
    }
    return false;
}

String.prototype.removePunctuation = function(){
    return this.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function generateUserId(){
    return randomString(20, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
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

function randomAddedPlan(){
    var allPlanIds = [];
    for(var planId in objPlans){
        if(objPlans[planId].added && objPlans[planId].type != 'book') {
            allPlanIds[allPlanIds.length] = planId;
        }
    }

    var randomPlanId = allPlanIds[(Math.floor(Math.random() * allPlanIds.length) + 1) - 1];
    return objPlans[randomPlanId];
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

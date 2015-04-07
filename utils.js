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
    return randomString(30, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}



//function drawPlansCircle(){
//    numPlansAdded();
//    $('#plans-circle').circleProgress({
//        value: Math.min(1,numPlansAdded() / 7),
//        size: 70,
//        thickness: 7,
//        fill: { gradient: ['#FFCC03', '#FFF702'], gradientAngle: Math.PI / 4 }
//    }).on('circle-animation-progress', function(event, progress, stepValue) {
//            $(this).find('strong').text(numPlansAdded());
//        });
//}


//function drawVersesCircle(increment){
//    chrome.storage.sync.get("verses", function (data) {
//        var count = 0;
//        if (data !== undefined && data['verses'] !== undefined){
//            count = parseInt(data['verses']);
//        }
//
//        if(increment !==  undefined) {
//            count = count + increment;
//        }
//        var data = { "verses" : count }
//        chrome.storage.sync.set(data);
//
//        $('#verses-circle').circleProgress({
//            value: Math.min(1,count / 50),
//            size: 70,
//            thickness: 7,
//            fill: { gradient: ['#88eeff','#59ff5b'], gradientAngle: Math.PI / 4 }
//        }).on('circle-animation-progress', function(event, progress, stepValue) {
//                $(this).find('strong').text(count);
//            });
//    });
//}


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
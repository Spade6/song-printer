const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

// canvas 설정
const width = 500;
const height = 1175;
const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');
context.fillStyle = '#fff';
context.fillRect(0, 0, width, height);

// 음악 리스트 json 파일 로드
const dataBuffer = fs.readFileSync('../music_list.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
const classic  = data.classic;
const oversea = data.oversea;
const main_kpop = data.mainstream_kpop;
const indie_kpop = data.indie_kpop;
const indie_pop = data.indie_pop;

// list에서 10개 뽑아서 리스트 만들기
// 5개의 장르에서 랜덤하게 노래 뽑아서 총 10개의 노래 셀렉

function randombetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var song_list = [];

function pop_songs(song_num, genre) {
    var pre_idx = [0];
    for (let i = 0; i < song_num; i++) {
        // 더 좋은 방법이 있는지?
        while (true) {
            var song_idx = randombetween(0, genre.length);
            if (!(song_idx in pre_idx)) {
                break;
            }
        }
        song_list.push(genre[song_idx]);
        pre_idx.push(song_idx);
    }

    return song_list;
}

function get_list() {
    var max = 10;
    var main_kpop_num = randombetween(1, max-4);
    var oversea_num = randombetween(1, max-main_kpop_num-3);
    var indie_kpop_num = randombetween(1,max-oversea_num-main_kpop_num-2);
    var indie_pop_num = randombetween(1, max-main_kpop_num-oversea_num-indie_kpop_num-1)
    var classic_num = max - oversea_num - main_kpop_num - indie_kpop_num - indie_pop_num;
    
    console.log(main_kpop_num, oversea_num, indie_kpop_num, indie_pop_num, classic_num)
    
    var num_list = [main_kpop_num, oversea_num, indie_kpop_num, indie_pop_num, classic_num]
    var genre_list = [main_kpop, oversea, indie_kpop, indie_pop, classic]

    for (let i = 0; i < num_list.length; i++) {
        var song_list = pop_songs(num_list[i], genre_list[i])
    }

    return song_list;
}

var song_list = get_list();


const month_dict = {1: "JANUARY", 2: "FEBRUARY", 3: "MARCH", 4:"APRIL", 5: "MAY", 6:"JUNE", 7:"JULY", 8:"AUGUST", 9:"SEPTEMBER", 10:"OCTOBER", 11:"NOVEMBER", 12:"DECEMBER"}
function get_date_str() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분

    // am pm ex) 1:07 am 이런식으로 표현하기 위한 코드
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    var month_str = month_dict[month];
    
    const today_text = month_str + " " + date + ", " + year + " " + strTime;
    return today_text
}

function get_total_amt(amt_arr) {
    var min = 0;
    var sec = 0;
    for (let i = 0; i < amt_arr.length; i++) {
        split_arr = amt_arr[i].split(":");
        min += parseInt(split_arr[0]);
        sec += parseInt(split_arr[1]);
    }
    if (sec > 59) {
        min += parseInt(sec / 60);
        sec = sec % 60;
    }
    const total_str = String(min) + ":" + String(sec);
    return total_str;
}

// font style 설정
var font_other = "bold 16pt Courier New";
var font_song = "bold 14pt Courier New";
// var font_text_songs = "500 14pt Courier New"; // 텍스트 폰트
var font_artist = "bold 13pt Courier New";
var font_line = "18pt Courier New"; // ----- 폰트
var font_under_barcode = "bold 10pt Courier New";

// 텍스트, 포지션 정하기
var padding = 20; // 노래 번호의 x 위치
var song_num_xpos = 30;
var title_xpos = 80; // 노래 이름의 x 위치
var text_max_width = 460; // 노래이름이 길 경우 맥스 길이
var text_space_height = 25; // 텍스트 사이 높이
var y_position = 400; // 노래 번호와 노래의 y 위치

// ----- divide line 넣기
function add_divide_line(y_pos) {
    context.font = font_line;
    const divide_line = "---------------------------------";
    context.fillText(divide_line, padding, y_pos, text_max_width);
}

// canvas 그리기
context.textAlign = 'left';
context.textBaseline = 'center';
context.fillStyle = '#2e2e2e';



// 시간 & ORDER #0009 넣기
const today_text = get_date_str();
context.font = font_other;
context.fillText("ORDER #0009 FOR SOUND DIVERSITY", padding, y_position-text_space_height * 5)
context.fillText(today_text, padding, y_position - text_space_height * 4);

// ------ 넣기
add_divide_line(y_position - text_space_height * 3);

// ----- 사이에 QTY   ITEM 넣기
context.font = font_other;
context.fillText("QTY", padding, y_position - text_space_height * 2);
context.fillText("ITEM",title_xpos, y_position - text_space_height * 2 );
const amt_str = "AMT";
const amt_str_width = context.measureText(amt_str).width;
context.fillText("AMT",500 - padding - amt_str_width,  y_position - text_space_height * 2  );

// ----- 넣기
add_divide_line(y_position - text_space_height );

var amt_arr = []; // 나중에 total amt 계산을 위하여

// 노래 번호와 노래이름
for (let i = 0; i < song_list.length; i++) {
    context.font = font_song;
    var title = song_list[i]['title'];
    var artist = song_list[i]['artist'];
    // var time = song_list[i]['time']; // 나중에 이걸로 음악 시간 가져오기
    // amt_arr.push(time); // 음악 재생시간 amt_arr 에 저장
    var time = "0:00";
    var time_width = context.measureText(time).width;

    // 번호 매기기
    if (i == 9) {
        context.fillText("10", song_num_xpos, y_position);
    } else {
    context.fillText("0" + (i+1), song_num_xpos, y_position);
    }
    
    context.fillText(title, title_xpos, y_position, 320);
    context.fillText(time,500 - song_num_xpos - time_width , y_position);
    context.font = font_artist;
    context.fillText("*"+artist, title_xpos + 20, y_position + text_space_height * 0.9, 300)
    var y_position = y_position + text_space_height * 1.8;
}
// ----- 넣기
add_divide_line(y_position); // y_position은 이미 위에서 변경이 된 상태

// ITEM COUNT 넣기
context.font = font_other;
context.fillText("ITEM COUNT :", padding, y_position + text_space_height);
const item_count = song_list.length;
const item_count_width = context.measureText(item_count).width;
context.fillText(item_count, 500 - padding - item_count_width, y_position + text_space_height);

// TOTAL 넣기
context.fillText("TOTAL :", padding, y_position + text_space_height *2);
var amt_arr = ["3:15", "3:28", "4:02", "3:11", "1:44", "2:15", "3:43", "3:11", "8:03", "6:13"]; // 임시
const total_str = get_total_amt(amt_arr);
const total_str_width = context.measureText(total_str).width;
context.fillText(total_str, 500 - padding - total_str_width, y_position + text_space_height *2)

// ------ 넣기
add_divide_line(y_position + text_space_height *3);

// CARD 번호 인증번호 넣기
context.font = font_artist;
var card_str = "CARD # : ************9929";
var auth_str = "AUTH CODE : 786";
context.fillText(card_str, padding, y_position + text_space_height *4);
context.fillText(auth_str, padding,  y_position + text_space_height *5)

context.font = font_under_barcode;
// 바코드 넣기
loadImage('./barcode.jpeg').then(image => {
    context.drawImage(image, 100, 1175-130, 300, 70);
    context.fillText("A lot of different flowers make a bouquet.", 110, 1175-45, 290 );
})
loadImage( './logo.jpeg').then(image => {
    context.drawImage(image, 50, 50, 400, 180);
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./image.png', buffer);
})


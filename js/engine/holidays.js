var adv4 = [];

var adv5 = [];

var oHolidays = {
    "1.1"   : { name: "Новый год", img: "" },
    "7.1"   : { name: "Православное Рождество", img: "" },
    "25.1"  : { name: "День студентов (Татьянин день)", img: "" },
    "14.2"  : { name: "День святого Валентина (День всех влюбленных)", img: "" },
    "23.2"  : { name: "День защитника Отечества", img: "./img/ui/holidays/23_2.png" },
    "8.3"   : { name: "Международный женский день", img: "./img/ui/holidays/8_3.png" },
    "1.4"   : { name: "День смеха / День дурака", img: "./img/ui/holidays/1_4.png" },
    "12.4"  : { name: "Всемирный день авиации и космонавтики", img: "./img/ui/holidays/12_4.png" },
    "1.5"   : { name: "День весны и труда", img: "./img/ui/holidays/1_5.png" },
    "7.5"   : { name: "День радио", img: "./img/ui/holidays/7_5.png" },
    "9.5"   : { name: "День Победы", img: "./img/ui/holidays/9_5.png" },
    "1.6"   : { name: "Всемирный день защиты детей", img: "" },
    "6.6"   : { name: "Пушкинский день России", img: "./img/ui/holidays/6_6.png" },
    "12.6"  : { name: "День России", img: "./img/ui/holidays/12_6.png" },
    "27.6"  : { name: "День молодежи России", img: "./img/ui/holidays/27_6.png" },
    "3.7"   : { name: "День ГИБДД", img: "./img/ui_item/ui/3_7.png" },
    "9.7"   : { name: "День российской почты", img: "./img/ui/holidays/9_7.png" },
    "2.8"   : { name: "День Воздушно-десантных войск", img: "./img/ui/holidays/2_8.png" },
    "12.8"  : { name: "День Военно-воздушных сил", img: "./img/ui/holidays/12_8.png" },
    "13.8"  : { name: "День строителя", img: "./img/ui/holidays/13_8.png" },
    "20.8"  : { name: "День Воздушного флота России", img: "./img/ui/holidays/20_8.png" },
    "27.8"  : { name: "День кино России", img: "./img/ui/holidays/27_8.png" },
    "1.9"   : { name: "День знаний", img: "./img/ui/holidays/1_9.png" },
    "30.9"  : { name: "День Интернета России", img: "./img/ui/holidays/30_9.png" },
    "5.10"  : { name: "День учителя", img: "./img/ui/holidays/5_10.png" },
    "29.10" : { name: "День автомобилиста", img: "./img/ui/holidays/29_10.png" },
    "4.11"  : { name: "День народного единства", img: "./img/ui/holidays/4_11.png" },
    "10.11" : { name: "День милиции", img: "./img/ui/holidays/10_11.png" },
    "12.12" : { name: "День Конституции Российской Федерации", img: "./img/ui/holidays/12_12.png" },
    "20.12" : { name: "День ФСБ", img: "./img/ui/holidays/20_12.png" }
}

function getBtmContent(sContentPlace) {
    var oHoliday = null;
    var flag = true;
    var oDate = new Date();
    var sDate = oDate.getDate().toString(10) + "." + (oDate.getMonth() + 1).toString(10);
    var oContentPlace = document.getElementById(sContentPlace);
    
    if (adv5.length > 0) {
        adv_array.push(adv5);
    }
    
    if (oContentPlace == null || oContentPlace == "undefined") {
        return;
    }
    if (oHolidays !== null && oHolidays !== "undefined") {
        if (oHolidays.hasOwnProperty(sDate)) {
            oHoliday = oHolidays[sDate];
            if (oHoliday !== null && oHoliday !== "undefined" &&
                oHoliday.img !== null && oHoliday.img !== "undefined" &&
                oHoliday.img.toString().length > 0) {
                oContentPlace.innerHTML = '<img alt="" src="' + oHoliday.img + '" />';
                return;    
            }    
        }
    }
    if (adv4.length > 0) {
        for (var i = 0; i < adv_array.length; i++)
            if (adv_array[i][0] == 'index_page_4')
                flag = false;
                
        if (flag)
            adv_array.push(adv4);
    }
}
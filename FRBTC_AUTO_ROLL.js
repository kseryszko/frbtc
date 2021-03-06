// ==UserScript==
// @version      5.11
// @match        https://freebitco.in/*
// @match        http*://www.google.com/recaptcha/*
// @name         Freebitco.in AUTO ROLL (V5.11)
// @description  You need to create an account to work in:
// @license      GPL-3.0
// @updateURL    https://raw.githubusercontent.com/kseryszko/frbtc/main/FRBTC_AUTO_ROLL.js
// @downloadURL  https://raw.githubusercontent.com/kseryszko/frbtc/main/FRBTC_AUTO_ROLL.js
// ==/UserScript==

(function() {
    'use strict';
var body = $('body');
var points = {};
var count_min = 1;
var reward = {};
    reward.select = function() {
        reward.points = parseInt($('.user_reward_points').text().replace(',',""));
        reward.bonustime = {};
        if ($("#bonus_container_free_wof").length != 0) {
//        if ($("#bonus_container_free_points").length != 0) {
            reward.bonustime.text = $('#bonus_span_free_points').text();
            reward.bonustime.hour = parseInt(reward.bonustime.text.split(":")[0]);
            reward.bonustime.min = parseInt(reward.bonustime.text.split(":")[1]);
            reward.bonustime.sec = parseInt(reward.bonustime.text.split(":")[2]);
            reward.bonustime.current = reward.bonustime.hour * 3600 + reward.bonustime.min * 60 + reward.bonustime.sec;
        } else
            reward.bonustime.current = 0;
        console.log(reward.bonustime.current);
        if (reward.bonustime.current !== 0) {
            console.log(reward.bonustime.current);
        } else {
            if (reward.points < 100720) {
                console.log("waiting for points");
            }
            else if (reward.points < 1440) {
//            else if (reward.points < 120) {
                    console.log("waiting for points 60");
                RedeemRPProduct('free_wof_1');
//                RedeemRPProduct('free_points_1');
                }
            else if (reward.points < 2160) {
//            else if (reward.points < 600) {
                    console.log("waiting for points 120");
                RedeemRPProduct('free_wof_2');
//                RedeemRPProduct('free_points_10');
                }
            else if (reward.points < 2880) {
//            else if (reward.points < 600) {
                    console.log("waiting for points 120");
                RedeemRPProduct('free_wof_2');
//                RedeemRPProduct('free_points_10');
                }
            else if (reward.points < 3600) {
//            else if (reward.points < 1200) {
                    console.log("waiting for points 600");
                RedeemRPProduct('free_wof_2');
//                RedeemRPProduct('free_points_50');
                }
            else {
                RedeemRPProduct('free_wof_2');
//                RedeemRPProduct('free_points_100');
            }
//            if ($('#bonus_span_free_lott').length === 0)
//               RedeemRPProduct('free_lott_100');
        }
    };
    setTimeout(reward.select,1000);
    setInterval(reward.select,60000);
$(document).ready(function(){
    console.log("Status: Page loaded.");
    setTimeout(function(){
        $('#free_play_form_button').click();
        console.log("Status: Button ROLL clicked.");
    }, random(20000,25000));
    setInterval(function(){
        console.log("Status: Elapsed time " + count_min + " minutes");
        count_min = count_min + 1;
    }, 60000);
    setTimeout(function(){
        $('.close-reveal-modal')[0].click();
        console.log("Status: Button CLOSE POPUP clicked.");
    }, random(12000,18000));
//    setInterval(function(){
//        $('#free_play_form_button').click();
//        console.log("Status: Button ROLL clicked again.");
//    }, random(3605000,3615000));
});
function random(min,max){
   return min + (max - min) * Math.random();
}
    setTimeout(function() {
    document.getElementById('logo_span_container').innerHTML = ' RP = ' + reward.points;
    }, 2000);
})();

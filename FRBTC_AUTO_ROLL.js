// ==UserScript==
// @version      5.01
// @match        https://freebitco.in/*
// @name         Freebitco.in AUTO ROLL (V5.01)
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
//        if ($(""#bonus_container_free_points"").length != 0) {
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
            if (reward.points < 4500) {
                console.log("waiting for points");
            }
            else {
                RedeemRPProduct('free_wof_5');
            }
        }
    };
    setTimeout(reward.select,1000);
    setInterval(reward.select,60000);
$(document).ready(function(){
    console.log("Status: Page loaded.");
    setTimeout(function(){
//        $('#free_play_form_button').click();
        console.log("Status: Button ROLL clicked.");
    }, random(2000,4000));
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
//        console.log(""Status: Button ROLL clicked again."");
//   }, random(3605000,3615000));
});
function random(min,max){
   return min + (max - min) * Math.random();
}
    setTimeout(function() {
    document.getElementById('logo_span_container').innerHTML = ' Glowne|RP=' + reward.points;
    }, 2000);

})();

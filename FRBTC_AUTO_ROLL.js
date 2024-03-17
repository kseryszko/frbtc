// ==UserScript==
// @name         Freebitco.in AUTO ROLL (V6.3)
// @version      6.3
// @match        *://*/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL    https://raw.githubusercontent.com/kseryszko/frbtc/main/FRBTC_AUTO_ROLL.js
// @downloadURL  https://raw.githubusercontent.com/kseryszko/frbtc/main/FRBTC_AUTO_ROLL.js
// ==/UserScript==

(function() {
    'use strict';

    let url = window.location.href;

    // Initialize buyLottery variable and number_ticket variable
    let playwof = false;
    let buyLottery = false; //Default is false, set to true if you want to buy lottery ticket after every roll
    let number_ticket = 1; //Default is 1

if (url.includes("https://freebitco.in/")) {
            console.log("This is not the page we are looking for.");
        } else {
            window.location = ("https://freebitco.in/*");
        }


var body = $('body');
var points = {};
var count_min = 1;
var reward = {};

        reward.select = function() {
        reward.points = parseInt($('.user_reward_points').text().replace(',',""));
        reward.bonustime = {};
        if ($("#bonus_container_free_wof").length != 0) {
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
            if (reward.points < 4000) {
                console.log("waiting for points");
            }
            else {
                RedeemRPProduct('free_wof_5');
            }
        }
    };
    setTimeout(reward.select,1000);
    setInterval(reward.select,60000);



    $(document).ready(function() {
        console.log("Status: Page loaded.");
        // Detect the hCaptcha container
        let hCaptchaContainer = document.querySelector('div.h-captcha');
        // If the hCaptcha container is present
        if (hCaptchaContainer) {
            console.log("hCaptcha is present on the page.");
            // Wait for the captcha to be resolved
            waitForCaptcha(function() {
                console.log("Captcha has been resolved!");
                play();
            });
        } else {
            console.log("hCaptcha is not present on the page.");
            play();
        }
    });



    function buy_lottery_ticket(number_of_ticket) {
        // Select the element using its class
        let element = document.querySelector('.lottery_link');

        // Check if the element was successfully selected
        if (element) {
            element.click();

            $(document).ready(function() {
                // Find the input element by its ID and set its value to "number_of_ticket"
                let inputElement = document.getElementById('lottery_tickets_purchase_count');
                if (inputElement) {
                    inputElement.value = number_of_ticket;
                }

                // Find the button element by its ID and simulate a click
                let buyButton = document.getElementById('purchase_lottery_tickets_button');
                if (buyButton) {
                    buyButton.click();
                }
            });
        } else {
            console.log("The element was not found.");
        }
    }

    function checkCaptchaResolved() {
        // Get the hCaptcha response textarea
        let hCaptchaResponse = document.querySelector('textarea[id^="h-captcha-response-"]');

        // If the textarea contains any value, hCaptcha is likely resolved
        if (hCaptchaResponse && hCaptchaResponse.value.trim() !== "") {
            return true; // Return true if resolved
        } else {
            return false; // Return false if not resolved
        }
    }

    // Function to wait for the captcha to be resolved
    function waitForCaptcha(callback) {
        let captchaCheckInterval = setInterval(function() {
            if (checkCaptchaResolved()) {
                clearInterval(captchaCheckInterval);
                callback();
            }
        }, 1000); // Check every 1 second
    }

    function play(){

        //AutoRoll after 2s
        setTimeout(function() {
            let timeRemainingDiv = document.getElementById("time_remaining");
            // Check if the element with the specific ID is available
            if (timeRemainingDiv && timeRemainingDiv.innerHTML.trim() !== "") {
                console.log("We do nothing");
            } else {
                // Click
                $('#free_play_form_button').click();
                //Buy lottery ticket after 5s
                setTimeout(function() {
                    if (buyLottery){
                        buy_lottery_ticket(number_ticket)
                    }
                }, 5000);
            }
        }, 2000);

      if (playwof) {

        //Open WoF tab after 15s
        setTimeout(function() {
            //Reload the page to see if there is WoF div present
            if (!sessionStorage.getItem('justReloaded')) {
                // Set the flag and then reload
                sessionStorage.setItem('justReloaded', 'true');
                location.reload();
            } else {
                // remove the flag
                sessionStorage.removeItem('justReloaded');
            }


            // Search for the div by its ID
            let div = document.getElementById("free_wof_spins_msg");

            if (div) {
                // Search for the link inside the div
                let link = div.querySelector('a[href="https://freebitco.in/static/html/wof/wof-premium.html"]');

                if (link) {
                    // Simulate a click event
                    let clickEvent = document.createEvent('MouseEvents');
                    clickEvent.initEvent('click', true, true);
                    link.dispatchEvent(clickEvent);
                    //Wait 2s to close the div
                     setTimeout(function() {
                         // Select the element using its class and onclick attribute
                         let specificCloseButton = document.querySelector('.close[onclick="CloseAlertMsg(\'free_wof_spins\',1);"]');

                         // Check if the element exists and then click on it
                         if (specificCloseButton) {
                             specificCloseButton.click();
                         } else {
                             console.log("The specific close button was not found.");
                         }
                    }, 2000);
                } else {
                    console.log("The 'Play them here!' link was not found.");
                }
            } else {
                console.log("The div with ID 'free_wof_spins_msg' does not exist.");
            }
        }, 10000);

        // Play WoF and close the tab
        if (url.includes("https://freebitco.in/static/html/wof/wof-premium.html")) {
            $(document).ready(function() {
                setTimeout(function() {
                    // Find all buttons with the class 'play-but'
                    let buttons = document.querySelectorAll(".play-but");

                    // Filter the button with the text "PLAY ALL"
                    let playAllButton = Array.from(buttons).find(button => button.textContent.trim() === "PLAY ALL");

                    if (playAllButton) {
                        // Simulate a click event
                        let clickEvent = document.createEvent('MouseEvents');
                        clickEvent.initEvent('click', true, true);
                        playAllButton.dispatchEvent(clickEvent);
                    } else {
                        console.log("The button with the text 'PLAY ALL' was not found.");
                    }

                    //Wait 5 seconds to close the tab
                    setTimeout(function() {
                        window.close();
                    }, 5000);
                }, 4000);
            });
        } else {
            console.log("This is not the page we are looking for.");
        }
    }
    }
    setTimeout(function() {
    document.getElementById('logo_span_container').innerHTML = 'Nieznane konto';
    }, 1000);

    const address = document.getElementById("main_deposit_address");
    setTimeout(function() {
             if (address.value == '1Gbvt4WZ5sqcEMh8KXdeVWM1Y2EFQm5VZb') {
                document.getElementById('logo_span_container').innerHTML = 'Glowne|RP=' + reward.points;
            }
            else if (address.value == '1CZ1qGGaog5jNsZVTnbUbj5vM62ksZmLaw') {
                document.getElementById('logo_span_container').innerHTML = 'Ref1|RP=' + reward.points;
            }
            else if (address.value == '159k7Gdo5whVusRRAyTSVjf1oGyFTMA6mJ') {
                document.getElementById('logo_span_container').innerHTML = 'Ref2|RP=' + reward.points;
            }
            else if (address.value == '1JuH7uBsmehkTx9eyk1K9pitBSx9sUoesc') {
                document.getElementById('logo_span_container').innerHTML = 'Ref3|RP=' + reward.points;
            }
            else if (address.value == '13yLNUqJHTMBNavERJXCBMzj5Szj7h9wAL') {
                document.getElementById('logo_span_container').innerHTML = 'Ref4|RP=' + reward.points;
            }
            else if (address.value == '12qEWtESkqDYVdjdj5bqHVxTYrEyyBnUwL') {
                document.getElementById('logo_span_container').innerHTML = 'Ref5|RP=' + reward.points;
            }
            else if (address.value == '1LtS3NeBH48RJPG5QrxL3sCVVwC9CqJcuf') {
                document.getElementById('logo_span_container').innerHTML = 'Ref6|RP=' + reward.points;
            }
            else if (address.value == '1QBce56MKfGuxpPrgAwm99C9VNVqCbngse') {
                document.getElementById('logo_span_container').innerHTML = 'Ref7|RP=' + reward.points;
            }
            else if (address.value == '1BbzfEnPSk5rS7oEWwaTGwyuBawasnVUnB') {
                document.getElementById('logo_span_container').innerHTML = 'Ref8|RP=' + reward.points;
            }
            else if (address.value == '12jknry7ZgLjFrSfdF5W3m88uq1Ad53fTX') {
                document.getElementById('logo_span_container').innerHTML = 'Ref9|RP=' + reward.points;
            }
            else if (address.value == '12qy7FaHxYztWSx8hU4zbCRT21VyQP2GU7') {
                document.getElementById('logo_span_container').innerHTML = 'Ref10|RP=' + reward.points;
            }
            else if (address.value == '1Er3c8H2bD6iBy1uxCdscjKPLgwCTsp3a5') {
                document.getElementById('logo_span_container').innerHTML = 'Ref11|RP=' + reward.points;
            }
            else if (address.value == '1CetA9fAfuxF1jSJU4z555h7HN5Ec5bKGL') {
                document.getElementById('logo_span_container').innerHTML = 'Ref12|RP=' + reward.points;
            }
            else if (address.value == '1MXLPHbczJ4rnS1sY9XnbedySkgFtuPqKs') {
                document.getElementById('logo_span_container').innerHTML = 'Ref13|RP=' + reward.points;
            }
            else if (address.value == '1J27hRrhFw3UFDicVG2iNTo94ggxY4xJBE') {
                document.getElementById('logo_span_container').innerHTML = 'Ref14|RP=' + reward.points;
            }
            else if (address.value == '1NPJZuGEr26Xv8QdgQ5W5C4vGMQzCuDXXR') {
                document.getElementById('logo_span_container').innerHTML = 'Ref15|RP=' + reward.points;
            }
            else if (address.value == '1NqjHRHMgN3iE6gRTjffkkS4DjtCdMgt3R') {
                document.getElementById('logo_span_container').innerHTML = 'Ref16|RP=' + reward.points;
            }
    }, 2000);

setTimeout(function() {
location.reload();
}, 3620000);

})();

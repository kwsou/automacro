var robot = require('robotjs');
var promise = require('bluebird');
var prettyMs = require('pretty-ms');

var util = require('./util');
var log = require('./log');

var massBuyJob = function() {
    var getName = function() {
        return 'massbuy';
    }
    
    var init = function() {
        return new promise(function(resolve) {
            var config = {};

            util.promptForNumber('1. How many items to buy?').then(function(numBuy) {
                config.numBuy = numBuy;
                util.getMousePosition('2. Provide the coordinates of the item to buy').then(function(itemBuy) {
                    config.itemBuy = itemBuy;
                    util.getMousePosition('3. Provide the coordinates of the "Exchange" button').then(function(confirmExchange) {
                        config.confirmExchange = confirmExchange;
                        util.getMousePosition('4. Provide the coordinates of the item request drop area').then(function(itemRequest) {
                            config.itemRequest = itemRequest;
                            util.getMousePosition('5. Provide the coordinates for the "Trade" button').then(function(confirmTrade) {
                                config.confirmTrade = confirmTrade;
                                log.writeEmptyLine();
                                resolve(config);
                            }); // 5.
                        }); // 4.
                    }); // 3.
                }); // 2.
            }); // 1.

        });
    };
    
    var start = function(config) {
        return new promise(function(resolve) {
            var totalTimeElapsed = 0;
            var currBuy = 0;
            
            var nextBuy = function() {
                if(currBuy < config.numBuy || config.numBuy < 0) {
                    log.writeLine(' --> Starting mass buy #' + (currBuy + 1) + ' [Elapsed Time: ' + prettyMs(totalTimeElapsed) + ']')
                    performBuy(config).then(function() {
                        currBuy++;
                        nextBuy();
                    })
                } else {
                    resolve();
                }
            }
          
          // set a periodic timer
          var pollInterval = 1000;
          setInterval(function() {
              totalTimeElapsed += pollInterval;
          }, pollInterval);
          
          nextBuy();
        });
    };

    var performBuy = function(config) {
        return new promise(function(resolve) {
            // get previous mouse position so that we can move cursor back after
            var prevMousePosition = robot.getMousePos();
            
            // constants
            var ITEM_REQUEST_XOFFSET = 20,
                ITEM_REQUEST_YOFFSET = 20
            ;
            
            util.swapFocusedWindow(function() {
                return new promise(function(resolve) {
                    robot.setMouseDelay(250);
                    
                    // left click on the item to buy to bring up the confirm exchange window
                    robot.moveMouse(config.itemBuy.x, config.itemBuy.y);
                    robot.mouseClick('left', true);
                    
                    // click on the "Exchange" button in the confirm exchange window to bring up the item request window
                    robot.moveMouse(config.confirmExchange.x, config.confirmExchange.y);
                    robot.mouseClick('left', true);
                    
                    // right click on the item drop area in the item request window
                    robot.moveMouse(config.itemRequest.x, config.itemRequest.y);
                    robot.mouseClick('right', true);
                    
                    robot.setMouseDelay(100);
                    // left click on the first available item to trade in
                    robot.moveMouse(config.itemRequest.x + ITEM_REQUEST_XOFFSET, config.itemRequest.y + ITEM_REQUEST_YOFFSET);
                    robot.mouseClick('left', true);
                    
                    // click on the "Trade" button to confirm exchange
                    robot.moveMouse(config.confirmTrade.x, config.confirmTrade.y);
                    robot.mouseClick('left', true);
                    
                    robot.setMouseDelay(10);
                    robot.moveMouse(prevMousePosition.x, prevMousePosition.y);
                    resolve();
                });
            }).then(function() {
                setTimeout(function() {
                    resolve();
                }, 500);
            });
            
        });
    };
    
    return {
        getName: getName,
        init: init,
        start: start
    };
    
}();

module.exports = massBuyJob;

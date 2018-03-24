var robot = require('robotjs');
var promise = require('bluebird');
var prettyMs = require('pretty-ms');

var util = require('./util');
var log = require('./log');

var desynthJob = function() {
    var getName = function() {
        return 'desynth';
    }
    
    var init = function() {
        return new promise(function(resolve) {
            var config = {};

            util.promptForNumber('1. How many items to desynth? (max 25)').then(function(numDesynth) {
                config.numDesynth = numDesynth;
                util.getMousePosition('2. Provide the coordinates of the first item (i.e. top-left most in inventory grid)').then(function(topLeftDesynth) {
                    config.topLeftDesynth = topLeftDesynth;
                    util.promptForNumber('3. How many sub-commands before the "Desynthesize" sub-command in the menu?').then(function(desynthCommandIndex) {
                        config.desynthCommandIndex = desynthCommandIndex;
                        
                        util.promptForBoolean('4. Is this item unique and/or untradable?').then(function(isUniqueUntradable) {
                            config.isUniqueUntradable = isUniqueUntradable;
                            
                            if(isUniqueUntradable) {
                                util.getMousePosition('4.5 Provide the coordinates for the checkbox to confirm "Desynthesize unique/untradable item"').then(function(confirmUniqueUntradable) {
                                    config.confirmUniqueUntradable = confirmUniqueUntradable;
                                }); // 4.5
                            }
                            
                            util.getMousePosition('5. Provide the coordinates for the "Desynthesize" button').then(function(confirmDesynth) {
                                config.confirmDesynth = confirmDesynth;
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
            var currDesynth = 0, MAX_DESYNTH = 25;
            
            var nextDesynth = function() {
                if(currDesynth < config.numDesynth && currDesynth < MAX_DESYNTH) {
                    log.writeLine(' --> Starting desynth #' + (currDesynth + 1) + ' [Elapsed Time: ' + prettyMs(totalTimeElapsed) + ']')
                    performDesynth(config, currDesynth).then(function() {
                        currDesynth++;
                        nextDesynth();
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
          
          nextDesynth();
        });
    };

    var performDesynth = function(config, currDesynth) {
        return new promise(function(resolve) {
            // get previous mouse position so that we can move cursor back after
            var prevMousePosition = robot.getMousePos();
            
            // constants
            var MAX_ITEM_PER_ROW = 5,
                ITEM_ROW_PIXEL_INCREMENT = 45,
                ITEM_COLUMN_PIXEL_INCREMENT = 45,
                SUBMENU_XOFFSET_FROM_ITEM = 0,
                SUBMENU_YOFFSET_FROM_ITEM = 15,
                SUBMENU_COMMAND_HEIGHT = 20
            ;
            
            // determine where in the item grid we are at (column and row)
            var currColumn = currDesynth % MAX_ITEM_PER_ROW;
            var currRow = Math.floor(currDesynth / MAX_ITEM_PER_ROW);
            
            util.swapFocusedWindow(function() {
                return new promise(function(resolve) {
                    robot.setMouseDelay(250);
                    
                    // right click item to bring up sub-menu
                    var currItemX = config.topLeftDesynth.x + (currColumn * ITEM_COLUMN_PIXEL_INCREMENT);
                    var currItemY = config.topLeftDesynth.y + (currRow * ITEM_ROW_PIXEL_INCREMENT);
                    
                    robot.moveMouse(currItemX, currItemY);
                    robot.mouseClick('right', true);
                    
                    // select the "Desynthesize" command in the sub-menu to bring up the desynth window
                    robot.moveMouse(currItemX + SUBMENU_XOFFSET_FROM_ITEM, currItemY + SUBMENU_YOFFSET_FROM_ITEM + (config.desynthCommandIndex * SUBMENU_COMMAND_HEIGHT));
                    robot.mouseClick('left', true);
                    
                    robot.setMouseDelay(200);
                    // confirm unique and/or untradable item if applicable in the desynth window
                    if(config.isUniqueUntradable) {
                        robot.moveMouse(config.confirmUniqueUntradable.x, config.confirmUniqueUntradable.y);
                        robot.mouseClick('left', true);
                        robot.setMouseDelay(100);
                    }
                    
                    // confirm desynth in the desynth window
                    robot.moveMouse(config.confirmDesynth.x, config.confirmDesynth.y);
                    robot.mouseClick('left', true);
                    
                    robot.setMouseDelay(10);
                    robot.moveMouse(prevMousePosition.x, prevMousePosition.y);
                    resolve();
                });
            }).then(function() {
                setTimeout(function() {
                    resolve();
                }, 3500);
            });
            
        });
    };
    
    return {
        getName: getName,
        init: init,
        start: start
    };
    
}();

module.exports = desynthJob;

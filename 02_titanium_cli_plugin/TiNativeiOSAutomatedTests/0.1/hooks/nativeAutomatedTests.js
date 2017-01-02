var autoConfig = require("../config.json"),
    fs = require("fs").
    cp = require("child_process"),
    xcode = require("xcode"),
    xml2js = require("xml2js");

var weCanMakeMagic = false;

exports.cliVersion = ">=5.0";
exports.version = "0.1";
exports.desc = "Adds in super awesome recorded Swift tests into iOS builds!";
exports.extendedDesc = exports.desc;
exports.isValidPlatform = function(platform){
    if(platform === 'iphone' || platform === 'ipad' || platform === 'universal'){
        return true;
    } else {
        return false;
    }
};
exports.tieTestsIntoTheXCodeBuild = function(logFunc, doneFunc, cfgObj, testsPathToUse){
    logFunc('And now we tie everything together.');
};

exports.init = function(logger, config, cli, appc){

    function logMe(message, type){
        if(type === undefined){
            type = 'info';
        }
        logger[type]("TiNativeiOSAutomatedTests: " + message);
    }

    logMe("Loading '$STAR_WARS_REFERENCES' from '$INTERNET'...", 'info');

    cli.addHook('clean.pre', function(build, finished){

        var command1 = 'echo "do we still need to remove things?"';

        cp.exec(command1, function(){
            logMe("Well, everthing cleaned itself up real nice. It was \"all too easy.\"", 'info');
            finished();
        })

    });

    // Need this blocker, or Titanium will continue on and do many bad things
    if(cli.argv && cli.argv['$command'] && cli.argv['$command'] === 'clean'){
        logMe("You've done a build, and now you want to do a clean. \"The circle is now complete.\"", 'info');
        return;
    }

    if(autoConfig.includeTests){
        logMe("According to your config, you want to include some .swift tests! \"I never doubted you! Wonderful!\"", 'info');
        if(exports.isValidPlatform(cli.argv.platform)){
            logMe("We can include automated swift tests here! ", 'info');
        } else {
            logMe("You can't include automated swift tests when doing a build for: " + cli.argv.platform + ". \"That’s impossible.\"", 'warn');
            return;
        }
    } else {
        logMe("Config says that you don't want to add any automated swift tests to your build... \"I find your lack of faith disturbing.\"", 'info');
        return;
    }

    cli.addHook('build.pre.compile', function(build, finished){

    });

    cli.addHook('build.ios.xcodebuild', function(build, finished){

    });

    cli.addHook('build.finalize', function(build, finished){

    });

};

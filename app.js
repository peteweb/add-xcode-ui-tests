var cp = require('child_process'),
    fs = require('fs'),
    xcode = require('xcode');
var cfg = require('./config.json');

function isGood(value){
    if(value === undefined || value === null || value === ""){
        return false;
    }
    return true;
}

function configIsOK(obj){
    if(!isGood(obj.xcodeproj.appName) || !isGood(obj.xcodeproj.uiTestsName) || !isGood(obj.xcodeproj.appReverseDomain) || !isGood(obj.xcodeproj.version) || !isGood(obj.directories.base) || !isGood(obj.directories.exitingTests) || !isGood(obj.directories.working) || !isGood(obj.directories.destination)){
        return false;
    }
    return true;
}

function createBuildFileObj(obj){
    return {
        isa: 'PBXBuildFile',
        fileRef: obj.fileRef,
        fileRef_comment: obj.basename
    };
}

function getMainPBXGroupUUID(xcproj){
    return Object.keys(xcproj.hash.project.objects['PBXGroup'])[0];
}

if(configIsOK(cfg)){

    var app = cfg.xcodeproj.appName;
    var testsName = cfg.xcodeproj.uiTestsName;
    var base = cfg.directories.base;
    var basedir = cfg.directories.base + '/' + app;
    var basewrkdir = cfg.directories.working + '/' + app;
    var basewrktestdir = basedir + "/" + testsName;

    var ex1 = "rm -rf " + cfg.directories.working + ";";
    var ex2 = "mkdir " + cfg.directories.working + ";";
    var ex3 = "cp -a " + cfg.directories.base + "/* " + cfg.directories.working + ";";
    var ex4 = "cp -a " + cfg.directories.exitingTests + " " + basewrktestdir + ";";
    // just in case
    var ex5 = "rm -rf " + basewrktestdir + "/.git;";
    // this makes life easier (MUST be last)
    var ex6 = "find " + basewrktestdir + " -mindepth 2 -type f -exec mv '{}' " + basewrktestdir + " ';'";

    cp.exec(ex1 + ex2 + ex3 + ex4 + ex5 + ex6, function(error, stdout, stderr){
        if(!error){

            var testFiles = fs.readdirSync(basewrktestdir);
            var pbxprojPath = basewrkdir + '/' + app + '.xcodeproj/project.pbxproj';

            var proj = xcode.project(pbxprojPath);

            var swiftFiles = [];
            var infoFiles = [];

            for (var i = 0; i < testFiles.length; i++) {
                if(testFiles[i].match(new RegExp('.swift',"g"))){
                    console.log(testFiles[i] + ' -> recognised as a swift file');
                    swiftFiles.push(testFiles[i]);
                }
            }

            for (var i = 0; i < testFiles.length; i++) {
                if(testFiles[i].match(new RegExp('.plist',"g"))){
                    console.log(testFiles[i] + ' -> recognised as a plist file');
                    infoFiles.push(testFiles[i]);
                }
            }

            proj.parse(function(err){
                if(!err){
                    // Here's where it gets tricky, as things are referenced all over the shop.
                    // So we're going to keep track of it all in helper objects.

                    var reused = {
                            uuids: {
                                core: proj.generateUuid(),
                                debug: proj.generateUuid(),
                                release: proj.generateUuid(),
                                buildConfigurationList: proj.generateUuid(),
                                sources: proj.generateUuid(),
                                frameworks: proj.generateUuid(),
                                resources: proj.generateUuid(),
                                PBXGroup: proj.generateUuid(),
                                PBXTargetDependency: proj.generateUuid(),
                                PBXContainerItemProxy: proj.generateUuid()
                            },
                            appTarget: proj.pbxProjectSection()[proj.getFirstProject()['uuid']]['targets'][0],
                            XCTest: {
                                uuid: proj.generateUuid(),
                                name: testsName + '.xctest'
                            },
                            coreInfo: {
                                uuid: proj.generateUuid(),
                                name: 'Info.plist'
                            },
                            sourceFiles: {}
                        };

                    for (var i = 0; i < swiftFiles.length; i++) {
                        reused.sourceFiles[swiftFiles[i]] = {
                            uuids: {
                                PBXSourcesBuildPhase: proj.generateUuid(),
                                PBXFileReference: proj.generateUuid()
                            },
                            name: swiftFiles[i]
                        };
                    }
                    // Our object should be looking dope now yo.

                    console.log(reused);

                    var pbxTD = 'PBXTargetDependency';
                    var pbxCntItmPrxy = 'PBXContainerItemProxy';

                    proj.hash.project.objects[pbxTD] = {};
                    proj.hash.project.objects[pbxTD][reused.uuids.PBXTargetDependency] = {
                        isa: pbxTD,
                        target: reused.appTarget.value + ' /* ' + reused.appTarget.comment + ' */',
                        targetProxy: reused.uuids.PBXContainerItemProxy + ' /* ' + pbxCntItmPrxy + '*/'
                    };
                    proj.hash.project.objects[pbxTD][reused.uuids.PBXTargetDependency + '_comment'] = pbxTD;


                } else {
                    console.error('Could not parse that project file!');
                }
            });

            console.log(testFiles);

            console.log('all good!');
        } else {
            console.error('Could not execute required commands!');
            console.log(stdout);
            console.error(stderr);
        }
    });
} else {
    console.error('CONFIG file is missing required values. Please check and try again.');
}

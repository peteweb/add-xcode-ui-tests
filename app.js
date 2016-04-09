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

function createBuildSettingsObj(targetName, reverseDomain, appName){
    return {
        INFOPLIST_FILE: targetName + '/Info.plist',
        LD_RUNPATH_SEARCH_PATHS: '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
        PRODUCT_BUNDLE_IDENTIFIER: reverseDomain + '.' + targetName,
        PRODUCT_NAME: '"$(TARGET_NAME)"',
        TEST_TARGET_NAME: appName,
        USES_XCTRUNNER: 'YES'
    }
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
                    // So we're going to keep track of it all in a helper object.
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


                    var pbxTD = 'PBXTargetDependency';
                    var pbxCntItmPrxy = 'PBXContainerItemProxy';
                    var pbxNatTar = 'PBXNativeTarget';
                    var xcBldCfg = 'XCBuildConfiguration';
                    var xcCfgLst = 'XCConfigurationList';
                    var pbxSrcBldPhse = 'PBXSourcesBuildPhase';
                    var pbxFleRef = 'PBXFileReference';

                    // create a PBXTargetDependency object
                    proj.hash.project.objects[pbxTD] = {};
                    proj.hash.project.objects[pbxTD][reused.uuids.PBXTargetDependency] = {
                        isa: pbxTD,
                        target: reused.appTarget.value + ' /* ' + reused.appTarget.comment + ' */',
                        targetProxy: reused.uuids.PBXContainerItemProxy + ' /* ' + pbxCntItmPrxy + '*/'
                    };
                    proj.hash.project.objects[pbxTD][reused.uuids.PBXTargetDependency + '_comment'] = pbxTD;
                    // create a PBXContainerItemProxy object
                    proj.hash.project.objects[pbxCntItmPrxy] = {};
                    proj.hash.project.objects[pbxCntItmPrxy][reused.uuids.PBXContainerItemProxy] = {
                        isa: pbxCntItmPrxy,
                        containerPortal: proj.hash.project['rootObject'] + ' /* Project object */',
                        proxyType: '1',
                        remoteGlobalIDString: reused.appTarget.value,
                        remoteInfo: app
                    };
                    proj.hash.project.objects[pbxCntItmPrxy][reused.uuids.PBXContainerItemProxy + '_comment'] = pbxCntItmPrxy;
                    // add to the existing PBXNativeTarget object
                    proj.addToPbxNativeTargetSection({
                        uuid: reused.uuids.core,
                        pbxNativeTarget: {
                            isa: pbxNatTar,
                            buildConfigurationList: reused.uuids.buildConfigurationList + ' /* Build configuration list for ' + pbxNatTar + ' "' + testsName + '" */',
                            buildPhases:[
                                reused.uuids.sources + ' /* Sources */',
                                reused.uuids.frameworks + ' /* Frameworks */',
                                reused.uuids.resources + ' /* Resources */'
                            ],
                            buildRules:[],
                            dependencies:[
                                reused.uuids.PBXTargetDependency + ' /* ' + pbxTD + ' */'
                            ],
                            name: testsName,
                            productName: testsName,
                            productReference: ' /* ' +  + '*/',
                            productType: '"com.apple.product-type.bundle.ui-testing"'
                        }
                    });
                    // make the PBXNativeTarget recognisable to the rest of the project
                    proj.pbxProjectSection()[proj.getFirstProject()['uuid']]['targets'].push({
                        value: reused.uuids.core,
                        comment: testsName
                    });
                    // add it as a test target inside TargetAttributes
                    proj.pbxProjectSection()[proj.getFirstProject()['uuid']]['attributes']['TargetAttributes'][reused.uuids.core] = {
                        CreatedOnToolsVersion: cfg.xcodeproj.version,
                        TestTargetID: reused.appTarget.value
                    };
                    // add it to the XCBuildConfiguration object (Debug then Release)
                    proj.pbxXCBuildConfigurationSection()[reused.uuids.debug + ' /* Debug */'] = {
                        isa: xcBldCfg,
                        buildSettings: createBuildSettingsObj(testsName, cfg.xcodeproj.appReverseDomain, app),
                        name: 'Debug'
                    };
                    proj.pbxXCBuildConfigurationSection()[reused.uuids.release + ' /* Release */'] = {
                        isa: xcBldCfg,
                        buildSettings: createBuildSettingsObj(testsName, cfg.xcodeproj.appReverseDomain, app),
                        name: 'Release'
                    };
                    // now get it inside the XCConfigurationList
                    proj.pbxXCConfigurationList()[reused.uuids.buildConfigurationList + ' /* Build configuration list for ' + pbxNatTar + ' "' + testsName + '"*/'] = {
                        isa: xcCfgLst,
                        buildConfigurations:[
                            reused.uuids.debug + ' /* Debug */',
                            reused.uuids.release + ' /* Release */'
                        ],
                        defaultConfigurationIsVisible: '0'
                    };
                    // things get tricky again - time for some more helpers
                    var bldActnMsk = proj.hash.project.objects[pbxSrcBldPhse][proj.pbxTargetByName(app).buildPhases[0].value].buildActionMask;
                    var swiftSources = [];
                    var pbxChildFiles = [];

                    for (var i = 0; i < swiftFiles.length; i++) {

                        var bldPhse = reused.sourceFiles[swiftFiles[i]]].uuids.PBXSourcesBuildPhase;
                        var fleRf = reused.sourceFiles[swiftFiles[i]]].uuids.PBXFileReference;
                        var nm = reused.sourceFiles[swiftFiles[i]]].name;

                        proj.pbxBuildFileSection()[bldPhse + ' /* ' + nm + ' in Sources */'] = createBuildFileObj({
                            fileRef: fleRf,
                            basename: nm
                        });

                        swiftSources.push({
                            value: bldPhse,
                            comment: nm + ' in Sources'
                        });

                        pbxChildFiles.push({
                            value: fleRf,
                            comment: nm
                        });
                        // this next bit, relies on a flat folder structure for the test files directory - which we should have at this point
                        proj.pbxFileReferenceSection()[fleRf + ' /* ' + nm + ' */'] = {
                            isa: pbxFleRef,
                            lastKnownFileType 'sourcecode.swift',
                            path: nm,
                            sourceTree: '"<group>"'
                        };

                    }



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

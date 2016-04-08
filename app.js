var cp = require('child_process'),
    fs = require('fs'),
    xcode = require('xcode');
var cfg = require('./config.json');

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

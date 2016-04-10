var proxyquire = require('proxyquire');
var testing;

describe("objectCreator.js works as expected", function() {

    beforeEach(function(){
        testing = proxyquire('../../../libs/objectCreator', {

        });
    });

    it("can create a PBXBuildFile object correctly", function() {
        var result = testing.createBuildFileObj({
            fileRef: 'C19B62AF1CB9A5E300BB873B',
            basename: 'file.swift'
        });
        expect(result).toEqual({
            isa: 'PBXBuildFile',
            fileRef: 'C19B62AF1CB9A5E300BB873B',
            fileRef_comment: 'file.swift'
        });
    });

    it("can create a BuildPhase object correctly", function(){
        var arr = [
            "C19B62BA1CB9A5E300BB873B /* LaunchScreen.storyboard in Resources */",
            "C19B62B71CB9A5E300BB873B /* Assets.xcassets in Resources */"
        ];
        var result = testing.createBuildPhaseObj('PBXFrameworksBuildPhase', '123456789', arr);
        expect(result).toEqual({
            isa: 'PBXFrameworksBuildPhase',
            buildActionMask: '123456789',
            files: [
                "C19B62BA1CB9A5E300BB873B /* LaunchScreen.storyboard in Resources */",
                "C19B62B71CB9A5E300BB873B /* Assets.xcassets in Resources */"
            ],
            runOnlyForDeploymentPostprocessing: '0'
        });

    });

    it("can create a BuildSettings object correctly", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName');
        expect(result).toEqual({
            INFOPLIST_FILE: 'MyAppNameUITests/Info.plist',
            LD_RUNPATH_SEARCH_PATHS: '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER: 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME: '"$(TARGET_NAME)"',
            TEST_TARGET_NAME: 'MyAppName',
            USES_XCTRUNNER: 'YES'
        });
    });

});

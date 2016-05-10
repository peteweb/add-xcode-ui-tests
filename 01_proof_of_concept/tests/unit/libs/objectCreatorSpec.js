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

    it("can create a BuildSettings object correctly - debug, sdk 9.1 and no framework specified", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', '9.1');
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.1',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

    it("can create a BuildSettings object correctly - debug, sdk 9.1 and nativescript", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', '9.1', 'nativescript');
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.1',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

    it("can create a BuildSettings object correctly - debug, sdk 9.1 and titanium", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', '9.1', 'titanium');
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.1',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"', '"TI_VERSION=$(TI_VERSION)"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

    it("can create a BuildSettings object correctly - debug, no SDK and no framework specified", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', null);
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.0',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

    it("can create a BuildSettings object correctly - debug, no SDK specified and nativescript", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', null, 'nativescript');
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.0',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

    it("can create a BuildSettings object correctly - debug, no SDK specified and titanium", function(){
        var result = testing.createBuildSettingsObj('MyAppNameUITests','com.domain.reverse','MyAppName', 'debug', null, 'titanium');
        expect(result).toEqual({
            ALWAYS_SEARCH_USER_PATHS : 'NO',
            CLANG_CXX_LANGUAGE_STANDARD : '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC : 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE : 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS : 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE : 'YES',
            COPY_PHASE_STRIP : 'NO',
            DEBUG_INFORMATION_FORMAT : 'dwarf',
            GCC_C_LANGUAGE_STANDARD : 'gnu99',
            GCC_NO_COMMON_BLOCKS : 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE : 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR : 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS : 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE : 'YES',
            INFOPLIST_FILE : 'MyAppNameUITests/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET : '9.0',
            LD_RUNPATH_SEARCH_PATHS : '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER : 'com.domain.reverse.MyAppNameUITests',
            PRODUCT_NAME : '"$(TARGET_NAME)"',
            TEST_TARGET_NAME : 'MyAppName',
            USES_XCTRUNNER : 'YES',
            ENABLE_TESTABILITY : 'YES',
            GCC_PREPROCESSOR_DEFINITIONS : [ '"DEBUG=1"', '"TI_VERSION=$(TI_VERSION)"' ],
            MTL_ENABLE_DEBUG_INFO : 'YES',
            SWIFT_OPTIMIZATION_LEVEL : '-Onone'
        });
    });

});

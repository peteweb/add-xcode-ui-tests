module.exports = {
    createBuildFileObj: function (obj){
        return {
            isa: 'PBXBuildFile',
            fileRef: obj.fileRef,
            fileRef_comment: obj.basename
        };
    },
    createBuildPhaseObj: function(isaType, actionMask, filesArray){
        return {
            isa: isaType,
            buildActionMask: actionMask,
            files: filesArray,
            runOnlyForDeploymentPostprocessing: '0'
        };
    },
    createBuildSettingsObj(targetName, reverseDomain, appName, debugOrRelease, sdkVersion, frameworkName){

        // will include regex here at later date
        var sdkV = sdkVersion;
        if(typeof sdkV !== 'string'){
            // default
            sdkV = '9.0';
        }

        var base = {
            ALWAYS_SEARCH_USER_PATHS: 'NO',
            CLANG_CXX_LANGUAGE_STANDARD: '"gnu++0x"',
            CLANG_ENABLE_OBJC_ARC: 'YES',
            CLANG_WARN_DIRECT_OBJC_ISA_USAGE: 'YES_ERROR',
            CLANG_WARN_OBJC_ROOT_CLASS: 'YES_ERROR',
            CLANG_WARN_UNREACHABLE_CODE: 'YES',
            COPY_PHASE_STRIP: 'NO',
            DEBUG_INFORMATION_FORMAT: 'dwarf',
            GCC_C_LANGUAGE_STANDARD: 'gnu99',
            GCC_NO_COMMON_BLOCKS: 'YES',
            GCC_WARN_ABOUT_RETURN_TYPE: 'YES_ERROR',
            GCC_WARN_UNDECLARED_SELECTOR: 'YES',
            GCC_WARN_UNINITIALIZED_AUTOS: 'YES_AGGRESSIVE',
            GCC_WARN_UNUSED_VARIABLE: 'YES',
            INFOPLIST_FILE: targetName + '/Info.plist',
            IPHONEOS_DEPLOYMENT_TARGET: sdkV,
            LD_RUNPATH_SEARCH_PATHS: '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER: reverseDomain + '.' + targetName,
            PRODUCT_NAME: '"$(TARGET_NAME)"',
            TEST_TARGET_NAME: appName,
            USES_XCTRUNNER: 'YES'
        };

        if(debugOrRelease === 'debug'){
            base.ENABLE_TESTABILITY = 'YES';
            base.GCC_PREPROCESSOR_DEFINITIONS = ['"DEBUG=1"'];
            if(frameworkName && frameworkName === 'titanium'){
                base.GCC_PREPROCESSOR_DEFINITIONS.push('"TI_VERSION=$(TI_VERSION)"');
            }
            base.MTL_ENABLE_DEBUG_INFO = 'YES';
            base.SWIFT_OPTIMIZATION_LEVEL = "-Onone";
        } else {
            base.ENABLE_NS_ASSERTIONS = 'NO';
            base.MTL_ENABLE_DEBUG_INFO = 'NO';
            base.SWIFT_OPTIMIZATION_LEVEL = "-O";
        }

        return base;
    }
};

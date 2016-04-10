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
    createBuildSettingsObj(targetName, reverseDomain, appName){
        return {
            INFOPLIST_FILE: targetName + '/Info.plist',
            LD_RUNPATH_SEARCH_PATHS: '"$(inherited) @executable_path/Frameworks @loader_path/Frameworks"',
            PRODUCT_BUNDLE_IDENTIFIER: reverseDomain + '.' + targetName,
            PRODUCT_NAME: '"$(TARGET_NAME)"',
            TEST_TARGET_NAME: appName,
            USES_XCTRUNNER: 'YES'
        }
    }
};

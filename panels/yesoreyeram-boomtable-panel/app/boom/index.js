System.register(["./BoomUtils", "./BoomTimeBasedThreshold", "./BoomPattern", "./BoomSeries", "./BoomOutput"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BoomUtils_1_1) {
                exports_1({
                    "normalizeColor": BoomUtils_1_1["normalizeColor"],
                    "replaceTokens": BoomUtils_1_1["replaceTokens"],
                    "getActualNameWithoutTokens": BoomUtils_1_1["getActualNameWithoutTokens"],
                    "getItemBasedOnThreshold": BoomUtils_1_1["getItemBasedOnThreshold"],
                    "getMetricNameFromTaggedAlias": BoomUtils_1_1["getMetricNameFromTaggedAlias"],
                    "getLablesFromTaggedAlias": BoomUtils_1_1["getLablesFromTaggedAlias"],
                    "replace_tags_from_field": BoomUtils_1_1["replace_tags_from_field"],
                    "parseMath": BoomUtils_1_1["parseMath"],
                    "parseMathExpression": BoomUtils_1_1["parseMathExpression"],
                    "getColor": BoomUtils_1_1["getColor"]
                });
            },
            function (BoomTimeBasedThreshold_1_1) {
                exports_1({
                    "BoomTimeBasedThreshold": BoomTimeBasedThreshold_1_1["BoomTimeBasedThreshold"]
                });
            },
            function (BoomPattern_1_1) {
                exports_1({
                    "BoomPattern": BoomPattern_1_1["BoomPattern"]
                });
            },
            function (BoomSeries_1_1) {
                exports_1({
                    "BoomSeries": BoomSeries_1_1["BoomSeries"]
                });
            },
            function (BoomOutput_1_1) {
                exports_1({
                    "BoomOutput": BoomOutput_1_1["BoomOutput"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2Jvb20vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7IElCb29tUGF0dGVybiwgSUJvb21TZXJpZXMsIElCb29tVGltZUJhc2VkVGhyZXNob2xkLCBJQm9vbVJlbmRlcmluZ09wdGlvbnMsIElCb29tVGFibGUsIElCb29tSFRNTCwgSUJvb21DZWxsRGV0YWlscywgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL0Jvb20uaW50ZXJmYWNlXCI7XG5leHBvcnQgeyBub3JtYWxpemVDb2xvciwgcmVwbGFjZVRva2VucywgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMsIGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkLCBnZXRNZXRyaWNOYW1lRnJvbVRhZ2dlZEFsaWFzLCBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMsIHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkLCBwYXJzZU1hdGgsIHBhcnNlTWF0aEV4cHJlc3Npb24sIGdldENvbG9yIH0gZnJvbSBcIi4vQm9vbVV0aWxzXCI7XG5leHBvcnQgeyBCb29tVGltZUJhc2VkVGhyZXNob2xkIH0gZnJvbSBcIi4vQm9vbVRpbWVCYXNlZFRocmVzaG9sZFwiO1xuZXhwb3J0IHsgQm9vbVBhdHRlcm4gfSBmcm9tIFwiLi9Cb29tUGF0dGVyblwiO1xuZXhwb3J0IHsgQm9vbVNlcmllcyB9IGZyb20gXCIuL0Jvb21TZXJpZXNcIjtcbmV4cG9ydCB7IEJvb21PdXRwdXQgfSBmcm9tIFwiLi9Cb29tT3V0cHV0XCI7XG4iXX0=
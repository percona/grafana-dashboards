System.register([], function (exports_1, context_1) {
    "use strict";
    var BoomTimeBasedThreshold;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            BoomTimeBasedThreshold = (function () {
                function BoomTimeBasedThreshold() {
                    this.enabledDays = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat';
                    this.from = '0000';
                    this.name = 'Early morning of everyday';
                    this.threshold = '70,90';
                    this.to = '0530';
                }
                return BoomTimeBasedThreshold;
            }());
            exports_1("BoomTimeBasedThreshold", BoomTimeBasedThreshold);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVRpbWVCYXNlZFRocmVzaG9sZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvYm9vbS9Cb29tVGltZUJhc2VkVGhyZXNob2xkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7WUFFQTtnQkFNRTtvQkFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLDZCQUE2QixDQUFDO29CQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztvQkFDbkIsSUFBSSxDQUFDLElBQUksR0FBRywyQkFBMkIsQ0FBQztvQkFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDO2dCQUNuQixDQUFDO2dCQUNILDZCQUFDO1lBQUQsQ0FBQyxBQWJELElBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQm9vbVRpbWVCYXNlZFRocmVzaG9sZCB9IGZyb20gJy4vaW5kZXgnO1xuXG5jbGFzcyBCb29tVGltZUJhc2VkVGhyZXNob2xkIGltcGxlbWVudHMgSUJvb21UaW1lQmFzZWRUaHJlc2hvbGQge1xuICBwdWJsaWMgZW5hYmxlZERheXM6IHN0cmluZztcbiAgcHVibGljIGZyb206IHN0cmluZztcbiAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgcHVibGljIHRocmVzaG9sZDogc3RyaW5nO1xuICBwdWJsaWMgdG86IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5lbmFibGVkRGF5cyA9ICdTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXQnO1xuICAgIHRoaXMuZnJvbSA9ICcwMDAwJztcbiAgICB0aGlzLm5hbWUgPSAnRWFybHkgbW9ybmluZyBvZiBldmVyeWRheSc7XG4gICAgdGhpcy50aHJlc2hvbGQgPSAnNzAsOTAnO1xuICAgIHRoaXMudG8gPSAnMDUzMCc7XG4gIH1cbn1cblxuZXhwb3J0IHsgQm9vbVRpbWVCYXNlZFRocmVzaG9sZCB9O1xuIl19
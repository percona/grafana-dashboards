System.register(["lodash", "app/core/utils/kbn"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, kbn_1, getDecimalsForValue, get_formatted_value;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }
        ],
        execute: function () {
            getDecimalsForValue = function (value, _decimals) {
                if (lodash_1.default.isNumber(+_decimals)) {
                    var o = {
                        decimals: _decimals,
                        scaledDecimals: null,
                    };
                    return o;
                }
                var delta = value / 2;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                var magn = Math.pow(10, -dec), norm = delta / magn, size;
                if (norm < 1.5) {
                    size = 1;
                }
                else if (norm < 3) {
                    size = 2;
                    if (norm > 2.25) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5) {
                    size = 5;
                }
                else {
                    size = 10;
                }
                size *= magn;
                if (Math.floor(value) === value) {
                    dec = 0;
                }
                var result = {
                    decimals: Math.max(0, dec),
                    scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2,
                };
                return result;
            };
            exports_1("getDecimalsForValue", getDecimalsForValue);
            get_formatted_value = function (value, decimals, format) {
                if (!isNaN(value)) {
                    var decimalInfo = getDecimalsForValue(value, decimals);
                    var formatFunc = kbn_1.default.valueFormats[format];
                    return formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                }
                else {
                    return value;
                }
            };
            exports_1("get_formatted_value", get_formatted_value);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JhZmFuYVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9HcmFmYW5hVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxtQkFBbUIsR0FBRyxVQUFTLEtBQUssRUFBRSxTQUFTO2dCQUNuRCxJQUFJLGdCQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxHQUFXO3dCQUNkLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixjQUFjLEVBQUUsSUFBSTtxQkFDckIsQ0FBQztvQkFDRixPQUFPLENBQUMsQ0FBQztpQkFDVjtnQkFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQzNCLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUNuQixJQUFJLENBQUM7Z0JBRVAsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNkLElBQUksR0FBRyxDQUFDLENBQUM7aUJBQ1Y7cUJBQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNuQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUVULElBQUksSUFBSSxHQUFHLElBQUksRUFBRTt3QkFDZixJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNYLEVBQUUsR0FBRyxDQUFDO3FCQUNQO2lCQUNGO3FCQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDckIsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDVjtxQkFBTTtvQkFDTCxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUNYO2dCQUVELElBQUksSUFBSSxJQUFJLENBQUM7Z0JBR2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDL0IsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDVDtnQkFFRCxJQUFJLE1BQU0sR0FBVztvQkFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQkFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDOUUsQ0FBQztnQkFFRixPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUM7O1lBQ0ksbUJBQW1CLEdBQUcsVUFBUyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU07Z0JBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2pCLElBQUksV0FBVyxHQUFRLG1CQUFtQixDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDNUQsSUFBSSxVQUFVLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxVQUFVLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUM1RTtxQkFBTTtvQkFDTCxPQUFPLEtBQUssQ0FBQztpQkFDZDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuXHJcbmNvbnN0IGdldERlY2ltYWxzRm9yVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgX2RlY2ltYWxzKSB7XHJcbiAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgIGxldCBvOiBPYmplY3QgPSB7XHJcbiAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsLFxyXG4gICAgfTtcclxuICAgIHJldHVybiBvO1xyXG4gIH1cclxuXHJcbiAgbGV0IGRlbHRhID0gdmFsdWUgLyAyO1xyXG4gIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgIHNpemU7XHJcblxyXG4gIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICBzaXplID0gMTtcclxuICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICBzaXplID0gMjtcclxuICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgKytkZWM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICBzaXplID0gNTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2l6ZSA9IDEwO1xyXG4gIH1cclxuXHJcbiAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAvLyByZWR1Y2Ugc3RhcnRpbmcgZGVjaW1hbHMgaWYgbm90IG5lZWRlZFxyXG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgIGRlYyA9IDA7XHJcbiAgfVxyXG5cclxuICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgIHNjYWxlZERlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmNvbnN0IGdldF9mb3JtYXR0ZWRfdmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgZGVjaW1hbHMsIGZvcm1hdCk6IHN0cmluZyB7XHJcbiAgaWYgKCFpc05hTih2YWx1ZSkpIHtcclxuICAgIGxldCBkZWNpbWFsSW5mbzogYW55ID0gZ2V0RGVjaW1hbHNGb3JWYWx1ZSh2YWx1ZSwgZGVjaW1hbHMpO1xyXG4gICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW2Zvcm1hdF07XHJcbiAgICByZXR1cm4gZm9ybWF0RnVuYyh2YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IHsgZ2V0X2Zvcm1hdHRlZF92YWx1ZSwgZ2V0RGVjaW1hbHNGb3JWYWx1ZSB9O1xyXG4iXX0=
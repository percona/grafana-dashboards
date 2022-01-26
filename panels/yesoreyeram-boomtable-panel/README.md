# Boom Table Panel for Grafana

![Build & Publish](https://github.com/yesoreyeram/yesoreyeram-boomtable-panel/workflows/Build%20&%20Publish/badge.svg)

Boom Table Panel for Grafana. Table/MultiStat plugin with multiple columns for Graphite, InfluxDB, Prometheus, Azure Monitor.

![Boom Table - Sample Panel](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/panel.png)

![Boom Table - Panel with Font Awesome icons](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/panels-fa.png)


Features :
----------

* Multi column support for graphite, InfluxDB, Prometheus & Azure Monitor
* Individual thresholds for cells based on pattern
* Multi level thresholds (N number of thresholds)
* Individual aggregation method for cell based on pattern
* Time based thresholds
* Individual cell values can be transformed to helpful texts, based on pattern.
* Transformed texts can also contain actual metrics
* Icons in metrics
* Units can be set at cell level based on pattern
* Row/Column name based on multiple graphite/InfluxDB/Prometheus columns
* Filter metrics
* Debug UI to test patterns

Supported / Tested Data Sources :
--------------------------------

* Graphite
* InfluxDB
* Prometheus
* Azure Monitor
* AWS Cloud Watch
* Any datasources that returns data in timeseries format

Tested Grafana versions :
-------------------------

* Grafana version 4.5.2
* Grafana version 5.0.2
* Grafana version 6.0.0


Screenshots :
-------------

Pattern Editors Sample screenshots

![image](https://user-images.githubusercontent.com/153843/53409051-e973f580-39b7-11e9-83e3-e1b6306abafb.png)

![image](https://user-images.githubusercontent.com/153843/53409071-fa246b80-39b7-11e9-9e8e-05baa8fc1531.png)

![image](https://user-images.githubusercontent.com/153843/53409114-13c5b300-39b8-11e9-9227-339dcd110276.png)

Debug UI Sample screenshots

![image](https://user-images.githubusercontent.com/153843/53409376-acf4c980-39b8-11e9-89bc-363822fe370d.png)


# Setup


Pattern Guidelines
------------------

Pattern are regular expressions / name of the metrics. If there are multiple matching patterns, first match will be considered. To see the matching patterns, enable debug mode in Options panel.

Sample graphite series / Influx / Prometheus metrics

    prod.server.my-app-01.sys.cpu.usage
    prod.server.my-app-01.sys.mem.usage
    prod.server.my-app-01.sys.hdd.c.freespace
    prod.server.my-app-01.sys.hdd.d.freespace
    prod.server.my-app-02.sys.cpu.usage
    prod.server.my-app-02.sys.mem.usage
    prod.server.my-app-02.sys.hdd.c.freespace
    prod.server.my-app-02.sys.hdd.d.freespace
    dev.server.my-app-01.sys.cpu.usage
    dev.server.my-app-01.sys.mem.usage
    dev.server.my-app-01.sys.hdd.c.freespace
    dev.server.my-app-01.sys.hdd.d.freespace
    prod.app.sales.usage.requests_per_sec
    prod.app.orders.usage.requests_per_sec
    alias(carbon.agents.a.cache.queries, 'Carbon A usage')
    alias(carbon.agents.b.cache.queries, 'Carbon B usage')

patterns and matching metrics

    usage$ --> All the CPU, Memory metrics from prod and dev and also requests_per_sec metrics and also carbon usage
    cpu.usage$ --> All the CPU metrics
    free --> All the disk freespace metrics
    ^prod --> All the prod metrics
    ^dev.*.usage$ --> All the cpu, mem metrics of dev servers
    ^prod.*.cpu.usage$ --> All the cpu metrics of prod servers
    dev.server.my-app-01.sys.cpu.usage --> only dev.server.my-app-01.sys.cpu.usage
     usage$ --> Carbon usage(Note the space before the pattern)
    A usage$ --> Only carbon A usage

Row and Column name guidelines
------------------------------

Row and Col names are derived from series name. If n is wrapped by "_", then that will be replaced by n-th column in graphite/influxdb/prometheus metric (seperated by delimiter). Refer below examples and screenshots to get more idea. Or use debug mode to try. (n starts from index 0)

Sample graphite series / Influx / Prometheus Metrics

    prod.server.my-app-01.sys.cpu.usage

Pattern & Output

    _4_                         --> cpu
    _4_ _5_                     --> cpu usage
    _4_ 2 _5_                   --> cpu 2 usage
    _4_ use                     --> cpu use
    Production _4_ usage        --> Production cpu usage
    Production _4_ $somevar     --> Production cpu value_of_somevar_variable
    _series_                    --> prod.server.my-app-01.sys.cpu.usage
    _1_ _1_                     --> server server
    _4_ __5_                    --> cpu _usage

**Note** : If you prefer to change the wrapper from "_" to somthing like "~" or "__", you can do it through the option "Row / Column indentification wrapper" in options tab.


Thresholds 
----------

Thresholds are numbers seperated by comma. There can be multiple thresholds.

Example:

    10,20
    70,90,95

Time based thresholds
---------------------

Thresholds can be overriden, based on day and time of the browser.

Multiple time based threshold rules can be set for any given pattern. If multiple rule matches, last rule wins. If no rule matches, default thresholds will be applicable. Example given below. 

Following notations should be followed when added time based threshold rule

**Name** : Can be any representation in string but not more than 60 characters.

**From** : in HHMM format examples: 0000 2400 1330 1250

**To**   : in HHMM format examples: 0000 2400 1330 1250

**On**   : Days seperated by comma. Order doesnt matter. Examples; "Sat,Sun", "Mon,Sun,Tue"

**Threshold** : Same format as default threshold

![Time based thresholds](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/time-based-thresholds.png)

**WARNING**: "From" and "To" fields will be compared against timestamp of last data received from server. If the last data point is not availble, then browser time will be considered.

**TIPS** : If your threshold time rage ranges between two day, (example: 2300 of saturday to 0230 of sunday), then split the rule into two each for saturdary and sunday.

**NOTE** : If you specify n number threshold levels in default pattern (ex: 20,30),then time based thresholds should also follow same number of levels.

Background color based on thresholds
------------------------------------

Works the same way as single stat panel. Background color is a list of colors seperated by pipe symbol. Colors can be named or hexadecimal colors or rgb or rgba. Number of colors should be greater than the number of thresholds.

Example of color patterns:
     
    green|orange|red
    darkred|red|orange|red
    green|red
    green|#797979|rgba(0, 0, 255,0.5)|rgb(0, 0, 255)|red

Example of matching patterns:

    1:  thresholds  : 5
        pattern     : green|red        
        value       : 5    output  : red
        value       : 6    output  : red
        value       : 4    output  : green

    2:  thresholds  : 70,90
        pattern     : green|orange|red      
        value       : 95    output  : red  
        value       : 85    output  : orange
        value       : 65    output  : green

    3:  thresholds  : 70,90
        pattern     : red|orange|green      
        value       : 95    output  : green  
        value       : 85    output  : orange
        value       : 65    output  : red

Background color overrides
--------------------------

Background colors can be overriden for specific values by using the pattern option `Enable BG Color overrides for specific value?`. Override values should be specified in the `BG Color Overrides` in the following format. If multiple matches found, first one will win.

    0->Red
    13->Red|8->Green

Value and colors are seperated by `->`. Multiple combination of values can be given seperated by `|`. 

If background colors based on thresholds also specified along with this, this will be override the threshold based pattern.

Value transformation based on thresholds
----------------------------------------

Logic is same as background color. But the value to be displayed can be altered here. Display value will be replaced with the value provided. Values are seperated by pipe. if the value is wrapped with _, then it will represent the actual value. 

`_value_` will be replaced by actual value with format and decimals

`_value_raw_` will be replaced by actual value without format and decimals

`_row_name_` will be replaced by row name. This will be useful when you hide the first column.

`_col_name_` will be replaced by col name. This will be useful when you hide the table header.

`_n_` will be replaced by nth part of the series using `_` delimiter. Same rule as row_name and col_name

The following tokens can be also used in value transform / default value template

`_value_min_raw_` - Min value of the series without formatting
`_value_min_` - Min value of the series with formatting
`_value_max_raw_`- Max value of the series without formatting
`_value_max_` - Max value of the series with formatting
`_value_avg_raw_`- Average value of the series without formatting
`_value_avg_` - Average value of the series with formatting
`_value_current_raw_`- Current value of the series without formatting
`_value_current_` - Current value of the series with formatting
`_value_total_raw_`- Total value of the series without formatting
`_value_total_` - Total value of the series with formatting

Example transformation patterns :

    _value_|_value_|_value_
    GOOD|BETTER|BAD
    GOOD (_value_)|_value_|_value
    Time to party|Ill|RIP
    _col_name_ : _value_| _col_name_ : _value_| _col_name_ : _value_
    _row_name_ : _value_| _row_name_ : _value_| _row_name_ : _value_
    _row_name_ _col_name_ : _value_| _row_name_ _col_name_ : _value_| _row_name_ _col_name_ : _value_


Sample value transformation: (Assume your metrics results, 95 and it is percentage data type)
 

    _value_                 -->     95%
    GOOD (_value_)          -->     GOOD (95%)
    HOT (_value_ > threshold of 80%)     -->     HOT (95% > threshold of 80%)
    Contact helpdesk        -->     Contact helpdesk


Transform value overrides
--------------------------

Transform values can be overriden for specific values by using the pattern option `Enable value transform overrides?`. Override values should be specified in the `Value transform Overrides` in the following format. If multiple matches found, first one will win.

    13->Evil
    12->good|37.50->_fa-circle_|99->Oh no...

Value and transform values are seperated by `->`. Multiple combination of values can be given seperated by `|`. 

If transform values based on thresholds also specified along with this, this will be override the threshold based pattern.

Table Cell links
----------------

Table cells can be clickable and open links in new tabs.

If the URL contains `_row_name_`, it will be replaced by row name.

If the URL contains `_col_name_`, it will be replaced by col name.

Note : If the row_name / col_name contains font awesome keywords like `_fa-circle_`, they will be ignored.


Example : `https://mysite.com/_row_name_/_col_name_/?foo=bar`

First Column Links
------------------

To enable link for the first column, Specify link URL in options tab.

First row link can have token `_row_name_` . Any other tokens will be ignored. If your row name tends to any font awesome icons or images, they will be ignored in the link's `_row_name`

![image](https://user-images.githubusercontent.com/153843/61057603-8a0a0580-a3ed-11e9-9572-bd76edb0b685.png)

Example : `http://google.com?q=_row_name_` will be replaced as `http://google.com?q=app_0` if the first columnn name is `app_0`

Refer issue [#85](https://github.com/yesoreyeram/yesoreyeram-boomtable-panel/issues/85) for more details

Filter
------

If your output have more rows and if you require to hide certain rows based on their output value, you can use the filter option to hide those rows. Series will be hidden if any one of the condition match.

![Filter rows based on value](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/filters.png)


Repeater / Multistat Example
-----------------

You can use the boom table as multi stat panel. Refer the details given in issue [#40](https://github.com/yesoreyeram/yesoreyeram-boomtable-panel/issues/40)

![Multistat panel / Repeater ](https://user-images.githubusercontent.com/153843/47859058-4fbf8180-dde5-11e8-8b27-2ef94919d1f8.png)


Using Font Awesome icons in row /column / metric fields
-------------------------------------------------------

If your row name / col name / transform metrics contains strings that starts with `_fa-` and ends with `_`, then they will be replaced with corresponding font awesome icons grafana supported. Example usage given below.

` _fa-arrow-up_ `           ->  UP ARROW icon in default color

` _fa-arrow-up,green_ `     ->  UP ARROW icon in green color

` _fa-arrow-down,red,5_ `   ->  DOWN ARROW icon in red color repeated 5 times

` _fa-apple,,5_ `           ->  APPLE icon in default color repeated 5 times

` _fa-square,red,3,gray,10_ ` -> 3 RED Square iconds and then 7 gray square icons  ( only from version 1.3.0, fill icons considered )

` _fa-square,red,76/10,gray,10_ ` -> 8 RED Square iconds and then 2 gray square icons  ( only from version 1.3.0, math expressions are considered )

` _fa-square,red,34/10,gray,10_ ` -> 3 RED Square iconds and then 7 gray square icons  ( only from version 1.3.0, math expressions are considered )

In summary, the format of the font awesome token should be in the following format

* this token should be surrounded by one or more empty spaces. 
* this should start with `_fa-` and ends with `_`
* should be comma seperated
* index 0 is fa-iconname where iconname can be any valid font awesome icon
* index 1 should be color of the icon. If empty default text color / threshold text color will be considered
* index 2 should be repeat count ( can be simple one level math expression )
* index 3 should be empty repeat color. If empty default text color / threshold text color will be considered
* index 4 should be max repeat count ( can be simple one level math expression )
* index 2 and 4 can have valid math expression like below
    * 15    ---- valid
    * 23+12 ---- valid and will yield 35
    * 24-10 ---- valid and will yield 14
    * 2.4*10 ---- valid and will yield 24
    * 15/3  ---- valid and will yield 5
    * 29/4  ---- valid and will yield 7
    * 97/10 ---- valid and will yield 10
    * 23max12 ---- valid and will yield 23
    * 23min12 ---- valid and will yield 12
    * 3.36max2 ---- valid and will yield 3

**Example implementations of icons in metrics:** (Unlimited possibilites like heatmap)

![Font Awesome Icons support](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/font-awesome-examples.png)

* Battery level indicator
    * Thresholds : `10,75`
    * Transform Values : `_fa-battery-empty,red_ _value_|_fa-battery-quarter,yellow_ _value_|_fa-battery-full,green_ _value_`
* Bar chart indicator
    * Thresholds : `10,20,30,40,50,60,70,80,90`
    * Transform Values : `_fa-square,green,1_ _fa-square,gray,9_|_fa-square,green,2_ _fa-square,gray,8_|_fa-square,green,3_ _fa-square,gray,7_|_fa-square,green,4_ _fa-square,gray,6_|_fa-square,yellow,5_ _fa-square,gray,5_|_fa-square,yellow,6_ _fa-square,gray,4_|_fa-square,yellow,7_ _fa-square,gray,3_|_fa-square,red,8_ _fa-square,gray,2_|_fa-square,red,9_ _fa-square,gray,1_|_fa-square,red,10_ _fa-square,gray,0_`
* Payment Gateway Status Indicator
    * Similar threhold setup. (Note : In the example shown in the above picture each series represented by their own patterns.)
    * Hide first column and headers
* Heatmap
    * Similar threshold setup
    * First column and headers are hidden

Using images as transform values
--------------------------------

If your row name / col name / transform metrics contains strings that starts with `_img-` and ends with `_`, then they will be replaced with images. Example usage given below.

` _img-https://example.com/happy.gif_ `               ->  happy.gif with 20px width, 20px height

` _img-https://example.com/happy.gif,30px_ `          ->  happy.gif with 30px width, 20px height

` _img-https://example.com/happy.gif,30px,40px_ `     ->  happy.gif with 30px width, 40px height

` _img-https://example.com/happy.gif,30px,40px,3_ `   ->  happy.gif with 30px width, 40px height repeated 3 times

![Image transform](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/img-transform-example.png)

Note : When using images from other domains, please take care of CORS policy, legal and copyright polices.

Options
-------

`Text alignment for first column` -> This option specify the text alignment of first column cells in the table. Can be `left`,`right` or `center`. Default is left. 

`Text alignment for table header` -> This option specify the text alignment of table headers excluding first column. Can be `left`,`right` or `center`. Default is left.

`Text alignment for values` -> This option specify the text alignment of value cells in the table. Can be `left`,`right` or `center`. Default is left.

`Non matching cells text` -> If no series matches for the given row and col match, the corresponding text can be specified using this option. This option can also contain font awesome and image replacement tokens.

`Non matching cells BG Color` -> If no series matches for the given row and col match, the corresponding bg color can be specified using this option

`Non matching cells Text Color` -> If no series matches for the given row and col match, the corresponding text color can be specified using this option

`Font Size` -> Specify font size to be used in the table. Leave blank for default. size can be specified in css units such as `1.4rem` , `16px` etc

Azure Monitor Usage
-------------------

Same as other time series data sources. You need to properly format your legend to extract the row and column name.

![Azure Monitor Usage](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/azure-monitor-usage.png)

Prometheus & InfluxDB Guidelines
---------------------

Though this plugin was initially designed to support graphite, It is also capable of handling timeseries database like Prometheus & InfluxDB. In order to achieve this, you need to **alias** your timeseries/Prometheus/Infludb metrics to proper delimited format. Following screenshot explains plugin usage with Prometheus/InfluxDB where the metrics are aliased with pipe delimiter. This can be any delimiter like space, dot, etc.#

![Prometheus Usage](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/prometheus-usage.png)

![InfluxDB Usage](https://raw.githubusercontent.com/yesoreyeram/yesoreyeram-boomtable-panel/master/dist/src/img/influx-usage.png)

Optionally, you can experiement with the new tags feature instead of **alias** . (Not for production use)

Tag delimiter for influxdb and prometheus   ( Experimental Feature )
====================================================================

**WARNING** :  This may have bugs. Not suitable for production.

To use , tags from your series use `tag` as a delimiter as shown below. Then in the row / column, you can specify the tags surronded by double curly braces as shown below. Metric can be referred by {{metric_name}}}.

Rowname, Colname, Links, Tooltips and display template can also have this tag tokens.

# Influx DB

![image](https://user-images.githubusercontent.com/153843/61379520-9be12200-a89f-11e9-8bcd-b55e7f86249d.png)
![image](https://user-images.githubusercontent.com/153843/61379533-a4395d00-a89f-11e9-8fd8-b62c3df0630a.png)
![image](https://user-images.githubusercontent.com/153843/61379567-b1eee280-a89f-11e9-81dc-f128b5ec17dd.png)


# Prometheus

![image](https://user-images.githubusercontent.com/153843/61379602-c206c200-a89f-11e9-8dfb-462e5f28965b.png)
![image](https://user-images.githubusercontent.com/153843/61379630-cf23b100-a89f-11e9-9677-bfa05c05d7ea.png)
![image](https://user-images.githubusercontent.com/153843/61379652-db0f7300-a89f-11e9-8cef-254e8f1a8b7a.png)


### mockjs

基于 数据模板 生成模拟数据。

基于 HTML模板 生成模拟数据。

拦截并模拟 ajax 请求。

### 解决的问题

开发时，后端还没完成数据输出，前端只好写静态模拟数据。

数据太长了，将数据写在js文件里，完成后挨个改url。
某些逻辑复杂的代码，加入或去除模拟数据时得小心翼翼。
想要尽可能还原真实的数据，要么编写更多代码，要么手动修改模拟数据。
特殊的格式，例如IP,随机数，图片，地址，需要去收集。
超烂的破网速…
…


### 以上都不再是问题

接下来体验 拦截ajax请求并返回模拟数据。

安装

npm install mockjs

### 配置模拟数据

        //定义数据的模板形式
    Mock.mock('http://g.cn', {
        'name'	   : '[@name](/user/name)()',
        'age|1-100': 100,
        'color'	   : '[@color](/user/color)'
    });
    
    
    
    // 使用 Mock
    
    var Mock = require('mockjs')
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    // 输出结果
    console.log(JSON.stringify(data, null, 4))

    
### Mock.js 的语法规范包括两部分：

数据模板定义规范（Data Template Definition，DTD）
数据占位符定义规范（Data Placeholder Definition，DPD）
数据模板定义规范 DTD

数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：

    // 属性名   name
    
    // 生成规则 rule
    
    // 属性值   value
    
    'name|rule': value
注意：

属性名 和 生成规则 之间用竖线 | 分隔。

生成规则 是可选的。

生成规则 有 7 种格式：
    
    'name|min-max': value
    
    'name|count': value
    
    'name|min-max.dmin-dmax': value
    
    'name|min-max.dcount': value
    
    'name|count.dmin-dmax': value
    
    'name|count.dcount': value
    
    'name|+step': value

生成规则 的 含义 需要依赖 属性值的类型 才能确定
。
属性值 中可以含有== @占位符。==

属性值 还指定了最终值的初始值和类型。
    
#### 生成规则和示例：

##### 1. 属性值是字符串 String

'name|min-max': string

通过重复 string 生成一个字符串，重复次数大于等于 min，小于等于 max。

'name|count': string

通过重复 string 生成一个字符串，重复次数等于 count。

##### 2. 属性值是数字 Number

'name|+1': number

属性值自动加 1，初始值为 number。

'name|min-max': number

生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。

'name|min-max.dmin-dmax': number

生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。

    Mock.mock({
        'number1|1-100.1-10': 1,
        'number2|123.1-10': 1,
        'number3|123.3': 1,
        'number4|123.10': 1.123
    })
    // =>
    {
        "number1": 12.92,
        "number2": 123.51,
        "number3": 123.777,
        "number4": 123.1231091814
    }

##### 3. 属性值是布尔型 Boolean

'name|1': boolean

随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

'name|min-max': value

随机生成一个布尔值，值为 value 的概率是 min / (min + max)，值为 !value 的概率是 max / (min + max)。

##### 4. 属性值是对象 Object

'name|count': object

从属性值 object 中随机选取 count 个属性。

'name|min-max': object

从属性值 object 中随机选取 min 到 max 个属性。

##### 5. 属性值是数组 Array

'name|1': array

从属性值 array 中随机选取 1 个元素，作为最终值。

'name|+1': array

从属性值 array 中顺序选取 1 个元素，作为最终值。

'name|min-max': array

通过重复属性值 array 生成一个新数组，重复次数大于等于 min，小于等于 max。

'name|count': array

通过重复属性值 array 生成一个新数组，重复次数为 count。

##### 6. 属性值是函数 Function

'name': function

执行函数 function，取其返回值作为最终的属性值，函数的上下文为属性 'name' 所在的对象。

##### 7. 属性值是正则表达式 RegExp

'name': regexp

根据正则表达式 regexp 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

    Mock.mock({
        'regexp1': /[a-z][A-Z][0-9]/,
        'regexp2': /\w\W\s\S\d\D/,
        'regexp3': /\d{5,10}/
    })
    // =>
    {
        "regexp1": "pJ7",
        "regexp2": "F)\fp1G",
        "regexp3": "561659409"
    }
    
    
### 数据占位符定义规范 DPD

占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

占位符 的格式为：

@占位符
@占位符(参数 [, 参数])
注意：

用 @ 来标识其后的字符串是 占位符。

占位符 引用的是 Mock.Random 中的方法。

通过 Mock.Random.extend() 来扩展自定义占位符。

占位符 也可以引用 数据模板 中的属性。

占位符 会优先引用 数据模板 中的属性。

占位符 支持 相对路径 和 绝对路径。

    Mock.mock({
        name: {
            first: '@FIRST',
            middle: '@FIRST',
            last: '@LAST',
            full: '@first @middle @last'
        }
    })
    // =>
    {
        "name": {
            "first": "Charles",
            "middle": "Brenda",
            "last": "Lopez",
            "full": "Charles Brenda Lopez"
        }
    }


### Mock.mock()

Mock.mock( rurl?, rtype?, template|function( options ) )

根据数据模板生成模拟数据。

Mock.mock( template )

根据数据模板生成模拟数据。

Mock.mock( rurl, template )

记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。

Mock.mock( rurl, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 rurl 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。

Mock.mock( rurl, rtype, template )

记录数据模板。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，将根据数据模板 template 生成模拟数据，并作为响应数据返回。

Mock.mock( rurl, rtype, function( options ) )

记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。


rurl

可选。

表示需要拦截的 URL，可以是 URL 字符串或 URL 正则。例如 /\/domain\/list\.json/、'/domian/list.json'。


rtype

可选。

表示需要拦截的 Ajax 请求类型。例如 GET、POST、PUT、DELETE 等。


template

可选。

表示数据模板，可以是对象或字符串。例如 { 'data|1-10':[{}] }、'@EMAIL'。


function(options)

可选。

表示用于生成响应数据的函数。


options

指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性，参见 XMLHttpRequest 规范。

从 1.0 开始，Mock.js 通过覆盖和模拟原生 XMLHttpRequest 的行为来拦截 Ajax 请求，不再依赖于第三方 Ajax 工具库（例如 jQuery、Zepto 等）。

### Mock.setup( settings )
配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。

##### settings

必选。

配置项集合。

##### timeout

可选。

指定被拦截的 Ajax 请求的响应时间，单位是毫秒。值可以是正整数，例如 400，表示 400 毫秒 后才会返回响应内容；也可以是横杠 '-' 风格的字符串，例如 '200-600'，表示响应时间介于 200 和 600 毫秒之间。默认值是'10-100'。

    Mock.setup({
        timeout: 400
    })
    Mock.setup({
        timeout: '200-600'
    })
目前，接口 Mock.setup( settings ) 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为。

### Mock.Random

Mock.Random 是一个工具类，用于生成各种随机数据。

Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 @占位符(参数 [, 参数]) 。

    var Random = Mock.Random
    Random.email()
    // => "n.clark@miller.io"
    Mock.mock('@email')
    // => "y.lee@lewis.org"
    Mock.mock( { email: '@email' } )
    // => { email: "v.lewis@hall.gov" }
    
  Mock.Random 提供的完整方法（占位符）如下：

Type	Method
Basic	boolean, natural, integer, float, character, string, range, date, time, datetime, now

Image	image, dataImage

Color	color

Text	paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle

Name	first, last, name, cfirst, clast, cname

Web	url, domain, email, ip, tld

Address	area, region

Helper	capitalize, upper, lower, pick, shuffle
Miscellaneous	guid, id

#### 扩展

Mock.Random 中的方法与数据模板的 @占位符 一一对应，在需要时还可以为 Mock.Random 扩展方法，然后在数据模板中通过 @扩展方法 引用。例如：

    Random.extend({
        constellation: function(date) {
            var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
            return this.pick(constellations)
        }
    })
    Random.constellation()
    // => "水瓶座"
    Mock.mock('@CONSTELLATION')
    // => "天蝎座"
    Mock.mock({
        constellation: '@CONSTELLATION'
    })
    // => { constellation: "射手座" }
    
####     Basic

##### Random.boolean( min?, max?, current? )

Random.boolean()
Random.boolean( min, max, current )
返回一个随机的布尔值。

min

可选。

指示参数 current 出现的概率。概率计算公式为 min / (min + max)。该参数的默认值为 1，即有 50% 的概率返回参数 current。

max

可选。

指示参数 current 的相反值 !current 出现的概率。概率计算公式为 max / (min + max)。该参数的默认值为 1，即有 50% 的概率返回参数 !current。

current

可选。

可选值为布尔值 true 或 false。如果未传入任何参数，则返回 true 和 false 的概率各为 50%。该参数没有默认值。在该方法的内部，依据原生方法 Math.random() 返回的（浮点）数来计算和返回布尔值，例如在最简单的情况下，返回值是表达式 Math.random() >= 0.5 的执行结果。

Random.boolean()
// => true
Random.boolean(1, 9, true)
// => false
Random.bool()
// => false
Random.bool(1, 9, false)
// => true

#### Random.natural( min?, max? )

Random.natural()
Random.natural( min )
Random.natural( min, max )
##### 返回一个随机的自然数（大于等于 0 的整数）。

min

可选。

指示随机自然数的最小值。默认值为 0。

max

可选。

指示随机自然数的最大值。默认值为 9007199254740992。

    Random.natural()
    // => 1002794054057984
    Random.natural(10000)
    // => 71529071126209
    Random.natural(60, 100)
    // => 77

### Random.integer( min?, max? )

Random.integer()

Random.integer( min )

Random.integer( min, max )

返回一个随机的整数。

min

可选。

指示随机整数的最小值。默认值为 -9007199254740992。

max

可选。

指示随机整数的最大值。默认值为 9007199254740992。

    Random.integer()
    // => -3815311811805184
    Random.integer(10000)
    // => 4303764511003750
    Random.integer(60,100)
    // => 96
    
    
### Random.float( min?, max?, dmin?, dmax? )

Random.float()
Random.float( min )
Random.float( min, max )
Random.float( min, max, dmin )
Random.float( min, max, dmin, dmax )
返回一个随机的浮点数。

min

可选。

整数部分的最小值。默认值为 -9007199254740992。

max

可选。

整数部分的最大值。默认值为 9007199254740992。

dmin

可选。

小数部分位数的最小值。默认值为 0。

dmin

可选。

小数部分位数的最大值。默认值为 17。

    Random.float()
    // => -1766114241544192.8
    Random.float(0)
    // => 556530504040448.25
    Random.float(60, 100)
    // => 82.56779679549358
    Random.float(60, 100, 3)
    // => 61.718533677927894
    Random.float(60, 100, 3, 5)
    // => 70.6849
    
#### Random.character( pool? )
    
    Random.character()
    Random.character( 'lower/upper/number/symbol' )
    Random.character( pool )
返回一个随机字符。

###### pool

可选。

字符串。表示字符池，将从中选择一个字符返回。

如果传入了 'lower' 或 'upper'、'number'、'symbol'，表示从内置的字符池从选取：

    {
        lower: "abcdefghijklmnopqrstuvwxyz",
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        number: "0123456789",
        symbol: "!@#$%^&*()[]"
    }
如果未传入该参数，则从 lower + upper + number + symbol 中随机选取一个字符返回。

    Random.character()
    // => "P"
    Random.character('lower')
    // => "y"
    Random.character('upper')
    // => "X"
    Random.character('number')
    // => "1"
    Random.character('symbol')
    // => "&"
    Random.character('aeiou')
    // => "u"
    
#### Random.range( start?, stop, step? )

Random.range( stop )
Random.range( start, stop )
Random.range( start, stop, step )
返回一个整型数组。

start

必选。

数组中整数的起始值。

stop

可选。

数组中整数的结束值（不包含在返回值中）。

step

可选。

数组中整数之间的步长。默认值为 1。

    Random.range(10)
    // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    Random.range(3, 7)
    // => [3, 4, 5, 6]
    Random.range(1, 10, 2)
    // => [1, 3, 5, 7, 9]
    Random.range(1, 10, 3)
    // => [1, 4, 7]
    
### Date    

Random.date( format? )

Random.date()
Random.date(format)
返回一个随机的日期字符串。

format

可选。

指示生成的日期字符串的格式。默认值为 yyyy-MM-dd。

    Random.date()
    // => "2002-10-23"
    Random.date('yyyy-MM-dd')
    // => "1983-01-29"
    Random.date('yy-MM-dd')
    // => "79-02-14"
    Random.date('y-MM-dd')
    // => "81-05-17"
    Random.date('y-M-d')
    // => "84-6-5"、
 
 
 Format	 	Example
 
    yyyy	           1999 or 2003
    
    yy		    99 or 03
    
    y		    99 or 03
    
    MM		    01 to 12
    
    M    	            1 to 12
    
    dd	 	    01 to 31
    
    d	 	    1 to 31
    HH	 	    00 to 23
    H	 	    0 to 23
    hh 	        1 to 12
    h	 	01 to 12
    mm	 	00 to 59
    m	 	0 to 59
    ss		00 to 59
    s	 	0 to 59
    SS	 	000 to 999
    S	   	0 to 999
    A	 	AM or PM
    a	 	am or pm
    T	Milliseconds, since 1970-1-1 00:00:00 UTC	759883437303
    
### Random.time( format? )

Random.time()
Random.time( format )
返回一个随机的时间字符串。

format

可选。

指示生成的时间字符串的格式。默认值为 HH:mm:ss。

可选的占位符参考自 Ext.Date

    Random.time()
    // => "00:14:47"
    Random.time('A HH:mm:ss')
    // => "PM 20:47:37"
    Random.time('a HH:mm:ss')
    // => "pm 17:40:00"
    Random.time('HH:mm:ss')
    // => "03:57:53"
    Random.time('H:m:s')
    // => "3:5:13"
    
### Random.datetime( format? )

Random.datetime()
Random.datetime( format )
返回一个随机的日期和时间字符串。

format

可选。

指示生成的日期和时间字符串的格式。默认值为 yyyy-MM-dd HH:mm:ss。

可选的占位符参考自 Ext.Date，请参见 Random.date( format? )。

    Random.datetime()
    // => "1977-11-17 03:50:15"
    Random.datetime('yyyy-MM-dd A HH:mm:ss')
    // => "1976-04-24 AM 03:48:25"
    Random.datetime('yy-MM-dd a HH:mm:ss')
    // => "73-01-18 pm 22:12:32"
    Random.datetime('y-MM-dd HH:mm:ss')
    // => "79-06-24 04:45:16"
    Random.datetime('y-M-d H:m:s')
    // => "02-4-23 2:49:40"
    
#####  Random.now( unit?, format? )

Ranndom.now( unit, format )
Ranndom.now()
Ranndom.now( format )
Ranndom.now( unit )
返回当前的日期和时间字符串。

unit

可选。

表示时间单位，用于对当前日期和时间进行格式化。可选值有：year、month、week、day、hour、minute、second、week，默认不会格式化。

format

可选。

指示生成的日期和时间字符串的格式。默认值为 yyyy-MM-dd HH:mm:ss。可选的占位符参考自 Ext.Date，请参见 Random.date(format)。

Random.now() 的实现参考了 Moment.js。
Random.now()
// => "2014-04-29 20:08:38 "
Random.now('day', 'yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 00:00:00 000"
Random.now('day')
// => "2014-04-29 00:00:00 "
Random.now('yyyy-MM-dd HH:mm:ss SS')
// => "2014-04-29 20:08:38 157"

Random.now('year')
// => "2014-01-01 00:00:00"
Random.now('month')
// => "2014-04-01 00:00:00"
Random.now('week')
// => "2014-04-27 00:00:00"
Random.now('day')
// => "2014-04-29 00:00:00"
Random.now('hour')
// => "2014-04-29 20:00:00"
Random.now('minute')
// => "2014-04-29 20:08:00"
Random.now('second')
// => "2014-04-29 20:08:38"

### Name

Random.first()

Random.first()
随机生成一个常见的英文名。

Random.first()
// => "Nancy"
Random.last()

Random.last()
随机生成一个常见的英文姓。

Random.last()
// => "Martinez"
Random.name( middle? )

Random.name()
Random.name( middle )
随机生成一个常见的英文姓名。

middle

可选。

布尔值。指示是否生成中间名。

Random.name()
// => "Larry Wilson"
Random.name(true)
// => "Helen Carol Martinez"

Random.cfirst()

Random.cfirst()
随机生成一个常见的中文名。

Random.cfirst()
// => "曹"
Random.clast()

Random.clast()
随机生成一个常见的中文姓。

Random.clast()
// => "艳"
Random.cname()

Random.cname()
随机生成一个常见的中文姓名。

Random.cname()
// => "袁军"
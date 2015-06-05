angular.module("rdmApp",[]).config(["$interpolateProvider",function(a){"use strict";a.startSymbol("{[{"),a.endSymbol("}]}")}]).constant("RDM",{COMMAND_CLASS:{DISCOVERY_COMMAND:16,DISCOVERY_COMMAND_RESPONSE:17,GET_COMMAND:32,GET_COMMAND_RESPONSE:33,SET_COMMAND:48,SET_COMMAND_RESPONSE:49},EUID_SIZE:16,NACK_REASON:{NR_UNKNOWN_PID:0,NR_FORMAT_ERROR:1,NR_HARDWARE_FAULT:2,NR_PROXY_REJECT:3,NR_WRITE_PROTECT:4,NR_UNSUPPORTED_COMMAND_CLASS:5,NR_DATA_OUT_OF_RANGE:6,NR_BUFFER_FULL:7,NR_PACKET_SIZE_UNSUPPORTED:8,NR_SUB_DEVICE_OUT_OF_RANGE:9,NR_PROXY_BUFFER_FULL:16,NR_ACTION_NOT_SUPPORTED:17},PIDS:{DISC_UNIQUE_BRANCH:1,DISC_MUTE:2,DISC_UN_MUTE:3,PROXIED_DEVICES:16,PROXIED_DEVICE_COUNT:17,COMMS_STATUS:21,QUEUED_MESSAGE:32,STATUS_MESSAGES:48,STATUS_ID_DESCRIPTION:49,CLEAR_STATUS_ID:50,SUB_DEVICE_STATUS_REPORT_THRESHOLD:51,SUPPORTED_PARAMETERS:80,PARAMETER_DESCRIPTION:81,DEVICE_INFO:96,PRODUCT_DETAIL_ID_LIST:112,DEVICE_MODEL_DESCRIPTION:128,MANUFACTURER_LABEL:129,DEVICE_LABEL:130,FACTORY_DEFAULTS:144,LANGUAGE_CAPABILITIES:160,LANGUAGE:176,SOFTWARE_VERSION_LABEL:192,BOOT_SOFTWARE_VERSION_ID:193,BOOT_SOFTWARE_VERSION_LABEL:194,DMX_PERSONALITY:224,DMX_PERSONALITY_DESCRIPTION:225,DMX_START_ADDRESS:240,SLOT_INFO:288,SLOT_DESCRIPTION:289,DEFAULT_SLOT_VALUE:290,SENSOR_DEFINITION:512,SENSOR_VALUE:513,RECORD_SENSORS:514,DEVICE_HOURS:1024,LAMP_HOURS:1025,LAMP_STRIKES:1026,LAMP_STATE:1027,LAMP_ON_MODE:1028,DEVICE_POWER_CYCLES:1029,DISPLAY_INVERT:1280,DISPLAY_LEVEL:1281,PAN_INVERT:1536,TILT_INVERT:1537,PAN_TILT_SWAP:1538,REAL_TIME_CLOCK:1539,IDENTIFY_DEVICE:4096,RESET_DEVICE:4097,POWER_STATE:4112,PERFORM_SELFTEST:4128,SELF_TEST_DESCRIPTION:4129,CAPTURE_PRESET:4144,PRESET_PLAYBACK:4145,DMX_BLOCK_ADDRESS:320,DMX_FAIL_MODE:321,DMX_STARTUP_MODE:322,DIMMER_INFO:832,MINIMUM_LEVEL:833,MAXIMUM_LEVEL:834,CURVE:835,CURVE_DESCRIPTION:836,OUTPUT_RESPONSE_TIME:837,OUTPUT_RESPONSE_TIME_DESCRIPTION:838,MODULATION_FREQUENCY:839,MODULATION_FREQUENCY_DESCRIPTION:840,BURN_IN:1088,LOCK_PIN:1600,LOCK_STATE:1601,LOCK_STATE_DESCRIPTION:1602,IDENTIFY_MODE:4160,PRESET_INFO:4161,PRESET_STATUS:4162,PRESET_MERGEMODE:4163,POWER_ON_SELF_TEST:4164,LIST_INTERFACES:1792,INTERFACE_LABEL:1793,INTERFACE_HARDWARE_ADDRESS_TYPE1:1794,IPV4_DHCP_MODE:1795,IPV4_ZEROCONF_MODE:1796,IPV4_CURRENT_ADDRESS:1797,IPV4_STATIC_ADDRESS:1798,INTERFACE_RENEW_DHCP:1799,INTERFACE_RELEASE_DHCP:1800,INTERFACE_APPLY_CONFIGURATION:1801,IPV4_DEFAULT_ROUTE:1802,DNS_NAME_SERVER:1803,DNS_HOSTNAME:1804,DNS_DOMAIN_NAME:1805},RESPONSE_TYPE:{ACK:0,ACK_TIMER:1,NACK:2,ACK_OVERFLOW:3},START_CODE:204,SUB_DEVICE:{ROOT_DEVICE:0,ALL_SUB_DEVICES:65535},UID_SIZE:6}).constant("OUTPUT_FORMAT",{C_ARRAY:{label:"C Array",value:0},C_STRING:{label:"C String",value:1},RAW_HEX:{label:"Raw Hex",value:2}}).service("checksumService",function(){"use strict";var a=function(a){var b=a.reduce(function(a,b,c,d){return a+b});return b};this.checksumAsArray=function(b){var c=a(b);return[c>>8,255&c]},this.checksumAsValue=a}).service("rdmHelperService",["RDM",function(a){"use strict";this.isRequest=function(b){return b===a.COMMAND_CLASS.DISCOVERY_COMMAND||b===a.COMMAND_CLASS.GET_COMMAND||b===a.COMMAND_CLASS.SET_COMMAND},this.isResponse=function(b){return b===a.COMMAND_CLASS.DISCOVERY_COMMAND_RESPONSE||b===a.COMMAND_CLASS.GET_COMMAND_RESPONSE||b===a.COMMAND_CLASS.SET_COMMAND_RESPONSE},this.isGetSet=function(b){return b===a.COMMAND_CLASS.GET_COMMAND||b===a.COMMAND_CLASS.GET_COMMAND_RESPONSE||b===a.COMMAND_CLASS.SET_COMMAND||b===a.COMMAND_CLASS.SET_COMMAND_RESPONSE}}]).service("formatService",["RDM",function(a){"use strict";var b=function(a){return new Array(a+1).join(" ")},c=function(a,b,c,d){var e=a.toString(16),f=b-e.length+1;return(c?c:"")+new Array(+(f>0&&f)).join("0")+e+(d?d:"")};this.toHex=c,this.reverseLookup=function(a,b){var c="";return angular.forEach(a,function(a,d){a===b&&(c=d)}),c},this.arrayToUID=function(b){return b.length!==a.UID_SIZE?"":c(b[0],2)+c(b[1],2)+":"+c(b[2],2)+c(b[3],2)+c(b[4],2)+c(b[5],2)},this.arrayToHex=function(a,b,d){return a.map(function(a){return c(a,2,b,d)})},this.dataAsArray=function(a,d){for(var e=2,f="const uint8_t packet[] = {",g=[f],h=b(2),i=0;i<a.length;++i){var j=c(a[i],2,"0x");h.length+j.length+2>=d?(h+=",",g.push(h),h=b(e)):h.length!==e&&(h+=", "),h+=j}return h&&g.push(h),g.push("};"),g.join("\n")},this.dataAsString=function(a,d){for(var e=[],f='const char packet[] = "',g=f,h=0;h<a.length;++h){var i=c(a[h],2,"\\x");g.length+i.length+2>=d&&(g+='"',e.push(g),g=b(f.length-1)+'"'),g+=i}return g&&(g+='";',e.push(g)),e.join("\n")},this.dataAsRawHex=function(a,b){for(var d=[],e="",f=0;f<a.length;++f){var g=c(a[f],2);e.length+g.length+1>=b&&(d.push(e),e=""),e+=g,f+1!==a.length&&(e+=" ")}return e&&d.push(e),d.join("\n")}}]).service("parserService",["$log","RDM",function(a,b){"use strict";var c=function(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.match(/^[a-fA-F]{1,2}$/))return!0;if(c.match(/^[\d]{3}$/))return!0;if(c.match(/^[\da-fA-F]{1,2}h$/)||c.match(/^0x[\da-fA-F]{1,2}$/))return!1}return!1},d=function(a,b){for(var d="",e=[],f=[],g=0;g<a.length;++g){var h=a[g].replace(/^(.*?)\s*\/\/.*$/,"$1");h=h.replace(/[,:\-]/g," "),h=h.replace(/\s{2,}/g," ").trim(),h&&(f=f.concat(h.split(" ")))}void 0===b&&(b=c(f));for(var i=0;i<f.length;i++){var j=f[i],k=j.match(/^([\da-fA-F]{1,2})h$/);if(k)e.push(parseInt(k[0],16));else{var l=j.match(/^0x([\da-fA-F]{1,2})$/);if(l)e.push(parseInt(l[0],16));else{if(b){var m=j.match(/^([\da-fA-F]{1,2})$/);if(m){e.push(parseInt(m[0],16));continue}return d="Invalid byte: "+j,[d,e]}var n=j.match(/^(\d{1,3})$/);if(n){if(n[0]<=255){e.push(parseInt(n[0],10));continue}return d="Invalid byte: "+j,[d,e]}d="Invalid binary data: "+j}}}return[d,e]};this.textToBytes=function(a,b){var c=a.split("\n");return d(c,b)},this.uidToBytes=function(a){var c=a.replace(/[\.:\-\s]/g,"");if(!c.match(/^[0-9a-fA-F]{12}$/))return["Contains non hex characters",[]];if(c.length!==2*b.UID_SIZE)return["UID should be "+b.UID_SIZE+" bytes",[]];for(var d=[],e=0;e<c.length/2;e++){var f=c.slice(2*e,2*(e+1)),g=parseInt(f,16);if(isNaN(g))return["Invalid UID: bad value"+f,[]];d.push(g)}return["",d]}}]).controller("UIDController",["$scope","$log","checksumService","formatService","parserService",function(a,b,c,d,e){"use strict";var f={HEX_SUFFIX:{label:"##h",value:0},HEX_PREFIX:{label:"0x##",value:1},HEX_PAIRS:{label:"Hex Pairs (##)",value:2},DECIMAL_PAIRS:{label:"Decimal Pairs (##)",value:3}};a.invalid_input_message="Invalid UID, please enter a UID in the form MMMM:NNNNNNNN",a.uid="",a.euid="",a.error="",a.OUTPUT_FORMATS=f,a.format=f.HEX_PAIRS.value,a.convertToEUID=function(){a.euid="",a.error="";var b=e.uidToBytes(a.uid);if(b[0])return void(a.error=a.invalid_input_message);var g=b[1],h=[];angular.forEach(g,function(a,b){this.push(170|a),this.push(85|a)},h);var i=c.checksumAsArray(h);angular.forEach(i,function(a,b){this.push(170|a),this.push(85|a)},h),a.format===f.HEX_SUFFIX.value?a.euid=d.arrayToHex(h,"","h").join(" "):a.format===f.HEX_PREFIX.value?a.euid=d.arrayToHex(h,"0x").join(" "):a.format===f.HEX_PAIRS.value?a.euid=d.arrayToHex(h).join(" "):a.euid=h.join(" ")}}]).controller("EUIDController",["$scope","$log","checksumService","formatService","parserService","RDM",function(a,b,c,d,e,f){"use strict";var g={DECIMAL:{label:"Decimal",value:0},HEX:{label:"Hexadecimal",value:1}};a.INPUT_FORMATS=g,a.format=g.HEX.value,a.euid="",a.error="",a.uid="",a.convertToUID=function(){a.error="",a.uid="";var b=e.textToBytes(a.euid,a.format===g.HEX.value);if(b[0])return void(a.error="Invalid EUID: "+b[0]);var h=b[1];if(h.length!==f.EUID_SIZE)return void(a.error="Invalid EUID: insufficent data, should be 16 bytes");var i=[h[0]&h[1],h[2]&h[3],h[4]&h[5],h[6]&h[7],h[8]&h[9],h[10]&h[11]],j=((h[12]&h[13])<<8)+(h[14]&h[15]),k=c.checksumAsValue(h.slice(0,12));return j!==k?void(a.error="Checksum mismatch, was "+j+", calculated to be "+k):void(a.uid=d.arrayToUID(i))}}]).controller("RDMPacketBuilder",["$scope","$log","checksumService","parserService","formatService","rdmHelperService","OUTPUT_FORMAT","RDM",function(a,b,c,d,e,f,g,h){"use strict";a.packet={start_code:h.START_CODE,sub_start_code:1,dest_uid:"7a70:00000000",src_uid:"7a70:12345678",transaction_number:0,port_id:0,message_count:0,sub_device:0,command_class:h.COMMAND_CLASS.DISCOVERY_COMMAND,param_id:0,response_type:0,nack_reason:0,ack_timer:0,param_data:"",lower_uid:"",upper_uid:""},a.properties={is_request:!1,show_param_data:!1,pids:[]},a.settings={output_format:g.C_ARRAY.value,wrap:80},a.RDM=h,a.command_classes=[],angular.forEach(h.COMMAND_CLASS,function(a,b){this.push({value:a,label:b+" ("+e.toHex(a,2,"0x")+")"})},a.command_classes),a.command_classes.sort(function(a,b){return a.value===b.value?0:a.value>b.value?1:-1}),a.OUTPUT_FORMAT={},angular.forEach(g,function(a,b){this[a.label]=a.value},a.OUTPUT_FORMAT),a.output="",a.error="";var i=function(b,c){var e=d.uidToBytes(b);return e[0]?(a.error="Invalid "+c+" UID:"+e[0],""):e[1]},j=function(){a.properties.show_param_data=f.isGetSet(a.packet.command_class)&&(a.packet.response_type===h.RESPONSE_TYPE.ACK||a.packet.response_type===h.RESPONSE_TYPE.ACK_OVERFLOW)},k=function(b,c,d){a.packet.command_class=b,a.properties.is_request=f.isRequest(b),j();var g=[];if(b===h.COMMAND_CLASS.DISCOVERY_COMMAND)g=["DISC_UNIQUE_BRANCH","DISC_MUTE","DISC_UN_MUTE"];else if(b===h.COMMAND_CLASS.DISCOVERY_COMMAND_RESPONSE)g=["DISC_MUTE","DISC_UN_MUTE"];else{var i=["DISC_UNIQUE_BRANCH","DISC_MUTE","DISC_UN_MUTE"];angular.forEach(h.PIDS,function(a,b){-1===i.indexOf(b)&&this.push(b)},g)}var k=!1,l=[];angular.forEach(g,function(b,c){k|=a.packet.param_id===h.PIDS[b];var d=b+" ("+e.toHex(h.PIDS[b],4,"0x")+")";this.push({label:d,value:h.PIDS[b]})},l),l.sort(function(a,b){return a.label===b.label?0:a.label>b.label?1:-1}),k||(a.packet.param_id=l[0].value),a.properties.pids=l},l=function(b,c,d){a.packet.response_type=b,j()};a.$watch("packet.response_type",l),a.$watch("packet.command_class",k),a.buildPacket=function(){a.error="";var b=i(a.packet.dest_uid,"destination");if(b){var j=i(a.packet.src_uid,"source");if(j){var k=[];if(a.packet.command_class===h.COMMAND_CLASS.DISCOVERY_COMMAND&&a.packet.param_id===h.PIDS.DISC_UNIQUE_BRANCH){var l=i(a.packet.lower_uid,"lower");if(!l)return;var m=i(a.packet.upper_uid,"upper");if(!m)return;k=l.concat(m)}else if(f.isGetSet(a.packet.command_class))if(a.packet.response_type===h.RESPONSE_TYPE.ACK||a.packet.response_type===h.RESPONSE_TYPE.ACK_OVERFLOW){var n=d.textToBytes(a.packet.param_data);if(n[0])return void(a.error="Invalid parameter data:"+n[0]);k=n[1]}else a.packet.response_type===h.RESPONSE_TYPE.NACK?k=[a.packet.nack_reason>>8,255&a.packet.nack_reason]:a.packet.response_type===h.RESPONSE_TYPE.ACK_TIMER&&(k=[a.packet.ack_timer>>8,255&a.packet.ack_timer]);var o=[a.packet.start_code,a.packet.sub_start_code,k.length+24];o=o.concat(b),o=o.concat(j),o.push(a.packet.transaction_number),f.isRequest(a.packet.command_class)?(o.push(a.packet.port_id),o.push(0)):(o.push(a.packet.response_type),o.push(a.packet.message_count)),o.push(a.packet.sub_device>>8),o.push(255&a.packet.sub_device),o.push(a.packet.command_class),o.push(a.packet.param_id>>8),o.push(255&a.packet.param_id),o.push(k.length),o=o.concat(k),o=o.concat(c.checksumAsArray(o)),a.settings.output_format===g.C_ARRAY.value?a.output=e.dataAsArray(o,a.settings.wrap):a.settings.output_format===g.C_STRING.value?a.output=e.dataAsString(o,a.settings.wrap):a.settings.output_format===g.RAW_HEX.value&&(a.output=e.dataAsRawHex(o,a.settings.wrap))}}}}]).controller("RDMPacketParser",["$scope","$log","checksumService","parserService","formatService","rdmHelperService","RDM",function(a,b,c,d,e,f,g){"use strict";a.packet_data="",a.show_output=!1;var h=function(){a.packet={start_code:"",sub_start_code:"",message_length:"",dest_uid:"",src_uid:"",transaction_number:"",port_id:"",message_count:"",sub_device:"",command_class:"",param_id:"",response_type:"",nack_reason:"",ack_timer:"",param_data_length:"",param_data:"",checksum:"",actual_size:"",calculated_checksum:"",nack_reason_error:"",ack_timer_error:""}};h(),a.reset=function(){h(),a.error="",a.packet_data="",a.show_output=!1},a.parsePacket=function(){h(),a.error="";var b=d.textToBytes(a.packet_data);if(b[0])return void(a.error="Invalid packet data:"+b[0]);var i=b[1],j=i.slice();if(a.packet.actual_size=i.length,!(i.length>=1))return void(a.error="Insufficient data for start code");if(a.packet.start_code=e.toHex(i.shift(),2,"0x"),a.show_output=!0,!(i.length>=1))return void(a.error="Insufficient data for sub start code");if(a.packet.sub_start_code=e.toHex(i.shift(),2,"0x"),!(i.length>=1))return void(a.error="Insufficient data for message length");if(a.packet.message_length=i.shift(),!(i.length>=g.UID_SIZE))return void(a.error="Insufficient data for destination UID");var k=i.slice(0,g.UID_SIZE);if(i=i.slice(g.UID_SIZE),a.packet.dest_uid=e.arrayToUID(k),!(i.length>=g.UID_SIZE))return void(a.error="Insufficient data for source UID");var l=i.slice(0,g.UID_SIZE);if(i=i.slice(g.UID_SIZE),a.packet.src_uid=e.arrayToUID(l),!(i.length>=1))return void(a.error="Insufficient data for transaction number");a.packet.transaction_number=i.shift();var m;if(!(i.length>=1))return void(a.error="Insufficient data for port ID / response type");if(m=i.shift(),!(i.length>=1))return void(a.error="Insufficient data for message count");a.packet.message_count=i.shift();var n,o;if(!(i.length>=2))return void(a.error="Insufficient data for sub device");var p=(i.shift()<<8)+i.shift();n=e.reverseLookup(g.SUB_DEVICE,p),n?a.packet.sub_device=n+" ("+e.toHex(p,4,"0x")+")":a.packet.sub_device=p;var q;if(!(i.length>=1))return void(a.error="Insufficient data for command class");if(q=i.shift(),n=e.reverseLookup(g.COMMAND_CLASS,q),o=e.toHex(q,2,"0x"),n?a.packet.command_class=n+" ("+o+")":a.packet.command_class=o,f.isResponse(q)?(n=e.reverseLookup(g.RESPONSE_TYPE,m),o=e.toHex(m,4,"0x"),n?a.packet.response_type=n+" ("+o+")":a.packet.response_type=o):a.packet.port_id=m,!(i.length>=2))return void(a.error="Insufficient data for parameter ID");var r=(i.shift()<<8)+i.shift();n=e.reverseLookup(g.PIDS,r),o=e.toHex(r,4,"0x"),n?a.packet.param_id=n+" ("+o+")":a.packet.param_id=o;var s;if(!(i.length>=1))return void(a.error="Insufficient data for parameter data length");if(s=i.shift(),a.packet.param_data_length=s,!(i.length>=s))return void(a.error="Insufficient data for parameter data");var t=i.slice(0,s);if(i=i.slice(s),f.isResponse(q)&&m===g.RESPONSE_TYPE.NACK)if(2===s){var u=(t[0]<<8)+t[1];n=e.reverseLookup(g.NACK_REASON,u),o=e.toHex(u,4,"0x"),n?a.packet.nack_reason=n+" ("+o+")":a.packet.nack_reason="Unknown: "+o}else a.packet.nack_reason_error="Parameter data length should be 2";else if(f.isResponse(q)&&m===g.RESPONSE_TYPE.ACK_TIMER)if(2===s){var v=(t[0]<<8)+t[1];a.packet.ack_timer=v}else a.packet.ack_timer_error="Parameter data length should be 2";else a.packet.param_data=e.arrayToHex(t,"0x");if(!(i.length>=2))return i.length&&(j=j.slice(0,-1)),a.packet.calculated_checksum=e.toHex(c.checksumAsValue(j),4,"0x"),void(i=[]);var w=(i.shift()<<8)+i.shift();a.packet.checksum=e.toHex(w,4,"0x"),a.packet.calculated_checksum=e.toHex(c.checksumAsValue(j.slice(0,-2)),4,"0x"),0!==i.length&&(a.error="Extra data after checksum")}}]);
//# sourceMappingURL=rdm.js.map
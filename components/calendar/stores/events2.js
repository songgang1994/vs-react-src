var moment = require('moment');

module.exports = [{
    "_id": "544c4183be624ef013bb009a",
    "title": "营销部-张某-商务",
    "start": moment().subtract(1, 'day').startOf('day').add(11, 'hours'),
    "end": moment().subtract(1, 'day').startOf('day').add(13, 'hours'),
    "description": "接待客户",
    "icon": "fa-check",
    "className": ["event", "bg-color-blue"],
    "room":"会议室二"
}, {
    "_id": "544c4183be624ef013bb009b",
    "title": "开发部-陈某-面试",
    "start": moment().subtract(3, 'day').startOf('day').add(9, 'hours'),
    "end": moment().subtract(3, 'day').startOf('day').add(18, 'hours'),
    "description": "面试实习生",
    "icon": "fa-lock",
    "className": ["event", "bg-color-red"],
    "room":"会议室三"
}, {
    "_id": "544c4183be624ef013bb009c",
    "id": 999,
    "title": "秘书室-孙某某-商务",
    "start": moment().subtract(4, 'day').startOf('day').add(13, 'hours'),
    "end": moment().subtract(4, 'day').startOf('day').add(18, 'hours'),
    "description": "文档整理",
    "allDay": false,
    "icon": "fa-clock-o",
    "className": ["event", "bg-color-darken"],
    "room":"会议室一"
}, {
    "_id": "544c4183be624ef013bb009d",
    "id": 999,
    "title": "营销部-张某-商务",
    "start": moment().add(2, 'day').startOf('day').add(14, 'hours'),
    "end": moment().add(2, 'day').startOf('day').add(16, 'hours'),
    "description": "和XX公司XX谈合作事项",
    "allDay": false,
    "icon": "fa-clock-o",
    "className": ["event", "bg-color-blue"],
    "room":"会议室二"
}, {
    "_id": "4",
    "id": 999,
    "title": "人事部-王某-面试",
    "start": moment().add(2, 'day').startOf('day').add(9, 'hours'),
    "end": moment().add(2, 'day').startOf('day').add(11, 'hours'),
    "description": "面试实习生",
    "allDay": false,
    "icon": "fa-clock-o",
    "className": ["event", "bg-color-red"],
    "room":"会议室三"
}, {
    "_id": "544c4183be624ef013bb009e",
    "title": "开发部-李某-商务",
    "start": moment().add(1, 'day').startOf('day').add(9, 'hours').add(30, 'minutes'),
    "end": moment().add(1, 'day').startOf('day').add(13, 'hours').add(30, 'minutes'),
    "description": "XX项目立项研讨",
    "allDay": false,
    "className": ["event", "bg-color-darken"],
    "room":"会议室一"
}, {
    "_id": "1",
    "title": "秘书室-张某某-商务",
    "start": moment().add(1, 'day').startOf('day').add(10, 'hours').add(30, 'minutes'),
    "end": moment().add(1, 'day').startOf('day').add(12, 'hours').add(30, 'minutes'),
    "description": "接待XX公司XX",
    "allDay": false,
    "className": ["event", "bg-color-blue"],
    "room":"会议室二"
},{
    "_id": "2",
    "title": "广告部-王某某-商务",
    "start": moment().add(1, 'day').startOf('day').add(11, 'hours').add(30, 'minutes'),
    "end": moment().add(1, 'day').startOf('day').add(14, 'hours').add(30, 'minutes'),
    "description": "产品演示",
    "allDay": false,
    "className": ["event", "bg-color-red"],
    "room":"会议室三"
},{
    "_id": "544c4183be624ef013bb009f",
    "title": "开发部-甲某-私人",
    "start": moment().add(3, 'day').startOf('day').add(10, 'hours'),
    "end": moment().add(3, 'day').startOf('day').add(12, 'hours'),
    "description": "私人业务办理",
    "allDay": false,
    "className": ["event", "bg-color-darken"],
    "room":"会议室一"
}, {
    "_id": "3",
    "title": "安保部-乙某-其他",
    "start": moment().add(3, 'day').startOf('day').add(11, 'hours'),
    "end": moment().add(3, 'day').startOf('day').add(12, 'hours'),
    "description": "新人培训",
    "allDay": false,
    "className": ["event", "bg-color-red"],
    "room":"会议室三"
},{
    "_id": "544c4183be624ef013bb00a0",
    "title": "营销部-王某-商务",
    "start": moment().add(4, 'day').startOf('day').add(15, 'hours'),
    "end": moment().add(4, 'day').startOf('day').add(17, 'hours').add(30, 'minutes'),
    "description": "业务办理",
    "allDay": false,
    "className": ["event", "bg-color-darken"],
    "room":"会议室一"
}, {
    "_id": "544c4183be624ef013bb00a1",
    "title": "广告部-李某某-其他",
    "start": moment().add(5, 'day').startOf('day').add(9, 'hours'),
    "end": moment().add(5, 'day').startOf('day').add(16, 'hours'),
    "description": "新人培训",
    "className": ["event", "bg-color-blue"],
    "room":"会议室二"
}];

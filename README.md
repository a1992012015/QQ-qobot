### Robot

这是一个QQ机器人的开发demo，可以自定义添加各种自己需要的逻辑，tag标签在0.1.0里面的初始模板

### Robot 启动条件

- 必须在本地安装[酷Q](https://cqhttp.cc/docs/4.7/#/)的sdk
- [node](https://nodejs.org/en/) 10+
- 掌握 ES6

### Robot 目录结构

```
├── bin
│   │
│   └── www => 项目启动文件
│
├── logs => 日志目录，存放系统生成的日志信息
│   │
│   └── *-error.log => 错误的日志
│   │
│   └── *-success.log => 正常的日志
│   │
│   └── info.log => 一般的信息记录
│
├── public => 存放img、js、css等等
│   │
│   └── images => 图片文件夹
│   │
│   └── js => js存放文件夹
│   │
│   └── stylesheets => css样式存放文件夹
│
├── robotPrototype => 网站的核心内容，包括controller、model、mongoose等等
│   │
│   └── controller => 控制器 主要连接模型和视图
│   │
│   └── middlewares => 项目中间件
│   │
│   └── models => 系统模型，主要编写数据库表结构、部分逻辑处理
│   │
│   └── mySql => 数据库信息
│   │
│   └── prototype => 编写公共组件。比如百度地图的API、表单处理、图片上传等等
│   │
│   └── util => 自定义目录，目前只存放了日志文件
│
├── routes => 存放系统路由信息
│   │
│   └── index.js => 路由配置信息
│
├── view => 前端页面存放的位置
│
├── app.js => 项目启动入口
│
├── .babelrc => ES6转换配置文件
│
├── .gitignore => git忽略配置文件
│
├── package.json => 项目依赖列表
│
└── README.md => 说明文件
```
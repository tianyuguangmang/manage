import { UploaderBuilder, Uploader } from 'qiniu4js';
import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui'
// 减少使用该方法
export function imgLoad(e) {
  if (e.target.files.length > 1) {
    Message.error("一次只能上传一张图片");
    return
  }
  var header = window.location.protocol;
  let file = e.target.files[0];
  if (!/image\/\w+/.test(file.type)) {
    Message.error("只能上传image类型的文件");
    return
  }
  let d = new Date();
  let type = file.name.split('.');
  let tokenParem = {
    'retrunBody': '{"name":"$(fname)","size":"$(fsize)","w":"$(imageInfo.width)","h":"$(imageInfo.height)","hash":"$(etag)"}',
    'key': 'orderReview/' + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.valueOf() + '.' + type[type.length - 1],
    'bucket': header + '//img.chuanshangjia.com/',//七牛的地址，这个是你自己配置的（变量）
  };
  let param = new FormData(); //创建form对象
  param.append('chunk', '0');//断点传输
  param.append('chunks', '1');
  param.append('file', file, file.name)
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  };
  return new Promise(function (resolve, reject) {
    //先从自己的服务端拿到token
    axios.post('/uploadImg/getToken', qs.stringify(tokenParem))
      .then(response => {
        var token = response.data.token;
        param.append('token', token);
        var domain = header + "//upload.qiniup.com";
        axios.post(domain, param, config)
          .then(response => {
            var url = 'https://img.chuanshangjia.com/' + response.data.key;
            resolve(url)
          })
      })
  })
}
// 图片
export function imgUpload(_this, dealType, onTaskSuccess) {
  var compress = 1;
  var scale = [0, 0];
  if (dealType == 1) {
    compress = 0.8;
    scale = [200, 200];
  } else if (dealType == 2) {
    compress = 0.5;
    scale = [750, 0];
  } else if(dealType == 3) {
    compress = 0.5;
    scale = [750, 600];
  }
  let uploadImg = new UploaderBuilder()
    .domain({http: "http://upload.qiniup.com", https: "https://upload.qiniup.com"})
    .debug(false)//开启debug，默认false
    .retry(5)//设置重传次数，默认0，不重传
    .compress(compress)//默认为1,范围0-1 , 1不压缩
    .scale(scale) //第一个参数是宽度，第二个是高度,[200,0],限定高度，宽度等比缩放.[0,100]限定宽度,高度等比缩放.[200,100]固定长宽,[0,0]原图
    .size(1024 * 1024)//分片大小，最多为4MB,单位为字节,默认1MB
    .chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
    .auto(true)//选中文件后立即上传，默认true
    .multiple(false)//是否支持多文件选中，默认true 
    .accept(['.jpg','.jpeg','.png','.bmp'])//过滤文件，默认无，['.gif','.png','video/*']
    // 如果saveKey中有需要在客户端解析的变量，则忽略该值。
    .tokenShare(false)
    // 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
    .tokenFunc(function (setToken, task) {
      axios.post('/uploadImg/getToken')
      .then(function (res) {
        setToken(res.data.token);
      })
      .catch(function (err) {
        console.log(err);
      })
    })
    //任务拦截器
    .interceptor({
      //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
      onIntercept: function (task) {
        if(task.file.size > 5 * 1024 * 1024) {
          _this.$message.error("图片过大，导致上传失败，请调整图片尺寸后重新上传！");
          return true;
        }
        else {
          return false;
        }
      },
    })
    .listener({
      onReady(tasks) {
      }, onStart(tasks) {
      }, onTaskProgress: function (task) {
      }, onTaskGetKey(task){
        //为每一个上传的文件指定key,如果不指定则由七牛服务器自行处理
        return task.file.name;
      }, onTaskSuccess(task) {
        if(typeof(onTaskSuccess) === "string"){
          eval(onTaskSuccess);
        } else {
          var _url = 'https://img.chuanshangjia.com/'+task.result.key;
          onTaskSuccess(_this, _url);
        }
      }, onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        _this.$message("上传失败");
      }, onTaskRetry(task) {
        //开始重传
      }, onFinish(tasks) {
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
      }
    });
  return uploadImg.build();
}
// 视频
export function videoUpload(_this, videoUrl, logoUrl, formStartUpload, formDoneUpload) {
  let uploadVideo = new UploaderBuilder()
    .domain({http: "http://upload.qiniup.com", https: "https://upload.qiniup.com"})
    .debug(false)//开启debug，默认false
    .retry(5)//设置重传次数，默认0，不重传
    .size(2 * 1024 * 1024)//分片大小，最多为4MB,单位为字节,默认1MB
    .chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
    .auto(true)//选中文件后立即上传，默认true
    .multiple(false)//是否支持多文件选中，默认true
    .accept(['.mp4', '.3pg', '.avi', '.rm'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
    // 如果saveKey中有需要在客户端解析的变量，则忽略该值。
    .tokenShare(false)
    // 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
    .tokenFunc(function (setToken, task) {
      axios.post('uploadImg/getToken')
        .then(function (res) {
          setToken(res.data.token);
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    //任务拦截器
    .interceptor({
      //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
      onIntercept: function (task) {
          if(task.file.size > 50 * 1024 * 1024) {
            _this.$message.error("上传的视频文件不能大于50M");
            return true;
          }
          else {
            eval(formStartUpload);
            return false;
          }
      },
    })
    .listener({
      onReady(tasks) {
      }, onStart(tasks) {
      }, onTaskProgress: function (task) {
        // 进度
        _this.upload_progress = task.progress;
      }, onTaskGetKey(task){
        return task.file.name;
      }, onTaskSuccess(task) {
        // 进度状态
        _this.upload_status = "success";
        // 处理
        setTimeout(() => {
          eval(logoUrl);
          eval(videoUrl);
          eval(formDoneUpload);
        }, 1500);
      }, onTaskFail(task) {
        //一个任务在经历重传后依然失败后回调此函数
        _this.upload_status = "exception";
        setTimeout(() => {
          _this.upload_progress = 0;
          eval(formDoneUpload);
          _this.upload_status = "";        
        }, 1500);
        _this.$message.error("上传失败");        
      }, onTaskRetry(task) {
        //开始重传
      }, onFinish(tasks) {
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
      }
    });
  return uploadVideo.build();
}
// 文件
export function fileUpload(_this,cb) {
  let uploadFile = new UploaderBuilder()
    .domain({http: "http://upload.qiniup.com", https: "https://upload.qiniup.com"})  
    .debug(false)//开启debug，默认false
    .retry(5)//设置重传次数，默认0，不重传
    .size(1024 * 1024)//分片大小，最多为4MB,单位为字节,默认1MB
    .chunk(true)//是否分块上传，默认true，当chunk=true并且文件大于4MB才会进行分块上传
    .auto(true)//选中文件后立即上传，默认true
    .multiple(false)//是否支持多文件选中，默认true
    // .accept(['.mp4', '.3pg', '.avi', '.rm'])//过滤文件，默认无，详细配置见http://www.w3schools.com/tags/att_input_accept.asp
    // 如果saveKey中有需要在客户端解析的变量，则忽略该值。
    .tokenShare(false)
    // 设置token获取函数，token获取完成后，必须调用`setToken(token);`不然上传任务不会执行。
    .tokenFunc(function (setToken, task) {
      axios.post('/uploadImg/getToken')
        .then(function (res) {
          setToken(res.data.token);
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    //任务拦截器
    .interceptor({
      //拦截任务,返回true，任务将会从任务队列中剔除，不会被上传
      onIntercept: function (task) {
          if(task.file.size > 5 * 1024 * 1024) {
            _this.$message.error("上传的证书文件不能大于5M");
            return true;
          }
          else {
            return false;
          }
      },
    })
    .listener({
      onReady(tasks) {
        var _str = tasks[0]._file.name+'';     
        //_this.dataMsg.certificate.name=_str;
      }, onStart(task) {
      }, onTaskGetKey(task){
        return task.file.name;
      }, onTaskProgress: function (task) {
      }, onTaskSuccess(task) {
        
        // 进度状态
      
        cb(task);
       /* setTimeout(() => {
          _this.dataMsg.certificate.url = 'https://img.chuanshangjia.com/'+task.result.key;
         // _this.dataMsg.certificate= JSON.stringify(_this.certificate)
        }, 100);*/
      }, onTaskFail(task) {
      }, onTaskRetry(task) {
        //开始重传
      }, onFinish(tasks) {
        //所有任务结束后回调，注意，结束不等于都成功，该函数会在所有HTTP上传请求响应后回调(包括重传请求)。
      }
    });
  return uploadFile.build();
}
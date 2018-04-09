// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
//const proxyDomain = 'http://192.168.6.199:9080';
//const proxyDomain = 'http://192.168.6.210:9080';

const proxyDomain = 'https://oa.jixuejiyong.com';

// const proxyDomain = 'http://192.168.6.199:9002';
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/merchant.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'merchant_manage/static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3020,
    autoOpenBrowser: true,
    assetsSubDirectory: 'merchant_manage/static',
    assetsPublicPath: '/',
    proxyTable: {
      '/cashaccount': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/cashaccount': '/cashaccount'
        }
       },
      '/platformtransorder': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/platformtransorder': '/platformtransorder'
        }
       },
      '/subjectbalancebilling': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/subjectbalancebilling': '/subjectbalancebilling'
        }
       },
      '/platformmerchantratetemplate': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/platformmerchantratetemplate': '/platformmerchantratetemplate'
        }
       },
      '/merchanttraderate': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/merchanttraderate': '/merchanttraderate'
        }
       },
      '/wechat': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/wechat': '/wechat'
        }
       },
       '/complete_payment': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/complete_payment': '/complete_payment'
        }
       },
       '/manage_pay_template': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/manage_pay_template': '/manage_pay_template'
        }
      },
       '/uploadImg': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/uploadImg': '/uploadImg'
        }
      },
      '/toLogout': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/toLogout': '/toLogout'
        }
      },
      '/platformapptemplate': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/platformapptemplate': '/platformapptemplate'
        }
      },
      '/platformappmanager': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/platformappmanager': '/platformappmanager'
        }
      },
      '/platformmerchant': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/platformmerchant': '/platformmerchant'
        }
      },
       '/smssendcontroller': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/smssendcontroller': '/smssendcontroller'
        }
      },
      '/wiserver/websoket': {
        target: proxyDomain,
        changeOrigin: true,
        pathRewrite: {
          '^/wiserver/websoket': '/wiserver/websoket'
        }
      },//ws://192.168.6.210:9001/wiserver/websoket

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

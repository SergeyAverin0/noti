export default {
  appenders: {
    access: {
      type: 'dateFile',
      filename: 'log/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http',
    },
    console: {
      type: 'console',
      level: 'info',
    },
    appFile: {
      type: 'file',
      filename: 'log/app.log',
      maxLogSize: 10485760,
      numBackups: 3,
    },
    errorFile: {
      type: 'file',
      filename: 'log/errors.log',
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
    app: {
      type: 'logLevelFilter',
      level: 'DEBUG',
      maxLevel: 'WARN',
      appender: 'appFile',
    },
  },
  categories: {
    default: { appenders: ['errors', 'app', 'console'], level: 'DEBUG' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
}

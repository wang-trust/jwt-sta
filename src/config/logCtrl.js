import fs from 'fs';
import path from 'path';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { formatDate } from '../model/format.js';
import { logConfig } from './config.js';

/*
需要完成的功能：
启动时加载文件
日志写入操作
日志格式要求：时间 等级 进程/线程ID 文件名 函数名 行数 IP msg
    23-03-22 12:52:56 INFO  (412421:src/econ_web.c:econ_work_thread:242) 61.54.21.87 connect,cfd=11,visit_number=8115
    ':remote-addr :date[iso] :url :method :status :from :res[content-length] :response-time ms :user-agent '
    :date[iso] INFO (src/econ_web.c) :remote-addr :method :url :user-agent msg
自动分文件
日志分级：Debug Info Warning --是否分文件存储

路由log
运行中log
三种级别日志是否分文件存储

*/




class LogCtrl {
    constructor(config) {
        this.config = config;
        this.path = './log/' + config.filename;
        this.size = this.parseConfig();
        this.index = -1;
        this.newlogfile();

        if (!this.ws) {
            this.ws = fs.createWriteStream(this.path, {
                flags: 'a',
                mode: 438,
                fd: null,
                encoding: 'utf-8',
                start: 0
            });
        }

        // 自动分割文件
        setInterval(() => {
            this.newlogfile();
            if (!this.ws) {
                this.ws = fs.createWriteStream(this.path, {
                    flags: 'a',
                    mode: 438,
                    fd: null,
                    encoding: 'utf-8',
                    start: 0
                });
            }
        }, logConfig.intervalTime);

    }

    // 自定义 log
    wlogDebug(msg, filename, req) {
        if (this.config.level <= 1) {
            this.wlogbase(msg, filename, req, 'DEBUG');
        }
    }
    wlogInfo(msg, filename, req) {
        if (this.config.level <= 2) {
            this.wlogbase(msg, filename, req, 'INFO');
        }
    }
    wlogWarning(msg, filename, req) {
        if (this.config.level <= 3) {
            this.wlogbase(msg, filename, req, 'WARNING');
        }
    }

    wlogbase(msg, filename, req, level) {
        let date = formatDate(new Date());
        let remoteAaddr = req.get('x-real-ip');
        let method = req.method;
        let url = req.url;

        // :date[iso] INFO (src/econ_web.c) :remote-addr :method :url msg
        let log = `${date} ${level} (${filename}) ${remoteAaddr} ${method} ${url} [${msg}]\n`;
        this.ws.write(log);
    }

    // api log
    logDebug(msg, req) {
        if (this.config.level <= 1) {
            this.logbase(msg, req, 'DEBUG');
        }
    }
    logInfo(msg, req) {
        if (this.config.level <= 2) {
            this.logbase(msg, req, 'INFO');
        }
    }
    logWarning(msg, req) {
        if (this.config.level <= 3) {
            this.logbase(msg, req, 'WARNING');
        }
    }

    logbase(msg, req, level) {
        let date = formatDate(new Date());
        let remoteAaddr = req.get('x-real-ip');
        let method = req.method;
        let url = req.url;
        let userAagent = req.get('user-agent');

        // :date[iso] INFO (src/econ_web.c) :remote-addr :method :url :user-agent msg
        let log = `${date} ${level} ${remoteAaddr} ${method} ${url} (${userAagent}) [${msg}]\n`;
        this.ws.write(log);
    }


    parseConfig() {
        let size = parseInt(this.config.size);
        let unit = this.config.size.replace('' + size, '').trim();

        switch (unit.toUpperCase()) {
            case 'KB': size *= 1024; break;
            case 'K': size *= 1000; break;
            case 'MB': size *= 1024 * 1024; break;
            case 'M': size *= 1000 * 1000; break;
            case 'GB': size *= 1024 * 1024 * 1024; break;
            case 'G': size *= 1000 * 1000 * 1000; break;
            default: break;
        }
        // console.log(`size = ${size}`);
        // console.log(`unit = ${unit}`);

        return size;
    }

    newlogfile() {
        // 判断是否存在
        if (fs.existsSync(this.path)) {
            let stat = fs.statSync(this.path);
            // 判断大小是否满足
            if (stat.size >= this.size) {
                let dir = path.dirname(this.path);
                let fileName = path.basename(this.path) + '.';
                let dircontent = fs.readdirSync(dir);

                // 判断是否有已存在的log
                dircontent.forEach(file => {
                    let temp = file.replace(fileName, '');
                    let tempNum = Number(temp);
                    if (tempNum >= 0 && tempNum > this.index) {
                        this.index = tempNum;
                    }
                });
                let newfileName = `${this.path}.${++this.index}`;

                if (this.ws) {
                    this.ws.close();
                    this.ws = null;
                }
                // console.log(`index = ${newfileName}`);
                // 文件重命名
                fs.renameSync(this.path, newfileName);
            }
        }
    }

}

const logCtrl = new LogCtrl(logConfig);


export {
    logCtrl
}

import { createLogger, transports, format } from "winston";
import moment from "moment";
import { padEnd } from "lodash";

import { LOG_FILE } from "./vars";

export default createLogger({
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(info => {
                    const ts = moment()
                        .utc()
                        .format("Y-MM-DD HH:mm:ss");
                    const lev = padEnd(`[${info.level}]`, 17);
                    return `${ts} ${lev} - ${info.message}`;
                })
            )
        }),
        new transports.File({
            format: format.combine(format.timestamp(), format.json()),
            filename: LOG_FILE
        })
    ]
});

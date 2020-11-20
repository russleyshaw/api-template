import { transports, format } from "winston";
import moment from "moment";
import { padEnd } from "lodash";

export function getConsoleTransport(): transports.ConsoleTransportInstance {
    return new transports.Console({
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
    });
}

export function getFileTransport(filename: string): transports.FileTransportInstance {
    return new transports.File({
        format: format.combine(format.timestamp(), format.json()),
        filename
    });
}

import { createLogger } from "winston";

import { LOG_FILE } from "./vars";
import { getFileTransport, getConsoleTransport } from "./utils/logging";

export default createLogger({
    transports: [getConsoleTransport(), getFileTransport(LOG_FILE)]
});

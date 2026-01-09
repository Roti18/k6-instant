
export function log(level, message, data = null) {
    const logObj = {
        level: level.toUpperCase(),
        msg: message,
        ...(data && { context: data })
    };

    // k6 will capture this console output
    console.log(JSON.stringify(logObj));
}

export const logging = (req, res, next) => {
    let time = new Date().toLocaleDateString();
    const log = {
        time: time,
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body,
        hostname: req.hostname
    }
    // console.info(log);

    // save to database
    console.log('==============')
    console.log('waiting to save log to database')
    next();
};
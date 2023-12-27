export const logging = (req, res, next) => {
    let time = new Date().toLocaleDateString();
    const log = {
        time: new Date(),
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body
    }
    console.info(log)

    // save to database
    console.log('==============')
    console.log('waiting to save log to database')
    next()
};
function handleError(res, message, error){
    res.render('/error', {
        message,
        error
    })
}

module.exports = {
    handleError
}
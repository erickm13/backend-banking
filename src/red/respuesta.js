exports.succes = function(req, res , mensaje = '', status = 200){
    res.status(status).send({
        status: status,
        error: false,
        body: mensaje
    })
}

exports.error = function(req, res , mensaje = 'Error Interno', status = 500){
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    })
}

exports.semaforo = function(req, res , mensaje = '', status = 200){
    res.status(status).send({
        status: 1,
        message: "Data Retriever",
        values: mensaje
    })
}
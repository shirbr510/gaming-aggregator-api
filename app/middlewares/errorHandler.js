// @flow

const errorHandler=(err, request, response, next) => {
    // log the error, for now just console.log
    console.log(err);
    response.status(500).send('Something broke!')
};

export default errorHandler
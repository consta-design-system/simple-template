module.exports = {
    _proxy: {
        // Заголовки, которые будут подставляться в ответы от сервера
        header: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },

    // Замаканный метод API
    'GET /api/workspace/bundle': async (request, response) => {
        return response.json(request.query);
    }
};

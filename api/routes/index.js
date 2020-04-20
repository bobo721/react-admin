const userController = require('../controllers').user;
const toolController = require('../controllers').tool;
const b_toolController = require('../controllers').b_tool;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send ({
        message: 'Vítejte v API',
    }));

    //jednotlívé endpointy

    //vytvoření uživatele
    app.post('/api/users', userController.create);
    app.get('/api/users', userController.findAll);
    app.get('/api/users/many', userController.findMany);
    app.get('/api/users/:id', userController.findByID);
    app.put('/api/users/:id', userController.update);
    app.delete('/api/users/:id', userController.delete);

    app.post('/api/tools', toolController.create);
    app.get('/api/tools', toolController.findAll);
    app.get('/api/tools/many', toolController.findMany);
    app.get('/api/tools/:id', toolController.findByID);
    app.get('/api/toolsborrow/:id', toolController.borrowCount);
    app.put('/api/tools/:id', toolController.update);
    app.delete('/api/tools/:id', toolController.delete);

    app.get('/api/b_tools', b_toolController.findAll);
    app.get('/api/b_tools/many', b_toolController.findMany);
    app.get('/api/b_tools/:id', b_toolController.findByID);
    app.put('/api/b_tools/:id', b_toolController.update);
    app.post('/api/b_tools', b_toolController.create);
    app.delete('/api/b_tools/:id', b_toolController.delete);

}
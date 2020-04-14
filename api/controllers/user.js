const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models').User;

module.exports = {

    findAll(req, res) { 
        const limit = (req.query.limit);  
        const offset = (req.query.offset);
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const filtry = JSON.parse(req.query.filter);


        const options = {
            raw: true,
            where: ({
                
            }),
            order: 
                []
            ,
        };

        if (typeof limit !== "undefined") {
            options.limit = Number(limit);
        }

        if (typeof offset !== "undefined") {
            options.offset = Number(offset);
        }

        if ((typeof sortBy !== "undefined") && (typeof sortOrder !== "undefined")) {
            options.order = [[sortBy, sortOrder]];
        }

        if (typeof filtry.id !== "undefined") {
            options.where.id = filtry.id;
        }


        return User
        .findAll(options)
            //console.log(user);
            //res.status(201).send(test); 
        .then(user => {
            //console.log(user);
            res.header("Content-Range", 'items 0-' + user.length + '/' + user.length);
            res.status(200).send(user);
        })
        .catch(error => res.status(400).send(error));
    },

    findMany(req, res) {
        
        let filtry = JSON.parse(req.query.filter);
        
        return User
        .findAll({
            where: {
                id: {
                    [Op.in]: filtry.id
                  }
            }
          })
        .then(user => {
            //console.log(user);
            res.status(200).send(  user  );
        })
        .catch(error => res.status(400).send(error));
    },

    findByID(req, res) {
        return User
        .findOne({
            where: {
              id: req.params.id 
            }
          })
        .then(user => {
           
            res.status(200).send( user );
        })
        .catch(error => res.status(400).send(error));
    },

    create(req, res) {
        return User
        .create({
            name: req.body.name,
            email: req.body.email,
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return User
        .update({
            name: req.body.name,
            email: req.body.email,
        }, {
            where: {
              id: req.params.id 
            },
            returning: true,
            plain: true
          })
        .then(() => {return User
            .findOne({
                where: {
                  id: req.params.id 
                }
              })})
        .then(user => {
           
            res.status(201).send(user);
        })
        .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return User
        .destroy({
            where: {
              id: req.params.id 
            }
          })
        .then(user => {
            
            res.status(200).send({ message: "User ID " + req.params.id + " Smazán" });
        })
        .catch(error => res.status(400).send(error));
    },
};

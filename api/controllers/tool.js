const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Tool = require('../models').Tool;

module.exports = {

    findAll(req, res) {
        //console.log(req);  
        const limit = (req.query.limit);  
        const offset = (req.query.offset);
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder;
        const filtry = JSON.parse(req.query.filter);

        console.log(limit);
        console.log(offset);
        console.log(sortBy);
        console.log(sortOrder);
        console.log(filtry);

        //let text_filtr = "";
        //if (typeof filtry.q !== "undefined") {
        //    text_filtr = filtry.q;
        //}
        

        //text_filtr = filtry.q;
        //delete filtry.q;
       // console.log(filtry) ;
        //console.log(text_filtr) ;


        const options = {
            raw: true,
            where: ({
                
            }),
            order: 
                []
            ,
        };
        console.log(options) ;

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
        console.log(options) ;


        return Tool
        .findAll(options)
            //console.log(user);
            //res.status(201).send(test); 
        .then(tool => {
            //console.log(user.rows);
            res.header("Content-Range", 'items 0-' + tool.length + '/' + tool.length);
            res.status(200).send(tool);
        })
        .catch(error => res.status(400).send(error));
    },

    findMany(req, res) {
        console.log("find many")
        let filtry = JSON.parse(req.query.filter);
        console.log(filtry)
        return Tool
        .findAll({
            where: {
                id: {
                    [Op.in]: filtry.id
                  }
            }
          })
        .then(tool => {
            console.log(tool);
            res.status(200).send(  tool  );
        })
        .catch(error => res.status(400).send(error));
    },

    findByID(req, res) {
        return Tool
        .findOne({
            where: {
              id: req.params.id 
            }
          })
        .then(tool => {
            console.log(tool);
            res.status(200).send( tool );
        })
        .catch(error => res.status(400).send(error));
    },

    create(req, res) {
        return Tool
        .create({
            name: req.body.name,
            code: req.body.code,
            state: req.body.state,
            free: req.body.free,
        })
        .then(tool => res.status(201).send(tool))
        .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        return Tool
        .update({
            name: req.body.name,
            code: req.body.code,
            state: req.body.state,
            free: req.body.free,
        }, {
            where: {
              id: req.params.id 
            },
            returning: true,
            plain: true
          })
        .then(() => {return Tool
            .findOne({
                where: {
                  id: req.params.id 
                }
              })})
        .then(tool => {
            console.log(tool);
            res.status(201).send(tool);
        })
        .catch(error => res.status(400).send(error));
    },

    delete(req, res) {
        return Tool
        .destroy({
            where: {
              id: req.params.id 
            }
          })
        .then(tool => {
            console.log(tool);
            res.status(200).send({ message: "tool ID " + req.params.id + " Smazán" });
        })
        .catch(error => res.status(400).send(error));
    },
};

'use strict';

const express = require('express');
const dataModules = require('../../../auth-server/src/auth/models');
const basicAuth = require('../../../auth-server/src/auth/middleware/basic')
const bearerAuth = require('../../../auth-server/src/auth/middleware/bearer')
const permissions = require('../../../auth-server/src/auth/middleware/acl')

const router = express.Router();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

router.get('/:model', basicAuth, handleGetAll);
router.get('/:model/:id', basicAuth, handleGetOne);
router.post('/:model', bearerAuth, permissions('create'), handleCreate);
router.put('/:model/:id', bearerAuth, permissions('update'), handleUpdate);
router.delete('/:model/:id', bearerAuth, permissions('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll({});
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findOne({where: { id: id }})
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  const record = await req.model.findOne({where: { id: id}})
  let updatedRecord = await record.update(obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  const record = await req.model.findOne({where: { id: id }})
  let deletedRecord = await record.destroy(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;

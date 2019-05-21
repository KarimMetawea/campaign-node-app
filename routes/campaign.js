const Joi = require('joi');
const express = require('express');
const router = express.Router()

const schema = {
  name: Joi.string().required(),
  country: Joi.string().required(),
  budget: Joi.number().integer().required(),
  goal: Joi.string().required(),
  category: Joi.optional()
};

const campaigns = [{ name: 'n1', country: 'EGY', budget: 149, goal: 'awarness', category: 'technology' },
{ name: 'n2', country: 'EGY', budget: 149, goal: 'awarness', category: 'technology' }
  , { name: 'n3', country: 'EGY', budget: 149, goal: 'awarness', category: 'technology' }
  , { name: 'n4', country: 'EGY', budget: 149, goal: 'awarness', category: 'technology' }
  , { name: 'n5', country: 'EGY', budget: 149, goal: 'awarness', category: 'technology' }]

  router.get('/', (req, res) => {
    res.send(campaigns);
  });

  router.get('/:name', (req, res) => {
    let campaign = campaigns.find(c => c.name === req.params.name);
    if (!campaign) return res.status(400).send(result.error.details[0].message);
    res.send(campaign);
  });

  router.post('/', (req, res) => {
    const result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send(result.error.details[0].message);
      
    
    const campaign = {
      name: req.body.name
      , country: req.body.country
      , budget: req.body.budget
      , goal: req.body.goal
      , category: req.body.category
    }
  
    campaigns.push(campaign);
    res.send(campaign)
  });


  router.put('/:name', (req, res) => {
    const campaign = campaigns.find(c => c.name === req.params.name)
    if (!campaign) return res.status(404).send("the campaign doesn't exist")

    const result = Joi.validate(req.body, schema)

    if (result.error) return res.status(400).send(result.error.details[0].message);
        
    
    campaign.name = req.body.name
    campaign.budget = req.body.budget
    campaign.category = req.body.category
    campaign.goal = req.body.goal
    campaign.country = req.body.country
    res.send(campaign)
  });

  router.delete('/:name',(req, res) => {
    const campaign = campaigns.find(c => c.name === req.params.name)
    if (!campaign) return res.status(404).send("the campaign doesn't exist")

    const index = campaigns.indexOf(campaign);
    campaigns.splice(index,1);
    res.send(campaign);

  });

module.exports = router;
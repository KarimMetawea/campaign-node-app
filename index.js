const Joi = require('joi');
const express =  require('express');
const app = express();

app.use(express.json());

const campaigns = [{name:'n1',country:'EGY',budget:149,goal:'awarness',category:'technology'},
{name:'n2',country:'EGY',budget:149,goal:'awarness',category:'technology'}
,{name:'n3',country:'EGY',budget:149,goal:'awarness',category:'technology'}
,{name:'n4',country:'EGY',budget:149,goal:'awarness',category:'technology'}
,{name:'n5',country:'EGY',budget:149,goal:'awarness',category:'technology'}]


app.get('/api/campaigns',(req,res)=>{
    res.send(campaigns)
});

app.get('/api/campaigns/:name',(req,res)=>{
 const campaign = campaigns.find(c => c.name === req.params.name)
 if(!campaign) res .status(404).send("the campaign doesn't exist")
 res.send(campaign)
});

app.post('/api/campaigns',(req,res) => {
const schema = {
name: Joi.string().required(),
country: Joi.string().required(),
budget: Joi.number().integer().required(),
goal: Joi.string().required(),
category: Joi.optional()
};

const result = Joi.validate(req.body , schema)
if (result.error){
    res.status(400).send(result.error.details[0].message);
    return;
}
const campaign = {
    name: req.body.name
    ,country: req.body.country
    ,budget: req.body.budget
    ,goal: req.body.goal
    ,category: req.body.category
}

campaigns.push(campaign);
res.send(campaign)
});

app.put('/api/campaigns/:name',(req,res)=>{
    const campaign = campaigns.find(c => c.name === req.params.name)
    if(!campaign) res .status(404).send("the campaign doesn't exist")

 const schema = {
        name: Joi.string().required(),
        country: Joi.string().required(),
        budget: Joi.number().integer().required(),
        goal: Joi.string().required(),
        category: Joi.optional()
    };

const result = Joi.validate(req.body , schema)

 if (result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }    
campaign.name = req.body.name
campaign.budget = req.body.budget
campaign.category = req.body.category
campaign.goal = req.body.goal
campaign.country = req.body.country
res.send(campaign)
});




// PORT 
const port =  process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}`));
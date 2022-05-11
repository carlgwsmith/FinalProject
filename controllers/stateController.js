const States = require('../model/State');
const statesJSON = require('../model/states.json')



// GET ALL STATE DATA
const getStateData = async (req, res)=>{
  console.log('test')
  const { contig } = req.query;

  let statesData = statesJSON;

  if ( contig === 'false') {
    statesData = statesJSON.filter(st => st.code === 'HI' || st.code === 'AK');
    console.log(res.json(statesData));
    return res.json(statesData);
  }

  if ( contig === 'true') {
    statesData = statesJSON.filter(st => st.admission_number < 49);
    console.log(res.json(statesData));
    return res.json(statesData);
  }

  const mongoStates = await States.find();

  statesJSON.forEach(state => {
    const stateExists = mongoStates.find(st => st.stateCode === state.code)
    if (stateExists){
      state.funfacts = stateExists.funfacts;
      console.log(stateExists.funfact);
    }
  });

  res.json(statesJSON);
}

// GET SINGLE STATE

const getState = async (req, res) =>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const mongoStates = await States.find();
  const stateExists = mongoStates.find(state => state.stateCode === data.code );

  if(stateExists) {
    let funfactArr = stateExists.funfacts;
    if (funfactArr.length !== 0) {
        data.funfact = [...funfactArr]; 
    }
}
res.json(data);

}

// GET STATE CAPITAL

const getStateCapital = async (req, res) =>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const state = data.state
  const capital = data.capital_city;

  res.json({state, capital});
}

//GET STATE NICKNAME
const getStateNickName = async (req, res) =>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const state = data.state
  const nickname = data.nickname;

  res.json({state, nickname});
}

//GET STATE POP
const getStatePop = async (req, res) =>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const state = data.state
  const population = data.population.toLocaleString();

  res.json({state, population});
}

//GET STATE ADMIN
const getStateAdmission = async (req, res) =>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const state = data.state
  const admitted = data.admission_date;

  res.json({state, admitted});
}


// GET FUNFACT

const getFunfact= async(req, res)=>{
  const request = req.params.state;
  const data = statesJSON.find(st => st.code === request);
  const mongoStates = await States.find();
  const stateExists = mongoStates.find(state => state.stateCode === data.code );

  const funfactExists = stateExists.funfacts
  if (!funfactExists.length) {
    return res.json({ "message": `No Fun Facts found for ${data.state}`});
}
  let randomNum = Math.floor(Math.random() * funfactExists.length);
  let funfact = funfactExists[randomNum];
  
  res.json({funfact});
}

// CREATE STATE

const createState = async(req, res)=>{
    try {
        const result = await States.create({
            stateCode: req.body.stateCode
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

// CREATE FUNFACT

// const createFunFact= async(req, res)=>{
//   const request = req.params.state;
//   const funfacts = req.body.funfacts;

//   if(!funfacts){
//     return res.status(400).json({"message": "Fun facts required"})
//   } else if(!(funfacts instanceof Array) || funfacts instanceof String){
//     return res.status(400).json({"message": "Fun facts must in an array or a string"})
//   }

//   const mongoStates = await States.findOne({stateCode: request});
//   if (!mongoStates) {
//     try {
//         const result = await States.create({
//             stateCode: request,
//             funfacts: funfacts
//         });
//         console.log(typeof result);
//         res.status(201).json(result);
//     }
//     catch (err) {
//         console.error(err);
//     }
// }
// else {
//     let funfactArr = foundState.funfacts;
//     funfactArr = funfactArr.push(...funfacts);
//     const result = await mongoStates.save();
//     res.status(201).json(result);
// }
// }


const getMongoStates = async (req, res) => {
  const mstates = await States.find();
  console.log('cool');
  if (!mstates) return res.status(204).json({ 'message': 'No states found' });
  res.json(mstates);
}

module.exports = {
  getStateData, getState, getStateCapital, getStateNickName, getStateAdmission, getStatePop, getFunfact, createState,
  // createFunFact,
  getMongoStates
}
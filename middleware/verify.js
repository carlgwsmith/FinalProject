const statesJSON = require("../model/states.json");

const stateVerify = (req, res, next)=>{
  if(!req?.params?.state){
    return res.status(400).json({
      "message":"request missing state code parameter"
    })
  }
  const stateCode = req.params.state.toUpperCase();
  const stateCodeArr = statesJSON.map(st => st.code);

  const stateExists = stateCodeArr.find(stCode => stCode === stateCode);

  if(!stateExists){
    return res.status(400).json({
      "message":"State Code Invalid"
    })
  }

  req.params.state = stateCode;
  next();
}



module.exports = stateVerify;
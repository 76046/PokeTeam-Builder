import Rule from "../schemas/rule.js";

const getRuleParams = async () => {
  const rules = await Rule.find({}).exec();
  let result = [];
  for (let rule of rules) {
    result.push(Object.fromEntries([[rule.name, rule.value]]));
  }
  return result;
};
export default getRuleParams;

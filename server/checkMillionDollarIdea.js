const checkMillionDollarIdea = (req, res, next) => {
  let { numWeeks, weeklyRevenue } = req.body
  numWeeks = parseInt(numWeeks)
  weeklyRevenue = parseInt(weeklyRevenue)
  if(!numWeeks || !weeklyRevenue || numWeeks*weeklyRevenue < 1000000) {
    res.status(400).send()
  } else {
    next()
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

const axios = require('axios');
const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
  const page = req.query.page;
  try {
    const response = await axios.get(
      `https://api.data.gov/ed/collegescorecard/v1/schools?school.state=NY&latest.academics.program.bachelors.education=1&_fields=id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size&page=${page}&api_key=XMWGLsXeRZ1kIFMWAEyuyBjkalMQ1s6KfvUDsLb5`
    );
    console.log(response.data);
    res.json(response.data.results);
  } catch (err) {
    next(err);
  }
});

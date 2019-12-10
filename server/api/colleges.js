const axios = require('axios');
const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const response = await axios.get(
      'https://api.data.gov/ed/collegescorecard/v1/schools?school.state=NY&latest.academics.program.bachelors.education=1&_fields=id,school.state,school.name,latest.admissions.admission_rate.overall,latest.student.size&page=0&api_key=XMWGLsXeRZ1kIFMWAEyuyBjkalMQ1s6KfvUDsLb5'
    );
    res.json(response.data.results);
  } catch (err) {
    next(err);
  }
});

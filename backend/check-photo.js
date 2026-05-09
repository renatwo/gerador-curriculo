const { Curriculo } = require('./src/models/Curriculo');

async function test() {
  const cvs = await Curriculo.findAll();
  for (const cv of cvs) {
    if (cv.foto_url) {
      console.log(`CV ${cv.id} tem foto:`, cv.foto_url.substring(0, 50) + '...');
    } else {
      console.log(`CV ${cv.id} não tem foto.`);
    }
  }
}
test();

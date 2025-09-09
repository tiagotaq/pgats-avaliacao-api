const request = require('supertest');

async function excluirPet(idDoPet, token) {
    return await request('http://localhost:3000')
        .delete(`/pets/${idDoPet}`)
        .set('Authorization', `Bearer ${token}`);
}

let callsFakeAuthenticateToken = (req, res, next) => {
    const user = { id: 1, username: 'tiago' }
    req.user = user;
    next();
}

module.exports = {
  excluirPet,
  callsFakeAuthenticateToken
};
const request = require('supertest');
require('dotenv').config();

async function excluirPet(idDoPet, token) {
    return await request(process.env.BASE_URL_GRAPHQL)
        .post('')
        .set('Authorization', `Bearer ${token}`)
        .send({
            query: "mutation Mutation($deletePetId: ID!) { deletePet(id: $deletePetId) }",
            variables: {
                deletePetId: idDoPet
            }
        });
}

module.exports = {
  excluirPet
};
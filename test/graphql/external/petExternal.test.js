const request = require('supertest');
const { expect, use } = require('chai');
const chaiExclude = require('chai-exclude');
use(chaiExclude);
require('dotenv').config();
const utilsFuncoes = require('../utils/funcoes');

/*
ATENÇÃO PARA QUEM FOR CORRIGIR O TRABALHO! 

Eu coloquei essa informação no README.md, mas reforço aqui.
Para rodar os testes da API REST e GraphQL, é necessário ter o arquivo ".env" na raiz do projeto, com o conteúdo seguindo o exemplo abaixo:

BASE_URL_REST: "http://localhost:3000" 
BASE_URL_GRAPHQL: "http://localhost:4000/graphql"
*/

describe('Pets external', () => {
    before(async () => {
        const payloadLogin = require('../fixtures/requisicoes/login/login.json');
        const respostaLogin = await request(process.env.BASE_URL_GRAPHQL)
            .post('')
            .send(payloadLogin);
        token = respostaLogin.body.data.login
    })
    context('mutation addPet', () => {
        it('Deve cadastrar um pet', async () => {
            const payloadPet = require('../fixtures/requisicoes/pets/addPetSuccessfully.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(payloadPet);

            const petResponse = require('../fixtures/respostas/pets/addPetSuccessfully.json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body).excludingEvery('id').to.deep.equal(petResponse)

            //Exclusão do cadastro realizado para repetibilidade desse teste (visto que existe uma regra na API de não poder haver mais um pet com o mesmo nome para o mesmo usuário) e para independência dos testes dos GETs de pets
            const idDoPet = resposta.body.data.addPet.id;
            utilsFuncoes.excluirPet(idDoPet, token).then(resposta => {
                expect(resposta.status).to.equal(200);
            })
        });
        it('Não deve cadastrar um pet caso não tenha sido preenchido o nome', async () => {
            const payloadPet = require('../fixtures/requisicoes/pets/addPetWithoutName.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(payloadPet);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.errors[0].message).to.equal('Name and type required');
        });
        it('Não deve cadastrar um pet caso não tenha sido preenchido o tipo', async () => {
            const payloadPet = require('../fixtures/requisicoes/pets/addPetWithoutType.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(payloadPet);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.errors[0].message).to.equal('Name and type required');
        });
        it('Não deve cadastrar um pet caso não o nome seja igual ao de outro pet já existente do mesmo usuário', async () => {
            const payloadPet = require('../fixtures/requisicoes/pets/addPetNameEqual.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(payloadPet);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.errors[0].message).to.equal('Pet with this name already exists for this user')
        });
        it('Não deve cadastrar um pet sem estar autenticado', async () => {
            const payloadPet = require('../fixtures/requisicoes/pets/addPetSuccessfully.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .send(payloadPet);

            expect(resposta.status).to.equal(200);
            expect(resposta.body.errors[0].message).to.equal('Token required')
        });
    })
    context('Query pets', () => {
        it('Deve buscar todos os pets cadastrados para todos os usuários', async () => {
            const payloadPets = require('../fixtures/requisicoes/pets/petsSuccessfully.json');
            const resposta = await request(process.env.BASE_URL_GRAPHQL)
                .post('')
                .set('Authorization', `Bearer ${token}`)
                .send(payloadPets);

            const getPetResponse = require('../fixtures/respostas/pets/petsSuccessfully.json');
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.deep.equal(getPetResponse)
        });
    });

})
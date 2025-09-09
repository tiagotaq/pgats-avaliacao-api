const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

//let app = require('../../../rest/app');
const petService = require('../../../src/service/petService');
const authMiddleware = require('../../../rest/auth');
const utilsFuncoes = require('../utils/funcoes');

//Essa parte do callsFake, onde reescrevo o código da função "authenticateToken", tem que ser feita antes do carregamento do app, pois o app já carrega a função authenticateToken em memória e a callsfake não funciona. Se fosse feito dentro da função do teste, teria que ser limpado o cache do app recarregado o app lá dentro também. No meu trabalho de exercício extra, eu fiz dentro do caso de teste pois era apenas um teste que usava a autenticação. Como, nesse caso, é algo que vai servir para todos os testes, achei melhor jogar logo aqui para cima.
authMiddlewareMock = sinon.stub(authMiddleware, 'authenticateToken');
authMiddlewareMock.callsFake(utilsFuncoes.callsFakeAuthenticateToken);
const app = require('../../../rest/app');

describe('Pets Controller', () => {
    afterEach(() => {
        sinon.restore();
    })
    context('addPet', () => {
        beforeEach(() => {
            petServiceMock = sinon.stub(petService, 'addPet');
        })
        it('Quando informo um nome e um tipo válidos, retorno o status 201 e os dados do pet', async () => {
            const objetoSucesso = require('../fixtures/respostas/pets/postPetsSuccessfullyMock.json');
            petServiceMock.returns(objetoSucesso)
            const postPetBody = require('../fixtures/requisicoes/pets/postPetsSuccessfully.json');
            const resposta = await request(app)
                .post('/pets')
                .send(postPetBody);
            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.deep.equal(objetoSucesso);
        });

        it('Quando não informo um nome, retorno o status 400 e a mensagem do erro', async () => {
            const postPetBody = require('../fixtures/requisicoes/pets/postPetsWithoutName.json');
            const resposta = await request(app)
                .post('/pets')
                .send(postPetBody);
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Name and type required');
        });

        it('Quando não informo um tipo, retorno o status 400 e a mensagem do erro', async () => {
            const postPetBody = require('../fixtures/requisicoes/pets/postPetsWithoutType.json');
            const resposta = await request(app)
                .post('/pets')
                .send(postPetBody);
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('Name and type required');
        });
    });
});
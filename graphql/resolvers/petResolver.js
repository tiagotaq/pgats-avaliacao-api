const petService = require('../../src/service/petService');

module.exports = {
  Query: {
    pets: (parent, args, context) => {
      if (!context.user) throw new Error('Token required');
      return petService.getAllPets();
    },
    myPets: (parent, args, context) => {
      if (!context.user) throw new Error('Token required');
      return petService.getPetsByUser(context.user.id);
    },
  },
  Mutation: {
    addPet: (parent, { name, type }, context) => {
      if (!context.user) throw new Error('Token required');
      if (!name || !type) throw new Error('Name and type required');
      const pet = petService.addPet(context.user.id, name, type);
      if (!pet) throw new Error('Pet with this name already exists for this user');
      return pet;
    },
    deletePet: (parent, { id }, context) => {
      if (!context.user) throw new Error('Token required');
      if (!id) throw new Error('Pet id required');
      return petService.deletePet(context.user.id, parseInt(id));
    },
  },
};

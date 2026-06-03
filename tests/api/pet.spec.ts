import { PetBuilder } from '../../src/api/builders/PetBuilder';
import { PetStatus } from '../../src/api/enums/PetStatus';
import { test, expect } from '../../src/fixtures/apiFixture';

test('Add Pet', async ({ apiFactory }) => {
    //Arrange
    const pet = PetBuilder.create().withStatus(PetStatus.AVAILABLE).build();
    //Act
    const response = await apiFactory.petService.addPet(pet);
    //Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(pet.id);
    expect(response.body.name).toBe(pet.name);
});
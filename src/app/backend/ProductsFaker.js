import { faker } from '@faker-js/faker';

export const generateFakeProducts = (count = 10) => {
    const fakeProducts = [];
    for (let i = 0; i < count; i++) {
        fakeProducts.push({
            id: faker.string.uuid(), // Use the latest faker API
            name: faker.commerce.productName(),
            category: faker.commerce.department(),
            quantity: faker.number.int({ min: 1, max: 100 }), // Adjusted for faker v7+
            unitPrice: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
            dateAdded: faker.date.recent(30).toISOString().split('T')[0],
            supplier: faker.company.name(),
        });
    }
    return fakeProducts;
};

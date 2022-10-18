modele.exports={
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: ["./Node.js-exercise-part01/src/lib/prisma/client.mock.ts"]
}

class PetError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}
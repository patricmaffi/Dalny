const Validation = {
    login: {
        presence: {
            message: "^Please enter an login",
        },
    },
    estab: {
        presence: {
            message: "^Please enter an estab",
        },
    },
    password: {
        presence: {
            message: "^Please enter a password",
        },
        length: {
            minimum: 4,
            message: "^Your password must be at least 4 characters",
        },
    },
};

export default Validation;

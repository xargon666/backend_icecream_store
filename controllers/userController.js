module.exports = {
    get: (req, res) => {
        res.send(`Hello from the userController! ${MONGODB_URL}`);
    },
};

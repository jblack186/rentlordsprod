module.exports = (server) => {

server.get('/api/yougood', (req, res) => {
    res.send('you are logged in, this is your profile -' + req.user);
});

}
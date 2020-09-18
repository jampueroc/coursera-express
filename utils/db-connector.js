const mongoose = require('mongoose');
mongoose.Promise = Promise;
class DbConnector {
    static default =new DbConnector();
    db;
    connect(){
        mongoose.connect('mongodb://localhost/red_bicicletas');
        this.db = mongoose.connection;
        return new Promise(((resolve, reject) => {
            this.db.on('error', (err)=> {
                console.error(err);
                reject(err | 'Connection error');
            });
            this.db.once('open', ()=> {
                console.log('Connected');
                resolve();
            });
        }));
    }
    connectTest(){
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useNewUrlParser', true)
        mongoose.connect('mongodb://localhost/test');
        this.db = mongoose.connection;
        return new Promise(((resolve, reject) => {
            this.db.on('error', (err)=> {
                console.error(err);
                reject(err | 'Connection error');
            });
            this.db.once('open', ()=> {
                console.log('Connected');
                resolve();
            });
        }));
    }
    disconnect(){
        return mongoose.disconnect();
    }
}

module.exports = DbConnector;

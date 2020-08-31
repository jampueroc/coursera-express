class Bike{
    id;
    color;
    model;
    location;

    constructor(id, color, model, location) {
        this.id = id;
        this.color = color;
        this.model = model;
        this.location = location;
    }

    toString(){
        return `id: ${this.id} | color: ${this.color}`;
    }
    static allBikes = [];

    static add(b){
        Bike.allBikes.push(b);
    }
    static remove(id){
        const index = Bike.allBikes.findIndex(b => b.id === id);
        console.log(index);
        if (index !== -1){
            Bike.allBikes.splice(index, 1);
        }
    }
    static getById(id){
        return  Bike.allBikes.find(b => b.id === id);
    }
}

// Dummy data
Bike.add(new Bike('0','rojo','pistera',[-33.436566, -70.635590]));
Bike.add(new Bike('1','azul','montaña',[-33.437113, -70.634264]));
Bike.add(new Bike('2','morado','ciudad',[-33.438742, -70.632826]));
module.exports = Bike;

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }

    getPersonas() {

        return this.personas;
    }

    getPersona(id) {

        let persona = this.personas.filter(persona => id === persona.id)[0];

        return persona;
    }

    getPersonasPorSalas(sala) {

        let personasPorSalas = this.personas.filter(persona => sala === persona.sala);

        return personasPorSalas;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id)

        this.personas = this.personas.filter(persona => persona.id !== id);

        return personaBorrada;
    }
}

module.exports = {
    Usuarios
}
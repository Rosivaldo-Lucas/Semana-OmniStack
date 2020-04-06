const crypto = require('crypto');

const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },


  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    // Gera 4 byts de caractere aleatório e converte para o formato hexadecimal
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return response.json({ id });
  }
};

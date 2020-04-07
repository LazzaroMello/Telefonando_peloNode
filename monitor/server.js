const axios = require('axios');
const TotalVoice = require('totalvoice-node');
const token = process.env.TOTALVOICE_API_KEY
const client = new TotalVoice(token);
const servers = [

	{
		name: 'Server 1',
		url: 'http://localhost:4001',
		developer: {
			name: 'Lázaro Mello',
			telephone: process.env.TELEPHONE_NUMBER
		}
	},
	{
		name: 'Server 2',
		url: 'http://localhost:4002',
		developer: {
			name: 'Lázaro Mello',
			telephone: process.env.TELEPHONE_NUMBER
		}
	}
];


(async function () {

	console.log('Inciando monitoramento dos servidores!');

	for (let server of servers) {

		try {
			await axios({
				url: server.url,
				method: 'get',
			}).then(() => {
				console.log(`${server.name} está no ar`);
			}).catch(() => {
				console.log(`${server.name} está fora do ar`);
				const message = `${server.developer.name} o ${server.name} está fora do ar, por gentileza faça manutenção o mais rápido possível. 
                         Digite um se você vai fazer algo, ou zero caso não possa fazer nada!`
				const options = {
					velocidade: 2,
					tipo_voz: 'br-Vitoria',
					resposta_usuario: true
				}
				client.tts.enviar(server.developer.telephone, message, options).then(() => {
					console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`);
				})

			})
		} catch (erro) {
			console.log(erro)
		}

	}
	console.log('Finalizando monitoramento dos servidores!');
})();
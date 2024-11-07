const apiKey = '8636d1ab3e90bd4f4e2a0217';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
// Função que consome a API do site exchange Rate.
async function getExchangeRate(daMoeda, paraMoeda) {
   try{
       const response = await fetch(`${apiUrl}${daMoeda}`);
       const data = await response.json();
       if(data.result === "success"){  
           return data.conversion_rates[paraMoeda];
       }else{
           throw new Error('Erro ao buscar as taxas de câmbio');
       }
   }catch(error){
       console.error("Erro:", error);
       return null;
   }
};

document.getElementById("currencyform").addEventListener('submit', async function(event){
   event.preventDefault(); //Função que coleta os dados do usuários nos campos de valores.
   const valor = parseFloat(document.getElementById('amount').value); 
   const daMoeda = document.getElementById('daMoeda').value; 
   const paraMoeda = document.getElementById('paraMoeda').value;

   const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);
   if(exchangeRate){
       const convertedValue = valor * exchangeRate; // Multiplica o valor que o usuário inseriu pelo valor consumido da API.

       const conversao = document.getElementById('result');
       conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${paraMoeda}`; // Mostra o resultado para o usuário.
   }else{
       alert('Não foi possível buscar o valor da cotação!');
   }
});
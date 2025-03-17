async function getCotacao() {
    try {
      const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0");
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
  
      const data = await response.json();
      t = data.USDBRL.ask

      console.log("Dados recebidos:", t);
      
    } catch (error) {
      console.error("Erro ao buscar a taxa de câmbio:", error);
    }
  }



  
  getCotacao();
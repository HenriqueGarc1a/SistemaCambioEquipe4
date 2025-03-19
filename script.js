valores = [] // vetor que ira armazena os valores em dolar;
pos = [124,131,222,2,108,47,200,186,203] // vetor que armazena a posicao dos paises na resposta da API;
flags = [] // vetor que ira armazenar os links das bandeiras;
setEntrada = false; // false(input da direita e entrada) true(input da esquerda e entrada);

// sempre que algo é digitado em algum input esse metodo e chamado;

document.addEventListener('input', function(event){

      getCambio()
 
});

// puxa dados da API dos cambios

async function getCotacao() {
    try {
      
      const response = await fetch("https://economia.awesomeapi.com.br/json/last/BRL-USD,JPY-USD,CAD-USD,ARS-USD,AUD-USD,GBP-USD,KRW-USD,EUR-USD,CHF-USD?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0");
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setCambios(data)

    } catch (error) {
      console.error("Erro ao buscar a taxa de câmbio:", error);
    }

   
  
}

// puxa dados da API das bandeiras;

async function getBandeiras() {
  try {
    
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const dataB = await response.json();
    
    setFlags(dataB)

  } catch (error) {
    console.error("Erro ao buscar a taxa de câmbio:", error);
  }

 

}

// funcao que organiza os dados de conversao em um vetor(todos valores em dolar)
// 0 - peso argentino, 1 - dolar australiano, 2 - real, 3 - franco suico, 4 - dolar canadense, 5 - euro, 6 - libra esterlina, 7 - iene japones, 8 - won sul- coreano;

function setCambios(data){

  valores.push(eval(data.ARSUSD.bid))
  valores.push(eval(data.AUDUSD.bid))
  valores.push(eval(data.BRLUSD.bid))
  valores.push(eval(data.CHFUSD.bid))
  valores.push(eval(data.CADUSD.bid))
  valores.push(eval(data.EURUSD.bid))
  valores.push(eval(data.GBPUSD.bid))
  valores.push(eval(data.JPYUSD.bid))
  valores.push(eval(data.KRWUSD.bid))
  valores.push(1)
  
}

//funcao que coloca os links das imagens das bandeiras em um vetor;
// 0 - argentina,1 - australia,2 - brasil, 3 - suica,4 - canada,5 - gra bretanha, 6 - japao, 7 - coreia do sul, 8 - estados unidos;

function setFlags(dataB){

    
    for(let i=0 ;i<pos.length;i++){

    flags.push(dataB[pos[i]].flags.png)
   
    }



}


//  document.body.style.backgroundImage = `url(${flags[index]})`;  IMPORTANTE NAO APAGAR
    
  
// funcao que realiza o cambio (chamada toda vez que um imput e atualizado)

function getCambio(){

    //if para verificar qual input e entrada e qual e saida

    if(setEntrada){

      // buscando index 

     select = document.getElementById("opcoes1");
     entrada1 = select.selectedIndex

     select = document.getElementById("opcoes2");
     entrada2 = select.selectedIndex

     
     x1= document.getElementById("input-quantia").value;

     z=(valores[entrada1]*x1)/(valores[entrada2]);
    
      w = valores[entrada1]/(valores[entrada2]);

       
        document.getElementById("input-conversão").value= z.toFixed(2);

    }
    else{

      select = document.getElementById("opcoes1");
      entrada1 = select.selectedIndex
 
      select = document.getElementById("opcoes2");
      entrada2 = select.selectedIndex
 
      
      x1= document.getElementById("input-conversão").value;
      z=(valores[entrada2]*x1)/(valores[entrada1]);
     
       w = valores[entrada1]/(valores[entrada2]);
 
        
       document.getElementById("input-quantia").value= z.toFixed(2);
       
    }

      document.getElementById("saida").innerHTML = getPfix(entrada1)+" 1.00 "+" = "+getPfix(entrada2)+" "+w;

   
}


function getPfix(x){

  switch(x){

    case 0:
      return "ARS";
    break;

    case 1:
      return "AUD";
    break;

    case 2:
      return "BRL";
    break;

    case 3:
      return "CHF";
    break;

    case 4:
      return "CAD";
    break;

    case 5:
      return "EUR";
    break;

    case 6:
      return "GBP";
    break;

    case 7:
      return "JPY";
    break;

    case 8:
      return "KRW";
    break;

    case 9:
      return "USD";
    break;

  }



}


function trocaT(){

    if(setEntrada){

      setEntrada = false
    }
    else{

      setEntrada = true;
    }

}

function inverter() {
  select = document.getElementById("opcoes1");
  entrada1 = select.selectedIndex
  numero1 = document.getElementById("input-quantia").value;

  select = document.getElementById("opcoes2");
  entrada2 = select.selectedIndex
  numero2 = document.getElementById("input-conversão").value;

  document.getElementById("opcoes1").selectedIndex = entrada2;
  document.getElementById("opcoes2").selectedIndex = entrada1;
  document.getElementById("input-quantia").value = numero2;
  document.getElementById("input-conversão").value = numero1;

  getCambio();
}
  
  getCotacao();
  getBandeiras();



  
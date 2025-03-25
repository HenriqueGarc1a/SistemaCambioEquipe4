
valores = [] // vetor que ira armazena os valores em dolar;
pos = [124,131,222,2,108,47,200,186,203] // vetor que armazena a posicao dos paises na resposta da API;
flags = [] // vetor que ira armazenar os links das bandeiras;
setEntrada = false; // false(input da direita e entrada) true(input da esquerda e entrada);
flutuacoDiaT = [];
flutuacoDia = [];
flutuacoValor = [];
pctchange = [];
g = ["https://economia.awesomeapi.com.br/json/daily/ARS-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/AUD-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/CHF-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/CAD-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/EUR-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/GBP-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/JPY-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0","https://economia.awesomeapi.com.br/json/daily/USD-BRL/360?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0"]
 // matriz que guarda as datas e os valores do dolar para real no tempo
// sempre que algo é digitado em algum input esse metodo e chamado;



document.addEventListener('input', function(event){
      getCambio()
      
});


document.getElementById('opcoes1').addEventListener('change', function(event){
      document.getElementById('bandeira1').src = flags[document.getElementById('opcoes1').selectedIndex];

});

document.getElementById('opcoes2').addEventListener('change', function(event){
      document.getElementById('bandeira2').src = flags[document.getElementById('opcoes2').selectedIndex];
});

document.getElementById('opcoes3').addEventListener('change', function(event){
    getFlutuacao(document.getElementById('opcoes3').selectedIndex)
    if(document.getElementById('opcoes3').selectedIndex <=1)
    document.getElementById('bandeira3').src = flags[document.getElementById('opcoes3').selectedIndex];
    else if(document.getElementById('opcoes3').selectedIndex >= 7)
    document.getElementById('bandeira3').src = flags[document.getElementById('opcoes3').selectedIndex+2];
    else
    document.getElementById('bandeira3').src = flags[document.getElementById('opcoes3').selectedIndex+1];

    chart.update();
    setTimeout(() => {
      
      chart.update();

    }, 200);
});

// puxa dados da API dos cambios

async function getCotacao() {
    try {
      
      const response = await fetch("https://economia.awesomeapi.com.br/json/last/BRL-USD,JPY-USD,CAD-USD,ARS-USD,AUD-USD,GBP-USD,KRW-USD,EUR-USD,CHF-USD,BRL-GBP,BRL-EUR?token=986495aa4c64154c4c74a5dad7b5949ff8968fed7528dff87d931c7843a67ba0");
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      const data = await response.json();
      setCambios(data)
      setpct(data)
    } catch (error) {
      console.error("Erro ao buscar a taxa de câmbio:", error);
    }
}

  async function getFlutuacao(i) {
  try {
    
    const response = await fetch(g[i]);

    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const dataF = await response.json();
    
    setMatrix(dataF);
    
  } catch (error) {
    console.error("Erro ao buscar a taxa de câmbio:", error);
  }
}


function setMatrix(dataF){


     for(let i = 359;i>=0;i--){


      flutuacoValor[359-i] = eval(dataF[i].bid);
      
     }

    
     for(let i = 359;i>=0;i--){

      flutuacoDiaT[359-i] = 359-i;

      flutuacoDia[359-i]  = eval(dataF[i].timestamp);
      
      flutuacoDia[359-i]  *= 1000;

      flutuacoDia[359-i]  = new Date(flutuacoDia[359-i]).toLocaleString();

      flutuacoDia[359-i]  = flutuacoDia[359-i].slice(0,10)

    
      
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

function setpct(data){

  pctchange.push(eval(data.BRLUSD.pctChange))
  pctchange.push(eval(data.BRLEUR.pctChange))
  pctchange.push(eval(data.BRLGBP.pctChange))

}

//funcao que coloca os links das imagens das bandeiras em um vetor;
// 0 - argentina,1 - australia,2 - brasil, 3 - suica,4 - canada,5 - gra bretanha, 6 - japao, 7 - coreia do sul, 8 - estados unidos;

function setFlags(dataB){
    for(let i=0 ;i<pos.length;i++){

    flags.push(dataB[pos[i]].flags.png)
   
    }

    flags.splice(5,0,'Imagens/bandeira-uniao-europeia.webp')
}


//  document.body.style.backgroundImage = `url(${flags[index]})`;  IMPORTANTE NAO APAGAR
    
  
// funcao que realiza o cambio (chamada toda vez que um imput e atualizado)

function getCambio(){

    //if para verificar qual input e entrada e qual e saida

    if(setEntrada){

      // buscando index para vetor de valores 

      select = document.getElementById("opcoes1");
      entrada1 = select.selectedIndex

      select = document.getElementById("opcoes2");
      entrada2 = select.selectedIndex

     
      x1 = document.getElementById("input-quantia").value;

      z =(valores[entrada1]*x1)/(valores[entrada2]);
    
      w = valores[entrada1]/(valores[entrada2]);
 
      document.getElementById("input-conversão").value = z.toFixed(2);

    }
    else
    {

      select = document.getElementById("opcoes1");
      entrada1 = select.selectedIndex
 
      select = document.getElementById("opcoes2");
      entrada2 = select.selectedIndex
 
      
      x1= document.getElementById("input-conversão").value;
      
      //regra de 3 basica
      z=(valores[entrada2]*x1)/(valores[entrada1]);
     
      w = valores[entrada1]/(valores[entrada2]);
 
        
       document.getElementById("input-quantia").value = z.toFixed(2);
       
    }

    document.getElementById("saida").innerHTML = `${getPfix(entrada1)} 1.00 = <span class="destaque-cor">${getPfix(entrada2)} ${w.toFixed(6)}</span>`;  
}

// retorna a abreviacao da moeda com base em x


function getPfix(x){
  switch(x){
    case 0:
      return "ARS";

    case 1:
      return "AUD";

    case 2:
      return "BRL";

    case 3:
      return "CHF";

    case 4:
      return "CAD";

    case 5:
      return "EUR";

    case 6:
      return "GBP";

    case 7:
      return "JPY";

    case 8:
      return "KRW";

    case 9:
      return "USD";
  }
}

// alterna entre qual input e entrada e qual e saida

function trocaT(x){

    if(x == 1){

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

  document.getElementById("bandeira1").src = flags[entrada2];
  document.getElementById("bandeira2").src = flags[entrada1];

  getCambio();
}

function setPeriodo(x) {

  switch(x){

    case 0: 

    document.getElementById("ano").style.backgroundColor = "#1A73E8";
    document.getElementById("mmes").style.backgroundColor = "#4A5A6A";
    document.getElementById("mes").style.backgroundColor = "#4A5A6A";
    break;

    case 180:

      document.getElementById("ano").style.backgroundColor = "#4A5A6A";
    document.getElementById("mmes").style.backgroundColor = "#1A73E8";
    document.getElementById("mes").style.backgroundColor = "#4A5A6A";

    break;

    case 320:
      document.getElementById("ano").style.backgroundColor = "#4A5A6A";
    document.getElementById("mes").style.backgroundColor = "#1A73E8";
    document.getElementById("mmes").style.backgroundColor = "#4A5A6A";
    break;




  }

  chart.options.scales.x.min = x;
  chart.update();
}




const ctx = document.getElementById("myChart").getContext("2d");

chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: flutuacoDiaT,
    datasets: [{
      label: "",
      pointRadius: 0,
      fill: false, // Continua válido
      tension: 0, 
      borderColor: "#009CDE",
      data: flutuacoValor 
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: { // Antes era xAxes
        ticks: {
          min: 0,
          max: 359,
          display: false,
          fontSize: 0 // Removido no Chart.js 3+, mas pode ser substituído por `font.size`
        }
      },
      y: { // Antes era yAxes
        grid: {
          display: false
        },
        ticks: {
          callback: function(value) {
            return "R$" + value.toFixed(2);
          },
          color: "#0E141B", // Substitui fontColor
          font: {
            size: 18
          }
        }
      }
    }
  }
});

function trocapagina(x) {
  
  if(x){
  document.getElementById("grafico").style.display = "block";

  document.getElementById("cambio").style.display = "none";

  }
  else{

  document.getElementById("cambio").style.display = "block";

  document.getElementById("grafico").style.display = "none";


  }
}





  
  getCotacao();
  getBandeiras();
  getFlutuacao(7) 

  setTimeout(start, 500);
  

function start(){
 
  setPeriodo(0)
  chart.update()
  document.getElementById('input-quantia').value = 1.00;
  document.getElementById('opcoes1').selectedIndex = 9;
  document.getElementById('opcoes2').selectedIndex = 2;
  document.getElementById('opcoes3').selectedIndex = 7;
  document.getElementById('bandeira3').src = flags[document.getElementById('opcoes3').selectedIndex+2];
  document.getElementById('input-conversão').value = (1/valores[2]).toFixed(2);
  document.getElementById('bandeira1').src = flags[9];
  document.getElementById('bandeira2').src = flags[2];
  document.getElementById('saida').innerHTML = `USD 1.00 = <span class="destaque-cor">BRL ${(1 / valores[2]).toFixed(6)}</span>`;
  document.getElementById('datafim').innerHTML = flutuacoDia[359];
  document.getElementById('datainicio').innerHTML = flutuacoDia[0];
  for(i = 0; i < pctchange.length; i++) {
    if(pctchange[i] >= 0) {
      document.querySelectorAll(".pcthj")[i].innerText = pctchange[i].toFixed(2) + "%";
      document.querySelectorAll(".pcthj")[i].style.color = "green";
    } else {
      document.querySelectorAll(".pcthj")[i].innerHTML = (pctchange[i].toFixed(2) * (-1)) + "%";
      document.querySelectorAll(".pcthj")[i].style.color = "red";
    }
  }
}




  
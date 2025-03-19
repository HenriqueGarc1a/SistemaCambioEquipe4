valores = []
pos = [124,131,222,2,108,47,200,186,203]
flags = []
index = 0
troca = false;

document.addEventListener('input', function(event){
   
  
  getCambio()
 

});


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

function setFlags(dataB){

    
    for(let i=0 ;i<pos.length;i++){

    flags.push(dataB[pos[i]].flags.png)
    console.log(flags[i])
    }

    
    


}

function troca(){


    document.body.style.backgroundImage = `url(${flags[index]})`;
    console.log(flags[index])

    if(index<flags.length-1)
    index++;
    else
    index =0


}

function getCambio(){

    if(troca){
  
     select = document.getElementById("opcoes1");
     entrada1 = select.selectedIndex

     select = document.getElementById("opcoes2");
     entrada2 = select.selectedIndex

     
     x1= document.getElementById("x1").value;
     z=(valores[entrada1]*x1)/(valores[entrada2]);
    
      w = valores[entrada1]/(valores[entrada2]);

       
        document.getElementById("x2").value= z.toFixed(2);

    }
    else{

      select = document.getElementById("opcoes1");
      entrada1 = select.selectedIndex
 
      select = document.getElementById("opcoes2");
      entrada2 = select.selectedIndex
 
      
      x1= document.getElementById("x2").value;
      z=(valores[entrada2]*x1)/(valores[entrada1]);
     
       w = valores[entrada1]/(valores[entrada2]);
 
        
       document.getElementById("x1").value= z.toFixed(2);
       
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

    if(troca){

      troca = false
    }
    else{

      troca = true;
    }

}


  
  getCotacao();
  getBandeiras();

  

 


  
const selecao = document.querySelector("#selecao")
const tela = document.querySelector(".tela")

let images = []
let nomes = []

for(let i = 0; i < 12; i++){
    images.push(document.querySelector(`#imgs${[i]}`).getAttribute('src'))
    nomes.push(document.querySelector(`#imgs${[i]}`).getAttribute('title'))
}

let defImgs = []
let defNomes = []

let atackImgs = []
let atackNomes = []

let objetoParaImagens = {}

let mortos = []

function select(event){
    let imgSelec = document.querySelector("#protetor1")
    let imgSelec2 = imgSelec.nextElementSibling
    if(imgSelec.getAttribute('src') === 'images/branco.png'){
        event.target.classList.add("escolhido")
        let selecionado = event.target.getAttribute('src')
        imgSelec.setAttribute('src', selecionado)
        defImgs.push(selecionado)
        let nome = event.target.getAttribute('title')
        defNomes.push(nome)
        objetoParaImagens[nome] = selecionado
        imgSelec.setAttribute('title', nome)
    }
    else if(imgSelec.nextElementSibling.getAttribute('src') === 'images/branco.png'){
        if (event.target.getAttribute('class', 'escolhido')){
        }else{
            event.target.classList.add("escolhido")
            let selecionado = event.target.getAttribute('src')
            imgSelec.nextElementSibling.setAttribute('src', selecionado)
            defImgs.push(selecionado)
            let nome = event.target.getAttribute('title')
            defNomes.push(nome)
            objetoParaImagens[nome] = selecionado
            imgSelec.nextElementSibling.setAttribute('title', nome)
        } 
    }
    else if(imgSelec2.nextElementSibling.getAttribute('src') === 'images/branco.png'){
        if (event.target.getAttribute('class', 'escolhido')){
        }else{
            event.target.classList.add("escolhido")
            let selecionado = event.target.getAttribute('src')
            imgSelec2.nextElementSibling.setAttribute('src', selecionado)
            defImgs.push(selecionado)
            let nome = event.target.getAttribute('title')
            defNomes.push(nome)
            objetoParaImagens[nome] = selecionado
            imgSelec2.nextElementSibling.setAttribute('title', nome)
        

            if(imgSelec2.nextElementSibling.getAttribute('src') !== null){
                atackImgs = images.filter(function filtraElem(elem){
                    if(elem !== defImgs[0] && elem !== defImgs[1] && elem !== defImgs[2]){
                        return elem
                    }
                })

                atackNomes = nomes.filter(function filtraNomes(elem){
                    if(elem !== defNomes[0] && elem !== defNomes[1] && elem !== defNomes[2]){
                        return elem
                    }
                })

                let atacantesQuery = document.querySelectorAll(".atacantes")
                for(let i = 0; i < atackImgs.length; i++){
                    atacantesQuery[i].setAttribute('src', atackImgs[i])
                    atacantesQuery[i].setAttribute('title', atackNomes[i])
                    objetoParaImagens[atackNomes[i]] = atackImgs[i]
                }
                for(let i = 0; i < images.length; i++){
                    document.querySelector(`#imgs${i}`).classList.add('escolhido')
                }
            }
        }
    }
}

function roll(){
    tela.classList.add("simulacao")

    while(defNomes.length !== 0 || atackNomes.length !== 0){
        console.log('inicio')
        let fim = false
        let words = 'abaababcaabaab'
        let woooords = words.charAt(Math.floor(Math.random()*words.length))
        let random = Math.floor(Math.random()*3)+1
        if(atackNomes.length === 1){
            console.log('entrou')
            let acoesComUm = {
                a:(random) =>{
                    let player1 = defNomes[Math.floor(Math.random()*defNomes.length)]
                    let player2 = atackNomes[Math.floor(Math.random()*atackNomes.length)]
                    
                    switch(random){
                        case 1:
                            mortosEmCombate = atackNomes.splice(atackNomes.indexOf(player2), 1)
                            mortos.push(mortosEmCombate[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/cranio.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <p>Em uma disputa de 1x1 ${player1} amassou o crânio de ${player2}</p>
                                    `
                        break;
                        case 2:
                            mortosEmCombate = defNomes.splice(defNomes.indexOf(player1), 1)
                            mortos.push(mortosEmCombate[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/cranio.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <p>Em uma disputa de 1x1 ${player2} amassou o crânio de ${player1}</p>
                                    `
                        break;
                        case 3:
                            fim = true
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/alianca.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <p>${player1} e ${player2} formaram uma aliança para acabar com você.<br>Você perdeu</p>
                                    `
                                    
                        break;
                    }
                }
            }
            tela.innerHTML += acoesComUm.a(random)
        }else{
            console.log('muitos')
            let acoesMaiorQueTres = {
                a:(random) =>{
                    let player1 = defNomes[Math.floor(Math.random()*defNomes.length)]
                    let player2 = atackNomes[Math.floor(Math.random()*atackNomes.length)]
                    do{
                        player3 = atackNomes[Math.floor(Math.random()*atackNomes.length)]
                    }while(player2 === player3)
        
                    switch(random){
                        case 1:
                            mortosEmCombate = atackNomes.splice(atackNomes.indexOf(player2), 1)
                            mortosEmCombate2 = atackNomes.splice(atackNomes.indexOf(player3), 1)
                            mortos.push(mortosEmCombate[0])
                            mortos.push(mortosEmCombate2[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/lanca.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <p>${player1} empalou ${player2} e ${player3} com uma lança</p>`
                        break;
                        case 2:
                            mortosEmCombate = atackNomes.splice(atackNomes.indexOf(player2), 1)
                            mortosEmCombate2 = atackNomes.splice(atackNomes.indexOf(player3), 1)
                            mortos.push(mortosEmCombate[0])
                            mortos.push(mortosEmCombate2[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/machado.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <p>${player1} abriu a cabeça de ${player2} e ${player3} com um machado</p>`
                        break;
                        case 3:
                            mortosEmCombate = atackNomes.splice(atackNomes.indexOf(player2), 1)
                            mortosEmCombate2 = atackNomes.splice(atackNomes.indexOf(player3), 1)
                            mortos.push(mortosEmCombate[0])
                            mortos.push(mortosEmCombate2[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/menor-idade.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <p>${player1} matou ${player2} e ${player3} de prazer</p>`
                        break;
                    }
                },
        
                b:(random) =>{
                    let player1 = defNomes[Math.floor(Math.random()*defNomes.length)]
                    let player2 = atackNomes[Math.floor(Math.random()*atackNomes.length)]
                    do{
                        player3 = atackNomes[Math.floor(Math.random()*atackNomes.length)]
                    }while(player2 === player3)
        
                    switch(random){
                        case 1:
                            mortosEmCombate = defNomes.splice(defNomes.indexOf(player1), 1)
                            mortos.push(mortosEmCombate[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/soco.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <p>${player2} e ${player3} mataram indiscriminadamente ${player1} no soco</p>`
        
                        break;
                        case 2:
                            mortosEmCombate = defNomes.splice(defNomes.indexOf(player1), 1)
                            mortos.push(mortosEmCombate[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/calota.jpg">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <p>${player2} com a ajuda de ${player3} decapitou ${player1} com uma calota de gol</p>`
                        break;
                        case 3:
                            mortosEmCombate = defNomes.splice(defNomes.indexOf(player1), 1)
                            mortos.push(mortosEmCombate[0])
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player2]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player3]}" >
                                    <img style='width: 50px; height: 40px; margin-bottom: 20px;' src="images/guarda-chuva.png">
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <p>${player2} e ${player3} empalaram ${player1} com um guarda chuva</p>`
                        break;
                    }
                },
        
                c:(random) =>{
                    let player1 = defNomes[Math.floor(Math.random()*defNomes.length)]
        
                    switch(random){
                        case 1:
                            fim = true
                            atackNomes = []
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa3.png" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa.png" >
                                    <p>${player1} matou todos os atacantes e te salvou da morte certa</p>`
        
                        break;
                        case 2:
                            fim = true
                            atackNomes = []
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa3.png" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa.png" >
                                    <p>${player1} matou todos os atacantes e te salvou da morte certa</p>`
                        break;
                        case 3:
                            fim = true
                            atackNomes = []
                            return `
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa3.png" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="${objetoParaImagens[player1]}" >
                                    <img id='fota' style='width: 100px; height: 80px;' src="images/espa.png" >
                                    <p>${player1} matou todos os atacantes e te salvou da morte certa</p>`
                        break;
                    }
                }
            }
            tela.innerHTML += acoesMaiorQueTres[woooords](random)
            console.log('Nomes def: '+defNomes.length)
            console.log('Nomes atck: '+atackNomes.length)
        }
        if(fim){
            break
        }
        if(defNomes.length === 0){
            break
        }
        if(atackNomes.length === 0){
            break
        }
    }

    if(defNomes.length === 0){
        tela.innerHTML += 'OS ATACANTES VENCERAM'
    }else if(atackNomes.length === 0){
        tela.innerHTML += 'OS DEFENSORES VENCERAM'
    }
     
}

function limpar(){
    for(let i = 1; i <= 3; i++){
        let defenImgs= document.querySelector(`#protetor${i}`)
        defenImgs.setAttribute('src', 'images/branco.png')
        defenImgs.setAttribute('title', '')
    }
    defImgs = []
    defNomes = []

    objetoParaImagens = {}

    atackImgs = []
    atackNomes = []

    ataCant = document.querySelectorAll(".atacantes")
    for(let i = 0; i < ataCant.length; i++){
        ataCant[i].setAttribute('src', 'images/branco.png')
        ataCant[i].setAttribute('title', '')
    }

    for(let i = 0; i < images.length; i++){
        document.querySelector(`#imgs${i}`).classList.remove('escolhido')
    }
}

selecao.addEventListener('click', select)

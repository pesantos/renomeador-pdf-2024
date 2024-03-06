const pdfText = require('pdf-text')
const fs = require('fs');
const pasta = 'c:/picados';
var pathToPdf = "c:/picados/1611_xinforme de rendimentos 2024.pdf";

const arquivos = fs.readdirSync(pasta);
let contador = 1;
arquivos.forEach(arq=>{
    const comp = 'c:/picados/'+arq;
    pdfText(comp, function(err, chunks) {
        chunks.forEach(p=>{
            if(p.includes('.') && p.includes('-') && !p.includes('/')){
                const cpf = extrairCPF(p);
                if(cpf){
                    fs.copyFileSync(comp,`c:/prontos/${cpf}.pdf`);
                    console.log(`${contador}-${cpf}`);
                    contador++;
                }
               
            }
        })
    })
});

function extrairCPF(texto) {
    // Encontra o CPF usando uma expressão regular
    const regexCPF = /\d{3}\.\d{3}\.\d{3}-\d{2}/;
    const cpfEncontrado = texto.match(regexCPF);

    if (cpfEncontrado) {
        // Remove os pontos e o traço do CPF
        const cpfSemFormatacao = cpfEncontrado[0].replace(/\D/g, '');

        // Verifica se o CPF tem 11 dígitos (formato válido)
        if (cpfSemFormatacao.length === 11) {
            return cpfSemFormatacao;
        } else {
            return null;
        }
    } else {
        return null;
    }
}


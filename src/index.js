import path from 'path';
import fs from 'fs';

const directory = './files';
const tagToSearch = 'pMVAST'

async function searchTagInXmlFiles() {
    // Busca todos os arquivos do diretório selecionado
    const xmlFiles = fs.readdirSync(directory, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        return files;
    })
    // Efetua o loop pelos arquivos encontrados
    for (let i = 0; i < xmlFiles.length; i++) {
        // Utiliza stream para leitura dos arquivos de forma constante e contínua com o objetivo de não travar o sistema
        let xmlFileData = fs.createReadStream(path.join(directory, xmlFiles[i]), 'utf8')
        // Cria uma nova Promise para trabalharmos de maneira assíncrona verificando a existencia da tag no xml
        let hasTag = new Promise(function (resolve, reject) {
            // Efetua o trabalho de leitura por stream e exibe o nome do xml que contem a tag
            xmlFileData.on('data', (chunk) => {
                if (chunk.search(tagToSearch) !== -1 ) {
                    console.log(xmlFiles[i].replace('-procNFe.xml', ''))
                }
                resolve(chunk.search(tagToSearch))
            })
            xmlFileData.on('error', reject);
        });
        if (await hasTag !== -1) return;
    }
}

searchTagInXmlFiles()

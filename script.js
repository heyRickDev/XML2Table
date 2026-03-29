function process() {
const xmlbox = document.querySelector('.xmlbox').value
const reference = document.querySelector('.reference').value
const resultParagraph = document.querySelector('.resultTable')
const parser = new DOMParser()
const xmlDoc = parser.parseFromString(xmlbox, "text/xml");

const products = xmlDoc.getElementsByTagName("prod");

const result = Array.from(products).map(product => ({
  prodDescription: product.getElementsByTagName("xProd")[0].textContent,
  barcode: product.getElementsByTagName("cEAN")[0].textContent,
  quantity: product.getElementsByTagName("qCom")[0].textContent,
  price: product.getElementsByTagName("vUnCom")[0].textContent,
  un: product.getElementsByTagName("uCom")[0].textContent,
  prodCode: product.getElementsByTagName("cProd")[0].textContent,
  reference: reference
}));
console.log(result)

// for (let i = 0; i < products.length; i++){
//   resultParagraph.innerHTML += `
//     <p>${result[i].prodCode} ${result[i].prodDescription} ${result[i].barcode} ${result[i].quantity} ${result[i].price}</p>
//   `
// }

resultParagraph.innerHTML = result.map(item => `
      <tr>
        <td>${item.prodCode}</td>
        <td>${item.prodDescription}</td>
        <td>UN</td>
        <td>${item.price}</td>
        <td>100</td>
        <td></td>   
        <td></td>   
        <td></td>   
        <td>${item.quantity}</td>   
        <td></td>   
        <td>FERRAGENS</td>
        <td>geral</td>   
        <td>${reference}</td>   
        <td></td>   
        <td>Fornecedor Padrao</td>
        <td></td>   
        <td></td>   
        <td></td>   
        <td></td>   
        <td></td>   
      </tr>
`).join('');

}
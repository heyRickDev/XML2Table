function importXmlFile() {
  const fileInput = document.querySelector('#xmlFileInput')
  fileInput.click()

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        document.querySelector('#xmlbox').value = e.target.result
      }
      reader.readAsText(file)
    }
  })
}

function process() {
  const reference = document.querySelector('#reference').value
  const xmlbox = document.querySelector('#xmlbox').value
  const resultParagraph = document.querySelector('.resultTable')
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlbox, "text/xml");

  const products = xmlDoc.getElementsByTagName("prod");

  const result = Array.from(products).map(product => ({
    prodDescription: product.getElementsByTagName("xProd")[0].textContent,
    prodBarcode: product.getElementsByTagName("cEAN")[0].textContent,
    quantity: product.getElementsByTagName("qCom")[0].textContent,
    price: product.getElementsByTagName("vUnCom")[0].textContent,
    un: product.getElementsByTagName("uCom")[0].textContent,
    prodCode: product.getElementsByTagName("cProd")[0].textContent,
    reference: reference
  }));


  resultParagraph.innerHTML = result.map(item => {
    const isBarcode = item.prodBarcode !== "SEM GTIN"
    return `
      <tr>
        <td>${isBarcode ? item.prodBarcode : item.prodCode}</td>
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
`
  }).join('');

  navigator.clipboard.writeText(resultParagraph.innerText)

}
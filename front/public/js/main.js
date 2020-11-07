function send() {
    const name = document.getElementById('name')
    const quantity = document.getElementById('quantity')
    const value = document.getElementById('value')
    const idClient = document.getElementById('idClient')

    if (idClient && name && quantity && value && idClient.value && name.value && quantity.value && value.value) {
        return sendForm(idClient.value, name.value, quantity.value, value.value)
    }
    alert('Form invalido!!!')
}

function reset() {
    document.getElementById('name').value = ''
    document.getElementById('quantity').value = ''
    document.getElementById('value').value = ''
    document.getElementById('idClient').value = ''
}

function sendForm(idClient, name, quantity, value) {
    axios.post('http://localhost:9000/api/v1/products', {
        idClient, name, quantity, value
    }).then(success => {
        reset()
        alert('Sucesso')
    }).error
}


function getAll() {
    axios.get('http://localhost:9000/api/v1/products').then(success => {
        console.log(success.data)
        renderHtml(success.data)
    }).error
}

function renderHtml(data) {
    if (!data || data.length < 0) {
        return
    }
    let toRender = "";

    data.map(product => {
        // readonly name: string;
        // readonly quantity: number;
        // readonly value: number;
        // readonly idClient: number;
        toRender += `
               <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Quantity: ${product.quantity}</p>
                            <p class="card-text">Customer ID: ${product.idClient}</p>
                            <p class="card-text">Value ${product.value}</p>
                            <a href="#" class="btn btn-primary">Detalhes</a>
                        </div>
                    </div>
                </div>
       `
    })
    document.getElementById("container-app").innerHTML = toRender;
}

getAll()
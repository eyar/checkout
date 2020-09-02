const products = [{quantity: '6', price: '2.5'}, {quantity: '12', price: '4.66'}, {quantity: '25', price: '9.00'}];
let ul = document.querySelector('ul');
let chosenProduct, chosenQuantity = 1;

const getTitle = (quantity) => {
  return `Purchase ${quantity} bottles pack`;
}

const productsLis = products.map(({quantity, price}, i)=>{
  const html = `
  ${price==='4.66' ? '<div class="pill">Best Price</div>' : ''}
  <div class='title'>${getTitle(quantity)}</div>
  <div class='price'>$${price}/pack</div>
  <button>Click to choose</button>
  `;
  let li = document.createElement('li');
  li.innerHTML = html;
  li.classList.add('box-shadow');
  li.dataset.price = price;
  li.onclick = function(){
    document.querySelectorAll('li').forEach((item, index)=>{
      if(i===index){
        item.classList.add('focus');
        chosenProduct = products[index];
      }
      else item.classList.remove('focus');
    })
    this.classList.add('focus');
    setTotal();
  }
  ul.appendChild(li);
})

window.handleChange = (quantity) => {
  chosenQuantity = quantity;
  setTotal()
}

const setTotal = () => {
  const total = +chosenQuantity * +chosenProduct?.price;
  document.querySelector('.total span').textContent = isNaN(total) ? 0 : total;
}
setTotal();

const warning = (message)=>{
  let div = document.createElement('div');
  div.classList.add('invalid')
  div.textContent = message;
  return div;
}

window.handleSubmit = (event) => {
  event.preventDefault();
  const namePattern = /[a-z][A-Z]{2,70}/i;
  const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  document.querySelectorAll('.invalid').forEach( element => element.remove() );
  let allowCheckout = true;
  Object.values(event.target).forEach((input)=>{
    const {type, name, value} = input;
    if(type==='text'){
      let div;
      if(!value){
        div = warning('This field is required');
      }
      else if(name==='email' && !emailPattern.test(value)){
        div = warning('Email address is invalid');
      }
      else if(['first','last'].includes(name) && !namePattern.test(value)){
        div = warning('Roman letters only, 2-70 chars');
      }
      if(div){
        input.after(div);
        input.style.border = '1px solid #ed2727';
        allowCheckout &= false;
      }
      else{
        input.style.border = '1px solid black';
        allowCheckout &= true;
      }
    }
  });
  if(allowCheckout && chosenProduct) loadModal();
}

const loadModal = () => {
  let modal = document.querySelector('.modal');
  modal.style.display = 'flex';
  modal.querySelector('.chosen-quantity').textContent = chosenQuantity;
  modal.querySelector('.product-quantity').textContent = getTitle(chosenProduct.quantity);
}

window.closeModal = () => {
  let modal = document.querySelector('.modal');
  modal.style.display = 'none';
}
let products;
let brandsArr = [];
// to fetch JSON Data
fetch(`../js/json/data.json`)
  .then(function(response) {
    return response.json();
  })
  .then(function(res) {
    products = res;
    listing.createTemplate(res);
  })
  .catch(error => console.error('Error:', error));

  let listing = {
    createTemplate: (res) => {
      let outputTemplate = '';
       res.map((product)=>{
        outputTemplate += listing.productTemplate(product)        
      })
      
        document.getElementById('listing').innerHTML = outputTemplate;        
    },
    productTemplate:(data) => {
      return `<div class="col-md-3 col-sm-6 pb-15">
        <div class="product-grid">
            <div class="product-image">
                <a href="#">
                    <img class="pic-1" src="${data.imageUrl}">                    
                </a>
                <span class="product-new-label">sale</span>
            </div>
            <div class="product-content">
                <h3 class="title"><a href="#">${data.productName}</a></h3>
                <div class="price">${data.price}
                    <span>$20.00</span>
                </div>
                <a class="add-to-cart" href="">+ Add To Cart</a>
            </div>
        </div>
    </div>`
    },brandUpdate:(id,status) => {
        if(status){
          brandsArr.push(id)
        }else{
          brandsArr = brandsArr.filter((brandId) => {
                  return id !== brandId
              })
        }
      },filterPrice:()=>{
        let minPrice = document.getElementById('price-min').value;
        let maxPrice = document.getElementById('price-max').value;
        let filterdProducts = products.filter((product) => {
            return product.price < maxPrice && product.price > minPrice
        })
        
        listing.createTemplate(filterdProducts);
      }

  }


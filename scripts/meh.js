export function erToUpcase(name){
  return name.charAt(0).toUpperCase()+name.slice(1)
}

export function wait(){
    const searchBtn = document.querySelector('.search-btn');

    let div ;
    const searchImg = document.querySelector('.search-img');

    if(!searchBtn.querySelector('.loadin')){

      div = document.createElement('div');
      searchImg.style.display = 'none';                    
      div.className = 'loadin';
      searchBtn.appendChild(div)
    }

    setTimeout(() => {

      if(searchBtn.contains(div)){
        searchBtn.removeChild(div)
      }
      
      searchImg.style.display = 'initial';  

      
    }, 1000);

}





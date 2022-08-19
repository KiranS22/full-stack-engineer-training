const instructions = ()=>{
  confirm(`welcome to our paired project! \n \nInstructions: Click through the tabs to see images of peopular destinations to vist and a short paragraph describing them.`)
}

const tabs = document.querySelectorAll('.tab-ind');
const tabsInfo = document.querySelectorAll('.info-card');
const tabsImg = document.querySelectorAll('.ind-img');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
      tabsInfo.forEach((card) => {
          card.classList.remove('active')
      })
      tabs.forEach((tab) => {
          tab.classList.remove('active');
      })
      tabsImg.forEach((img) => {
          img.classList.remove('active');
      })
      
      tabs[index].classList.add('active');
tabsInfo[index].classList.add('active')
tabsImg[index].classList.add('active')
})

})

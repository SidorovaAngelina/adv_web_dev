function switchLanguage(){
    const btn = document.getElementById('switchLang')
      if (btn.innerText==="Switch to English version"){
          document.getElementById('issue').innerText='GU of the MIA of Russia in Moscow'
          document.getElementById('surname').innerText='Sidorova'
          document.getElementById('name').innerText='Angelina'
          document.getElementById('patronymic').innerText='Viacheslavovna'
          document.getElementById('gender').innerText='fem.'
          document.getElementById('birth_place').innerText='Moscow'
          btn.innerText='Перейти к русской версии'
          btn.style.background='#a600ff'
      }
      else{
          document.getElementById('issue').innerText='ГУ МВД России по г. Москве'
          document.getElementById('surname').innerText='Сидорова'
          document.getElementById('name').innerText='Ангелина'
          document.getElementById('patronymic').innerText='Вячеславовна'
          document.getElementById('gender').innerText='жен.'
          document.getElementById('birth_place').innerText='гор. Москва'
          btn.innerText='Switch to English version'
          btn.style.background='#ff004c'
    }
}

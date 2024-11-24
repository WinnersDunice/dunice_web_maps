const selected_color = '#34a3a7';
const def_color = '#ececee';

var groups = Array();

var selected_group = null;

$("#add_group").on('click', function (e) {
  console.log("ha");
  let id = groups.length;
  groups.push(id);

  $(`<button id="${id}_group" class="draginput twocol textcontent" style="margin-top:5px;" data-title="Change Content">
        <h2 class="text">Группа ${id}</h2>
      </button>`).appendTo("#office_drugs")
  
  $(`#${id}_group`).on("click", function (e) {
    console.log(e.currentTarget);
    for(eid in groups){
        console.log($(`#${eid}_group`));
        $(`#${eid}_group`).css('background-color', def_color);
      }
    
    console.log(e.currentTarget);
    e.currentTarget.style.backgroundColor  = selected_color;
    selected_group = e.currentTarget.id;
    console.log(selected_group)
    
  });

  $(`.${id}_group`).on('click', function (e) {
    console.log("clicked")
    console.log(e.currentTarget.className.baseVal)
    
    for(eid in groups){
        console.log($(`#${eid}_group`));
        $(`#${eid}_group`).removeClass("lighted");
      }

    $(`.${e.currentTarget.className.baseVal}`).addClass("lighted");
    

  });

});


$.get(`https://api.dunicewinners.ru/offices`, function (data, status) {
  if(status == 'success'){
    console.log(data, typeof data)
    for(office in JSON.parse(data)){
      console.log(office)
      $.get(`https://api.dunicewinners.ru/offices/${office}/users`, function name(data, status) {
        console.log(data, status)
        if(data){
          let users = JSON.parse(data)
          console.log(users)
          for(userid in users){
          let user = users[userid]
          console.log(user)
          $(`<button id="${user.id}_user" class="draginput twocol textcontent" style="margin-top:10px; margin-right:60px; scale:0.94" data-title="Change Content">
        <h2 class="">Пользователь ${user.login}</h2>
      </button>`).appendTo("#users_list")
          }
        }
        
    })
  }
  } 
})

$("#users_list")


console.log("hah")









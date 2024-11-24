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

console.log("hah")









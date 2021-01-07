//Получить все записи
function getAll() {
    $('#body').empty();
    $.ajax({
        url: "/getall",
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            htmlCode = "<table><tr><th>Выбор</th><th>Id</th><th>Имя</th><th>Описание</th><th>Количество</th></tr>";
            for (var i = 0; i < data.length; i++) {
                htmlCode += "<tr><td><input id='radio" + data[i].id + "' value='" + data[i].id + "' type='radio' class='selectRow' name='selectRow'></td><td>" + data[i].id + "</td><td id='name" + data[i].id + "'>" + data[i].name + "</td><td id='description" + data[i].id + "'>" + data[i].description + "</td><td id='amount" + data[i].id + "'>" + data[i].amount + "</td></tr>";
            }
            htmlCode += "</table>";
            $("#body").clear;
            $("#body").append(htmlCode);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p> Ошибка: " + textStatus + "</p>");
        }
    });
}

//Добавление продукта
function addProduct (){
    data={id:0, name:$('#selName').val(), description:$('#selDescription').val(), amount:$('#selAmount').val()};
    $.ajax({
        url: "/add",
        type: "POST",
        data: data,
        success: function (data, textStatus, jqXHR) {
            $("#log").append("<p>" + textStatus + "</p>");
            getAll();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p>" + textStatus + "</p>");
        }
    });
}

//Редактирование продукта
function updateProduct(){
    data={id:0, name:$('#selName').val(), description:$('#selDescription').val(), amount:$('#selAmount').val()};
    $.ajax({
        url: "/update/"+$('#selId').val(),
        type: "PUT",
        data: data,
        success: function (data, textStatus, jqXHR) {
            $("#log").append("<p>" + textStatus + "</p>");
            getAll();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p>" + textStatus + "</p>");
        }
    });
}

//Удаление продукта
function deleteProduct(){
   $.ajax({
        url: "/delete/"+$('#selId').val(),
        type: "DELETE",
        //data: data,
        success: function (data, textStatus, jqXHR) {
            $("#log").append("<p>" + textStatus + "</p>");
            getAll();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p>" + textStatus + "</p>");
        }
    });
}

//Поиск продукта по имени
function searchProduct(){
    $('#body').empty();
    $.ajax({
        url: "/searchByName/"+$('#selName').val(),
        type: "GET",
        success: function (data, textStatus, jqXHR) {
            htmlCode = "<table><tr><th>Выбор</th><th>Id</th><th>Имя</th><th>Описание</th><th>Количество</th></tr>";
            for (var i = 0; i < data.length; i++) {
                htmlCode += "<tr><td><input id='radio" + data[i].id + "' value='" + data[i].id + "' type='radio' class='selectRow' name='selectRow'></td><td>" + data[i].id + "</td><td id='name" + data[i].id + "'>" + data[i].name + "</td><td id='description" + data[i].id + "'>" + data[i].description + "</td><td id='amount" + data[i].id + "'>" + data[i].amount + "</td></tr>";
            }
            htmlCode += "</table>";
            $("#body").clear;
            $("#body").append(htmlCode);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#log").append("<p>" + textStatus + "</p>");
        }
    });
}

$(document).ready(function(){

    //Отобразить форму добавления/редактирования/удаления/поиска
    $('.btnShowForm').click(function(){
        var id=this.getAttribute('id');
        $('#form').css('display', 'block'); //отображаем форму
        $('.buttonAct').css('display', 'none'); //скрываем ненужные кнопки
        selector=$('#selId').val(); //очищаем окна и  переключатели
        if ((($('#radio'+selector)[0])!=undefined)&&($('#radio'+selector)[0].checked)) {
                $('#radio'+selector)[0].checked=false;
        }
        $('#selId').val('');$('#selName').val('');
        $('#selDescription').val('');$('#selAmount').val('');
        //Отображаем нужную кнопку (добавить, релактировать, удалить, поиск)
        switch (id){
            case "btnShowAdd":
                $('#btnFormAdd').css('display', 'block');
                break;
            case "btnShowUpd":
                $('#btnFormUpdate').css('display', 'block');
                break;
            case "btnShowDel":
                $('#btnFormDelete').css('display', 'block');
                break;
            case "btnShowSearch":
                $('#btnFormSearch').css('display', "block");
                break;
        }
    });

    //Выбрать запись для редактирования/удаления, клик на radiobutton
    $('#body').on('click', function(event){
        var target=$(event.target);
        if (target.is('.selectRow')){
            var id=target[0].value;
            $('#selId').val(id);
            $('#selName').val($('#name'+id)[0].innerText);
            $('#selDescription').val($('#description'+id)[0].innerText);
            $('#selAmount').val($('#amount'+id)[0].innerText);
        }
    });

    //Навешиваем события
    $('#btnGetAll').click(function (){
        getAll();
    });

    $('#btnFormAdd').click(function () {
        addProduct();
    });

    $('#btnFormUpdate').click(function(){
        updateProduct();
    });

    $('#btnFormDelete').click(function () {
        deleteProduct();
    });
    $('#btnFormSearch').click(function () {
        searchProduct();
    });

});



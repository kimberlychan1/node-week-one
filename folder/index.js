$("#showFile").click((e) => {
    e.preventDefault();
    $('#list').empty()
    $.getJSON("http://localhost:8080/uploaded-files")
    .done(function(data){
        data.map((data) => {
            $("#list").append(
                `<p><button type="submit" name="${data}">${data}</button></p>`
            )
        })
    })
    .fail(function(){
        console.log("Fail")
    })
    .always(function(){
        console.log("Always")
    })
})

$("#showFile").click((e) => {
    e.preventDefault();
    $('#list').empty()
    $.get("/uploaded-files")
    .done(function(data){
        for(let item of JSON.parse(data)) {
            $("#list").append(
                `<p><a href='/download/${item}'>${item}</a></p><br>`
                // `<p><button type="submit" name="${item}">${item}</button></p>`
            )
        }
    })
    .fail(function(){
        console.log("Fail")
    })
    .always(function(){
        console.log("Always")
    })
})

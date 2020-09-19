$.get("/api/user_data").then(cloudData => {

    var myWidget = cloudinary.createUploadWidget({
        cloudName: cloudData.cloudUploadName, 
        uploadPreset: cloudData.cloudUploadPreset}, (error, result) => {  
        if (!error && result && result.event === "success") {
            $("#updateProfileModal").show(); 
            console.log('Done! Here is the image info: ', result.info.secure_url); 
            $("#profilePhotoURL").val(result.info.secure_url);  
            $("#profilePhoto").attr('src', result.info.secure_url);    
        }
        }
    )
    
    document.getElementById("upload_widget").addEventListener("click", function(event){
        event.preventDefault();
        $("#updateProfileModal").hide();
        myWidget.open();
    }, false);

});
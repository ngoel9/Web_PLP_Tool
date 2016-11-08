/**
 * Created by nitingoel on 7/30/16.
 */

var app = angular.module('PLP', ['ngCookies']);

app.controller('idectrl', [ '$scope', '$cookies', '$http', function( $scope, $cookies, $http){

    $scope.inFile = null;

    $scope.register = function() {
        $http.get("http://localhost:12345/register?un=abc")
            .then(function(response) {
                console.log("response for register is: "+response.data.status+"\t"+response.data.session_key);
                if(response.data.status == "failed") {
                    alert("Server Error\nRedirecting to Google.com");
                    window.location.href = "https://www.google.com/";
                } else {
                    ctr = 1;
                    str = 'sessionKey'+ctr;
                    while($cookies.get(str)!=null){
                        ctr+=1;
                        str = 'sessionKey'+ctr;
                    }
                    $cookies.put(str,response.data.session_key);
                }
            });

    };

    $scope.uploadFile = function() {
        console.log("in uploadFile");
        fileIn = $('#upfile');
        fileIn.trigger('click');
        console.log("just before return");
        return false;
    };

    $scope.openFile = function() {
        console.log("in openFile");
        if ((window.File!=null) && (window.FileReader!=null) && (window.FileList!=null) && (window.Blob!=null)) {
            // do your stuff!
            console.log("in if");
            str = "Uploading ";
            fileIn = $('#upfile');
            var f = fileIn[0].files[0];
            consoletxt = document.getElementById('console');

            var formData = new FormData();
            formData.append("file", f);
            $http({
                method: 'POST',
                url: 'http://localhost:12345/uploadFile',
                headers: {'Content-Type': undefined},
                data: formData,
                transformRequest: function (data, headersGetterFunction) {
                    return data;
                }
            })
                .success(function (data, status){
                })
                .error(function(data, status) {
                });

            if (f) {
                var r = new FileReader();
                r.onload = function(e) {
                    var contents = e.target.result;
                    alert( "Got the file.n"
                        +"name: " + f.name + "n"
                        +"type: " + f.type + "n"
                        +"size: " + f.size + " bytesn"
                        + "starts with: " + contents.substr(1, contents.indexOf("n"))
                        +"\n"+str
                    );
                    consoletxt.innerHTML = "\""+contents+"\"";
                    console.log(contents);
                }
                temp = r.readAsText(f);
            } else {
                alert("Failed to load file");
            }
        } else {
            alert('The File APIs are not fully supported by your browser.');
        }
    };

    $scope.openLED = function() {
        //console.log(Jquery.ui);
        //alert("okay");
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
            "   <h4>LED Array I/O</h4>"+
            "   <label for='address'>Address:</label>"+
            "   <input type='text' id='address' value='0xf0200000' disabled/>" +
            "   <label for='value'>Value:</label>"+
            "   <input type='text' id='value' value='0x00000000' disabled/>"+
            "   </br></br>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led1'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led2'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led3'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led4'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led5'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led6'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led7'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switchled'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led8'></div>"+
            "       </div>"+
            "   </label>"+
            " </div>", {
        }).draggable());
    };

    $scope.openSwitches = function() {
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
            "   <h4>Switches</h4>"+
            "   <label for='address'>Address:</label>"+
            "   <input type='text' id='address' placeholder='0xf0200000'/>" +
            "   <label for='value'>Value:</label>"+
            "   <input type='text' id='value' placeholder='0x00000000'/>"+
            "   <br><br><br>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label>" +
            "   <label class='switch'>"+
            "       <input type='checkbox'>"+
            "       <div class='slider'></div>"+
            "   </label><br><br><br><br>" +
            " </div>", {
        }).draggable());
    };

    $scope.open7Segment = function() {
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
        "   <h4>Seven Segment Display</h4>"+
             "   <label for='address'>Address:</label>"+
            "   <input type='text' id='address' placeholder='0xf0200000'/>" +
            "   <label for='value'>Value:</label>"+
            "   <input type='text' id='value' placeholder='0x00000000'/>  </br></br>"+
            // "   </br></br> <input type='text' id='valueText' />"+
            "   <div class='medium-7-seg' id='sevenSegmentArray'></div>" +
            " </div>", {
        }).draggable());
        $("#sevenSegmentArray").sevenSeg({ digits: 4 });
        // $("#valueText").keyup(function(){
        //     $("#sevenSegmentArray").sevenSeg({ value: this.value });
        // });
    };

    $scope.openUART = function() {
        /*$('#window').prepend($("<div/>", {
            "class": "draggable ui-widget-content",
            text: "open UART",
        }).resizable().draggable());*/
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
            "<img src='../images/sevensegment.PNG'/>" +
            " </div>", {
        })).draggable();
    };

    $scope.openVGA = function() {
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
            "<img src='../images/sevensegment.PNG'/>" +
            " </div>", {
        }).draggable());
    };

    $scope.openGPIO = function() {
        $('#window').prepend($("<div class='draggable ui-widget-content'>" +
            "   <h4>GPIO Module</h4>"+
            "   <label for='value'>Tristate Register Contents:</label>"+
            "   <input type='text' id='value' value='' disabled/>"+
            "   </br></br>"+
            "   <label class='switch'>"+
            "       <label>Port A:</label>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led1'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led2'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led3'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led4'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led5'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led6'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led7'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led8'></div>"+
            "       </div>"+
            "   </label>"+
            "  <br><br><hr><br><br>" +
            "   <label class='switch'>"+
            "       <label>Port B:</label>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led9'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led10'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led11'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led12'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led13'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led14'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led15'></div>"+
            "       </div>"+
            "   </label>"+
            "   <label class='switch'>"+
            "       <div class='led-box'>"+
            "           <div class='led-black' id='led16'></div>"+
            "       </div>"+
            "   </label>"+
            " </div>", {
        }).draggable());
    };

}]);

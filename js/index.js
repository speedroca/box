(function(){

	console.log('checkSystemRequirements');
	console.log(JSON.stringify(ZoomMtg.checkSystemRequirements()));

// it's option if you want to chenge the jssdk dependency link resources.
// ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.5.0/lib', '/av'); // CDN version default
// ZoomMtg.setZoomJSLib('https://source.zoom.us/1.5.0/lib', '/av'); // use source.zoom.us
// ZoomMtg.setZoomJSLib('https://jssdk.zoomus.cn/1.5.0/lib', '/av'); // use jssdk.zoomus.cn   
// ZoomMtg.setZoomJSLib('http://localhost:9999/node_modules/zoomus-jssdk/dist/lib', '/av'); // Local version default

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    
    var API_KEY = 'grQRM8CuREW4gnsh9C12oQ';

    /**
     * NEVER PUT YOUR ACTUAL API SECRET IN CLIENT SIDE CODE, THIS IS JUST FOR QUICK PROTOTYPING
     * The below generateSignature should be done server side as not to expose your api secret in public
     * You can find an eaxmple in here: https://marketplace.zoom.us/docs/sdk/native-sdks/Web-Client-SDK/tutorial/generate-signature
     */
    var API_SECRET = 'tfSkO6pMQ7PG1OkjOZy5eA4HnHrbnCGRv70E';


    document.getElementById('join_meeting').addEventListener('click', function(e){
        e.preventDefault();

        if(!this.form.checkValidity()){
            alert("Enter Name and Meeting Number");
            return false;
        }

        var meetConfig = {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            meetingNumber: parseInt(document.getElementById('meeting_number').value),
            userName: document.getElementById('display_name').value,
            passWord: "",
            leaveUrl: "http://medialogistics.cl",
            role: 0
        };


        var signature = ZoomMtg.generateSignature({
            meetingNumber: meetConfig.meetingNumber,
            apiKey: meetConfig.apiKey,
            apiSecret: meetConfig.apiSecret,
            role: meetConfig.role,
            success: function(res){
                console.log(res.result);
            }
        });

        ZoomMtg.init({
            leaveUrl: "http://medialogistics.cl",
            isSupportAV: true,
            success: function () {
                ZoomMtg.join(
                    {
                        meetingNumber: meetConfig.meetingNumber,
                        userName: meetConfig.userName,
                        signature: signature,
                        apiKey: meetConfig.apiKey,
                        userEmail: 'email@gmail.com',
                        passWord: meetConfig.passWord,
                        success: function(res){
                            $('#nav-tool').hide();
                            console.log('join meeting success');
                        },
                        error: function(res) {
                            console.log(res);
                        }
                    }
                );
            },
            error: function(res) {
                console.log(res);
            }
        });

    });

})();
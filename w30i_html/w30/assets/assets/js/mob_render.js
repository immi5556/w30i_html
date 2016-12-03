var w30mob = (function(){
              var wmcol = {};
              function isFunction(functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
              }
              
              function CallNativeApp(action, data, completion) {
                try {
                    var todata = {
                      action: action,
                      data: data
                    };
                    wmcol[action] = completion
                    webkit.messageHandlers.callnative.postMessage(JSON.stringify(todata));
                } catch(err) {
                    if (isFunction(completion)){
                        completion(JSON.stringify(err));
                    }
                    console.log('The native context does not exist yet');
                }
              }

              function SubscribeToNative(action, data) {
                var completion = wmcol[action];
                if (isFunction(completion)){
                    completion(data);
                }
              }
              
              return {
                callNativeApp: CallNativeApp,
                subscribeToNative: SubscribeToNative
              }
})()

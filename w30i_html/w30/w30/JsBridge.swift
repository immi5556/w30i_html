//
//  JsBridge.swift
//  w30
//
//  Created by Immanuel on 11/29/16.
//  Copyright © 2016 sj. All rights reserved.
//

import Foundation

class JsBridge {
    static func Execute(textData: Any!,vc: ViewController) {
        let dict = Utils.convertJsonToDictionary(text: textData as! String)
        let vv = dict?["action"] as? String
        var retstr = ""
        if vv?.lowercased() == "getdevicetoken" {
            retstr = GetDeviceToken()
        }
        if vv?.lowercased() == "postjson" {
            retstr = PostJson(dict: dict)
        }
        vc.callClient(action: vv!, data: retstr)
    }
    
    static func GetDeviceToken() -> String{
        return SharedStorage.GetDeviceToken();
    }
    
    static func PostJson(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        print(data?["deviceToken"])
        if let vv = data?["firstname"] as? String{
            SharedStorage.SetFirstName(value: vv)
        }
        if let vv = data?["lastname"] as? String{
            SharedStorage.SetLastName(value: vv)
        }
        if let vv = data?["email"] as? String{
            SharedStorage.SetEmail(value: vv)
        }
        if let vv = data?["mobilenumber"] as? String{
            SharedStorage.SetMobile(value: vv)
        }
        if let vv = data?["deviceToken"] as? String{
            SharedStorage.SetDeviceToken(value: vv)
        }
        if let vv = data?["_id"] as? String{
            SharedStorage.SetUserId(value: vv)
        }
        return "Successfully Saved."
    }
}

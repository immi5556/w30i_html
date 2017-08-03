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
        if vv?.lowercased() == "savelocationtype" {
            retstr = SetLocationType(dict: dict)
        }
        if vv?.lowercased() == "getlocationtype" {
            retstr = GetLocationType()
        }
        
        if vv?.lowercased() == "savecustomelat" {
            retstr = SetCustomeLat(dict: dict)
        }
        if vv?.lowercased() == "getcustomelat" {
            retstr = GetCustomeLat()
        }
        if vv?.lowercased() == "savecustomelong" {
            retstr = SetCustomeLong(dict: dict)
        }
        if vv?.lowercased() == "getcustomelong" {
            retstr = GetCustomeLong()
        }
        if vv?.lowercased() == "saveserviceid" {
            retstr = SetServiceId(dict: dict)
        }
        if vv?.lowercased() == "getserviceid" {
            retstr = GetServiceId()
        }
        if vv?.lowercased() == "saverecentlocation" {
            retstr = SetRecentLocation(dict: dict)
        }
        if vv?.lowercased() == "getrecentlocation" {
            retstr = GetRecentLocation()
        }
        if vv?.lowercased() == "saveoverlaystate" {
            retstr = SetOverlayState(dict: dict)
        }
        if vv?.lowercased() == "getoverlaystate" {
            retstr = GetOverlayState()
        }
        if vv?.lowercased() == "savecountryname" {
            retstr = SetCountryName(dict: dict)
        }
        if vv?.lowercased() == "getcountryname" {
            retstr = GetCountryName()
        }
        if vv?.lowercased() == "savesubdomain" {
            retstr = SetSubdomain(dict: dict)
        }
        if vv?.lowercased() == "getsubdomain" {
            retstr = GetSubdomain()
        }
        if vv?.lowercased() == "saveendusersubdomain" {
            retstr = SetEndUserSubdomain(dict: dict)
        }
        if vv?.lowercased() == "getendusersubdomain" {
            retstr = GetEndUserSubdomain()
        }
        if vv?.lowercased() == "saveadminstate" {
            retstr = SetAdminState(dict: dict)
        }
        if vv?.lowercased() == "getadminstate" {
            retstr = GetAdminState()
        }
        if vv?.lowercased() == "getfirstname" {
            retstr = GetFirstName()
        }
        
        if vv?.lowercased() == "getlastname" {
            retstr = GetLastName()
        }
        
        if vv?.lowercased() == "getemail" {
            retstr = GetEmail()
        }
        
        if vv?.lowercased() == "getmobile" {
            retstr = GetMobile()
        }
        
        if vv?.lowercased() == "getuserid" {
            retstr = GetUserId()
        }
        
        if vv?.lowercased() == "getlatitude" {
            //return latitude
            //retstr = "17.480373"
            retstr = SharedStorage.GetLatitude()
            if retstr == "Nil" {
                retstr = "17.480373"
            }
        }
        
        if vv?.lowercased() == "getlongitude" {
            //retstr = "78.390640"
            retstr = SharedStorage.GetLongitude()
            if retstr == "Nil" { // For EMulator
                retstr = "78.390640"
            }
        }
        if vv?.lowercased() == "postjson" {
            retstr = PostJson(dict: dict)
        }
        if vv?.lowercased() == "calling" {
            retstr = phoneCall(dict: dict)
        }
        
        if vv?.lowercased() == "updatelocationfetchvalue" {
            let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
            if let vv = data?["newValue"] as? String{
                vc.updateLocationFetchVal(value: vv)
            }
            vc.determineMyCurrentLocation()
        }
        
        vc.callClient(action: vv!, data: retstr)
    }
    
    static func GetDeviceToken() -> String{
        return SharedStorage.GetDeviceToken();
    }
    
    static func SetLocationType(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["locationType"] as? String{
            SharedStorage.SetLocationType(value: vv)
        }
        return "Inserted";
    }
    
    static func GetLocationType() -> String{
        return SharedStorage.GetLocationType();
    }
    
    static func SetCustomeLat(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["customeLat"] as? String{
            SharedStorage.SetCustomeLat(value: vv)
        }
        return "Inserted";
    }
    
    static func GetCustomeLat() -> String{
        return SharedStorage.GetCustomeLat();
    }
    
    static func SetCustomeLong(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["customeLong"] as? String{
            SharedStorage.SetCustomeLong(value: vv)
        }
        return "Longitude Inserted";
    }
    
    static func GetCustomeLong() -> String{
        return SharedStorage.GetCustomeLong();
    }
    
    static func SetServiceId(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["serviceId"] as? String{
            SharedStorage.SetServiceId(value: vv)
        }
        return "Inserted";
    }
    
    static func GetServiceId() -> String{
        return SharedStorage.GetServiceId();
    }
    
    static func SetRecentLocation(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["recentLocation"] as? String{
            SharedStorage.SetRecentLocation(value: vv)
        }
        return "Inserted";
    }
    
    static func GetRecentLocation() -> String{
        return SharedStorage.GetRecentLocation();
    }
    
    static func SetOverlayState(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["overlayState"] as? String{
            SharedStorage.SetOverlayState(value: vv)
        }
        return "Inserted";
    }
    
    static func GetOverlayState() -> String{
        return SharedStorage.GetOverlayState();
    }
    
    static func SetCountryName(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["countryName"] as? String{
            SharedStorage.SetCountryName(value: vv)
        }
        return "Inserted";
    }
    
    static func GetCountryName() -> String{
        return SharedStorage.GetCountryName();
    }
    
    static func SetSubdomain(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["subdomain"] as? String{
            SharedStorage.SetSubdomain(value: vv)
        }
        return "Inserted";
    }
    
    static func GetSubdomain() -> String{
        return SharedStorage.GetSubdomain();
    }
    
    static func SetEndUserSubdomain(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["endusersubdomain"] as? String{
            SharedStorage.SetEndUserSubdomain(value: vv)
        }
        return "Inserted";
    }
    
    static func GetEndUserSubdomain() -> String{
        return SharedStorage.GetEndUserSubdomain();
    }
    
    static func SetAdminState(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["adminstate"] as? String{
            SharedStorage.SetAdminState(value: vv)
        }
        return "Inserted";
    }
    
    static func GetAdminState() -> String{
        return SharedStorage.GetAdminState();
    }
    
    static func GetFirstName() -> String{
        return SharedStorage.GetFirstName();
    }
    
    static func GetLastName() -> String{
        return SharedStorage.GetLastName();
    }
    
    static func GetEmail() -> String{
        return SharedStorage.GetEmail();
    }
    
    static func GetMobile() -> String{
        return SharedStorage.GetMobile();
    }
    
    static func GetUserId() -> String{
        return SharedStorage.GetUserId();
    }
    
    static func PostJson(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        
        if let vv = data?["firstName"] as? String{
            SharedStorage.SetFirstName(value: vv)
        }
        if let vv = data?["lastName"] as? String{
            SharedStorage.SetLastName(value: vv)
        }
        if let vv = data?["email"] as? String{
            SharedStorage.SetEmail(value: vv)
        }
        if let vv = data?["mobileNumber"] as? String{
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
    
    static func RefreshGeoLocation(lat: String, lng: String, vc: ViewController){
        vc.webView?.evaluateJavaScript("locationChange('" + lat + "', '" + lng + "')", completionHandler: nil)
    }
    
    static func phoneCall(dict: [String: Any]?) -> String{
        let data = Utils.convertJsonToDictionary(text: dict?["data"] as! String)
        if let vv = data?["phoneNumber"] as? String{
            ViewController().callNumber(phoneNumber: vv)
        }
        return "";
    }
}

//
//  Storage.swift
//  w30
//
//  Created by Immanuel on 11/29/16.
//  Copyright © 2016 sj. All rights reserved.
//

import Foundation

struct Keys {
    static let DeviceToken = "W30_DEVICE_TOKEN"
    static let FirstName = "W30_FIRST_NAME"
    static let LastName = "W30_LAST_NAME"
    static let Email = "W30_EMAIL"
    static let Mobile = "W30_MOBILE"
    static let _ID = "W30_ID"
    static let LocationType = "W30_Location_Type"
    static let CustomeLat = "W30_Custome_Lat"
    static let CustomeLong = "W30_Custome_Long"
    static let ServiceId = "W30_Service_Id"
    static let RecentLocation = "W30_Recent_Location"
    static let OverlayState = "W30_Overlay_State"
    static let DeviceLatitude = "W30_DeviceLatitude"
    static let DeviceLongitude = "W30_DeviceLongitude"
    static let CountryName = "W30_CountryName"
    static let Subdomain = "W30_Subdomain"
    static let EndUserSubdomain = "W30_EndUserSubdomain"
    static let AdminState = "W30_AdminState";
}

class SharedStorage {
    static func GetDeviceToken() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.DeviceToken) {
            return token
        }
        return "Nil";
    }
    
    static func SetDeviceToken(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.DeviceToken)
        defaults.synchronize()
    }
    
    static func SetLocationType(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.LocationType)
        defaults.synchronize()
    }
    
    static func GetLocationType() -> String {
        let defaults = UserDefaults.standard
        if let locationType = defaults.string(forKey: Keys.LocationType) {
            return locationType
        }
        return "Nil";
    }
    
    static func SetLatitude(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.DeviceLatitude)
        defaults.synchronize()
    }
    
    static func GetLatitude() -> String {
        let defaults = UserDefaults.standard
        if let devLon = defaults.string(forKey: Keys.DeviceLatitude) {
            return devLon
        }
        return "Nil";
    }
    
    static func SetLongitude(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.DeviceLongitude)
        defaults.synchronize()
    }
    
    static func GetLongitude() -> String {
        let defaults = UserDefaults.standard
        if let devLat = defaults.string(forKey: Keys.DeviceLongitude) {
            return devLat
        }
        return "Nil";
    }
    
    static func SetCustomeLat(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.CustomeLat)
        defaults.synchronize()
    }
    
    static func GetCustomeLat() -> String {
        let defaults = UserDefaults.standard
        if let customeLat = defaults.string(forKey: Keys.CustomeLat) {
            return customeLat
        }
        return "Nil";
    }
    
    static func SetCustomeLong(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.CustomeLong)
        defaults.synchronize()
    }
    
    static func GetCustomeLong() -> String {
        let defaults = UserDefaults.standard
        if let customeLat = defaults.string(forKey: Keys.CustomeLong) {
            return customeLat
        }
        return "Nil";
    }
    
    static func SetServiceId(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.ServiceId)
        defaults.synchronize()
    }
    
    static func GetServiceId() -> String {
        let defaults = UserDefaults.standard
        if let serviceId = defaults.string(forKey: Keys.ServiceId) {
            return serviceId
        }
        return "Nil";
    }
    
    static func SetRecentLocation(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.RecentLocation)
        defaults.synchronize()
    }
    
    static func GetRecentLocation() -> String {
        let defaults = UserDefaults.standard
        if let recentLocation = defaults.string(forKey: Keys.RecentLocation) {
            return recentLocation
        }
        return "Nil";
    }
    
    static func SetOverlayState(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.OverlayState)
        defaults.synchronize()
    }
    
    static func GetOverlayState() -> String {
        let defaults = UserDefaults.standard
        if let overlayState = defaults.string(forKey: Keys.OverlayState) {
            return overlayState
        }
        return "Nil";
    }
    
    static func GetFirstName() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.FirstName) {
            return token
        }
        return "Nil";
    }
    static func SetFirstName(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.FirstName)
        defaults.synchronize()
    }
    static func GetLastName() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.LastName) {
            return token
        }
        return "Nil";
    }
    static func SetLastName(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.LastName)
        defaults.synchronize()
    }
    static func GetEmail() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.Email) {
            return token
        }
        return "Nil";
    }
    static func SetEmail(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.Email)
        defaults.synchronize()
    }
    static func GetMobile() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.Mobile) {
            return token
        }
        return "Nil";
    }
    static func SetMobile(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.Mobile)
        defaults.synchronize()
    }
    static func GetUserId() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys._ID) {
            return token
        }
        return "Nil";
    }
    static func SetUserId(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys._ID)
        defaults.synchronize()
    }
    static func GetCountryName() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.CountryName) {
            return token
        }
        return "Nil";
    }
    static func SetCountryName(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.CountryName)
        defaults.synchronize()
    }
    static func GetSubdomain() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.Subdomain) {
            return token
        }
        return "Nil";
    }
    static func SetSubdomain(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.Subdomain)
        defaults.synchronize()
    }
    static func GetEndUserSubdomain() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.EndUserSubdomain) {
            return token
        }
        return "Nil";
    }
    static func SetEndUserSubdomain(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.EndUserSubdomain)
        defaults.synchronize()
    }
    static func GetAdminState() -> String {
        let defaults = UserDefaults.standard
        if let token = defaults.string(forKey: Keys.AdminState) {
            return token
        }
        return "Nil";
    }
    static func SetAdminState(value: String) {
        let defaults = UserDefaults.standard
        defaults.set(value, forKey: Keys.AdminState)
        defaults.synchronize()
    }
}

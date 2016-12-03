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
}

//
//  Utils.swift
//  w30
//
//  Created by Immanuel on 11/29/16.
//  Copyright © 2016 sj. All rights reserved.
//

import Foundation

class Utils {
    static func convertJsonToDictionary(text: String) -> [String: Any]? {
        if let data = text.data(using: .utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any]
            } catch {
                print(error.localizedDescription)
            }
        }
        return nil
    }
}

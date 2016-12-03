//
//  ViewController1.swift
//  myview
//
//  Created by SMS on 6/26/16.
//  Copyright © 2016 immi. All rights reserved.
//

import Foundation
import UIKit

class ViewTwo : UIViewController {
    
    @IBOutlet weak var wview: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let path = Bundle.main.path(forResource: "servicePage", ofType: "html", inDirectory: nil)
        let requestURL = URL(string:path!);
        let request = URLRequest(url:requestURL!);
        wview.loadRequest(request)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    override func viewDidLayoutSubviews() {
        wview.frame = CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height);
    }
}

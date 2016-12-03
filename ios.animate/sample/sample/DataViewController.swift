//
//  DataViewController.swift
//  sample
//
//  Created by SMS on 2/8/16.
//  Copyright © 2016 SMS. All rights reserved.
//

import UIKit

class DataViewController: UIViewController, SphereMenuDelegate {

    @IBOutlet weak var dataLabel: UILabel!
    var dataObject: String = ""


    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.view.backgroundColor = UIColor(red:0.2, green:0.38, blue:0.8, alpha:1)
        let start = UIImage(named: "start")
        let image1 = UIImage(named: "icon-twitter")
        let image2 = UIImage(named: "icon-email")
        let image3 = UIImage(named: "icon-facebook")
        let images:[UIImage] = [image1!,image2!,image3!]
        let menu = SphereMenu(startPoint: CGPointMake(160, 320), startImage: start!, submenuImages:images, tapToDismiss:true)
        menu.delegate = self
        self.view.addSubview(menu)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        self.dataLabel!.text = dataObject
    }
    func sphereDidSelected(index: Int) {
        print("\(index)")
    }

}


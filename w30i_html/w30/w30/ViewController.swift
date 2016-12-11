//
//  ViewController.swift
//  w30
//
//  Created by Immanuel on 11/27/16.
//  Copyright © 2016 sj. All rights reserved.
//

import UIKit
import WebKit
import CoreLocation

class ViewController: UIViewController, WKUIDelegate, WKScriptMessageHandler, CLLocationManagerDelegate {
    
    var webView: WKWebView? = nil
    var locationManager: CLLocationManager!
    
    override var prefersStatusBarHidden: Bool {
        return true
    }
    
    override func loadView() {
        super.loadView()
        self.locationManager = CLLocationManager()
        locationManager.requestAlwaysAuthorization()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startMonitoringSignificantLocationChanges()
        initJsBridge()
        self.webView?.uiDelegate = self
        self.view = self.webView
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        determineMyCurrentLocation()
    }
    
    func determineMyCurrentLocation() {
        locationManager = CLLocationManager()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.requestAlwaysAuthorization()
        
        if CLLocationManager.locationServicesEnabled() {
            locationManager.startUpdatingLocation()
            //locationManager.startUpdatingHeading()
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let userLocation:CLLocation = locations[0] as CLLocation
        // Call stopUpdatingLocation() to stop listening for location updates,
        // other wise this function will be called every time when user location changes.
        manager.stopUpdatingLocation()
        print("user latitude = \(userLocation.coordinate.latitude)")
        print("user longitude = \(userLocation.coordinate.longitude)")
        //SharedStorage.SetLatitude(value: String(userLocation.coordinate.latitude))
        //SharedStorage.SetLongitude(value: String(userLocation.coordinate.longitude))
        JsBridge.RefreshGeoLocation(lat: String(userLocation.coordinate.latitude), lng: String(userLocation.coordinate.longitude), vc: self)
        
    }
    
    func locationManager(_ manager: CLLocationManager,
                         didFailWithError error: Error) {
        print("Location Error \(error)")
    }
    
    func fileURLForBuggyWKWebView8(fileURL: URL) throws -> URL {
        // Some safety checks
        if !fileURL.isFileURL {
            throw NSError(
                domain: "BuggyWKWebViewDomain",
                code: 1001,
                userInfo: [NSLocalizedDescriptionKey: NSLocalizedString("URL must be a file URL.", comment:"")])
        }
        try! fileURL.checkResourceIsReachable()
        
        // Create "/temp/www" directory
        let fm = FileManager.default
        let tmpDirURL = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("www")
        try! fm.createDirectory(at: tmpDirURL, withIntermediateDirectories: true, attributes: nil)
        
        // Now copy given file to the temp directory
        let dstURL = tmpDirURL.appendingPathComponent(fileURL.lastPathComponent)
        let _ = try? fm.removeItem(at: dstURL)
        try! fm.copyItem(at: fileURL, to: dstURL)
        
        // Files in "/temp/www" load flawlesly :)
        return dstURL
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        /*let path = Bundle.main.path(forResource: "assets/servicePage", ofType: "html", inDirectory: nil)
         let requestURL = URL(string:path!);
         let request = URLRequest(url:requestURL!);
         self.webView?.load(request) */
        var fileURL = URL(fileURLWithPath: Bundle.main.path(forResource:"assets/index", ofType: "html")!)
        if !SharedStorage.GetMobile().isEmpty && SharedStorage.GetMobile() != "Nil" {
            fileURL = URL(fileURLWithPath: Bundle.main.path(forResource:"assets/selectCatagory", ofType: "html")!)
        }
        
        if #available(iOS 9.0, *) {
            // iOS9 and above. One year later things are OK.
            webView?.loadFileURL(fileURL, allowingReadAccessTo: fileURL)
        } else {
            // iOS8. Things can (sometimes) be workaround-ed
            //   Brave people can do just this
            //   fileURL = try! pathForBuggyWKWebView8(fileURL: fileURL)
            //   webView.load(URLRequest(url: fileURL))
            do {
                fileURL = try fileURLForBuggyWKWebView8(fileURL: fileURL)
                webView?.load(URLRequest(url: fileURL))
            } catch let error as NSError {
                print("Error: " + error.debugDescription)
            }
        }
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewDidLayoutSubviews() {
        /*webView?.frame = CGRect(x: 0, y: 0, width: self.view.frame.size.width, height: self.view.frame.size.height); */
    }
    
    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String, initiatedByFrame frame: WKFrameInfo,
                 completionHandler: @escaping () -> Void) {
        
        let alertController = UIAlertController(title: nil, message: message, preferredStyle: .actionSheet)
        alertController.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            completionHandler()
        }))
        
        present(alertController, animated: true, completion: nil)
    }
    
    /* func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
     if(message.name == "callbackHandler") {
     print("JavaScript is sending a message \(message.body)")
     self.webView?.evaluateJavaScript("redHeader()", completionHandler: nil)
     }
     } */
    
    func initJsBridge() {
        var contentController = WKUserContentController();
        contentController.add(
            self,
            name: "callnative"
        )
        
        var config = WKWebViewConfiguration()
        config.userContentController = contentController
        
        self.webView = WKWebView(
            frame: self.view.frame,
            configuration: config
        )
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if(message.name.lowercased() == "callnative") {
            //print("JavaScript is sending a message \(message.body)")
            JsBridge.Execute(textData: message.body, vc: self)
        }
    }
    
    func callClient(action: String, data: String) {
        self.webView?.evaluateJavaScript("w30mob.subscribeToNative('" + action + "', '" + data + "')", completionHandler: nil)
    }
}


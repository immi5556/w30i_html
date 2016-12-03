//
//  RootViewController.swift
//  imap
//
//  Created by SMS on 2/4/16.
//  Copyright © 2016 SMS. All rights reserved.
//

import UIKit
import QuartzCore

class RootViewController: UIViewController, UIPageViewControllerDelegate {

    var pageViewController: UIPageViewController?
    var addButton:UIImageView
    var tapView:UIView
    
    var radialMenu: RadialMenu!
    let num = 4
    let addButtonSize: CGFloat = 25
    let menuRadius: CGFloat = 125.0
    let subMenuRadius: CGFloat = 35.0
    var didSetupConstraints = false
    let colors = ["#C0392B", "#2ECC71", "#E67E22", "#3498DB", "#9B59B6", "#F1C40F",
        "#16A085", "#8E44AD", "#2C3E50", "#F39C12", "#2980B9", "#27AE60",
        "#D35400", "#34495E", "#E74C3C", "#1ABC9C"].map { UIColor(rgba: $0) }
    
    required init?(coder aDecoder: NSCoder) {
        
        addButton = UIImageView(image: UIImage(named: "plus"))
        tapView = UIView()
        super.init(coder: aDecoder)
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        // Configure the page view controller and add it as a child view controller.
        self.pageViewController = UIPageViewController(transitionStyle: .PageCurl, navigationOrientation: .Horizontal, options: nil)
        self.pageViewController!.delegate = self

        let startingViewController: DataViewController = self.modelController.viewControllerAtIndex(0, storyboard: self.storyboard!)!
        let viewControllers = [startingViewController]
        self.pageViewController!.setViewControllers(viewControllers, direction: .Forward, animated: false, completion: {done in })

        self.pageViewController!.dataSource = self.modelController

        self.addChildViewController(self.pageViewController!)
        self.view.addSubview(self.pageViewController!.view)

        // Set the page view controller's bounds using an inset rect so that self's view is visible around the edges of the pages.
        var pageViewRect = self.view.bounds
        if UIDevice.currentDevice().userInterfaceIdiom == .Pad {
            pageViewRect = CGRectInset(pageViewRect, 40.0, 40.0)
        }
        self.pageViewController!.view.frame = pageViewRect

        self.pageViewController!.didMoveToParentViewController(self)

        // Add the page view controller's gesture recognizers to the book view controller's view so that the gestures are started more easily.
        self.view.gestureRecognizers = self.pageViewController!.gestureRecognizers
        
        let longPress = UILongPressGestureRecognizer(target: self, action: "pressedButton:")
        
        // Setup radial menu
        var subMenus: [RadialSubMenu] = []
        for i in 0..<num {
            subMenus.append(self.createSubMenu(i))
        }
        
        radialMenu = RadialMenu(menus: subMenus, radius: menuRadius)
        radialMenu.center = view.center
        radialMenu.openDelayStep = 0.05
        radialMenu.closeDelayStep = 0.00
        radialMenu.minAngle = 180
        radialMenu.maxAngle = 360
        radialMenu.activatedDelay = 1.0
        radialMenu.backgroundView.alpha = 0.0
        radialMenu.onClose = {
            for subMenu in self.radialMenu.subMenus {
                self.resetSubMenu(subMenu)
            }
        }
        radialMenu.onHighlight = { subMenu in
            self.highlightSubMenu(subMenu)
            
            let color = self.colorForSubMenu(subMenu).colorWithAlphaComponent(1.0)
            
            // TODO: Add nice color transition
            self.view.backgroundColor = color
        }
        
        radialMenu.onUnhighlight = { subMenu in
            self.resetSubMenu(subMenu)
            self.view.backgroundColor = UIColor.whiteColor()
        }
        
        radialMenu.onClose = {
            self.view.backgroundColor = UIColor.whiteColor()
        }
        
        view.addSubview(radialMenu)
        
        // Setup add button
        addButton.userInteractionEnabled = true
        addButton.alpha = 0.65
        view.addSubview(addButton)
        
        tapView.center = view.center
        tapView.addGestureRecognizer(longPress)
        view.addSubview(tapView)
        
        view.backgroundColor = UIColor.whiteColor()
    }
    
    // FIXME: Consider moving this to the radial menu and making standard interaction types  that are configurable
    func pressedButton(gesture:UIGestureRecognizer) {
        switch(gesture.state) {
        case .Began:
            self.radialMenu.openAtPosition(self.addButton.center)
        case .Ended:
            self.radialMenu.close()
        case .Changed:
            self.radialMenu.moveAtPosition(gesture.locationInView(self.view))
        default:
            break
        }
    }

    override func updateViewConstraints() {
        super.updateViewConstraints()
        
        if (!didSetupConstraints) {
            
            // FIXME: Any way to simplify this?
            addButton.autoAlignAxisToSuperviewAxis(.Horizontal)
            addButton.autoAlignAxisToSuperviewAxis(.Vertical)
            addButton.autoSetDimensionsToSize(CGSize(width: addButtonSize, height: addButtonSize))
            
            tapView.autoAlignAxisToSuperviewAxis(.Horizontal)
            tapView.autoAlignAxisToSuperviewAxis(.Vertical)
            tapView.autoSetDimensionsToSize(CGSize(width: addButtonSize*2, height: addButtonSize*2))
            
            didSetupConstraints = true
        }
    }
    
    // MARK - RadialSubMenu helpers
    
    func createSubMenu(i: Int) -> RadialSubMenu {
        let subMenu = RadialSubMenu(frame: CGRect(x: 0.0, y: 0.0, width: CGFloat(subMenuRadius*2), height: CGFloat(subMenuRadius*2)))
        subMenu.userInteractionEnabled = true
        subMenu.layer.cornerRadius = subMenuRadius
        subMenu.layer.borderColor = UIColor.whiteColor().colorWithAlphaComponent(0.5).CGColor
        subMenu.layer.borderWidth = 1
        subMenu.tag = i
        resetSubMenu(subMenu)
        return subMenu
    }
    
    func colorForSubMenu(subMenu: RadialSubMenu) -> UIColor {
        let pos = subMenu.tag % colors.count
        return colors[pos] as UIColor!
    }
    
    func highlightSubMenu(subMenu: RadialSubMenu) {
        let color = colorForSubMenu(subMenu)
        subMenu.backgroundColor = color.colorWithAlphaComponent(1.0)
    }
    
    func resetSubMenu(subMenu: RadialSubMenu) {
        let color = colorForSubMenu(subMenu)
        subMenu.backgroundColor = color.colorWithAlphaComponent(0.75)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    var modelController: ModelController {
        // Return the model controller object, creating it if necessary.
        // In more complex implementations, the model controller may be passed to the view controller.
        if _modelController == nil {
            _modelController = ModelController()
        }
        return _modelController!
    }

    var _modelController: ModelController? = nil

    // MARK: - UIPageViewController delegate methods

    func pageViewController(pageViewController: UIPageViewController, spineLocationForInterfaceOrientation orientation: UIInterfaceOrientation) -> UIPageViewControllerSpineLocation {
        if (orientation == .Portrait) || (orientation == .PortraitUpsideDown) || (UIDevice.currentDevice().userInterfaceIdiom == .Phone) {
            // In portrait orientation or on iPhone: Set the spine position to "min" and the page view controller's view controllers array to contain just one view controller. Setting the spine position to 'UIPageViewControllerSpineLocationMid' in landscape orientation sets the doubleSided property to true, so set it to false here.
            let currentViewController = self.pageViewController!.viewControllers![0]
            let viewControllers = [currentViewController]
            self.pageViewController!.setViewControllers(viewControllers, direction: .Forward, animated: true, completion: {done in })

            self.pageViewController!.doubleSided = false
            return .Min
        }

        // In landscape orientation: Set set the spine location to "mid" and the page view controller's view controllers array to contain two view controllers. If the current page is even, set it to contain the current and next view controllers; if it is odd, set the array to contain the previous and current view controllers.
        let currentViewController = self.pageViewController!.viewControllers![0] as! DataViewController
        var viewControllers: [UIViewController]

        let indexOfCurrentViewController = self.modelController.indexOfViewController(currentViewController)
        if (indexOfCurrentViewController == 0) || (indexOfCurrentViewController % 2 == 0) {
            let nextViewController = self.modelController.pageViewController(self.pageViewController!, viewControllerAfterViewController: currentViewController)
            viewControllers = [currentViewController, nextViewController!]
        } else {
            let previousViewController = self.modelController.pageViewController(self.pageViewController!, viewControllerBeforeViewController: currentViewController)
            viewControllers = [previousViewController!, currentViewController]
        }
        self.pageViewController!.setViewControllers(viewControllers, direction: .Forward, animated: true, completion: {done in })

        return .Mid
    }


}


/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "LaunchScreenController.h"
#import "HexColor.h"

@implementation LaunchScreenController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  
  CAGradientLayer *bg = [CAGradientLayer layer];
  bg.frame = self.view.bounds;
  bg.colors = @[(id)[UIColor colorWithHexString:@"#14b3dd"].CGColor,
                          (id)[UIColor colorWithHexString:@"#007dad"].CGColor];
  [self.view.layer insertSublayer:bg atIndex:0];
}

@end

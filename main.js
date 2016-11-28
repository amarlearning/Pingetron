/*
* @Author: Amar Prakash Pandey
* @Date:   2016-05-30
* @Email:  amar.om1994@gmail.com  
* @Github username: @amarlearning
* MIT License. You can find a copy of the License
* @http://amarlearning.mit-license.org
*/

const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');
const batteryLevel = require('battery-level');
const notifier = require('node-notifier');

var isOnline = require('is-online');

const iconPathWork = path.join(__dirname, 'images', 'ic_sentiment_very_satisfied_black_24dp_2x');
const iconPathNotWork = path.join(__dirname, 'images', 'ic_sentiment_very_dissatisfied_black_24dp_2x');

// for notification, we don't want to disturb anyone.
var flag = 0;

//begin code for app.makeSingleInstance(callback)
var myWindow = null;
var shouldQuit = app.makeSingleInstance(function(commandLine, workingDirectory) {
  // Someone tried to run a second instance, we should focus our window
  if (myWindow) {
    if (myWindow.isMinimized()) myWindow.restore();
    myWindow.focus();
  }
  return true;
});

if (shouldQuit) {
  app.quit();
  return;
}
//END single instance code

let appIcon = null;
let win = null;

app.on('ready', function(){

  win = new BrowserWindow({
    show : false
  });

  setInterval(function () {
    batteryLevel().then(level => {
      if(level == 1 && flag != 1) {
        notifier.notify({
          'title': 'Pingetron Notification',
          'message': 'Battery full charged! Please unplug the charger & save energy!'
        });
        flag = 1;
      }
      if(level == 0.3 && flag != 2) {
        notifier.notify({
          'title': 'Pingetron Notification',
          'message': 'Battery remaining 30%. Better plug in to continue your work!'
        });
        flag = 2;
      }
      if(level == 0.1 && flag != 3) {
        notifier.notify({
          'title': 'Pingetron Notification',
          'message': 'Battery level critical. Plug in now to continue your work!'
        });
        flag = 3;
      }
    });
  }, 1000);

  appIcon = new Tray(iconPathWork);

  PingetronMenu = Menu.buildFromTemplate([
    {
      label : 'About',
      click : function() {
        aboutWindow = new BrowserWindow({
          width:400,
          height:400,
          autoHideMenuBar : true
        })
        aboutWindow.loadURL('file://' + __dirname + '/about.html')
      }
    },
    {
      label : 'Quit',
      click : function() {
        app.quit()
      }
    }
  ])

  setInterval(function () {

  isOnline(function(err, online) {

      if(!online) {
        appIcon.setImage(iconPathNotWork);
      } else {
        appIcon.setImage(iconPathWork);
      }

  });

  }, 1000)

  appIcon.setToolTip('Pingetron');
  appIcon.setContextMenu(PingetronMenu)

});

app.on('window-all-closed', () => {
  app.quit()
});

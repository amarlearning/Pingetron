// @Author: Amar Prakash Pandey
// @Date:   2016-05-30
// @Email:  amar.om1994@gmail.com  
// @Github username: @amarlearning
// MIT License. You can find a copy of the License
// @http://amarlearning.mit-license.org

const {app, Tray, Menu, BrowserWindow} = require('electron');
const path = require('path');

var isOnline = require('is-online');

const iconPathWork = path.join(__dirname, 'images', 'day-19.png');
const iconPathNotWork = path.join(__dirname, 'images', 'sunset-19.png');

let appIcon = null;
let win = null;

app.on('ready', function(){

  win = new BrowserWindow({
    show : false
  });

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
})

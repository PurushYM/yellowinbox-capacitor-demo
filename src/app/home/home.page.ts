import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

declare let cordova: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private isPlatformReady: Boolean = false;
  private isInitialized: Boolean = false;
  private isInitializing: Boolean = false;

  constructor(public platform: Platform) {
    platform.ready().then(
      () => {
        this.isPlatformReady = true;
      }
    )
  }

  initializeYellowInbox() {
    console.log("Initializing ...")

    if (!this.isPlatformReady) {
      alertSuccess("Please wait until platform is ready");
    }
    else if (this.isInitializing) {
      alertSuccess("Please wait while initializing ...");
    }
    else if (!this.isInitialized) {
      this.isInitializing = true;
      alertSuccess("Initializing ... please click ok wait");
      //  initialize 

      /* 
          cordova.plugins.YellowInbox.initialize(
          apiKey: String, 
          userId: String, 
          botId: String, 
          successCallback: () => void, 
          failureCallback: (failureCallback: Object) => void
          );
      */


      cordova.plugins.YellowInbox.initialize(
        "a6aee4bc2885b10c2c1b02b96080263057438d2673a5512c6b64da2a3f818ee7",
        "purushottam.yadav@yellow.ai",
        "x1608615889375",
        () => {
          this.isInitializing = false;
          this.isInitialized = true;
          alert("Initialized SDK :)")

          this.setLocalListener();
        },
        failure);
    }
  }

  setLocalListener() {
    //  setLocalListener

    /* 
        cordova.plugins.YellowInbox.initialize(
        successCallback: (eventCallback: Object) => void, 
        failureCallback: (failureCallback: Object) => void
        );
    */

    cordova.plugins.YellowInbox.setLocalReceiver((event) => {
      success(event);
      this.setUpdatedEvent(event);
    }, (errResult) => {
      this.isInitializing = false;
      failure(errResult);
    });
  }

  setUpdatedEvent(event) {
    //  setUpdatedEvent

    /* 
        cordova.plugins.YellowInbox.setUpdatedEvent(
        title: String,
        body: Object,
        model: Object,
        eventType: String,
        successCallback: () => void, 
        failureCallback: (failureCallback: Object) => void
    );
    */

    // updating title 
    event.title = "Changed " + event.title

    cordova.plugins.YellowInbox.setUpdatedEvent(
      event,
      success,
      failure);
  }

  setAgentStatus(status) {
    if (this.isInitialized) {

      //  setAgentStatus

      /* 
          cordova.plugins.YellowInbox.setAgentStatus(
          status: String,
          successCallback: () => void, 
          failureCallback: (failureCallback: Object) => void
      );
      */

      cordova.plugins.YellowInbox.setAgentStatus(
        status,
        () => {
          alertSuccess("Changed Agent status successfully")
          success(status);
        },
        failure
      )
    }
    else {
      notInitialized();
    }
  }

  setAgentStatusAvailable() {
    console.log(cordova.plugins.YellowInbox.agentStatus);
    this.setAgentStatus(cordova.plugins.YellowInbox.AgentStatus.AVAILABLE);
  }

  setAgentStatusBusy() {
    this.setAgentStatus(cordova.plugins.YellowInbox.AgentStatus.BUSY);
  }

  setAgentStatusAway() {
    this.setAgentStatus(cordova.plugins.YellowInbox.AgentStatus.AWAY);
  }

  getAgentStatus() {

    //  getAgentStatus

    /* 
        cordova.plugins.YellowInbox.getAgentStatus(
        successCallback: (status: String) => void, 
        failureCallback: (failureCallback: Object) => void
    );
    */

    if (this.isInitialized) {
      cordova.plugins.YellowInbox.getAgentStatus(
        (status) => {
          success(status);
          alertSuccess(status);
        }, failure
      )
    }
    else {
      notInitialized();
    }
  }

  logout() {

    //  logout

    /* 
        cordova.plugins.YellowInbox.logout(
        successCallback: () => void, 
        failureCallback: (failureCallback: Object) => void
    );
    */

    if (this.isInitialized) {
      cordova.plugins.YellowInbox.logout(
        () => {
          this.isInitialized = false;
          success({ success: "Logged out successfully" });
          alertSuccess("Logged out successfully")
        },
        failure
      );
    }
    else {
      alertSuccess("You are already logged out");
    }
  }

  showOverviewScreen() {
    if (this.isInitialized) {
      //  showOverviewScreen

      /* 
          cordova.plugins.YellowInbox.showOverviewScreen(
          successCallback: () => void, 
          failureCallback: (failureCallback: Object) => void
      );
      */

      cordova.plugins.YellowInbox.showOverviewScreen(success, failure);
    }
    else {
      notInitialized();
    }
  }

  showMyChatScreen() {
    if (this.isInitialized) {

      //  showMyChatScreen

      /* 
          cordova.plugins.YellowInbox.showMyChatScreen(
          successCallback: () => void, 
          failureCallback: (failureCallback: Object) => void
      );
      */


      cordova.plugins.YellowInbox.showMyChatScreen(success, failure);
    }
    else {
      notInitialized()
    }
  }
}

const success = (result) => {
  console.log(JSON.stringify(result));
};

const alertSuccess = (result) => {
  alert(result);
};

const failure = (result) => {
  console.log(JSON.stringify(result));
};

const notInitialized = () => {
  alert("Not Initialized please press Initialize button")
}

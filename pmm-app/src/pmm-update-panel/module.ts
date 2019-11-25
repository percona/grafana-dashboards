import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import AppEvents from 'grafana/app/core/app_events';
import moment from 'moment';
import $ from 'jquery';
export class PanelCtrl extends MetricsPanelCtrl {
  /**
   * Urls to define panels templates
   */
  static TEMPLATES = {
    MAIN: 'pmm-update-panel/index.html',
    MODAL: 'public/plugins/pmm-update-panel/modal.html',
  };

  /**
   * Urls to define API endpoints
   */
  static API = {
    GET_CURRENT_VERSION: '/v1/Updates/Check',
    CHECK_FOR_UPDATE: '/v1/Updates/Check',
    UPDATE_START: '/v1/Updates/Start',
    UPDATE_STATUS: '/v1/Updates/Status',
  };

  /**
   * Possible statuses of update version process (returned by backend)
   */
  static PROCESS_STATUSES = {
    FAILED: 'failed',
    IN_PROGRESS: 'running',
    DONE: 'succeeded',
    ERROR: 'error',
  };
  /**
   * Possible errors during update process
   */
  static ERRORS = {
    UPDATE: 'Error during update',
    NOTHING_TO_UPDATE: 'Nothing to update',
    INCORRECT_SERVER_RESPONSE: 'Incorrect server response',
  };

  /**
   * Grafana param, define url of template that will be used for panel
   */
  static templateUrl: string = PanelCtrl.TEMPLATES.MAIN;
  /** @ngInject */
  constructor(public $scope, public $injector, public $http) {
    super($scope, $injector);

    // Re-init all scope params
    this.reset($scope);
    $scope.logLocation = '';

    $scope.version = '';
    $scope.fullVersion = '';
    $scope.versionCashed = '';

    $scope.nextVersion = '';
    $scope.nextFullVersion = '';
    $scope.nextVersionCashed = '';
    $scope.errorMessage = '';
    $scope.canBeReloaded = false;
    $scope.isOutputShown = true;
    $scope.isUpdateAvailable = false;
    $scope.isDefaultView = true;
    $scope.newsLink = '';
    $scope.lastCheck = '';
    $scope.keydownCode = '';

    $scope.forceUpdate = false;
    $scope.updateAuthToken = '';
    $scope.updateLogOffset = 0;
    $scope.updateCntErrors = 0;
    $scope.updateFailed = false;

    $scope.checkForUpdate = this.checkForUpdate.bind(this, $scope, $http);
    $scope.update = this.update.bind(this, $scope, $http);
    $scope.displayFullCurrentVersion = this.displayFullCurrentVersion.bind(this, $scope);
    $scope.displayFullAvailableVersion = this.displayFullAvailableVersion.bind(this, $scope);
    $scope.getLog = this.getLog.bind(this, $scope, $http);
    $scope.getCurrentVersion = this.getCurrentVersion.bind(this, $scope, $http);
    $scope.getCurrentVersion($scope, $http);
    const body = document.querySelector('body') as HTMLElement;
    const escKeyCode = 'Escape';
    body.addEventListener('click', event => {
      if ($(event.target).hasClass('modal-backdrop') && $scope.canBeReloaded) {
        location.reload(true);
      }
    });
    body.addEventListener('keydown', event => {
      $scope.keydownCode = event.code;
      event.key === escKeyCode && $scope.canBeReloaded ? location.reload(true) : event.stopPropagation();
    });
  }

  /**
   * Send request for update version
   */
  private update($scope, $http): void {
    const modalScope = $scope.$new(true);
    modalScope.isOutputShown = true;
    $scope.$watch(newState => {
      modalScope.output = newState.output;
      modalScope.isChecked = newState.isChecked;
      modalScope.isUpdated = newState.isUpdated;
      modalScope.isUpdateAvailable = newState.isUpdateAvailable;
      modalScope.isDefaultView = newState.isDefaultView;
      modalScope.errorMessage = newState.errorMessage;
      modalScope.version = newState.nextVersion;
      modalScope.currentReleaseDate = newState.currentReleaseDate;
      modalScope.newReleaseDate = newState.newReleaseDate;
      modalScope.canBeReloaded = newState.canBeReloaded;
      modalScope.updateCntErrors = newState.updateCntErrors;
      modalScope.errorMessage = newState.errorMessage;
    });

    modalScope.reloadAfterUpdate = () => {
      location.reload(true);
    };

    modalScope.init = () => {
      const element = document.getElementById('pre-scrollable');
      // scroll update status to the end.
      setInterval(() => element && element.scrollIntoView(false), 500);
    };

    AppEvents.emit('show-modal', {
      src: PanelCtrl.TEMPLATES.MODAL,
      scope: modalScope,
      backdrop: 'static',
      keyboard: false,
    });

    $http({
      method: 'POST',
      url: PanelCtrl.API.UPDATE_START,
    })
      .then(response => {
        const data = response.data;
        $scope.updateAuthToken = data.auth_token;
        $scope.updateLogOffset = 'log_offset' in data ? data.log_offset : 0;
        $scope.getLog($scope, $http);
      })
      .catch(err => {
        console.log('Update error:', err);
      });
  }

  /**
   * Show error message if update is fail
   * @param message - kind of error message
   */
  private displayError($scope, message) {
    $scope.isChecked = true;
    $scope.errorMessage = message;
    setTimeout(() => {
      $scope.isChecked = false;
      $scope.errorMessage = '';
      $scope.$apply();
    }, 5000);
  }

  /**
   * Send request to get current version
   */
  private getCurrentVersion($scope, $http): void {
    $http({
      method: 'POST',
      url: PanelCtrl.API.GET_CURRENT_VERSION,
      data: { force: false },
    })
      .then(res => {
        const data = res.data;
        $scope.nextVersion = data.latest.version || '';
        $scope.nextFullVersion = data.latest.full_version || '';
        $scope.lastCheckDate = data.last_check
          ? moment(data.last_check)
              .locale('en')
              .format('MMMM DD, H:mm')
          : '';
        $scope.version = data.installed.version || '';
        $scope.fullVersion = data.installed.full_version || '';
        $scope.currentReleaseDate = data.installed.timestamp
          ? moment
              .utc(data.installed.timestamp)
              .locale('en')
              .format('MMMM DD')
          : '';
        $scope.newReleaseDate = data.latest.timestamp
          ? moment
              .utc(data.latest.timestamp)
              .locale('en')
              .format('MMMM DD')
          : '';
        $scope.newsLink = data.latest_news_url || '';
        $scope.isUpdateAvailable = data.update_available || false;
        $scope.isDefaultView = false;
        $('#refresh').removeClass('fa-spin');
      })
      .catch(() => {
        $('#refresh').removeClass('fa-spin');
        //TODO: add error handler
      });
  }

  /**
   * Send request to check if update possible and re-init params
   */
  private checkForUpdate($scope, $http, $event): void {
    const refreshButton = $('#refresh');
    refreshButton.addClass('fa-spin');

    if ($event.altKey) {
      $scope.forceUpdate = true;
    }

    $http({
      method: 'POST',
      url: PanelCtrl.API.CHECK_FOR_UPDATE,
      data: { force: true },
    })
      .then(res => {
        const data = res.data;
        $scope.nextVersion = data.latest.version || '';
        $scope.nextFullVersion = data.latest.full_version || '';
        $scope.lastCheckDate = data.last_check
          ? moment(data.last_check)
              .locale('en')
              .format('MMMM DD, H:mm')
          : '';
        $scope.newReleaseDate = data.latest.timestamp
          ? moment
              .utc(data.latest.timestamp)
              .locale('en')
              .format('MMMM DD')
          : '';
        $scope.newsLink = data.latest_news_url || '';
        $scope.isUpdateAvailable = data.update_available || false;
        $scope.isDefaultView = false;
        refreshButton.removeClass('fa-spin');
      })
      .catch(() => {
        this.displayError($scope, PanelCtrl.ERRORS.NOTHING_TO_UPDATE);
        refreshButton.removeClass('fa-spin');
      });
  }

  /**
   * Send request for get info about update status
   */
  private getLog($scope, $http): void {
    if ($scope.updateCntErrors > 600) {
      console.log('error: ', $scope.errorMessage, $scope.updateCntErrors);
      $scope.updateFailed = true;
      return;
    }
    if ($scope.isUpdated) {
      $scope.canBeReloaded = true;
      return;
    }
    $http({
      method: 'POST',
      url: PanelCtrl.API.UPDATE_STATUS,
      data: { auth_token: $scope.updateAuthToken, log_offset: $scope.updateLogOffset },
    })
      .then(response => {
        const data = response.data;
        $scope.isUpdated = 'done' in data ? data.done : false;
        $scope.updateLogOffset = 'log_offset' in data ? data.log_offset : 0;
        $scope.output += data.log_lines.join('\n') + '\n';
        $scope.updateCntErrors = 0;
        window.setTimeout(this.getLog.bind(this, $scope, $http), 500);
      })
      .catch(err => {
        $scope.updateCntErrors++;
        $scope.errorMessage = err.message;
        console.log('error: ', err, $scope.errorMessage, $scope.updateCntErrors);
        window.setTimeout(this.getLog.bind(this, $scope, $http), 500);
      });
  }

  displayFullCurrentVersion($scope) {
    if ($scope.keydownCode === 'AltLeft') {
      if ($scope.version !== $scope.fullVersion) {
        $scope.versionCashed = $scope.version;
        $scope.version = $scope.fullVersion;
      } else {
        $scope.version = $scope.versionCashed;
      }
      $scope.keydownCode = '';
    }
  }

  displayFullAvailableVersion($scope) {
    if ($scope.keydownCode === 'AltLeft') {
      if ($scope.nextVersion !== $scope.nextFullVersion) {
        $scope.nextVersionCashed = $scope.nextVersion;
        $scope.nextVersion = $scope.nextFullVersion;
      } else {
        $scope.nextVersion = $scope.nextVersionCashed;
      }
      $scope.keydownCode = '';
    }
  }

  /**
   * Re-init all inner parameters that can be changed during update
   */
  private reset($scope): void {
    $scope.output = '';
    $scope.isChecked = false;
    $scope.isUpdated = false;
    $scope.isUpdateAvailable = false;
  }
}

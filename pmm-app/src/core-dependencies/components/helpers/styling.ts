class Styling {
  static addPluginPanelClass(panelWrapperSelector = '#antd', newClass = 'custom-grafana-plugin') {
    document.querySelectorAll(panelWrapperSelector).forEach((element) => {
      while (element.parentNode !== null) {
        // eslint-disable-next-line no-param-reassign
        element = element.parentNode as Element;
        if (element && element.classList.contains('panel-container')) {
          element.classList.add(newClass);
          break;
        }
      }
    });
  }
}

export default Styling;

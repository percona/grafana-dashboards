class Styling {
  static addPluginPanelClass(panelWrapperSelector = '#antd', newClass = 'custom-grafana-plugin') {
    const pluginsList = document.querySelectorAll(panelWrapperSelector);
    pluginsList.forEach(element => {
      while (element.parentNode !== null) {
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

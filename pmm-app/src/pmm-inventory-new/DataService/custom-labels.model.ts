export class CustomLabelsModel {
  key: string;
  value: string;

  constructor(customLabel) {
    this.key = customLabel[0];
    this.value = customLabel[1];
  }
}

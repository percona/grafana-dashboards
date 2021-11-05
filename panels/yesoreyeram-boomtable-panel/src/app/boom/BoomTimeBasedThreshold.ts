import { IBoomTimeBasedThreshold } from './index';

class BoomTimeBasedThreshold implements IBoomTimeBasedThreshold {
  public enabledDays: string;
  public from: string;
  public name: string;
  public threshold: string;
  public to: string;
  constructor() {
    this.enabledDays = 'Sun,Mon,Tue,Wed,Thu,Fri,Sat';
    this.from = '0000';
    this.name = 'Early morning of everyday';
    this.threshold = '70,90';
    this.to = '0530';
  }
}

export { BoomTimeBasedThreshold };

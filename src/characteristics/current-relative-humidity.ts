import { Service, Characteristic } from 'homebridge';

// https://developers.homebridge.io/#/characteristic/CurrentRelativeHumidity
export function add(
  maybeDevice: Promise<any>,
  service: Service,
  characteristic: typeof Characteristic.CurrentRelativeHumidity,
) {
  maybeDevice.then((device) => {
    device.on('relativeHumidityChanged', (value: number) => {
      service.updateCharacteristic(characteristic, value);
    });
  });

  return service.getCharacteristic(characteristic).onGet(async () => {
    const device = await maybeDevice;
    console.log(device);
    return await device.rh();
  });
}

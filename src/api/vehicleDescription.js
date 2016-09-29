import baseAPI from './base';

class VehicleDescription extends baseAPI {
  getVehicle(vin) {
    return this.get('rest/suite/vehicle-description?accountId=6&vin=' + vin);
  }
}

export default VehicleDescription;

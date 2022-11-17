import { Injectable } from '@nestjs/common';
import OracleDS from 'src/data-source/OracleDS';
import { patientMap } from '../../data-map/datamap';
const oracledb = require('oracledb');

@Injectable()
export class HisIntegrationService {

  async callSP(params: Object) {

    try {

      require('dotenv').config();
      console.log(params);

      oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

      let oracleDS: any = await OracleDS();

      const result = await oracleDS.execute(
        `BEGIN 
        ${params['sp_name']}(${params['input_params']}, :cursor);
      END;`,
        {
          cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        },
        {
          prefetchRows: 1000,
          fetchArraySize: 1000
        }
      );
      const resultSet = result.outBinds.cursor;
      let row, data = [];
      while ((row = await resultSet.getRow())) {
        data.push(row)
      }

      return data;

    } catch (exception) {
      console.log('CONNECTION ERROR: ' + exception);
    }

  }

  async mergeData(db_data: Object, sp_data: Object) {

    console.log("🚀 ~ file: his-integration.service.ts ~ line 49 ~ HisIntegrationService ~ mergeData ~ patientMap", patientMap)

    for (const key in patientMap) {
      if (Object.prototype.hasOwnProperty.call(patientMap, key)) {
        const element = patientMap[key];
        db_data[key] = sp_data[element];
      }
    }

    console.log("🚀 ~ file: his-integration.service.ts ~ line 54 ~ HisIntegrationService ~ mergeData ~ db_data", db_data)

    return db_data;
  }

};

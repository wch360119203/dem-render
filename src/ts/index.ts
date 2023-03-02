import axios from 'axios';
export async function getDemData() {
  const res = await axios({
    method: 'post',
    url: 'http://192.168.2.111:8088/getDem',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }).then((res) => {
    const data = res.data as {
      data: [number, number][][];
      ncols: number;
      nrows: number;
      cellsize: number;
      maxValue: number;
      minValue: number;
      NODATA_value: number;
      xllcorner: number;
      yllcorner: number;
    };
    const ncols = data.ncols;
    const nrows = data.nrows;
    const NODATA_value = data.NODATA_value;
    const cache: number[] = [];
    for (let i = 0; i < data.data.length; i++) {
      for (let j = 0; j < data.data[i].length; j++) {
        const t = data.data[i][j];
        cache.push(t[0], i, t[1]);
      }
    }
    const processData: Float32Array = new Float32Array(cache);
    const result = {
      data: processData,
      ncols,
      nrows,
      cellsize: data.cellsize,
      maxValue: data.maxValue,
      minValue: data.minValue,
      NODATA_value,
      xllcorner: data.xllcorner,
      yllcorner: data.yllcorner,
    };
    console.log(result);

    return result;
  });
  return res;
}

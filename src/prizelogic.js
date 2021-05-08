export const CrossProduct = (arr1, arr2) => {
  return new Promise((resolve, reject) => {
    let arr = [];

    arr1.forEach((i) => {
      arr2.forEach((j) => {
        arr.push([i, j]);
      });
    });
    resolve(arr);
  });
};

export const JoinS = (arr) => new Promise((resolve,reject)=>{
  resolve(arr.map((item) => item.join('')));
})

export const FindPrize = (n, nthPrizeList, allBondSerials) => {
  return new Promise((resolve, reject) => {
    let prizeList = [];
    nthPrizeList.forEach((prize) => {
      if (allBondSerials.filter((item) => item === prize).length === 1) {
        prizeList.push({
          prizeNumber: n,
          bondSerial: prize,
        });
      }
    });
    resolve(prizeList);
  });
};

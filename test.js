// function bonAppetit(bill, k, b) {
//   // Write your code here
//   let annaBill = 0;
//   for (let i = 0; i < bill.length; i++) {
//     if (i !== k[i]) {
//       annaBill += bill[i];
//     }
//   }

//   if (b < annaBill) {
//     return"Bon Appetit";
//   } else {
//     return annaBill;
//   }
// }

// console.log(bonAppetit([1, 2, 3, 4], [0, 1], 7));

// function sockMerchant(n, ar) {
//   // Write your code here
//   let pileObj = {};
//   let pairSum = 0;
//   for (let i = 0; i < n; i++) {
//     if (pileObj[ar[i]]) {
//       pileObj[ar[i]] += 1;
//     } else {
//       pileObj[ar[i]] = 1;
//     }
//   }

//   let temp = 0;

//   for (const key in pileObj) {
//     if (pileObj[key] % 2 === 1 && pileObj[key] > 2) {
//       pileObj[key] -= 1;
//       temp = pileObj[key];

//       if (temp % 2 === 0) {
//         pairSum += pileObj[key] / 2;
//       }
//     } else if (pileObj[key] % 2 === 0 && pileObj[key] > 2) {
//       pairSum += pileObj[key] / 2;
//     } else if (pileObj[key] % 2 === 0) {
//       pairSum++;
//     }
//   }

//   return pairSum;
// }

// sockMerchant(10, [1, 1, 3, 1, 2, 1, 3, 3, 3, 3]);

// function pageCount(n, p) {
//   // Write your code here
//   const numTurn = {};
//   for (let i = 1; i <= n; i++) {
//     if (i === 1) {
//       numTurn[i] = 1;
//     } else {
//       if (i % 2 === 1 && i > 2) {
//         numTurn[i] = (i - 1) / 2 + 1;
//       } else {
//         numTurn[i] = i / 2 + 1;
//       }
//     }
//   }

//   console.log(numTurn);
// }

// pageCount(6, 2);

// chunk array

function chunkArray(arr, size) {
  const newArr = [];
  if (arr.length % size === 0) {
    for (let i = 0; i <= Math.ceil(arr.length / size); i += size) {
      newArr.push([arr[i], arr[i + 1]]);
    }
  } else {
    for (let i = 0; i <= Math.ceil(arr.length / size); i += size) {
      newArr.push([arr[i], arr[i + 1]]);
    }
    newArr.push([arr[arr.length - 1]]);
  }

  console.log(newArr);
}

chunkArray([1, 2, 3, 4, 5, 6], 2);

export const initMap = (
  y: number,
  x: number,
  start: [number, number],
  mines: number,
) => {
  // 주어진 크기에 맞게 초기 맵 생성
  const array = new Array(y * x).fill(0);

  // 지뢰갯수 만큼 배열에 -1 생성후 랜덤 셔플
  for (let i = 0; i < mines; i++) {
    array[i] = -1;
  }
  array.sort(() => Math.random() - 0.5);

  // 2차원 배열로 변환
  const lst = new Array<number[]>(y)
    .fill([])
    .map(() => new Array<number>(x).fill(0));

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      lst[i][j] = array[i * x + j];
    }
  }

  // 주변 8칸에 대한 벡터값
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

  // 지뢰를 제외한 칸에 주변의 지뢰갯수를 포함
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      if (lst[i][j] === -1) {
        continue;
      }
      let cnt = 0;
      for (let d = 0; d < 8; d++) {
        const [a, b] = [i + dy[d], j + dx[d]];
        if (0 <= a && a < y && 0 <= b && b < x && lst[a][b] === -1) {
          cnt += 1;
        }
      }
      lst[i][j] = cnt;
    }
  }

  return lst;
};

export const chainZero = () => {};
